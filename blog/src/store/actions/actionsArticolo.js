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
        axios.get('/articoli.json')
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
        axios.post('/articoli.json', articolo)
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