// setAuthToken.js

import axios from 'axios';

export const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.post['Authorization'] = token;
    }
    else {
        delete axios.defaults.headers.post['Authorization'];
    }
}
