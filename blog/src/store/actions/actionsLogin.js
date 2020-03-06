import * as actionTypes from './actionTypes';
import axios from 'axios';
import { auth, provider } from '../../utility/firebase';

//login
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
     /*   .then(res =>{ 
            dispatch(loginSuccess())
          })
        .catch(error => { 
            dispatch(loginFail(error));
        });*/
    }  
}


export const logout = () =>{
    return{
        type: actionTypes.LOGOUT
    };
    
}


//registrazione


export const signUpStart = () =>{

    return{
        type:actionTypes.SIGN_UP_START
    };
}


export const signUpFail= (error) =>{
    return{
        type:actionTypes.SIGN_UP_FAIL,
        error:error
    };
}

export const signUpSuccess = () =>{
    return{
        type:actionTypes.SIGN_UP_SUCCESS
        };
    
}

export const signUp = (email, password) =>{
   /*  return dispatch => {
       dispatch(signUpStart());
        
        .then(res =>{ 
            dispatch(signUpSuccess())
          })
        .catch(error => { 
            dispatch(signUpFail(error));
        });
    }*/

}


//google

export const googleAuthFail= (error) =>{
    return{
        type:actionTypes.GOOGLE_AUTH_FAIL,
        error:error
    };
}

export const googleAuthSuccess = (user) =>{
    return{
        type:actionTypes.GOOGLE_AUTH_SUCCESS,
        user:user
        };
}


export const googleAuth = () =>{
    return dispatch => {auth.signInWithPopup(provider)
         .then(res =>{ 
             dispatch(googleAuthSuccess(res.user))
           })
         .catch(error => { 
             dispatch(signUpFail(error));
         });
     }
}