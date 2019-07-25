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
  CREATE_NEW_NOTIFICATION,
  FETCH_NOTIFICATION,
  EDIT_PROFILE,
  GET_SUBSCRIPTION
} from "./types";
import {setAuthToken} from '../axiosConfig';
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

export const createNewProject = projectDetails => dispatch => {
  axios
    .post("/api/dashboard/createProject", projectDetails)
    .then(res => {
      dispatch({
        type: NEW_PROJECT_CREATED,
        payload: res.data.project
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: {projectError:{ message:"Error Occured While Creating New Project."}}
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
