import React, {Component} from 'react';
import classes from './AnteprimaArticolo.module.css';
import {NavLink} from 'react-router-dom';
import ActionBar from '../ActionBar/ActionBar';
import Info from '../InfoArticolo/InfoArticolo';


class AnteprimaArticolo extends Component{
   
    render(){

    
    let colore = 'black';  
    let variabile ; 
    const {autore, titolo, sottotitolo,categoria, img,descrizione,clickHeart, data, minuti, id,dropDown,clickMenu} = this.props; 


        if(this.props.like){
            colore = 'red';
        }

        variabile = <div>
            {titolo}
        </div>

        variabile =  <div className={classes.AnteprimaArticolo}>
           
<Info className = {classes.Info} autore = {autore} categoria = {categoria} data = {data} tempoLettura = {minuti} />

           <NavLink to={"/articolo/" + id} style={{
                textDecoration : 'none',
                color : 'black'
            }}>
            <div className={classes.Titolo}>
            <h1>{titolo}</h1>
            </div>{ sottotitolo ?   <div className={classes.Sottotitolo}>
            <h5>{sottotitolo} </h5> 
            </div> : null } 
          
          {img ? <div className={classes.Imgdiv}>
                <img className={classes.Img} src={img} alt="" />
            </div> : null}  

          {descrizione ?
          <div className={classes.Testo}>
          <p>{descrizione}</p>
          </div>
          : null}  </NavLink>
           
           {console.log(dropDown)}
         <ActionBar showdropdown={dropDown} clickMenu={clickMenu} className = {classes.Actions} color={colore} onClick={clickHeart}/>   

        </div>
    
  

    return(
        <div>
            {variabile}
        </div>
    );
}
} 

export default AnteprimaArticolo;

