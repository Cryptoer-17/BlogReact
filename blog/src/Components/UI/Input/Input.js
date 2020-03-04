import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

 
const inputClasses = [classes.Input];
const textareaClasses = [classes.InputTextarea];

let inputElement = null;

if((!props.valid) && props.shouldValidate && props.touched ){
  
  switch(props.type){
      case "textarea":  textareaClasses.push(classes.InvalidTextarea); ;
      break;
      default:  inputClasses.push(classes.Invalid);  
    }
}


switch(props.type){
  case "textarea": inputElement = <textarea value = { props.value}  {...props.config} onChange = {props.changed} className =  {textareaClasses.join(' ')} /> ;
  break;
  default: inputElement = <input value = { props.value} type = {props.type}  {...props.config} onChange = {props.changed} className =  {inputClasses.join(' ')} /> ;
}


return(
    <div>
    <label  className = {classes.Label}>{props.label}</label>
    {inputElement}

    </div>

);

};
export default Input;