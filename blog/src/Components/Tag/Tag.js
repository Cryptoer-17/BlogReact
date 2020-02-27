import React from 'react';
import classes from './Tag.module.css';



const Tag = (props) =>{
    return(
        <div className ={classes.Tag}>
          {props.children}
         <i className="material-icons" onClick = {props.click}>close</i>
        </div>
    );
}
export default Tag;