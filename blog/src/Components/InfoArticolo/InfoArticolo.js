import React from 'react';
import classes from './InfoArticolo.module.css';
import Autore from '../Autore/Autore';

const InfoArticolo = (props) =>{
    return( 

        <div className ={classes.Info}>
            <Autore name = {props.autore} />
            <p>{props.categoria}</p>
            <p>{props.data} | {props.tempoLettura} </p>
        </div>
    );
}
export default InfoArticolo;