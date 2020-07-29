import React from 'react';
import classes from './Autore.module.css';

const Autore = (props) => {
    const {img, name} = props;
    return (
        <div className={classes.Autore}>
            {img ? img : <i className="material-icons" >account_circle</i>}
            {name}
        </div>
    );
}
export default Autore;