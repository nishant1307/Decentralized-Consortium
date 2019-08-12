// authentication.js
import uuidv1 from 'uuid/v1';
import axios from "axios";
import web3 from '../web3';
import {
  GET_ERRORS,
  CURRENT_USER_INFO,
  NEW_PROJECT_CREATED,
  NEW_DEVICE_CREATED,
  NEW_THING_CREATED,
  OPEN_PROJECT_MODAL,
  CLOSE_PROJECT_MODAL,
  OPEN_DEVICE_MODAL,
  CLOSE_DEVICE_MODAL,
  OPEN_THING_MODAL,
  CLOSE_THING_MODAL,
  OPEN_LOCATION_MODAL,
  CLOSE_LOCATION_MODAL,
  CREATE_NEW_NOTIFICATION,
  FETCH_NOTIFICATION,
  EDIT_PROFILE,
  GET_SUBSCRIPTION
} from "./types";
import { setAuthToken } from '../axiosConfig';
import productContract from '../productContract.js'
import DocContract from '../DocContract';
import { registryABI, registryAddress, registryContract } from 'registryContract';
import deviceContract from 'deviceContract';
const address = localStorage.getItem("address");
const privateKey = sessionStorage.getItem('privateKey')
export const currentUserInfo = clientToken => dispatch => {
  console.log(clientToken);

  DocContract.methods.balanceOf(clientToken).call().then(docCount => {
    registryContract.methods.getUserOrganizationDetails().call({
      from : localStorage.getItem("address")
    }).then(userOrgDetails => {
      productContract.methods._tokensOfOwner(clientToken).call().then(productArray => {
        console.log(clientToken);

        registryContract.methods.getMyProjectsCount().call({
          from: clientToken
        }).then(res => {
          dispatch({
            type: CURRENT_USER_INFO,
            payload: {
              projectCount: res,
              thingCount: productArray.length,
              productList: productArray,
              docCount:docCount,
              userInfo: userOrgDetails[0],
              organizationInfo: userOrgDetails[1]
            }
          });
        })
      })
    })
  })
};
export const openProjectModal = () => dispatch => {
  dispatch({
    type: OPEN_PROJECT_MODAL,
    payload: ""
  });
};

export const editProfile = email => dispatch => {
  dispatch({
    type: EDIT_PROFILE,
    payload: email
  });
};

export const closeProjectModal = () => dispatch => {
  dispatch({
    type: CLOSE_PROJECT_MODAL,
    payload: ""
  });
};

export const openDeviceModal = () => dispatch => {
  dispatch({
    type: OPEN_DEVICE_MODAL,
    payload: ""
  });
};

export const closeDeviceModal = () => dispatch => {
  dispatch({
    type: CLOSE_DEVICE_MODAL,
    payload: ""
  });
};

export const openThingModal = () => dispatch => {
  dispatch({
    type: OPEN_THING_MODAL,
    payload: ""
  });
};

export const closeThingModal = () => dispatch => {
  dispatch({
    type: CLOSE_THING_MODAL,
    payload: ""
  });
};

export const openLocationModal = () => dispatch => {
  dispatch({
    type: OPEN_LOCATION_MODAL,
    payload: ""
  });
};

export const closeLocationModal = () => dispatch => {
  dispatch({
    type: CLOSE_LOCATION_MODAL,
    payload: ""
  });
};

export const createNewProject = projectDetails => dispatch => {
  web3.eth.getBalance(address).then((balance) => {
    console.log(balance);
    if (balance > 1000000000000000000) {
      var transaction = {
        "to": registryAddress,
        "data": registryContract.methods.addNewProject(
          uuidv1().toString(),
          projectDetails.name,
          projectDetails.description,
          projectDetails.industry,
          projectDetails.partnerRole
        ).encodeABI()
      };

      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              console.log(receipt);
              if (receipt.status == true) {
                dispatch({
                  type: NEW_PROJECT_CREATED,
                  payload: projectDetails.name
                });
              }
            })
            .on('error', async function (error) {
              dispatch({
                type: GET_ERRORS,
                payload: error
              });
            })
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: "Error Occured While Creating New Project."
          });
        });
    } else {
      axios.post('https://www.iotconekt.com/api/dashboard/getEther', { "address": address, "amount": 30000000000000000000 })
        .then(res => {
          dispatch({
            type: GET_ERRORS,
            payload: "Network Error."
          });
        })
    }
  })
};

