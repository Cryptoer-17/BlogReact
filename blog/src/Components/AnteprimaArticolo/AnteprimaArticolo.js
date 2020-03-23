import React, {Component} from 'react';
import classes from './AnteprimaArticolo.module.css';
import {NavLink} from 'react-router-dom';
import ActionBar from '../ActionBar/ActionBar';
import Info from '../InfoArticolo/InfoArticolo';
import Elimina from '../../Components/EliminaArticolo/Elimina';
import Modal from '../UI/Modal/Modal';

class AnteprimaArticolo extends Component{
    state={
        showModalDelete:false,

     }
  

        viewMessageArticle(id){
           
            // document.getElementById("divTitolo").click()
            // document.getElementById("messageIcon").click()
           document.getElementById(id).click()
            setTimeout(() => {
               document.getElementById("messageIcon").click();
            }, 500);
           // document.getElementById("messageIcon").click()
        }


        clickModalDelete (){
            this.setState({showModalDelete:true})
        }
        
        hideModalDelete (){
            this.setState({showModalDelete:false})
        }

    render(){

    
    let colore = 'black';  
    let variabile ; 
    const {autore, titolo, sottotitolo,categoria, img,descrizione,clickHeart, data, minuti, id,UpdateArticolo,showDropdown} = this.props; 
    


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
            <div id={id} className={classes.Titolo}>
            <h1>{titolo}</h1>
            </div>{ sottotitolo ?   <div id="divSottotitolo" className={classes.Sottotitolo}>
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
           
         <ActionBar id={id} showdropdown={showDropdown} viewComments={()=>this.viewMessageArticle(id)}  modalDelete={()=>this.clickModalDelete()} clickMenu={this.props.clickMenuHandler} disableMore={this.props.disableMore} className = {classes.Actions} color={colore} onClick={clickHeart} />   

        </div>
    
  
    let showModalDelete;
    if(this.state.showModalDelete){
     showModalDelete= <Modal show={this.state.showModalDelete}><Elimina {...this.props} hideModal={()=>this.hideModalDelete()} mount={this.props.mount}/></Modal>
    } 

    return(
        <div >
            {showModalDelete ? showModalDelete: null}
            {variabile}
        </div>
    );
}
} 

export default AnteprimaArticolo;

