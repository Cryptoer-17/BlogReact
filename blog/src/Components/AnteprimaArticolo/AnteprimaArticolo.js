import React, {Component} from 'react';
import classes from './Anteprimaarticolo.module.css';
import { FaHeart } from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import Autore from '../Autore/Autore';
import ActionBar from '../ActionBar/ActionBar';



class AnteprimaArticle extends Component{
   
    render(){

    
    let colore = 'black';  
    let variabile ; 
    const {autore} = this.props; 
    const {titolo} = this.props;
    const {sottotitolo} =this.props;
    const {img} = this.props;
    const {descrizione} = this.props;
    const {clickHeart} = this.props;


        console.log(this.props.titolo);

        if(this.props.like){
        
            colore = 'red';
        }

        variabile = <div>
            {this.props.titolo}
        </div>

        variabile =  <div className={classes.Anteprimaarticolo}>
           
           <div className={classes.Autore}> <Autore name ={autore}  /> </div>
           <NavLink to={"/articolo/" + this.props.id} style={{
                textDecoration : 'none',
                color : 'black'
            }}>
            <div className={classes.Titolo}>
            <p>{titolo}</p>
            </div>
            <div className={classes.Sottotitolo}>
       
            <p>{sottotitolo} </p> 
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{descrizione}</p>
            </div></NavLink>
           
         <ActionBar className = {classes.Actions} color={colore} onClick={clickHeart}/>   

        <ActionBar className = {classes.Actions}/>

       {/*<FaHeart className={classes.Icon} style={{color : colore}} onClick={clickHeart} />
          */ }  
        </div>
    
  

    return(
        <div>
            {variabile}
        </div>
    );


    }


} 


export default AnteprimaArticle;

//         <FaHeart className={classes.Icon} style={{color : colore}} onClick={this.props.clickHeart} />