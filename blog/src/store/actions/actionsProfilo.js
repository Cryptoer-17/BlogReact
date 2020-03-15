import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';


export const getProfiliSuccess = (profili)=>{
    return{
        type: actionTypes.GET_PROFILI_SUCCESS,
        profili: profili
    }
} 


export const getProfiliStart = () =>{
    return {
        type : actionTypes.GET_PROFILI_START
    };
}

export const getProfiliFail = (error) =>{
    
    return{
        type : actionTypes.GET_PROFILI_FAIL,
        error : error
    }
}


export const getProfili = () =>{
    
    return dispatch =>{
        let temparray = [];
        dispatch(getProfiliStart());
        const token = localStorage.getItem('token');
        axios.get('/profili.json?auth=' +token)
        .then(response =>{   
            for(let key in response.data){
                temparray.push({profili: response.data[key], key: key })
            };     
          dispatch(getProfiliSuccess(temparray));
        })
        .catch(err => { 
            dispatch(getProfiliFail(err.response.data.error));      
        });
       
    };
};



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
   return dispatch => {
    dispatch(sendDataStart());
    console.log(dati);
   /* axios.post('/profili.json?auth=' + localStorage.getItem("token"), dati)
    .then(res =>{ 
        dispatch(sendDataSuccess(dati))
      })
    .catch(error => { 
        dispatch(sendDataFail(error));
    });*/
    }
};

