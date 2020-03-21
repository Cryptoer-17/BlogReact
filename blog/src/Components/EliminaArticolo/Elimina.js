import React, {useState} from 'react';
import classes from './Elimina.module.css';
import Modal from '../UI/Modal/Modal';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

const Elimina = ( props) =>{
    

    const [loading, setLoading] = useState(null);

    

    const clickBtnSi= ()=>{
        const id= props.id;
        setLoading(<Spinner />)
        axios.delete('https://blog-monika-andrea.firebaseio.com/articoli/'+ id + '.json?auth='+localStorage.getItem("token"))
        .then(response =>{
          setLoading(null);
        setTimeout(()=>{
            window.location.reload();
        },500)
        })
        .catch(error => {
        //gestire errore
            setLoading(null)
        });
    }

    
    return(
        <div>
        {loading}
        <p>SEI SICURO DI VOLER ELIMINARE IL POST?</p>
        <button className={classes.ButtonDelete} onClick={clickBtnSi}>SI</button>
        <button className={classes.ButtonNoDelete} onClick={props.hideModal}>NO</button>
        </div>
    )

}

export default Elimina;