export const addNewLocation = locationDetails => dispatch => {
  var transaction = {
    "to": registryAddress,
    "data": registryContract.methods.addProjectLocation(
      locationDetails.latitude,
      locationDetails.longitude,
      locationDetails.name,
      locationDetails.projectID,
    ).encodeABI()
  };

  // web3.eth.estimateGas(transaction).then(gasLimit => {
  transaction["gasLimit"] = 2000000;
  web3.eth.accounts.signTransaction(transaction, privateKey)
    .then(res => {
      web3.eth.sendSignedTransaction(res.rawTransaction)
        .on('confirmation', async function (confirmationNumber, receipt) {
          if (confirmationNumber == 1) {
            if (receipt.status == true) {
              dispatch({
                type: NEW_PROJECT_CREATED,
                payload: locationDetails.name
              });
            }
          }
        })
        .on('error', async function (error) {
          dispatch({
            type: GET_ERRORS,
            payload: error
          });
        })
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: "Error Occured While Creating New Project."
      });
    });
};

export const createNewDevice = deviceDetails => dispatch => {
  // var transaction = {
  //   "to": '0xb17afcf9cba83a8a4367adb8beeb6bdf6e439123',
  // "data": deviceContract.methods.MintWithDetails(
  //   "0x732a28e50270da8f81bd679abeab6dd6c8da2936",
  //   deviceDetails.deviceURN[0],
  //   deviceDetails.selectedProject,
  //   deviceDetails.tokenURI.communicationProtocol,
  //   deviceDetails.tokenURI.dataProtocol,
  //   deviceDetails.tokenURI.deviceType,
  //   deviceDetails.tokenURI.sensor,
  // ).encodeABI()
  // };

  // transaction["gasLimit"] = 2000000;
  // web3.eth.accounts.signTransaction(transaction, "0xD493D7F8F82C24BBFC3FE0E0FB14F45BAA8EA421356DC2F7C2B1A9EF455AB8DF")
  //   .then(res => {
  //     web3.eth.sendSignedTransaction(res.rawTransaction)
  //       .on('receipt', function (receipt) {
  //         if (receipt.status == true) {
  //           dispatch({
  //             type: NEW_DEVICE_CREATED,
  //             payload: deviceDetails.number
  //           });
  //         }
  //       })
  //       .on('error', async function (error) {
  //         dispatch({
  //           type: GET_ERRORS,
  //           payload: error
  //         });
  //       })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: "Error Occured While Creating New Project."
  //     });
  //   });

  // batch req
  var batch = new web3.BatchRequest();
  checkTotalTokenSupply("0xa3917a671cfbfcf287694766e9afb428a5ffe593").then((totalSupply) => {
    let from = parseInt(totalSupply) + 1;
    let to = from + parseInt(deviceDetails.number) - 1;
    // console.log("From is", from);
    // console.log("To is", to);
    web3.eth.getTransactionCount("0x0Bd55A9A9cd352D501afa31Ec55ec1db1158c200").then((nonce) => {
      console.log("nonce", nonce, deviceDetails.deviceURN);
      var count = 0
      for (var i = from; i <= to; i++ , nonce++) {
        console.log(deviceDetails.deviceURN[count]);

        var transaction = {
          "nonce": nonce,
          "to": "0xa3917a671cfbfcf287694766e9afb428a5ffe593",
          "data": deviceContract.methods.MintWithDetails(
            "0x0Bd55A9A9cd352D501afa31Ec55ec1db1158c200",
            deviceDetails.deviceURN[count],
            deviceDetails.selectedProject,
            deviceDetails.tokenURI.communicationProtocol,
            deviceDetails.tokenURI.dataProtocol,
            deviceDetails.tokenURI.deviceType,
            deviceDetails.tokenURI.sensor,
          ).encodeABI()
        };
        // let gasLimit = await web3.eth.estimateGas(transaction);
        transaction["gasLimit"] = 4700000;
        web3.eth.accounts.signTransaction(transaction, "0xD493D7F8F82C24BBFC3FE0E0FB14F45BAA8EA421356DC2F7C2B1A9EF455AB8DF").then((result) => {
          // console.log("Adding", i, count, deviceDetails.deviceURN[count]);
          batch.add(web3.eth.sendSignedTransaction(result.rawTransaction).on('receipt', (receipt) => {
            // console.log(receipt);
            dispatch({
              type: NEW_DEVICE_CREATED,
              payload: 1
            });
          }));
        })
        count++;
      }
      batch.execute();
    })
  })
};

