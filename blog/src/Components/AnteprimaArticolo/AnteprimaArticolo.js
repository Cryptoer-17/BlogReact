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
    /*state={
        articolo : null,
        loading : false,
    }*/

    

    componentDidMount(){
        this.props.onInitArticolo();
    }

    
   /* clickHeartHandler(){
       
        const anteprima = {
            autore : this.props.art.autore,
            categoria : this.props.art.categoria,
            descrizione : this.props.art.descrizione,
            img : this.props.art.img,
            like: !this.props.art.like,
            sottotitolo : this.props.art.sottotitolo,
            testo : this.props.art.testo,
            titolo : this.props.art.titolo
        } 

        this.setState({
            articolo : anteprima
        })
    

        const id= this.props.id;
        
        axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json',anteprima)
        .then(response => console.log(response))
        .catch(error => console.log(error));

    }*/
    render(){

        


    let colore = 'black';  
    let variabile ; 

   
    
    if(this.props.art!==null){
        console.log(this.props.art.titolo);

     /*   if(this.props.art.like){
        
            colore = 'red';
        }*/

        variabile = <div>
            {this.props.art.titolo}
        </div>

       /* variabile =  <div className={classes.Anteprimaarticolo}>
           
           <div className={classes.Autore}> <Autore name = {this.props.art.autore}  /> </div>
           <NavLink to={"/articolo/" + this.props.id} style={{
                textDecoration : 'none',
                color : 'black'
            }}>
            <div className={classes.Titolo}>
            <p>{this.props.art.titolo}</p>
            </div>
            <div className={classes.Sottotitolo}>
       
            <p>{this.props.art.sottotitolo} </p> 
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={this.props.art.img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{this.props.art.descrizione}</p>
            </div></NavLink>
           

         <FaHeart className={classes.Icon} style={{color : colore}} onClick={() => this.clickHeartHandler()} />
          
        </div>*/
    }

    
    /*if(this.state.loading){
        variabile= <Spinner />;
    }*/

    return(
        <div>
            {variabile}
        </div>
    );


    }


} 

const mapStateToProps = state =>{
    return{
       art : state.articolo.articolo
    }
 }
 
 
 const mapDispatchToProps = (dispatch,props) =>{
    return{
       onInitArticolo: () => dispatch(actionArticolo.initArticolo(props.id))
    }
 }



export default connect(mapStateToProps,mapDispatchToProps)(AnteprimaArticle);