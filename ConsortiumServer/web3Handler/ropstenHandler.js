var db = require('../database/models/index');
var client = db.client;
var Address = db.userCurrencyAddress;
var Device = db.device;
var Project = db.project;
let Promise = require('bluebird');
const Web3 = require('web3');
var config = require('../config');
var ws_provider = config.testnetEndpoint;
var web3 = new Web3();
var provider = new Web3.providers.HttpProvider("https://blockchain.iotconekt.com");
// var provider = new Web3.providers.WebsocketProvider("ws://52.202.82.44:8601");
web3.setProvider(provider);
// providerHandler(provider, web3);
var tokenABI = config.tokenABI;
var myContract = new web3.eth.Contract(tokenABI);
const registryABI = require('../contractHandler/Registry/RegistryContractABI');


web3.eth.net.isListening(function(error, result) {
  if (error) {
    console.error(error);
    provider = new Web3.providers.HttpProvider("https://blockchain.iotconekt.com");
    web3.setProvider(provider);
  } else {
    console.log("web3 provider listening Status: " + result);
  }
});

module.exports = {

  deployContract: (abi, bytecode, privateKey) => {
    return new Promise(async (resolve, reject) => {
      let gasPrice = await web3.eth.getGasPrice();
      var transaction = {
        from: config.testnetFaucetAddress,
        data: '0x' + bytecode,
        // gasLimit: 4700000,
        gasPrice: gasPrice
      };

      web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = gasLimit;
      console.log(gasLimit);
      web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function(confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              if (receipt.status == true) {
                resolve({
                  contractAddress: receipt.contractAddress,
                  transactionHash: receipt.transactionHash
                })
              }
            }
          })
          .on('error', async function(error) {
            reject(error)
          })
      });
    })
    });
  },

  addNewProject: (projectID, contractAddress, name, description, organizationName, registrantId, address, privateKey) => {
    return new Promise(async (resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, address);
      let gasPrice = await web3.eth.getGasPrice();
      var transaction = {
        "to": config.registryContractAddress,
        "data": registryContractInstance.methods.addNewProject(
          projectID,
          contractAddress,
          name,
          description,
          organizationName,
          registrantId
        ).encodeABI(),
        gasPrice: gasPrice
      };

      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 2000000;
      web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function(confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              if (receipt.status == true) {
                resolve(receipt)
              }
            }
          })
          .on('error', async function(error) {
            reject(error)
          })
      });
      // });
    });
  },

  addNewOrganization: (organizationName, orgAddress, organizationDetails, registrantID, registrantAddress, registrantDetails) => {
    return new Promise(async (resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, config.registryContractAddress, {
        from: config.testnetFaucetAddress
      })
      let gasPrice = await web3.eth.getGasPrice();
      var transaction = {
        "to": config.registryContractAddress,
        "data": registryContractInstance.methods.addNewOrganization(
          organizationName,
          orgAddress,
          JSON.stringify(organizationDetails),
          registrantID,
          registrantAddress,
          JSON.stringify(registrantDetails)
        ).encodeABI(),
        "gasPrice": gasPrice
      }
      transaction["gasLimit"] = 2000000;
      web3.eth.accounts.signTransaction(transaction, config.testnetFaucetPrivateKey).then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction)
          .on('confirmation', async function(confirmationNumber, receipt) {
            if (confirmationNumber == 3) {
              if (receipt.status == true) {
                resolve(receipt)
              }
            }
          })
          .on('error', async function(error) {
            reject(error)
          })
      });
    })
  },

  checkRegistration: (registrantId) => {
    return new Promise(async (resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, config.registryContractAddress, {
        from: config.testnetFaucetAddress
      })
      registryContractInstance.methods.getRegistrantDetails(registrantId).call((error, result) => {
        if (error)
          reject(error);
        resolve({
          status: true ? result[0] === registrantId : false,
          admin: true ? result[3] === '0' : false
        })
      });
    })
  },

  addNewRegistrant: (registrantID, organizationID, registrantDetails, role, registrantAddress, adminAddress, adminPrivateKey) => {
    return new Promise(async (resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, config.registryContractAddress, {
        from: adminAddress
      })
      let gasPrice = await web3.eth.getGasPrice();
      var transaction = {
        "to": config.registryContractAddress,
        "data": registryContractInstance.methods.addNewRegistrant(
          registrantID,
          organizationID,
          JSON.stringify(registrantDetails),
          role,
          registrantAddress
        ).encodeABI(),
        "gasPrice": gasPrice
      }
      transaction["gasLimit"] = 2000000;
      web3.eth.accounts.signTransaction(transaction, adminPrivateKey).then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function(confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              if (receipt.status == true) {
                resolve(receipt)
              }
            }
          })
          .on('error', async function(error) {
            reject(error)
          })
      });
    })
  },

  getProjectsFromOrganizationName: (organizationName) => {
    return new Promise(async (resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, config.registryContractAddress, {
        from: config.testnetFaucetAddress
      });
      registryContractInstance.methods.getProjectsFromOrganizationName(organizationName).call((error, applicationData) => {
        if (error)
          reject(error);
        console.log(applicationData);
        resolve(applicationData)
      });
    });
  },

  getAllProjects: () => {
    return new Promise(async (resolve, reject) => {
      let registryContractInstance = new web3.eth.Contract(registryABI, config.registryContractAddress, {
        from: config.testnetFaucetAddress
      });
      registryContractInstance.methods.getAllProjects().call((error, applicationData) => {
        if (error)
          reject(error);
        console.log(applicationData);
        resolve(applicationData)
      });
    });
  },

  getEventsFromContractAddress: (contractAddress) => {
    return new Promise(async (resolve, reject) => {
      try {
        var tokenContractInstance = new web3.eth.Contract(tokenABI, contractAddress);
        var events = await tokenContractInstance.getPastEvents('allEvents', {
          fromBlock: 0
        });
        resolve(events)
      } catch (err) {
        reject(err)
      }
    });
  },

  getDeviceInfo: (contractAddress, tokenId) => {
    return new Promise(async (resolve, reject) => {
      try {
        var tokenContractInstance = new web3.eth.Contract(tokenABI, contractAddress);
        var tokenURI = await tokenContractInstance.methods.tokenURI(tokenId).call();
        var owner = await tokenContractInstance.methods.ownerOf(tokenId).call();
        resolve({
          tokenURI: tokenURI,
          owner: owner
        })
      } catch (error) {
        reject(error)
      }
    });
  },

  getDeviceOwner: (contractAddress, urn) => {
    return new Promise(async (resolve, reject) => {
      try {
        var tokenContractInstance = new web3.eth.Contract(tokenABI, contractAddress);
        var tokenURI = await tokenContractInstance.methods.tokenURI(urn).call();
        var owner = await tokenContractInstance.methods.ownerOf(urn).call();
        resolve(owner)
      } catch (error) {
        reject(error)
      }
    });
  },

  transferOwnership: (privateKey, contractAddress, tokenId, fromAddress, toAddress) => {
    return new Promise(async (resolve, reject) => {
      var tokenContractInstance = new web3.eth.Contract(tokenABI, contractAddress);
      console.log("From", fromAddress, "To", toAddress, "tokenId", tokenId, "Contract", contractAddress, "privateKey", privateKey);
      var transaction = {
        to: contractAddress,
        data: tokenContractInstance.methods.safeTransferFrom(
          fromAddress,
          toAddress,
          tokenId,
        ).encodeABI(),
        gasLimit: 5000000
      };

      web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction)
          .on('confirmation', async function(confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              if (receipt.status == true) {
                resolve(receipt)
              }
            }
          })
          .on('error', async function(error) {
            console.log(error);
            reject(error)
          })
      });
    });
  },

  getDeviceInfoFromDeviceURN: (contractAddress, deviceURN) => {
    return new Promise(async (resolve, reject) => {
      try {
        var tokenContractInstance = new web3.eth.Contract(tokenABI, contractAddress);
        var info = await tokenContractInstance.methods.getDeviceInfo(deviceURN).call();
        console.log(info);
        resolve({
          tokenURI: info['0'],
          thingURI: info['1']
        })
      } catch (error) {
        reject(error)
      }
    });
  },

  mintNewToken: async (publicKey, privateKey, number, tokenURI, deviceURN, tokenAddress, projectName) => {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    var batch = new web3.BatchRequest();
    var tokenContractInstance = new web3.eth.Contract(tokenABI, tokenAddress);
    let totalSupply = await module.exports.checkTotalTokenSupply(tokenAddress);
    let from = parseInt(totalSupply) + 1;
    let to = from + parseInt(number) -1;
    console.log("From is", from);
    console.log("To is", to);
    let nonce = await web3.eth.getTransactionCount(publicKey);
    console.log("nonce", nonce, deviceURN);
    var count = 0
    for (var i = from; i <= to; i++, nonce++) {
      var transaction = {
        "nonce": nonce,
        "to": tokenAddress,
        "data": tokenContractInstance.methods.mint(publicKey, deviceURN[count]).encodeABI()
      };
      // let gasLimit = await web3.eth.estimateGas(transaction);
      transaction["gasLimit"] = 300000;
      let result = await web3.eth.accounts.signTransaction(transaction, privateKey);
      console.log("Adding", i, count, deviceURN[count]);
      batch.add(web3.eth.sendSignedTransaction.request(result.rawTransaction, receipt.bind({
        deviceURN: deviceURN[count],
        tokenId: i,
        projectName: projectName
      })));
      count++;
    }
    batch.execute();

  },

  addThing: (publicKey, privateKey, contractAddress, thingURI, deviceURN) => {
    return new Promise(async (resolve, reject) => {
      var tokenContractInstance = new web3.eth.Contract(tokenABI, contractAddress);
      let nonce = await web3.eth.getTransactionCount(publicKey, 'pending');
      var transaction = {
        "to": contractAddress,
        nonce: nonce,
        "data": tokenContractInstance.methods.setMetadata(
          deviceURN,
          thingURI
        ).encodeABI()
      };

      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 3000000;
      web3.eth.accounts.signTransaction(transaction, privateKey).then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction).on('confirmation', async function(confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              if (receipt.status == true) {
                resolve(receipt)
              }
            }
          })
          .on('error', async function(error) {
            reject(error)
          })
      });
      // });
    });
  },

  checkTotalTokenSupply: (tokenAddress) => {
    return new Promise(function(resolve, reject) {
      var tokenContractInstance = new web3.eth.Contract(tokenABI, tokenAddress);
      tokenContractInstance.methods.totalSupply().call((error, totalSupply) => {
        if (error)
          reject(error);
        console.log(totalSupply);
        resolve(totalSupply)
      });
    });
  },

  checkBalance: (address) => {
    return new Promise(function(resolve, reject) {
      web3.eth.getBalance(address, function(err, result) {
        // balance(address, function (err, result) {
        if (err)
          reject(err);
        // resolve(result[0].quantity);
        resolve(result)
      });
    });
  },

  checkTokenBalance: async (address, tokenAddress) => {
    // console.log(tokenAddress);
    return new Promise(async function(resolve, reject) {
      var tokenContractInstance = new web3.eth.Contract(tokenABI, tokenAddress);
      // decimals = await tokenContractInstance.methods.decimals().call();
      tokenContractInstance.methods.balanceOf(address).call().then(balance => {
        // resolve(balance / 10 ** decimals);
        resolve(balance);
      }).catch(async error => {
        provider = new Web3.providers.WebsocketProvider(ws_provider);
        web3.setProvider(provider);
        reject(error);
      });
    });
  },

  generateEthAddress: async () => {
    return new Promise(async function(resolve, reject) {
      var newEthAddress = new Object();
      var keyStore = generateNewAccount();
      newEthAddress.privateKey = keyStore.privateKey;
      newEthAddress.address = keyStore.address;
      newEthAddress.currencyType = "masterEthereum";
      var createdEthAddress = await Address.create(newEthAddress);
      resolve(createdEthAddress);
    });
  },
  etherFaucet: async (address, amount) => {
    console.log("in 1");

    return new Promise(async function(resolve, reject) {
      var etherTransfer1 = {
        "to": address,
        "value": amount, //5000000000000000000,
        "gasLimit": 2000000
      };
      web3.eth.accounts.signTransaction(etherTransfer1, config.testnetFaucetPrivateKey).then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction)
          .on('confirmation', async function(confirmationNumber, receipt) {
            if (confirmationNumber == 3) {
              if (receipt.status == true) {
                resolve(receipt)
              }
            }
          })
          .on('error', async function(error) {
            reject(error)
          })
      })
    })
  }
}

