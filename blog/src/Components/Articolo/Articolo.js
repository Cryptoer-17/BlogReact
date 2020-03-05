import React, { Component } from 'react';
import classes from './Articolo.module.css';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import Spinner from '../UI/Spinner/Spinner';
import Autore from '../../Components/Autore/Autore';

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
            if (typeof response.data.tags === 'undefined'){
                response.data.tags = [];
            }

          this.setState({articolo : response.data})
          this.setState({loading:false})
        console.log(this.state.articolo);
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
        
        const id= this.props.match.params.id;
        console.log(this.props.match.params.id);
        axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json',anteprima)
        .then(response => console.log(response))
        .catch(error => console.log(error));

    }


    render(){
         
        let variabile; 
        let colore = 'black';
    

        let tags;
        if(this.state.articolo!==null){

        
            if(this.state.articolo.tags.length){
                const newtags = [ ...this.state.articolo.tags];
                tags = newtags.map((tag,index) =>{
                   return (
                       <div className={classes.Tag} key={index}>
                           {tag}
                       </div>
                   );
                   })
            }
    
               
       

            if(this.state.articolo.like){
                colore = 'red';
            }

            variabile =  <div className={classes.Titolo}>
               <p>{this.state.articolo.titolo}</p>
            
            <div className={classes.Sottotitolo}>
            <p>{this.state.articolo.sottotitolo} -</p>  <Autore name={this.state.articolo.autore}/>
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={this.state.articolo.img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{this.state.articolo.testo}</p>
            </div>
            <div className={classes.TagConteiner}>
               {tags} 
            </div>
               
            <div className={classes.Icon}>
                <FaHeart style={{color: colore, marginTop : '100%'}} onClick={() => this.clickHeartHandler()}/>
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