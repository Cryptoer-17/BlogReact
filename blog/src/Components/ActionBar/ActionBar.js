import React, {useState, useEffect} from 'react';
import classes from './ActionBar.module.css';
import { FaHeart,FaRegCommentDots, FaEllipsisH } from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import Elimina from '../EliminaArticolo/Elimina';
import Modal from '../UI/Modal/Modal';

const ActionBar = (props) =>{

    let modal=null;

   
 

    
    return(
        <div className ={classes.ActionBar}>
                {console.log(props)}

                <div className = {classes.Actions}>
                <FaHeart className={classes.Like} style={{color : props.color}} onClick={props.onClick}/>
                <FaRegCommentDots className={classes.Comments}  />
                </div>

                {props.disableMore ? null : 
                 <div className= {classes.MoreDiv} >
                     <FaEllipsisH className={classes.More} onClick={()=>props.clickMenu()}/>
                    <div className={classes.DropdownContent}  style={props.showdropdown ? {display:'block'} : null} >
                    <a onClick={()=>props.modalDelete()} style={{cursor: 'pointer'}}>Elimina</a>
                    <NavLink to={"/modifica/"+ props.id}/*className={classes.Link} activeClassName={classes.LinkAttivo}*/>Modifica</NavLink> 
                    <a href="#">Link 3</a>
                    </div>
                </div>}


        </div>
    );
}
export default ActionBar;