import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';


const initialState = {
    dati: [],
    loading:null,
    esitoCaricamento:"",
    error : null,
    profili:[]
}






const sendDataStart = ( state ) => {
    console.log("entrato");
    return updateObject( state, { loading:true } );
};

const sendDataFail = ( state) => {
    return updateObject( state, {  loading:false , esitoCaricamento: "Errore nell'invio dei dati."} );
};

const sendDataSuccess = ( state, action ) => {
     let arrayArt = [...state.dati];
     arrayArt.push(action.dati);
    return updateObject( state, { loading: false, dati: arrayArt, esitoCaricamento: "I dati sono stati inviati/modificati con successo." } );
};


const getProfiliStart = (state, action) =>{
    return updateObject(state , {error:null, loading : true});

}

const getProfiliSuccess = (state, action ) =>{
    return updateObject(state , {profili : action.profili, error:null, loading : false});
}

const getProfiliFail = (state , action) =>{
    return updateObject( state, {error : action.error, loading: false});
}


const reducer = (state = initialState, action) =>  {
    switch(action.type){
        case actionTypes.SEND_DATA_START: return sendDataStart( state, action);
        case actionTypes.SEND_DATA_FAIL: return sendDataFail( state, action);
        case actionTypes.SEND_DATA_SUCCESS: return sendDataSuccess( state, action);
        case actionTypes.GET_PROFILI_SUCCESS : return getProfiliSuccess(state,action);
        case actionTypes.GET_PROFILI_START : return getProfiliStart(state,action);
        case actionTypes.GET_PROFILI_FAIL : return getProfiliFail(state, action);
        default: return state;
    }
}


export default reducer;