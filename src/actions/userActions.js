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
  NEW_DOCUMENT_CREATED,
  OPEN_PROJECT_MODAL,
  CLOSE_PROJECT_MODAL,
  OPEN_DEVICE_MODAL,
  CLOSE_DEVICE_MODAL,
  OPEN_THING_MODAL,
  CLOSE_THING_MODAL,
  OPEN_DOC_MODAL,
  CLOSE_DOC_MODAL,
  CREATE_NEW_NOTIFICATION,
  FETCH_NOTIFICATION,
  EDIT_PROFILE,
  GET_SUBSCRIPTION,
  DOCUMENT_UPDATED,
  ADD_DOCUMENT_REVIEWER,
  ADD_DOCUMENT_REVIEW
} from "./types";
import { setAuthToken } from '../axiosConfig';
import { productAddress, productContract } from '../productContract.js'
import { deviceContract, deviceAddress } from '../deviceContract.js'
import { docContract, docAddress } from '../DocContract';
import { registryABI, registryAddress, registryContract } from 'registryContract';
import { partnerAddress, partnerContract } from 'partnersContract';
import { creditABI, creditAddress, creditContract } from 'creditContract';
import { certificationABI, certificationAddress, certificationContract } from "certificationContract";
let address = localStorage.getItem("address");
let privateKey = '';
export const currentUserInfo = clientToken => dispatch => {
  // console.log(clientToken);

  docContract.methods.balanceOf(clientToken).call().then(docCount => {
    registryContract.methods.getUserOrganizationDetails().call({
      from: localStorage.getItem("address")
    }).then(userOrgDetails => {
      productContract.methods._tokensOfOwner(clientToken).call().then(productArray => {
        // console.log(clientToken);
        deviceContract.methods.balanceOf(clientToken).call().then(deviceCount => {
          registryContract.methods.getMyProjectsCount().call({
            from: clientToken
          }).then(res => {
            dispatch({
              type: CURRENT_USER_INFO,
              payload: {
                projectCount: res,
                thingCount: productArray.length,
                productList: productArray,
                docCount: docCount,
                userInfo: userOrgDetails[0],
                organizationInfo: userOrgDetails[1],
                deviceCount: deviceCount
              }
            });
          })
        })
      })
    })
  })
};

export const fetchUserSubscriptionInfo = () => dispatch => {
  // creditContract.methods.getMyCredits().call({
  //   from: localStorage.getItem("address")
  // }).then(res => {
  //   dispatch({
  //     type: "USER_SUBSCRIPTION_INFO",
  //     payload: {
  //       credits: res.credits,
  //       startDate: res.startDate,
  //       endDate: res.endDate
  //     }
  //   });
  // }).catch(error => {
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: error
  //   });
  // })
}
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

export const openDocModal = () => dispatch => {
  dispatch({
    type: OPEN_DOC_MODAL,
    payload: ""
  });
};

export const closeDocModal = () => dispatch => {
  dispatch({
    type: CLOSE_DOC_MODAL,
    payload: ""
  });
};

