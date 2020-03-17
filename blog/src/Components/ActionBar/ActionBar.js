import React, {useState} from 'react';
import classes from './ActionBar.module.css';
import { FaHeart,FaRegCommentDots, FaEllipsisH } from "react-icons/fa";



const ActionBar = (props) =>{

    const [showMenu,setShowMenu] = useState(true);


    const showPageMessage = () =>{
        setShowMenu(!showMenu);
    }


    return(
        <div className ={classes.ActionBar}>
        

                <div className = {classes.Actions}>
                <FaHeart className={classes.Like} style={{color : props.color}} onClick={props.onClick}/>
                <FaRegCommentDots className={classes.Comments}  />
                </div>


                 <div className= {classes.MoreDiv} >
                     <FaEllipsisH className={classes.More} onClick={showPageMessage}/>
                    <div class={classes.DropdownContent}  style={showMenu ? {display:'block'} : null} >
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                    </div>
                </div>


        </div>
    );
}
export default ActionBar;