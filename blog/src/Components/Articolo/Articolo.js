import React from 'react';
import HackerArticle from '../../assets/images/Hack-image-article.png';
import classes from './Articolo.module.css';

const articolo = () =>{
    return (
    <div className={classes.Articolo}>
        <div className={classes.Titolo}>
        <p>Titolo</p>
        </div>
        <div>
        <p>Sottotitolo - Autore</p>
        </div>
        <div>
        <img  src={HackerArticle} alt="Hack" />
        </div>
        <div className={classes.Testo}>
       Testo ....
        </div>
    </div>
    
    );
    
} 

export default articolo;