export const createNewProject = projectDetails => async (dispatch) => {
  privateKey = await sessionStorage.getItem('privateKey');
  web3.eth.getBalance(address).then(async (balance) => {
    // console.log(balance);
    if (balance > 1000000000000000000) {
      var transaction = {
        "to": registryAddress,
        "data": registryContract.methods.addNewProject(
          // web3.utils.randomHex(32),
          web3.utils.toHex(projectDetails.name),
          projectDetails.name,
          projectDetails.description,
          projectDetails.industry,
          projectDetails.partnerRole.toString(),
          // web3.utils.utf8ToHex(projectDetails.passcode)
        ).encodeABI()
      };

      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          console.log(res);
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              // console.log(receipt);
              if (receipt.status == true) {
                dispatch({
                  type: NEW_PROJECT_CREATED,
                  payload: projectDetails.name
                });
              }
            })
            .on('error', async function (error) {
              // console.log(error);
              dispatch({
                type: GET_ERRORS,
                payload: error
              });
            })
        })
        .catch(err => {
          // console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: "Error Occured While Creating New Project."
          });
        });
    }
    else {
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

export const inviteUserToConsortium = invitationDetails => async (dispatch) => {
  // console.log("Here");
  privateKey = await sessionStorage.getItem('privateKey');
  web3.eth.getBalance(address).then((balance) => {
    // console.log(balance);
    if (balance > 1000000000000000000) {
      var transaction = {
        "to": partnerAddress,
        "data": partnerContract.methods.invitedOrganizationForPartnership(
          invitationDetails.partnerOrganizationID,
          invitationDetails.projectID,
          // invitationDetails.inviteAddress,
          invitationDetails.partnerRole
        ).encodeABI()
      };

      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              // console.log(receipt);
              if (receipt.status == true) {
                // dispatch({
                //   type: NEW_PROJECT_CREATED,
                //   payload: projectDetails.name
                // });
              }
            })
            .on('error', async function (error) {
              // console.log(error);
              dispatch({
                type: GET_ERRORS,
                payload: error
              });
            })
        })
        .catch(err => {
          // console.log(err);
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

export const joinProjectRequest = invitationDetails => async (dispatch) => {
  // console.log("Here");
  privateKey = await sessionStorage.getItem('privateKey');
  web3.eth.getBalance(address).then((balance) => {
    // console.log(balance);
    if (balance > 1000000000000000000) {
      var transaction = {
        "to": registryAddress,
        "data": registryContract.methods.requestProjectInvite(
          web3.utils.utf8ToHex(projectDetails.projectPasscode),
          invitationDetails.projectID
        ).encodeABI()
      };

      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              // console.log(receipt);
              if (receipt.status == true) {
                // dispatch({
                //   type: NEW_PROJECT_CREATED,
                //   payload: projectDetails.name
                // });
              }
            })
            .on('error', async function (error) {
              // console.log(error);
              dispatch({
                type: GET_ERRORS,
                payload: error
              });
            })
        })
        .catch(err => {
          // console.log(err);
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

export const addReview = (tokenId, remark) => async dispatch => {
  privateKey = await sessionStorage.getItem('privateKey');
  var transaction = {
    "to": docAddress,
    "data": docContract.methods.addReview(
      tokenId,
      remark === true ? 2 : 3,
    ).encodeABI()
  };
  // web3.eth.estimateGas(transaction).then(gasLimit => {
  transaction["gasLimit"] = 4700000;
  web3.eth.accounts.signTransaction(transaction, privateKey)
    .then(res => {
      web3.eth.sendSignedTransaction(res.rawTransaction)
        .on('receipt', async function (receipt) {
          // console.log(receipt);
          if (receipt.status == true) {
            dispatch({
              type: ADD_DOCUMENT_REVIEW,
              payload: ""
            });
            window.location.reload();
          }
        })
        .on('error', async function (error) {
          // console.log(error);
          dispatch({
            type: GET_ERRORS,
            payload: "Error Occured While Adding Review."
          });
        })
    })
    .catch(err => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: "Error Occured While Adding Review."
      });
    });
}

export const updateDoc = (docDetails, tokenId, remark) => async dispatch => {
  // console.log("inside", docDetails, tokenId);
  privateKey = await sessionStorage.getItem('privateKey');
  web3.eth.getBalance(address).then((balance) => {
    // console.log(balance);
    if (balance > 1000000000000000000) {
      var transaction = {
        "to": docAddress,
        "data": docContract.methods.updateDetails(
          tokenId,
          remark,
          docDetails
        ).encodeABI()
      };
      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              // console.log(receipt);
              if (receipt.status == true) {
                dispatch({
                  type: DOCUMENT_UPDATED,
                  payload: ""
                });
              }
            })
            .on('error', async function (error) {
              // console.log(error);
              dispatch({
                type: GET_ERRORS,
                payload: error
              });
            })
        })
        .catch(err => {
          // console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: "Error Occured While Creating New Document."
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

export const addNewDoc = docDetails => async dispatch => {
  // console.log(docDetails, "docDetails");
  privateKey = await sessionStorage.getItem('privateKey');
  let uuid = web3.utils.randomHex(32);  //uuidv1();
  web3.eth.getBalance(address).then((balance) => {
    // console.log(balance);
    if (balance > 1000000000000000000) {
      var transaction = {
        "to": docAddress,
      };

      if (docDetails.projectID !== null) {
        transaction["data"] = docContract.methods.MintWithDetailsAndProjectId(
          address,
          uuid,
          docDetails.encryptData,
          docDetails.encryptedPassword,
          docDetails.projectID
        ).encodeABI()
      } else {
        transaction["data"] = docContract.methods.MintWithDetails(
          address,
          uuid,
          docDetails.encryptData,
          docDetails.encryptedPassword
        ).encodeABI()
      }
      // web3.eth.estimateGas(transaction).then(gasLimit => {
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              // console.log(receipt);
              if (receipt.status == true) {
                if (docDetails.projectID !== undefined) {
                  var transaction = {
                    "to": docAddress,
                    "data": docContract.methods.setProjectId(
                      uuid,
                      docDetails.projectID
                    ).encodeABI()
                  };
                  // web3.eth.estimateGas(transaction).then(gasLimit => {
                  transaction["gasLimit"] = 4700000;
                  web3.eth.accounts.signTransaction(transaction, privateKey)
                    .then(res => {
                      web3.eth.sendSignedTransaction(res.rawTransaction)
                        .on('receipt', async function (receipt1) {
                          // console.log(receipt1);
                          if (receipt.status == true) {
                            // console.log(receipt1,"receipt1");

                            // dispatch({
                            //   type: NEW_DOCUMENT_CREATED,
                            //   payload: ""
                            // });
                          }
                        })
                        .on('error', async function (error) {
                          // console.log(error);
                          dispatch({
                            type: GET_ERRORS,
                            payload: error
                          });
                        })
                    })
                } else {
                  dispatch({
                    type: NEW_DOCUMENT_CREATED,
                    payload: ""
                  });
                }
              }
            })
            .on('error', async function (error) {
              // console.log(error);
              dispatch({
                type: GET_ERRORS,
                payload: error
              });
            })
        })
        .catch(err => {
          // console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: "Error Occured While Creating New Document."
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

export const addDocumentReviewer = (tokenId, addressList) => async dispatch => {
  // console.log(tokenId, addressList, "here");
  // privateKey = await sessionStorage.getItem('privateKey');
  // var batch = new web3.BatchRequest();
  // web3.eth.getTransactionCount(address).then(async (nonce) => {
  //   for (var i = 0; i < addressList.length; i++ , nonce++) {
  //     let _address = await web3.utils.toChecksumAddress(addressList[i]);
  //     var transaction = {
  //       "nonce": nonce,
  //       "to": docContract,
  //       "data": docContract.methods.addReviewers(
  //         tokenId,
  //         _address
  //       ).encodeABI()
  //     };
  //     transaction["gasLimit"] = 4700000;
  //     web3.eth.accounts.signTransaction(transaction, privateKey)
  //       .then((result) => {
  //         batch.add(web3.eth.sendSignedTransaction(result.rawTransaction)
  //           .once('receipt', (receipt) => {
  //             console.log(receipt);
  //           }).on('error', async function (error) {
  //             dispatch({
  //               type: GET_ERRORS,
  //               payload: { message: "Error occured! Please try again later." }
  //             });
  //             setTimeout(() => {
  //               dispatch({
  //                 type: GET_ERRORS,
  //                 payload: {}
  //               });
  //             }, 10000)
  //           })
  //         );
  //       })
  //   }
  //   batch.execute();
  // })
}

export const createNewDevice = deviceDetails => async (dispatch) => {
  privateKey = await sessionStorage.getItem('privateKey');
  // console.log(deviceDetails.projectId);
  var batch = new web3.BatchRequest();
  deviceContract.methods.totalSupply().call().then((totalSupply) => {
    // console.log("Current", totalSupply);
    let from = parseInt(totalSupply) + 1;
    let to = from + parseInt(deviceDetails.number) - 1;
    // console.log("From is", from);
    // console.log("To is", to);
    web3.eth.getTransactionCount(address).then((nonce) => {
      // console.log("nonce", nonce, deviceDetails.deviceURN);
      var count = 0
      for (var i = from; i <= to; i++ , nonce++) {
        // console.log(deviceDetails.deviceURN[count]);

        var transaction = {
          "nonce": nonce,
          "to": deviceAddress,

        };

        if (deviceDetails.projectId !== undefined) {
          transaction["data"] = deviceContract.methods.MintWithDetailsAndProjectId(
            address,
            deviceDetails.deviceURN[count],
            // deviceDetails.selectedProject,
            deviceDetails.communicationProtocol,
            deviceDetails.dataProtocol,
            deviceDetails.deviceType,
            deviceDetails.sensor,
            deviceDetails.projectId
          ).encodeABI()
        } else {
          transaction["data"] = deviceContract.methods.MintWithDetails(
            address,
            deviceDetails.deviceURN[count],
            // deviceDetails.selectedProject,
            deviceDetails.communicationProtocol,
            deviceDetails.dataProtocol,
            deviceDetails.deviceType,
            deviceDetails.sensor
          ).encodeABI()
        }
        // let gasLimit = await web3.eth.estimateGas(transaction);
        transaction["gasLimit"] = 4700000;
        web3.eth.accounts.signTransaction(transaction, privateKey)
          .then((result) => {
            // console.log("Adding", i, count, deviceDetails.deviceURN[count]);
            batch.add(web3.eth.sendSignedTransaction(result.rawTransaction)
              .once('receipt', (receipt) => {
                console.log(receipt);
                dispatch({
                  type: NEW_DEVICE_CREATED,
                  payload: 1
                });
              }).on('error', async function (error) {
                console.log(error, "Device error");
                dispatch({
                  type: GET_ERRORS,
                  payload: { message: "Error occured! Please try again later." }
                });
                setTimeout(() => {
                  dispatch({
                    type: GET_ERRORS,
                    payload: {}
                  });
                }, 10000)
              })
            );
          })
        count++;
      }
      batch.execute();
    })
  })
};

export const createNewThing = thingDetails => async (dispatch) => {
  privateKey = await sessionStorage.getItem('privateKey');
  // console.log(thingDetails.projectId);
  var batch = new web3.BatchRequest();
  productContract.methods.totalSupply().call().then((totalSupply) => {
    let from = parseInt(totalSupply) + 1;
    let to = from + parseInt(thingDetails.quantity) - 1;
    // console.log("From is", from);
    // console.log("To is", to);
    web3.eth.getTransactionCount(address).then((nonce) => {
      // console.log("nonce", nonce, uuidv1(),
      //   thingDetails.certificateURLs,
      //   thingDetails.ipfsHash,
      //   // parseInt(thingDetails.quantity),
      //   thingDetails.thingBrand,
      //   thingDetails.thingDescription,
      //   thingDetails.thingName,
      //   thingDetails.thingStory,
      //   thingDetails.thingValue);
      var count = 0
      for (var i = from; i <= to; i++ , nonce++) {
        var transaction = {
          "nonce": nonce,
          "to": productAddress,
        };
        console.log(thingDetails.projectId !== undefined, thingDetails.projectId)
        if (thingDetails.projectId !== undefined) {
          transaction["data"] = productContract.methods.MintWithDetailsAndProjectId(
            address,
            uuidv1(),
            thingDetails.certificateURLs,
            thingDetails.ipfsHash,
            // parseInt(thingDetails.quantity),
            thingDetails.thingBrand,
            thingDetails.thingDescription,
            thingDetails.thingName,
            thingDetails.thingStory,
            thingDetails.thingValue,
            thingDetails.projectId
          ).encodeABI()
        } else {
          transaction["data"] = productContract.methods.MintWithDetails(
            address,
            uuidv1(),
            thingDetails.certificateURLs,
            thingDetails.ipfsHash,
            // parseInt(thingDetails.quantity),
            thingDetails.thingBrand,
            thingDetails.thingDescription,
            thingDetails.thingName,
            thingDetails.thingStory,
            thingDetails.thingValue
          ).encodeABI()
        }
        // let gasLimit = await web3.eth.estimateGas(transaction);
        transaction["gasLimit"] = 4700000;
        web3.eth.accounts.signTransaction(transaction, privateKey).then((result) => {
          // console.log("Adding", i, count);
          batch.add(web3.eth.sendSignedTransaction(result.rawTransaction).on('receipt', (receipt) => {
            // console.log(receipt);
            dispatch({
              type: NEW_THING_CREATED,
              payload: 1
            });
          }).on('error', async function (error) {
            // console.log(error, "err");
            dispatch({
              type: GET_ERRORS,
              payload: { message: "Error occured! Please try again later." }
            });
            setTimeout(() => {
              dispatch({
                type: GET_ERRORS,
                payload: {}
              });
            }, 10000)
          }));
        })
        count++;
      }
      // console.log(batch);
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

export const submitNewClaim = claimDetails => async (dispatch) => {
  // console.log(claimDetails.length);
  privateKey = await sessionStorage.getItem('privateKey');
  var batch = new web3.BatchRequest();
  web3.eth.getTransactionCount(address).then((nonce) => {
    for (var i = 0; i < claimDetails.length; i++ , nonce++) {
      // console.log(claimDetails[i]);
      var transaction = {
        "nonce": nonce,
        "to": certificationAddress,
        "data": certificationContract.methods.addClaim(
          claimDetails[i].name,
          uuidv1()
        ).encodeABI()
      };
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then((result) => {
          batch.add(web3.eth.sendSignedTransaction(result.rawTransaction)
            .once('receipt', (receipt) => {
              // console.log(receipt);
              // dispatch({
              //   type: NEW_DEVICE_CREATED,
              //   payload: 1
              // });
            }));
        })
    }
    batch.execute();
  })
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
      // console.log(totalSupply);
      resolve(totalSupply)
    });
  });
}
