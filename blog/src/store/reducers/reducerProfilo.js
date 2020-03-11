// import * as actionTypes from '../actions/actionTypes';
// import updateObject from '../../utility/updateObject';


// const initialState = {
//     articoli: [],
//     loading:false,
//     esitoCaricamento:"",
//     cerca: null,
//     risultatiRicerca:[],
//     error : null
// }



// const SetArticoliStart = (state, action) =>{
//     return updateObject(state , {error:null, loading : true})

// }

// const setArticoliSuccess = (state, action ) =>{
//     return updateObject(state , {articoli : action.articoli.reverse(), error:null, loading : false})
// }

// const setArticoliFail = (state , action) =>{
//     return updateObject( state, {error : action.error, loading: false})
// }






// const reducer = (state = initialState, action) =>  {
//     switch(action.type){
//         case actionTypes.POST_ARTICOLO_START: return postArticoloStart( state, action);
//         case actionTypes.POST_ARTICOLO_FAIL: return postArticoloFail( state, action);
//         case actionTypes.POST_ARTICOLO_SUCCESS: return postArticoloSuccess( state, action);
//         case actionTypes.UPDATE_ARTICOLO_SUCCESS: return updateArticoloSuccess( state, action);
//         case actionTypes.DELETE_ARTICOLO_SUCCESS: return deleteArticoloSuccess( state, action);
//         case actionTypes.SET_ARTICOLI_SUCCESS : return setArticoliSuccess(state,action);
//         case actionTypes.SET_ARTICOLI_START : return SetArticoliStart(state,action);
//         case actionTypes.SET_ARTICOLI_FAIL : return setArticoliFail(state, action);
//         case actionTypes.RICERCA_ARTICOLI : return ricercaArticoli(state,action);
//         case actionTypes.START_RICERCA : return startRicerca(state,action);
//         default: return state;
//     }
// }


// export default reducer;