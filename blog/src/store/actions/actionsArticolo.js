import axios from '../../utility/axios';
import * as actionTypes from './actionTypes';


export const setArticoli = (articoli) =>{
    return{
        type: actionTypes.SET_ARTICOLI,
        articoli: articoli
    }
} 


export const initArticoli = () =>{

    return dispatch =>{
        const temparray = [];

        axios.get('/articoli.json')
        .then(response =>{   
          for(let key in response.data){
            temparray.push(key);
            
        };   
        
          dispatch(setArticoli(temparray));
        })
        .catch(error => {
           
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