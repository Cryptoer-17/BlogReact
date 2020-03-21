import React from 'react';
import classes from './Commento.module.css';

const Commento = (props)=>{
    return(<div className={classes.Commento}>
        {props.children}
    </div>)
}
export default Commento;