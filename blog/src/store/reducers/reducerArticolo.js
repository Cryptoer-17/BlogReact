import updateObject from '../../utility/updateObject';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articolo: null,
    articoli: [],
    loading:false
}




const postArticoloStart = ( state, action ) => {
    return updateObject( state, { loading:true } );
};

const postArticoloFail = ( state, action ) => {
    return updateObject( state, {  loading:false } );
};

const postArticoloSuccess = ( state, action ) => {
     let arrayArt = [...state.articoli];
     arrayArt.push(action.articolo);
    return updateObject( state, { loading: false, articoli: arrayArt } );
};


const reducer = (state = initialState, action) =>  {
    switch(action.type){
        case actionTypes.POST_ARTICOLO_START: return postArticoloStart( state, action);
        case actionTypes.POST_ARTICOLO_FAIL: return postArticoloFail( state, action);
        case actionTypes.POST_ARTICOLO_SUCCESS: return postArticoloSuccess( state, action);
        default: return state;
    }
}


export default reducer;