export const createNewThing = thingDetails => dispatch => {
  console.log(thingDetails);
  var batch = new web3.BatchRequest();
  checkTotalTokenSupply("0x7b5ca4a76fa90a157f72b8dee0ac7b09aff77c9f").then((totalSupply) => {
    let from = parseInt(totalSupply) + 1;
    let to = from + parseInt(thingDetails.quantity) - 1;
    console.log("From is", from);
    console.log("To is", to);
    web3.eth.getTransactionCount(address).then((nonce) => {
      console.log("nonce", nonce, uuidv1(),
        thingDetails.certificateURLs,
        thingDetails.ipfsHash,
        parseInt(thingDetails.quantity),
        thingDetails.thingBrand,
        thingDetails.thingDescription,
        thingDetails.thingName,
        thingDetails.thingStory,
        thingDetails.thingValue);
      var count = 0
      for (var i = from; i <= to; i++ , nonce++) {
        var transaction = {
          "nonce": nonce,
          "to": "0x7b5ca4a76fa90a157f72b8dee0ac7b09aff77c9f",
          "data": productContract.methods.MintWithDetails(
            address,
            uuidv1(),
            thingDetails.certificateURLs,
            thingDetails.ipfsHash,
            parseInt(thingDetails.quantity),
            thingDetails.thingBrand,
            thingDetails.thingDescription,
            thingDetails.thingName,
            thingDetails.thingStory,
            thingDetails.thingValue
          ).encodeABI()
        };
        // let gasLimit = await web3.eth.estimateGas(transaction);
        transaction["gasLimit"] = 4700000;
        web3.eth.accounts.signTransaction(transaction, privateKey).then((result) => {
          console.log("Adding", i, count);
          batch.add(web3.eth.sendSignedTransaction(result.rawTransaction).on('receipt', (receipt) => {
            // console.log(receipt);
            dispatch({
              type: NEW_THING_CREATED,
              payload: 1
            });
          }));
        })
        count++;
      }
      console.log(batch);
      batch.execute();
    })
  })
};

export const createNewNotification = notificationDetails => dispatch => {
  axios
    .post("/api/dashboard/createNewNotification", notificationDetails)
    .then(res => {
      dispatch({
        type: FETCH_NOTIFICATION,
        payload: res.data.notificationDetail
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const readNotification = notificationDetails => dispatch => {
  axios
    .post("/api/dashboard/createNewNotification", notificationDetails)
    .then(res => {
      dispatch({
        type: FETCH_NOTIFICATION,
        payload: res.data.notificationDetail
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const fetchNotifications = clientToken => dispatch => {
  axios
    .post("/api/dashboard/fetchNotifications", { clientToken: clientToken })
    .then(res => {
      dispatch({
        type: FETCH_NOTIFICATION,
        payload: res.data.notifications
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const fetchSubscription = () => dispatch => {
  axios.post("/api/dashboard/getSubscriptionInfo", {})
    .then(res => {
      let dateTime1 = new Date(Date.now());
      let dateTime2 = new Date(res.data.plan.endDate);
      let difference = dateTime2 - dateTime1;
      let daysLeft = Math.floor(difference / 8.64e7)
      dispatch({
        type: GET_SUBSCRIPTION,
        payload: {
          daysLeft: daysLeft,
          planType: res.data.plan.type
        }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
}


const checkTotalTokenSupply = (tokenAddress) => {
  return new Promise(function (resolve, reject) {
    productContract.methods.totalSupply().call((error, totalSupply) => {
      if (error)
        reject(error);
      console.log(totalSupply);
      resolve(totalSupply)
    });
  });
}
