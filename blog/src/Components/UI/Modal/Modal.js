import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const modal = (props) => {
  const {show} = props;

return(
    <div> 
      <div className= {classes.Modal}  style = {{ transfrom: show ? 'translateY(0)' : 'translateY(-100)',
        opacity: show ? '1':'0', visibility: show ? 'visible' : 'hidden'}}>
        {props.children}
      </div>   
      <Backdrop show ={show}  clicked = { props.modalClosed }/>
    </div> 
    );
};

export default modal;
