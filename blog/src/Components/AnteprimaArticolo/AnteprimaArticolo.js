import React from 'react';
import HackerArticle from '../../assets/images/Hack-image-article.png';
import classes from './Anteprimaarticolo.module.css';
import { FaHeart } from "react-icons/fa";

const anteprimaArticle = (props) =>{

    const assignedClasses = [];
    if(props.color){
        assignedClasses.push(classes.RedHeart);
    }


    return (
    <div className={classes.Anteprimaarticolo}>
        <div className={classes.Titolo}>
        <p>Titolo</p>
        </div>
        <div className={classes.Sottotitolo}>
        <p>Sottotitolo - Autore</p>
        </div>
        <div className={classes.Imgdiv}>
        <img className={classes.Img} src={HackerArticle} alt="Hack" />
        </div>
      <div className={classes.Testo}>
        {props.children}
        </div>  
        <div className={classes.Icon}>
        <FaHeart className={assignedClasses.join(' ')}/>
        </div>
    </div>
    
    );
    
} 

export default anteprimaArticle;