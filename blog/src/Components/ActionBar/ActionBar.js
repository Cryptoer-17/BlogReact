import React from 'react';
import classes from './ActionBar.module.css';
import { FaHeart,FaRegCommentDots, FaEllipsisH } from "react-icons/fa";


const ActionBar = (props) =>{
    return(
        <div className ={classes.ActionBar}>
        


                <div className = {classes.Actions}>
                <FaHeart className={classes.Like} />
                <FaRegCommentDots className={classes.Comments} />
                </div>

                 <div className= {classes.MoreDiv}>
                <FaEllipsisH className={classes.More}/>
                </div>


        </div>
    );
}
export default ActionBar;