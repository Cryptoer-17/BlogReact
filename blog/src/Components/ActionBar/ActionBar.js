import React, {useState} from 'react';
import classes from './ActionBar.module.css';
import { FaHeart,FaRegCommentDots, FaEllipsisH } from "react-icons/fa";



const ActionBar = (props) =>{

    

    return(
        <div className ={classes.ActionBar}>
        

                <div className = {classes.Actions}>
                <FaHeart className={classes.Like} style={{color : props.color}} onClick={props.onClick}/>
                <FaRegCommentDots className={classes.Comments}  />
                </div>

                {console.log(props.showdropdown)}
                 <div className= {classes.MoreDiv} >
                     <FaEllipsisH className={classes.More} onClick={props.clickMenu}/>
                    <div className={classes.DropdownContent}  style={props.showdropdown ? {display:'block'} : null} >
                    <a href="#">Elimina</a>
                    <a href={"/modifica/"+props.id}>Modifica</a>
                    <a href="#">Link 3</a>
                    </div>
                </div>


        </div>
    );
}
export default ActionBar;