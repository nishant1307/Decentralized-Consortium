// authentication.js

// import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CURRENT_USER_INFO, GET_SUBSCRIPTION, FETCH_NOTIFICATION } from './types';
import { setAuthToken } from '../axiosConfig';
// import jwt_decode from 'jwt-decode';
import { currentUserInfo} from './userActions';
// import web3 from '../web3';
import { registryContract } from "registryContract";
// export const registerUser = (user, history) => dispatch => {
//     // axios.post('/api/users/userRegistration', user)
//     //         .then(res => {
//     //               if(res.data.status== "New User"){
//     //                 history.push('/')
//     //               }
//     //         })
//     //         .catch(err => {
//     //             dispatch({
//     //                 type: GET_ERRORS,
//     //                 payload: {signupError:err.response.data}
//     //             });
//     //         });
// }

export const loginUser = (user, history) => dispatch => {
    // web3.eth.getBalance(user.address).then((balance) => {
    //     if (balance < 1000000000000000000) {
    //         axios.post('https://www.iotconekt.com/api/dashboard/getEther', { "address":user.address , "amount": 30000000000000000000 }).then(console.log).catch(console.log)
    //     }
    // })
    dispatch(currentUserInfo(user.address));
    registryContract.methods.getUserOrganizationDetails().call({
        from: user.address
    }).then(res => {
      if(res[0]&& res[1]){
        if (res[0].status === '1' && res[1].status === '1') {
            dispatch(setCurrentUser({ publicKey: user.address }));
            history.push('/dashboard/home');
        }
        else if (res[1].status !== '1') {
            dispatch({
                type: GET_ERRORS,
                payload: { message: "Your Organization KYC Verification Is In Pending State. Please Wait For 24 Hours." }
            });
        }
        else if (res[0].status !== '1') {
            dispatch({
                type: GET_ERRORS,
                payload: { message: "Your KYC Verification Is In Pending State. Please Wait For 24 Hours." }
            });
        }
        else {
            dispatch({
                type: GET_ERRORS,
                payload: { message: "KYC Verification Is Not Initiated" }
            });
            history.push('/register');
        }
      }
    })
        .catch((err) => {
            history.push('/register');
        })
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
    history.push('/');
}
