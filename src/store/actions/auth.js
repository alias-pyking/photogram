import * as actionTypes from './actionTypes';
import axios from '../../axios-insta';

export const authStart =() => {
    return {
        type: actionTypes.AUTH_START,
    }
};
export const authSuccess = (token, userId,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId:userId,
        username:username
    }
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error: error
    }
};
export const logoutStart = () => {
    return {
        type:actionTypes.LOGOUT_START,
    }
}
export const logoutSuccess = () => {
    return {
        type:actionTypes.LOGOUT_SUCCESS
    }
}
export const logoutFail = (error) =>{
    return {
        type:actionTypes.LOGOUT_FAIL,
        error:error
    }
}
export const auth = (username, email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        let authData = {
            'content-type':'application/json',
            "username":username,
            "email":email,
            "password":password
        }
        let authUrl = 'auth/register';
        if(!isSignUp) {
            authUrl = 'auth/login';
            authData = {
                "username":username,
                "password":password
            }
        }
        axios.post(authUrl,authData)
        .then((response) =>{
            const expiresIn = 10*60*60;
            const expirationDate = new Date(new Date().getTime() +expiresIn*1000 );
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('username',response.data.user.username);
            localStorage.setItem('expirationDate',expirationDate)
            dispatch(authSuccess(response.data.token, response.data.user.id, response.data.user.username));
            dispatch(checkAuthTimeout(expiresIn));
        })
        .catch((error) => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
}
export const setAuthRedirect  = path => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime*1000)
    }
}
export const authCheckState = () =>{
    console.log('authcheckstate[auth.js 98]');
    console.log(window.location)
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout())
            }

            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            dispatch(authSuccess(token, userId, username));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}