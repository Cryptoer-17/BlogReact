



const initialState = {
    articolo: null
}


const reducer = (state = initialState, action) =>  {
    return state;
}


export default reducer;




const postArticoloStart = ( state, action ) => {
    return updateObject( state, { loading:true } );
};

const postArticoloFail = ( state, action ) => {
    return updateObject( state, {  loading:false } );
};

const postArticoloSuccess = ( state, action ) => {
    return updateObject( state, { loading: false} );
};