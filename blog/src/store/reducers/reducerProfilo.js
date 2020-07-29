import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';


const initialState = {
    dati: [],
    loading:false,
    esitoCaricamento:"",
    error : null,
    profilo:[],
    profili:[]
}

const updateDataStart = ( state ) => {
    return updateObject( state, { loading:true } );
};

const updateDataFail = ( state) => {
    return updateObject( state, {  loading:false , esitoCaricamento: "Errore nell'invio dei dati. Controllare che la foto profilo sia inferiore ad 1 mb"} );
};

const updateDataSuccess = ( state, action ) => {
    return updateObject( state, { loading: false, dati: action.dati, esitoCaricamento: "I dati sono stati inviati/modificati con successo." } );
};

const sendDataStart = ( state ) => {
    return updateObject( state, { loading:true } );
};

const sendDataFail = ( state) => {
    return updateObject( state, {  loading:false , esitoCaricamento: "Errore nell'invio dei dati."} );
};

const sendDataSuccess = ( state, action ) => {
     let arrayDati = [...state.dati];
     let id = state.dati.findIndex(i=>i.key  === action.profilo.userId);
     if(id > 0)
        arrayDati.splice(id, 1);
     arrayDati.push(action.dati);
    return updateObject( state, { loading: false, dati: arrayDati, esitoCaricamento: "I dati sono stati inviati/modificati con successo." } );
};


const getProfiloStart = (state, action) =>{
    return updateObject(state , {error:null, loading : true});
}

const getProfiloSuccess = (state, action ) =>{
    return updateObject(state , {profilo : action.profilo, error:null, loading : false});
}

const getAllProfiliSuccess = (state, action ) =>{
    return updateObject(state , {profili : action.profili, error:null, loading : false});
}

const getProfiloFail = (state , action) =>{
    return updateObject( state, {error : action.error, loading: false});
}

const reducer = (state = initialState, action) =>  {
    switch(action.type){
        case actionTypes.SEND_DATA_START: return sendDataStart( state, action);
        case actionTypes.SEND_DATA_FAIL: return sendDataFail( state, action);
        case actionTypes.SEND_DATA_SUCCESS: return sendDataSuccess( state, action);
        case actionTypes.GET_PROFILO_SUCCESS : return getProfiloSuccess(state,action);
        case actionTypes.GET_ALLPROFILI_SUCCESS : return getAllProfiliSuccess(state,action);
        case actionTypes.GET_PROFILO_START : return getProfiloStart(state,action);
        case actionTypes.GET_PROFILO_FAIL : return getProfiloFail(state, action);
        case actionTypes.UPDATE_DATA_SUCCESS : return updateDataSuccess(state,action);
        case actionTypes.UPDATE_DATA_START : return updateDataStart(state,action);
        case actionTypes.UPDATE_DATA_FAIL : return updateDataFail(state, action);
        default: return state;
    }
}

export default reducer;