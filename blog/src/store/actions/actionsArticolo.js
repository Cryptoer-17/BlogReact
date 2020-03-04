import axios from '../../utility/axios';
import * as actionTypes from './actionTypes';


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
        .then(res =>{ console.log(res)
            dispatch(postArticoloSuccess(articolo))
          })
        .catch(error => { 
            console.log(error)
            dispatch(postArticoloFail(error));
        });
    }
}