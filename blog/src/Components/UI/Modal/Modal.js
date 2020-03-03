import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';



const modal = (props) => {



return(

     <div>
       
     <div className= {classes.Modal}  style = {{ transfrom: props.show ? 'translateY(0)' : 'translateY(-100)',
     opacity: props.show ? '1':'0', visibility: props.show ? 'visible' : 'hidden'}}>
       
       {props.children}

        </div>   

        <Backdrop show ={props.show}  clicked = { props.modalClosed }/>
    </div> 

    );
};

export default modal;
