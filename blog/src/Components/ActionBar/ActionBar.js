import React, {useState, useEffect} from 'react';
import classes from './ActionBar.module.css';
import { FaHeart,FaRegCommentDots, FaEllipsisH } from "react-icons/fa";
import {NavLink} from 'react-router-dom';



const ActionBar = (props) =>{

    const [userArticle, setUserArticle] = useState([]);


    useEffect(()=>{
        const token = localStorage.getItem("token");
        fetch('https://blog-monika-andrea.firebaseio.com/articoli/'+props.id+'.json?auth='+ token)
        .then(response=>response.json())
        .then(responseData =>{
            let loadedArticolo;
            loadedArticolo = {...responseData};
            setUserArticle(loadedArticolo);

        });
    }, []);
    


    return(
        <div className ={classes.ActionBar}>
        

                <div className = {classes.Actions}>
                <FaHeart className={classes.Like} style={{color : props.color}} onClick={props.onClick}/>
                <FaRegCommentDots className={classes.Comments}  />
                </div>

                {props.disableMore ? null : 
                 <div className= {classes.MoreDiv} >
                     <FaEllipsisH className={classes.More} onClick={()=>props.clickMenu()}/>
                    <div className={classes.DropdownContent}  style={props.showdropdown ? {display:'block'} : null} >
                    <a href="#">Elimina</a>
                    <NavLink to={"/modifica/"+ props.id}  onClick={()=>props.UpdateArticolo(userArticle,props.id)}/*className={classes.Link} activeClassName={classes.LinkAttivo}*/>Modifica</NavLink> 
                    <a href="#">Link 3</a>
                    </div>
                </div>}


        </div>
    );
}
export default ActionBar;