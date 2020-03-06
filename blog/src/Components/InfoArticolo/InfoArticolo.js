import React from 'react';
import classes from './InfoArticolo.module.css';
import Autore from '../Autore/Autore';
import {FaRegClock} from 'react-icons/fa';


const InfoArticolo = (props) =>{
    return( 

        <div className ={classes.Info}>
            <Autore name = {props.autore} className = {classes.Autore}/>
            <p className = {classes.Categoria}>{props.categoria}</p>
            <p className = {classes.DateTime}>{props.data} | <FaRegClock className = {classes.Icon}/> {props.tempoLettura} read</p>
        </div>
    );
}
export default InfoArticolo;