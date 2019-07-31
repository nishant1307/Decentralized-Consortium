// authentication.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CURRENT_USER_INFO, GET_SUBSCRIPTION, FETCH_NOTIFICATION } from './types';
import {setAuthToken} from '../axiosConfig';
import jwt_decode from 'jwt-decode';
import {currentUserInfo, fetchNotifications, fetchSubscription} from './userActions';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/userRegistration', user)
            .then(res => {
                  if(res.data.status== "New User"){
                    history.push('/')
                  }
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: {signupError:err.response.data}
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/userLogin', user)
            .then(res => {
                const { clientToken } = res.data;
                sessionStorage.setItem("clientToken", clientToken);
                setAuthToken(clientToken);
                const decoded = jwt_decode(clientToken);
                dispatch(currentUserInfo(clientToken));
                dispatch(setCurrentUser(decoded));
                dispatch(fetchSubscription());
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload:{loginError:err.response.data}
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    sessionStorage.removeItem('clientToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    dispatch({
      type: CURRENT_USER_INFO,
      payload: {}
    });
    dispatch({
      type: FETCH_NOTIFICATION,
      payload: []
    });
    dispatch({
      type: GET_SUBSCRIPTION,
      payload: {}
    });
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
    history.push('/login');
}
