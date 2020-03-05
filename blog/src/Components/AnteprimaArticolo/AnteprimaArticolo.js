import React, {Component} from 'react';
import classes from './Anteprimaarticolo.module.css';
import { FaHeart } from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import Autore from '../Autore/Autore';
import * as actionArticolo from '../../store/actions/index';
import {connect} from 'react-redux';

class AnteprimaArticle extends Component{
   
    render(){

    let colore = 'black';  
    let variabile ; 

   
        console.log(this.props.titolo);

        if(this.props.like){
        
            colore = 'red';
        }

        variabile = <div>
            {this.props.titolo}
        </div>

        variabile =  <div className={classes.Anteprimaarticolo}>
           
           <div className={classes.Autore}> <Autore name = {this.props.autore}  /> </div>
           <NavLink to={"/articolo/" + this.props.id} style={{
                textDecoration : 'none',
                color : 'black'
            }}>
            <div className={classes.Titolo}>
            <p>{this.props.titolo}</p>
            </div>
            <div className={classes.Sottotitolo}>
       
            <p>{this.props.sottotitolo} </p> 
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={this.props.img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{this.props.descrizione}</p>
            </div></NavLink>
           

         <FaHeart className={classes.Icon} style={{color : colore}} onClick={this.props.clickHeart} />
          
        </div>
    
  

    return(
        <div>
            {variabile}
        </div>
    );


    }


} 


export default AnteprimaArticle;