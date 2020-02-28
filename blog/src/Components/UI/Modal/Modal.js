import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.module.css';


const modal = (props) => {


return(
   
    <div>
       
    <Backdrop show ={props.show}  clicked = {props.modalClosed}/>

    <div className= "Modal"  style = {{transfrom: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1':'0' , display: props.show ? 'block':'none'}}>
       
        {props.children}

 
        </div>    
    </div> 
    
    );
};

export default modal;