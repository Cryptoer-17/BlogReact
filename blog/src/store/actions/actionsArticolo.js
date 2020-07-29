import axios from '../../utility/axios';
import * as actionTypes from './actionTypes';

export const setArticoliSuccess = (articoli) =>{
    return{
        type: actionTypes.SET_ARTICOLI_SUCCESS,
        articoli: articoli
    }
} 

export const setArticoliStart = () =>{
    return {
        type : actionTypes.SET_ARTICOLI_START
    };
}

export const setArticoliFail = (error) =>{
    
    return{
        type : actionTypes.SET_ARTICOLI_FAIL,
        error : error
    }
}

export const initArticoli = () =>{
    return dispatch =>{
        const temparray = [];
        dispatch(setArticoliStart());
        const token = localStorage.getItem('token');
        let config = {
            headers: {
                authorization: 'Bearer '+ token,
            }
          }
        axios.get('http://localhost:4001/articoli',config)
        .then(response =>{   
          for(let key in response.data){
            temparray.push({articolo: response.data[key], key: key })
        };         
          dispatch(setArticoliSuccess(temparray));
        })
        .catch(err => { 
            dispatch(setArticoliFail(err.response.data.error));      
        });
    };
};




export const postArticoloSuccess = (articolo) =>{
    return{
        type: actionTypes.POST_ARTICOLO_SUCCESS,
        articolo:articolo
    };
};

export const postArticoloFail = (error) => {
    return{
        type:actionTypes.POST_ARTICOLO_FAIL,
        error:error
    };
}

export const postArticoloStart = () =>{
    return{
        type: actionTypes.POST_ARTICOLO_START
    };

};

export const postArticolo = (articolo) => {
    return dispatch => {
        dispatch(postArticoloStart());
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.post('http://localhost:4001/articolo/save', articolo,config)
        .then(res =>{ 
            dispatch(postArticoloSuccess(articolo))
          })
        .catch(error => { 
            dispatch(postArticoloFail(error));
        });
    }
}



export const startRicerca = (cerca) =>{
    return{
        type: actionTypes.START_RICERCA,
        cerca:cerca
    };

}


export const ricercaArticoli = ( filtro) =>{
    return{
        type: actionTypes.RICERCA_ARTICOLI,
        filtro:filtro
    };

}

export const updateArticoloSuccess = (articolo) =>{
    return{
        type: actionTypes.UPDATE_ARTICOLO_SUCCESS,
        articolo:articolo
    };
}

export const updateArticolo = (articolo,idArticolo) =>{
    return dispatch => {
        dispatch(postArticoloStart());
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.put('http://localhost:4001/articolo/update/'+idArticolo, articolo,config)
        .then(res =>{ 
            dispatch(updateArticoloSuccess(articolo))
          })
        .catch(error => { 
            dispatch(postArticoloFail(error));
        });
    }
}


export const deleteArticoloSuccess = (articolo) =>{
    return{
        type: actionTypes.DELETE_ARTICOLO_SUCCESS,
        articolo:articolo
    };
}


export const deleteArticolo = (articolo) =>{
    return dispatch => {
        dispatch(postArticoloStart());
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.delete('http://localhost:4001/articolo/delete/5f1e8d51bca4d542340477b0', articolo,config)
        .then(res =>{ 
            dispatch(deleteArticoloSuccess(articolo))
          })
        .catch(error => { 
            dispatch(postArticoloFail(error));
        });
    }
}