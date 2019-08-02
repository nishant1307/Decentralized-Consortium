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
import registryContract from '../registryContract.js'
import { registryABI, registryAddress } from '../utils';
const address = localStorage.getItem("address");
const privateKey = sessionStorage.getItem('privateKey')
export const currentUserInfo = clientToken => dispatch => {
  productContract.methods._tokensOfOwner("0x0bd55a9a9cd352d501afa31ec55ec1db1158c200").call().then(productArray => {
    registryContract.methods.getMyProjects().call({
      from: "0x0bd55a9a9cd352d501afa31ec55ec1db1158c200"
    }).then(res => {
      let projectList = [];
      res.reverse().forEach((projectData, index) => {
        projectList[index] = ([
          projectData["projectID"],
          projectData["name"],
          projectData["description"],
          projectData["industry"],
          projectData["functionalRoles"]
        ])
      })
      console.log({ projectCount: projectList.length, thingCount: productArray.length, productList: productArray, projectList: projectList },"in");
      
      dispatch({
        type: CURRENT_USER_INFO,
        payload: { projectCount: projectList.length, thingCount: productArray.length, productList: productArray, projectList: projectList }
      });
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
    if (balance > 1000000000000000000) {
      var transaction = {
        "to": registryAddress,
        "data": registryContract.methods.addNewProject(
          "1",
          projectDetails.name,
          projectDetails.description,
          projectDetails.industry,
          projectDetails.functionalRoles
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
                    payload: projectDetails.name
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
  axios
    .post("/api/projects/mintNewToken", deviceDetails)
    .then(res => {
      if (res.data.status == true) {
        dispatch({
          type: NEW_DEVICE_CREATED,
          payload: deviceDetails.number
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { deviceError: { message: 'Error Occured While Creating New Device.' } }
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
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
