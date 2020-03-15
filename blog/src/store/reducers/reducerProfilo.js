import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';


const initialState = {
    dati: [],
    loading:null,
    esitoCaricamento:"",
    error : null,
    profilo:[]
}


const updateDataStart = ( state ) => {
    console.log("entrato");
    return updateObject( state, { loading:true } );
};

const updateDataFail = ( state) => {
    return updateObject( state, {  loading:false , esitoCaricamento: "Errore nell'invio dei dati."} );
};

const updateDataSuccess = ( state, action ) => {
     let arrayArt = [...state.dati];
     arrayArt.push(action.dati);
    return updateObject( state, { loading: false, dati: arrayArt, esitoCaricamento: "I dati sono stati inviati/modificati con successo." } );
};




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


const getProfiloStart = (state, action) =>{
    return updateObject(state , {error:null, loading : true});

}

const getProfiloSuccess = (state, action ) =>{
    return updateObject(state , {profilo : action.profilo, error:null, loading : false});
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
        case actionTypes.GET_PROFILO_START : return getProfiloStart(state,action);
        case actionTypes.GET_PROFILO_FAIL : return getProfiloFail(state, action);
        case actionTypes.UPDATE_DATA_SUCCESS : return updateDataSuccess(state,action);
        case actionTypes.UPDATE_DATA_START : return updateDataStart(state,action);
        case actionTypes.UPDATE_DATA_FAIL : return updateDataFail(state, action);
        default: return state;
    }
}


export default reducer;