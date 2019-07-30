// authentication.js

import axios from "axios";
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
import {setAuthToken} from '../axiosConfig';
import web3 from "../web3.js";

import {registryABI, registryAddress} from '../utils';
const registryContract = new web3.eth.Contract(registryABI, registryAddress);

export const currentUserInfo = clientToken => dispatch => {
  axios
    .post("/api/dashboard/getCounts", {})
    .then(res => {
      dispatch({
        type: CURRENT_USER_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
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
  web3.eth.accounts.signTransaction(transaction, "0xD493D7F8F82C24BBFC3FE0E0FB14F45BAA8EA421356DC2F7C2B1A9EF455AB8DF")
  .then(res => {
    web3.eth.sendSignedTransaction(res.rawTransaction)
    .on('confirmation', async function(confirmationNumber, receipt) {
        if (confirmationNumber == 1) {
          if (receipt.status == true) {
            dispatch({
              type: NEW_PROJECT_CREATED,
              payload: projectDetails.name
            });
          }
        }
      })
    .on('error', async function(error) {
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
  web3.eth.accounts.signTransaction(transaction, "0xD493D7F8F82C24BBFC3FE0E0FB14F45BAA8EA421356DC2F7C2B1A9EF455AB8DF")
  .then(res => {
    web3.eth.sendSignedTransaction(res.rawTransaction)
    .on('confirmation', async function(confirmationNumber, receipt) {
        if (confirmationNumber == 1) {
          if (receipt.status == true) {
            dispatch({
              type: NEW_PROJECT_CREATED,
              payload: locationDetails.name
            });
          }
        }
      })
    .on('error', async function(error) {
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
          payload:{deviceError:{ message:'Error Occured While Creating New Device.'}}
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
  axios
    .post("/api/dashboard/createThing", thingDetails)
    .then(res => {
      dispatch({
        type: NEW_THING_CREATED,
        payload: thingDetails.quantity
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: {thingError:{message:'Error Occured While Creating New Thing.'}}
      });
    });
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
    .post("/api/dashboard/fetchNotifications", {clientToken: clientToken})
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
      let difference = dateTime2- dateTime1;
      let daysLeft = Math.floor(difference/8.64e7)
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
