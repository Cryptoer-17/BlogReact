import React from 'react';
import classes from './InfoArticolo.module.css';
import Autore from '../Autore/Autore';
import {FaRegClock} from 'react-icons/fa';

const InfoArticolo = (props) =>{
    const {categoria, data, tempoLettura} = props;
    return( 
        <div className ={classes.Info}>
            <Autore name = {props.autore} className = {classes.Autore}/>
            <p className = {classes.Categoria}>{categoria}</p>
            <p className = {classes.DateTime}>{data} | <FaRegClock className = {classes.Icon}/> {tempoLettura < 1 ? "< 1 min. read" :  tempoLettura+" min. read"} </p>
        </div>
    );
}
export default InfoArticolo;