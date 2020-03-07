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

export const checkLoginTimeout = (expirtationTime) =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logout());
        }, expirtationTime * 1000);
    };

}

export const login = (email, password, isSignup) =>{
    return dispatch =>{
        dispatch(loginStart());
        const authData ={
          email : email,
          password : password,
          returnSecureToken:true 
        }
        console.log(isSignup);
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU';
        }
        axios.post(url, authData)
        .then(response =>{
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(loginSuccess(response.data.idToken, response.data.localId));
            dispatch(checkLoginTimeout(response.data.expiresIn))
        })
        .catch( err =>{
            console.log("entrato");
            dispatch(loginFail(err.response.data.error));
        });
    }; 
}


export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.LOGOUT
    };
    
}


export const loginCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(loginSuccess(token, userId));
                dispatch(checkLoginTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            
        }
    }
};

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

export const googleAuthStart= () =>{
    return{
        type:actionTypes.GOOGLE_AUTH_START
    };
}

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
    return dispatch => {
        dispatch(googleAuthStart());
        auth.signInWithPopup(provider)
         .then(res =>{ 
             dispatch(googleAuthSuccess(res.user))
           })
         .catch(error => { 
             dispatch(signUpFail(error));
         });
     }
}