import React from 'react';
import HackerArticle from '../../assets/images/Hack-image-article.png';

const article = (props) =>{
    return (
    <div>
        <p>Titolo</p>
        <p>Sottotitolo</p>
        <img src={HackerArticle} alt="Hack" />
        {props.children}
    </div>
    
    );
    
} 

export default article;