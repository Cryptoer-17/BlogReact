import React from 'react';
import HackerArticle from '../../assets/images/Hack-image-article.png';
import classes from './Articolo.module.css';

const article = (props) =>{
    return (
    <div className={classes.Articolo}>
        <div >
        <p>Titolo</p>
        </div>
        <div>
        <p>Sottotitolo - Autore</p>
        </div>
        <div>
        <img className={classes.Img} src={HackerArticle} alt="Hack" />
        </div>
        <div className={classes.Testo}>
        {props.children}
        </div>
    </div>
    
    );
    
} 

export default article;