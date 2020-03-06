import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';

const initialState = {
    token: null,
    userId: null,
    error:null,
    loading:null
}

const loginStart = (state,action) =>{

}


const loginFail= (state,action) =>{
    
}

const loginSuccess = (state,action) =>{
    
}

const logout = (state,action) =>{
    
}

const signUp = (state,action) =>{

}

const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.LOGIN_START: return loginStart(state,action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state,action);   
        case actionTypes.LOGIN_FAIL: return loginFail(state,action);  
        case actionTypes.LOGOUT: return logout(state,action);  
        case actionTypes.SIGN_UP: return signUp(state,action);  
        default: return state;

    }
};

export default reducer;