import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loginStart = () =>{

    return{
        type:actionTypes.LOGIN_START
    };
}


export const loginFail= (error) =>{
    return{
        type:actionTypes.LOGIN_FAIL,
        error:error
    };
}

export const loginSuccess = (token,userId) =>{
    return{
        type:actionTypes.LOGIN_SUCCESS,
          idToken: token,
          userId: userId
        };
    
}


export const login = (email, password) =>{
    return dispatch => {
        dispatch(loginStart());
        //login
        .then(res =>{ 
            dispatch(loginSuccess())
          })
        .catch(error => { 
            dispatch(loginFail(error));
        });
    }
}




export const logout = () =>{
    return{
        type: actionTypes.LOGOUT
    };
    
}


export const signUp = () =>{
    return{
        type: actionTypes.SIGN_UP
    };

}

