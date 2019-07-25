// userReducer.js

import {
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
  FETCH_NOTIFICATION,
  EDIT_PROFILE,
  GET_SUBSCRIPTION
} from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
  user: '',
  organization: '',
  projectCount: '',
  deviceCount: '',
  thingCount: '',
  userInfoLoader: true,
  projectModalOpen: false,
  deviceModalOpen: false,
  thingModalOpen: false,
  notificationList: [],
  projectList: [],
  subscription: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_INFO:
      return {
        ...state,
        user: action.payload.client,
        organization: action.payload.organization,
        projectCount: action.payload.projectCount,
        deviceCount: action.payload.deviceCount,
        thingCount: action.payload.thingCount,
        etherAddress:action.payload.etherAddress,
        userInfoLoader: false
      }
      break;
    case OPEN_PROJECT_MODAL:
      return {
        ...state,
        projectModalOpen: true
      }
      break;
    case CLOSE_PROJECT_MODAL:
      return {
        ...state,
        projectModalOpen: false
      }
      break;
    case OPEN_DEVICE_MODAL:
      return {
        ...state,
        deviceModalOpen: true
      }
      break;
    case CLOSE_DEVICE_MODAL:
      return {
        ...state,
        deviceModalOpen: false
      }
      break;
    case OPEN_THING_MODAL:
      return {
        ...state,
        thingModalOpen: true
      }
      break;
    case CLOSE_THING_MODAL:
      return {
        ...state,
        thingModalOpen: false
      }
      break;
    case NEW_PROJECT_CREATED:
      return {
        ...state,
        projectCount: state.projectCount + 1,
        projectModalOpen: false,
        notificationList: [...state.notificationList, "New Project Created. Contract Address is "+action.payload.tokenContractAddress]
      }
      break;
    case NEW_DEVICE_CREATED:
      return {
        ...state,
        deviceCount: state.deviceCount + parseInt(action.payload),
        deviceModalOpen: false,
        notificationList: [...state.notificationList, "New Device Created"]
      }
      break;
    case NEW_THING_CREATED:
      return {
        ...state,
        thingCount: state.thingCount + parseInt(action.payload),
        thingModalOpen: false,
        notificationList: [...state.notificationList, action.payload+ " new things created"]
      }
      break;
    case FETCH_NOTIFICATION:
      return {
        ...state,
        notificationList: action.payload
      }
      break;
    case EDIT_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          email:action.payload.email
        }
      }
    case GET_SUBSCRIPTION:
      return {
        ...state,
        subscription: {
          daysLeft: action.payload.daysLeft,
          planType: action.payload.planType
        }
      }
    default:
      return state;
  }
}
