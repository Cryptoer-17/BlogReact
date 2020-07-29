import React, { useState } from 'react';
import classes from './Elimina.module.css';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

const Elimina = (props) => {
    const {id} = props;

    const [loading, setLoading] = useState(null);

    const clickBtnSi = () => {
        setLoading(<Spinner />);
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.delete('http://localhost:4001/articolo/delete/' + id, config)
            .then(response => {
                setLoading(null);
                setTimeout(() => {
                    props.mount();
                    window.location.reload();
                }, 500)
            })
            .catch(error => {
                //gestire errore
                setLoading(null)
            });
    }
    return (
        <div>
            {loading}
            <p>SEI SICURO DI VOLER ELIMINARE IL POST?</p>
            <button className={classes.ButtonDelete} onClick={clickBtnSi}>SI</button>
            <button className={classes.ButtonNoDelete} onClick={props.hideModal}>NO</button>
        </div>
    )
}
export default Elimina;