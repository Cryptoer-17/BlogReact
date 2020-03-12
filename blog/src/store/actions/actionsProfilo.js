import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';





export const sendDataSuccess = (dati) =>{
    return{
        type: actionTypes.SEND_DATA_SUCCESS,
        dati: dati
    }
} 

export const sendDataStart = () =>{
    return {
        type : actionTypes.SEND_DATA_START
    };
}

export const sendDataFail = (error) =>{
    
    return{
        type : actionTypes.SEND_DATA_FAIL,
        error : error
    }
}


 export const sendData = (dati) =>{
     console.log(dati);
   return dispatch => {
    dispatch(sendDataStart());
    axios.post('/persona.json?auth=' + localStorage.getItem("token"), dati)
    .then(res =>{ 
        dispatch(sendDataSuccess(dati))
      })
    .catch(error => { 
        dispatch(sendDataFail(error));
    });
    }
};
