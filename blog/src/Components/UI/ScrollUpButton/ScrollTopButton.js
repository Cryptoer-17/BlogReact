
import React from 'react';
import classes from './ScrollTopButton.module.css';

const scrollTopButton = () => (
    <button title = "Torna in cima" className = {classes.TornaSuButton}  onClick = {() => document.documentElement.scrollTop = 0}><i className="material-icons">arrow_upward</i> </button>
    );

export default scrollTopButton;



