import * as actionTypes from './actionTypes';
import axios from 'axios';
import { auth, provider } from '../../utility/firebase';

export const updateEmailStart = () =>{
    return{
        type:actionTypes.UPDATE_EMAIL_START
    };
}

export const updateEmailFail = () =>{
    return{
        type:actionTypes.UPDATE_EMAIL_FAIL
    };
}

export const updateEmailSuccess = () =>{
    return{
        type:actionTypes.UPDATE_EMAIL_SUCCESS
    };
}

export const updateEmail = (email) =>{
    return dispatch =>{
        dispatch(updateEmailStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU';
        const authData ={
            idToken : localStorage.getItem("token"),
            email : email,
            returnSecureToken:true 
          }
        axios.post(url,authData)
        .then(response=>{
            //bisognerà vedere se impostare il refresh token come locale anche se non penso 
            //bisognerà impostare la nuova email
            //bisognerà impostare una nuova expire date
            console.log(response);
            localStorage.removeItem("email");
            localStorage.setItem('email', response.data.email);
            localStorage.removeItem("token");
            localStorage.setItem('token', response.data.idToken);
            dispatch(updateEmailSuccess());
        })
        .catch(error =>{
            dispatch(updateEmailFail());
        })
    }
}


export const updatePasswordStart = ()=>{
    return {
        type:actionTypes.UPDATE_PASSWORD_START
    }
}

export const updatePasswordSuccess = () =>{
    return{
        type:actionTypes.UPDATE_PASSWORD_SUCCESS
    }
}

export const updatePasswordFail = () =>{
    return{
        type:actionTypes.UPDATE_PASSWORD_FAIL
    }
}

export const updatePassword = (props)=>{
    return dispatch=>{
        dispatch(updatePasswordStart());
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU';
        const authData ={
            idToken : localStorage.getItem("token"),
            password : props,
            returnSecureToken:true 
        }
        axios.post(url,authData)
        .then((response)=>{
            console.log(response)
            localStorage.removeItem("token");
            localStorage.setItem('token', response.data.idToken);
            dispatch(updatePasswordSuccess())
        })
        .catch((error)=>{
            console.log(error)
            dispatch(updatePasswordFail())
        })
    }
}


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

export const login = (email, password, isSignup,errore) =>{
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
            localStorage.setItem('email', response.data.email);
            dispatch(loginSuccess(response.data.idToken, response.data.localId));
            // dispatch(checkLoginTimeout(response.data.expiresIn));
        })
        .catch( err =>{
            console.log(errore);
            dispatch(loginFail(errore)); 
            setTimeout(() =>{
            dispatch(logout());
            },  3000);
        });
    }; 
}


export const logout = () =>{

    return{
        type: actionTypes.LOGOUT
    };
    
}

export const setLoginRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_LOGIN_REDIRECT_PATH,
        path: path
    }

};



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

export const googleAuthSuccess = (user, token) =>{
    return{
        type:actionTypes.GOOGLE_AUTH_SUCCESS,
        user:user,
        token:token
        };
}


export const googleAuth = () =>{
    return dispatch => {
        dispatch(googleAuthStart());
        auth.signInWithPopup(provider)
         .then(res =>{ 
             dispatch(googleAuthSuccess(res.user, res.credential.accessToken))
           })
         .catch(error => { 
             dispatch(googleAuthFail(error));
         });
     }
}



