import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  const {valid,shouldValidate, touched, type, value, config, label} = props;

  const inputClasses = [classes.Input];
  const textareaClasses = [classes.InputTextarea];
  let inputElement = null;
  if ((!valid) && shouldValidate && touched) {
    switch (type) {
      case "textarea": textareaClasses.push(classes.InvalidTextarea);;
        break;
      default: inputClasses.push(classes.Invalid);
    }
  }

  switch (type) {
    case "textarea": inputElement = <textarea value={value}  {...config} onChange={props.changed} className={textareaClasses.join(' ')} />;
      break;
    case "select": inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
      {props.config.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
      break;
    case "radio": inputElement = <div className={inputClasses.join(' ')} style={{ textAlign: 'start' }}>
      <div style={{ display: 'inline-flex', marginRight: '10px' }}>Sesso:</div>
      {config.options.map(option => {
        return (
          <div key={option.value} style={{ display: 'inline-flex' }}>
            {option.displayValue}:<input type={type} name="sex" onChange={props.changed} value={option.value} checked={option.value === value}></input>
          </div>);
      })}
    </div>
      break;
    default: inputElement = <input value={value} type={type} style={config.placeholder === 'breve presentazione di te' ? { marginTop: '-70px', display: 'inline', marginLeft: '75px', width: '72%' } : config.placeholder === "Scrivi un commento..." ? { backgroundColor: '#D2CACA', marginTop: '22px', width: '90%', boxShadow: ' -3px 3px 3px #D2CACA' } : null}  {...config} onChange={props.changed} className={inputClasses.join(' ')} onKeyPress={event => { if (event.key === 'Enter') props.click(); }} />;
  }

  return (
    <div>
      <label className={classes.Label} style={config.placeholder === 'breve presentazione di te' ? { marginTop: '-64px' } : null}>{label}</label>
      {inputElement}
    </div>
  );
};
export default Input;