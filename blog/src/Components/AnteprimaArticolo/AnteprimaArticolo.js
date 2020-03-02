import React, {Component} from 'react';
import classes from './Anteprimaarticolo.module.css';
import { FaHeart } from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

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

    

    render(){

   // const assignedClasses = [];
    let colore = 'black';  
    let variabile ; 


    if(this.state.articolo!==null){

        if(this.state.articolo.like){
            console.log("entrato");
          //  assignedClasses.push(classes.RedHeart);
            colore = 'red';
        }


        variabile = <div className={classes.Anteprimaarticolo}>
            <div className={classes.Titolo}>
                <NavLink to={"/articolo/" + this.props.id} style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold'
                }}>{this.state.articolo.titolo}</NavLink>
            </div>
            <div className={classes.Sottotitolo}>
            <p>{this.state.articolo.sottotitolo} - {this.state.articolo.autore}</p>
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={this.state.articolo.img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{this.state.articolo.descrizione}</p>
            </div>
            <div className={classes.Icon}>
                <FaHeart style={{color : colore}}/>          
            </div>
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