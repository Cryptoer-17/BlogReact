import axios from '../../utility/axios';

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
        dispatch(purchaseBurgerStart());
        axios.post('/articoli.json', articolo)
        .then(res =>{ 
            dispatch(purchaseBurgerSuccess(articolo))
          })
        .catch(error => { 
            dispatch(purchaseBurgerFail(error));
        });
    }
}