async function receipt(err, receipt) {
  if (receipt) {
    let tx = null;
    while (tx == null) {
      tx = await web3.eth.getTransactionReceipt(receipt);
    }
    if (tx.status) {
      Device.create({
        urn: this.deviceURN,
        tokenId: this.tokenId,
        transactionHash: receipt
      }).then(device => {
        Project.findOne({
          where: {
            name: this.projectName
          }
        }).then(project => {
          project.addDevice(device);
          console.log("Device created successsfully");
        })
      })
    } else {
      console.log("EVM reverted");
    }
  } else if (err) {
    console.log("Device could not be created", err);
  }
}


// function providerHandler(provider, web3) {
//   provider.on('connect', () => console.log('ICO Private WS Connected'))
//   provider.on('error', e => {
//     console.log('WS error occured');
//     console.log('Attempting to reconnect...');
//     // provider = new Web3.providers.WebsocketProvider(ws_provider);
//     provider = new Web3.providers.HttpProvider("https://blockchain.iotconekt.com");
//     web3.setProvider(provider);
//   });
//   provider.on('end', e => {
//     console.log('WS closed');
//     console.log('Attempting to reconnect...');
//     // provider = new Web3.providers.WebsocketProvider(ws_provider);
//     provider = new Web3.providers.HttpProvider("https://blockchain.iotconekt.com");
//     web3.setProvider(provider);
//   });
// }

function generateNewAccount(password) {
  return web3.eth.accounts.create(web3.utils.randomHex(32));
};
