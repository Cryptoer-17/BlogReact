import React, { Component } from 'react';
import HackerArticle from '../../assets/images/Hack-image-article.png';
import classes from './Articolo.module.css';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import Spinner from '../UI/Spinner/Spinner';

class Articolo extends Component{
    state={
        articolo : null,
        loading : false,
    }
  

    componentDidMount(){
        const id= this.props.match.params.id;
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
       
        let variabile; 


        if(this.state.articolo!==null){
            variabile =  <div className={classes.Titolo}>
               <p>{this.state.articolo.titolo}</p>
            
            <div className={classes.Sottotitolo}>
            <p>{this.state.articolo.sottotitolo} - {this.state.articolo.autore}</p>
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={this.state.articolo.img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{this.state.articolo.testo}</p>
            </div>
            <div className={classes.Icon}>
                <FaHeart  />
            </div>
        </div>
        }

        if(this.state.loading){
            variabile= <Spinner />;
        }

        return (
            <div className={classes.Articolo}>
            {variabile}
            </div>
            
            );
    }
}

export default Articolo;