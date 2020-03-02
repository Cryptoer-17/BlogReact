import React, {Component} from 'react';
import classes from './Anteprimaarticolo.module.css';
import { FaHeart } from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import Autore from '../Autore/Autore';


class anteprimaArticle extends Component{
    state={
        articolo : null,
        loading : false,
    }

    

    componentDidMount(){
        console.log(this.props);
        const id= this.props.id;
        this.setState({loading : true})
        axios.get('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json')
        .then(response =>{
          this.setState({articolo : response.data})
          this.setState({loading:false})
           // console.log(this.state.articolo.titolo);
        })
        .catch(error => {
       
            this.setState({loading:false})
        });
    }

    
    clickHeartHandler(){
       
        const anteprima = {
            autore : this.state.articolo.autore,
            categoria : this.state.articolo.categoria,
            descrizione : this.state.articolo.descrizione,
            img : this.state.articolo.img,
            like: !this.state.articolo.like,
            sottotitolo : this.state.articolo.sottotitolo,
            testo : this.state.articolo.testo,
            titolo : this.state.articolo.titolo
        } 

        this.setState({
            articolo : anteprima
        })
        console.log(anteprima);

        const id= this.props.id;
        
        axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json',anteprima)
        .then(response => console.log(response))
        .catch(error => console.log(error));

    }
    render(){

        
   
   


    let colore = 'black';  
    let variabile ; 


    if(this.state.articolo!==null){

        
        if(this.state.articolo.like){
            console.log("entrato");
         
            colore = 'red';
        }


        variabile = <div className={classes.Anteprimaarticolo}>
           <div className={classes.Autore}> <Autore name = {this.state.articolo.autore}  /> </div>
           
            <div className={classes.Titolo}>
       
                <NavLink to={"/articolo/" + this.props.id} style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold'
                }}>{this.state.articolo.titolo}</NavLink>
            </div>
            <div className={classes.Sottotitolo}>
       
            <p>{this.state.articolo.sottotitolo} </p> 
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={this.state.articolo.img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{this.state.articolo.descrizione}</p>
            </div>
           

         <FaHeart className={classes.Icon} style={{color : colore}} onClick={() => this.clickHeartHandler()} />
          
        </div>
    }


    if(this.state.loading){
        variabile= <Spinner />;
    }

    return(
        <div>
            {variabile}
        </div>
    );


    }


} 


export default anteprimaArticle;