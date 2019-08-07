// authentication.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CURRENT_USER_INFO, GET_SUBSCRIPTION, FETCH_NOTIFICATION } from './types';
import { setAuthToken } from '../axiosConfig';
import jwt_decode from 'jwt-decode';
import { currentUserInfo, fetchNotifications, fetchSubscription } from './userActions';
import web3 from '../web3';
import registryContract from "registryContract";
export const registerUser = (user, history) => dispatch => {
    // axios.post('/api/users/userRegistration', user)
    //         .then(res => {
    //               if(res.data.status== "New User"){
    //                 history.push('/')
    //               }
    //         })
    //         .catch(err => {
    //             dispatch({
    //                 type: GET_ERRORS,
    //                 payload: {signupError:err.response.data}
    //             });
    //         });
}

export const loginUser = (user,history) => dispatch => {
    web3.eth.getBalance(user.address).then((balance) => {
        if (balance < 1000000000000000000) {
            axios.post('https://www.iotconekt.com/api/dashboard/getEther', { "address":user.address , "amount": 30000000000000000000 }).then(console.log).catch(console.log)
        }
    })
    dispatch(currentUserInfo(user.address));

    // registryContract.methods.isValidUser().call({
    //   from : user.address
    // }).then(res => {
    //   if(res){
        dispatch(setCurrentUser({publicKey: user.address}));
        history.push('/dashboard/home');
    //   }
    //   else {
    //     dispatch({
    //         type: GET_ERRORS,
    //         payload: {message: "No User Found"}
    //     });
    //   }
    // })

    //             dispatch(fetchSubscription());
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    sessionStorage.removeItem('privateKey');
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
