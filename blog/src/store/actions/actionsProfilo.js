import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';


export const getProfiloSuccess = (profilo)=>{
    return{
        type: actionTypes.GET_PROFILO_SUCCESS,
        profilo: profilo
    }
} 


export const getProfiloStart = () =>{
    return {
        type : actionTypes.GET_PROFILO_START
    };
}

export const getProfiloFail = (error) =>{
    
    return{
        type : actionTypes.GET_PROFILO_FAIL,
        error : error
    }
}


export const getProfili = (userId) =>{
    
    return dispatch =>{
        let temparray = [];
        dispatch(getProfiloStart());
        const token = localStorage.getItem('token');
        axios.get('/profili.json?auth=' +token)
        .then(response =>{   
          for(let key in response.data){
            if(response.data[key].userId === localStorage.getItem("userId"))
            temparray ={
                nome: response.data[key].nome,
                cognome:response.data[key].cognome,
                dataNascita: response.data[key].dataNascita,
                sesso:response.data[key].sesso,
                numeroTelefono:response.data[key].numeroTelefono,
                nazionalità: response.data[key].nazionalità,
                img:response.data[key].img
            }
        };         
          dispatch(getProfiloSuccess(temparray));
        })
        .catch(err => { 
            dispatch(getProfiloFail(err.response.data.error));      
        });
       
    };
};



export const setUsername = (username) =>{
    const token = localStorage.getItem('token');
       let profilo = null;
       let id = "";

    return dispatch =>{
        
       dispatch(sendDataStart())
        axios.get('/profili.json?auth=' +token)
        .then(response =>{   
          for(let key in response.data){
            if(response.data[key].userId === localStorage.getItem("userId"))
           profilo ={
               ...response.data[key],
               username:username
            }
            id = key;
        }; localStorage.setItem("username",username);
         axios.put('profili/'+ id + '.json?auth='+token,profilo).then(res =>  
            dispatch(sendDataSuccess(profilo))
            ).catch( err => dispatch(sendDataFail(err), console.log(err)) );  });      
       
                 
        }     

}


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
    axios.post('/profili.json?auth=' + localStorage.getItem("token"), dati)
    .then(res =>{ 
        dispatch(sendDataSuccess(dati))
      })
    .catch(error => { 
        dispatch(sendDataFail(error));
    });
    }
};

