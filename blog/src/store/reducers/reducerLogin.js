import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';
import { auth } from '../../utility/firebase';

const initialState = {
    token: null,
    userId: null,
    error:null,
    loading:false,
    user:null,
    loginRedirectPath: '/' 
}

const loginStart = (state) =>{
    return updateObject( state, {error: null,  loading : true} );
}


const loginFail= (state, action) =>{
    return updateObject( state, { error : action.error, loading:false } );
    
}

const loginSuccess = (state,action) =>{
    return updateObject (state , {
        token : action.idToken,
        userId: action.userId,
        error : null,
        loading : false
    } );
}

const logout = (state,action) =>{
    
    auth.signOut(); 
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationDate");
    window.location.reload();
 
    return updateObject( state, initialState );

}

const setLoginRedirectPath = (state, action) =>{
    return updateObject(state , {loginRedirectPath : action.path})

}

export const googleAuthStart= (state,action) =>{
    return updateObject( state, { loading:true } );
}


export const googleAuthFail= (state,action) =>{
    console.log(action.error);
    return updateObject( state, { loading:false } );
}

export const googleAuthSuccess = (state,action) =>{
    localStorage.setItem("user", JSON.stringify(action.user));
    localStorage.setItem("userId", action.user.uid );
    localStorage.setItem("token", action.token );
    return updateObject( state, { user:action.user, userId: action.user.uid, token : action.token, loading:false } );
}


const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.LOGIN_START: return loginStart(state,action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state,action);   
        case actionTypes.LOGIN_FAIL: return loginFail(state,action);  
        case actionTypes.LOGOUT: return logout(state,action);   
        case actionTypes.SET_LOGIN_REDIRECT_PATH : return setLoginRedirectPath(state,action);

        case actionTypes.GOOGLE_AUTH_START: return googleAuthStart(state,action);
        case actionTypes.GOOGLE_AUTH_SUCCESS: return googleAuthSuccess(state,action);  
        case actionTypes.GOOGLE_AUTH_FAIL: return googleAuthFail(state,action);  
        default: return state;

    }
};

export default reducer;