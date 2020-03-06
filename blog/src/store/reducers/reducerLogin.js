import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';

const initialState = {
    token: null,
    userId: null,
    error:null,
    loading:null,
    user:null
}

const loginStart = (state) =>{
    return updateObject( state, { loading:true } );
}


const loginFail= (state) =>{
    return updateObject( state, { loading:false } );
    
}

const loginSuccess = (state,action) =>{
    
}

const logout = (state,action) =>{
    
}


const signUpStart = (state) =>{
    return updateObject( state, { loading:true } );

}


const signUpFail= (state) =>{
    return updateObject( state, { loading:false } );
   
}

const signUpSuccess = (state,action) =>{
   
    
}


export const googleAuthFail= (state,action) =>{
    console.log(action.error)
}

export const googleAuthSuccess = (state,action) =>{
    return updateObject( state, { user:action.user } );
}


const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.LOGIN_START: return loginStart(state,action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state,action);   
        case actionTypes.LOGIN_FAIL: return loginFail(state,action);  
        case actionTypes.LOGOUT: return logout(state,action);  
        case actionTypes.SIGN_UP_START: return signUpStart(state,action);  
        case actionTypes.SIGN_UP_SUCCESS: return signUpSuccess(state,action);  
        case actionTypes.SIGN_UP_FAIL: return signUpFail(state,action);  
        case actionTypes.GOOGLE_AUTH_SUCCESS: return googleAuthSuccess(state,action);  
        case actionTypes.GOOGLE_AUTH_FAIL: return googleAuthFail(state,action);  
        default: return state;

    }
};

export default reducer;