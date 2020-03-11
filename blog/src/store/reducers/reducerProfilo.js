import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';


const initialState = {
    dati: [],
    loading:false,
    esitoCaricamento:"",
    error : null
}






const sendDataStart = ( state ) => {
    return updateObject( state, { loading:true } );
};

const sendDataFail = ( state) => {
    return updateObject( state, {  loading:false , esitoCaricamento: "Errore nell'invio dei dati."} );
};

const sendDataSuccess = ( state, action ) => {
     let arrayArt = [...state.dati];
     arrayArt.push(action.dati);
    return updateObject( state, { loading: false, dati: arrayArt, esitoCaricamento: "Il post è stato caricato con successo." } );
};





const reducer = (state = initialState, action) =>  {
    switch(action.type){
        case actionTypes.SEND_DATA_START: return sendDataStart( state, action);
        case actionTypes.SEND_DATA_FAIL: return sendDataFail( state, action);
        case actionTypes.SEND_DATA_SUCCESS: return sendDataSuccess( state, action);
        default: return state;
    }
}


export default reducer;