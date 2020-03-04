import * as actionTypes from './actionTypes';
import axios from 'axios';

export const createArticolo = (articolo) =>{
    return{
        type: actionTypes.CREATE_ARTICOLO,
        articolo: articolo
    }
} 

export const initArticoli = () =>{
    return dispatch =>{
        const id= this.props.id;
        this.setState({loading : true})
        axios.get('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json')
        .then(response =>{
           dispatch(createArticolo(response.data)) 
       //   this.setState({loading:false})
           // console.log(this.state.articolo.titolo);
        })
        .catch(error => {
       
            this.setState({loading:false})
        });
    };
};