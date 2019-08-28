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
  OPEN_DOC_MODAL,
  CLOSE_DOC_MODAL,
  FETCH_NOTIFICATION,
  EDIT_PROFILE,
  GET_SUBSCRIPTION,
  NEW_DOCUMENT_CREATED
} from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
  user: '',
  organization: '',
  docCount: 0,
  projectCount: 0,
  deviceCount: 0,
  thingCount: 0,
  partners: 0,
  apps: 0,
  people: 0,
  userInfoLoader: true,
  projectModalOpen: false,
  deviceModalOpen: false,
  thingModalOpen: false,
  docModalOpen: false,
  notificationList: [],
  projectList: [],
  productList: [],
  subscription: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_INFO:
      return {
        ...state,
        // user: action.payload.client,
        // organization: action.payload.organization,
        projectCount: action.payload.projectCount,
        deviceCount: action.payload.deviceCount,
        projectList: action.payload.projectList,
        thingCount: action.payload.thingCount,
        productList: action.payload.productList,
        docCount: action.payload.docCount,
        user: action.payload.userInfo,
        organization: action.payload.organizationInfo
        // etherAddress:action.payload.etherAddress,
        // userInfoLoader: false
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
    case OPEN_DOC_MODAL:
      return {
        ...state,
        docModalOpen: true
      }
      break;
    case CLOSE_DOC_MODAL:
      return {
        ...state,
        docModalOpen: false
      }
      break;
    case NEW_DOCUMENT_CREATED:
      return {
        ...state,
        docCount: parseInt(state.docCount) + 1,
      }
      break;
    case NEW_PROJECT_CREATED:
      return {
        ...state,
        projectCount: parseInt(state.projectCount) + 1,
        projectModalOpen: false,
        notificationList: [...state.notificationList, "New Project " + action.payload + " created"]
      }
      break;
    case NEW_DEVICE_CREATED:
      return {
        ...state,
        deviceCount: parseInt(state.deviceCount) + parseInt(action.payload),
        deviceModalOpen: false,
        notificationList: [...state.notificationList, "New Device Created"]
      }
      break;
    case NEW_THING_CREATED:
      return {
        ...state,
        thingCount: state.thingCount + parseInt(action.payload),
        thingModalOpen: false,
        notificationList: [...state.notificationList, action.payload + " new things created"]
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
          email: action.payload.email
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
