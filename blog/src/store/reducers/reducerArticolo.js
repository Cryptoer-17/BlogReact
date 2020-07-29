import updateObject from '../../utility/updateObject';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articoli: [],
    articolo:[],
    loading:false,
    esitoCaricamento:"",
    cerca: null,
    risultatiRicerca:[],
    error : null
}

const postArticoloStart = ( state ) => {
    return updateObject( state, { loading:true } );
};

const postArticoloFail = ( state,err) => {
    console.log(err);
    return updateObject( state, {  loading:false , esitoCaricamento: "Errore nel caricamento del post. Utilizzare un'immagine di dimensioni inferiori a 1 mb"} );
};

const postArticoloSuccess = ( state, action ) => {
    return updateObject( state, { loading: false, esitoCaricamento: "Il post è stato caricato con successo." } );
};

const SetArticoliStart = (state, action) =>{
    return updateObject(state , {error:null, loading : true})
}

const setArticoliSuccess = (state, action ) =>{
    return updateObject(state , {articoli : action.articoli.reverse(), error:null, loading : false})
}

const setArticoliFail = (state , action) =>{
    return updateObject( state, {error : action.error, loading: false})
}

const startRicerca = (state,action) => {
    return updateObject( state, { cerca: action.cerca} );
}

const ricercaArticoli = (state,action) =>{
let articoli = [];
    if(action.filtro === "tag"){
        articoli= state.articoli.filter(art => {return  art.articolo.tags ?
             art.articolo.tags.indexOf(state.cerca) >= 0
             : null
            }
        );
    }
    if(action.filtro === "categoria"){
        articoli= state.articoli.filter(art => art.articolo.categoria === state.cerca);
    }
    return updateObject( state, { risultatiRicerca: articoli} );
}

const updateArticoloSuccess = ( state, action ) => {
    return updateObject( state, { loading: false, articolo: action.articolo, esitoCaricamento: "I dati sono stati inviati/modificati con successo." } );
};

const deleteArticoloSuccess = (state,action) =>{
    let arrayArt = [...state.articoli];
    let idArt = state.articoli.findIndex(i=>i.key  === action.articolo.key);
    arrayArt.splice(idArt, 1);
   return updateObject( state, { loading: false, articoli: arrayArt} );
}

const reducer = (state = initialState, action) =>  {
    switch(action.type){ 
        case actionTypes.POST_ARTICOLO_START: return postArticoloStart( state, action);
        case actionTypes.POST_ARTICOLO_FAIL: return postArticoloFail( state, action);
        case actionTypes.POST_ARTICOLO_SUCCESS: return postArticoloSuccess( state, action);
        case actionTypes.UPDATE_ARTICOLO_SUCCESS: return updateArticoloSuccess( state, action);
        case actionTypes.DELETE_ARTICOLO_SUCCESS: return deleteArticoloSuccess( state, action);
        case actionTypes.SET_ARTICOLI_SUCCESS : return setArticoliSuccess(state,action);
        case actionTypes.SET_ARTICOLI_START : return SetArticoliStart(state,action);
        case actionTypes.SET_ARTICOLI_FAIL : return setArticoliFail(state, action);
        case actionTypes.RICERCA_ARTICOLI : return ricercaArticoli(state,action);
        case actionTypes.START_RICERCA : return startRicerca(state,action);
        default: return state;
    }
}

export default reducer;
