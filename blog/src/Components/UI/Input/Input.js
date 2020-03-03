import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

const inputClasses = [classes.Input];

if((!props.valid) && props.shouldValidate && props.touched){
  inputClasses.push(classes.Invalid);  
}


return(
    <div>
    <label  className = {classes.Label}>{props.label}</label>
    <input 
        type = {props.type}
        placeholder = {props.placeholder}
        className = {classes.Input}
        onChange = {props.changed}
        className =  {inputClasses.join(' ')} 
    />

    </div>

);

};
export default Input;