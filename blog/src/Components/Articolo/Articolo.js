import React, { Component } from 'react';
import classes from './Articolo.module.css';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import Autore from '../../Components/Autore/Autore';
import ActionBar from '../ActionBar/ActionBar';
import Tag from '../Tag/Tag';
import Info from '../InfoArticolo/InfoArticolo';



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
            tags : this.state.articolo.tags,
            like: !this.state.articolo.like,
            sottotitolo : this.state.articolo.sottotitolo,
            testo : this.state.articolo.testo,
            titolo : this.state.articolo.titolo
        } 

        this.setState({
            articolo : anteprima
        })
         
        const id= this.props.match.params.id;

        axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json',anteprima)
        .then(response => console.log(response))
        .catch(error => console.log(error));

    }


    render(){
        const {articolo,loading} = this.state;

        let articoloVisualizzato; 
        let colore = 'black';
        let tags;

        if(articolo!==null){

        
            if(articolo.tags.length){
                const newtags = [ ...articolo.tags];
                tags = newtags.map((tag,index) =>{
                   return (
                       <div className={classes.Tag} key={index}>
                         <Tag>{tag}</Tag>
                       </div>
                   );
                   })
            }
    
               
       

            if(articolo.like){
                colore = 'red';
            }

            articoloVisualizzato = 
            // <Info className = {classes.Info} autore = {articolo.autore} categoria = {articolo.categoria} data = {new Date().toLocaleDateString()} tempoLettura = "2 min. " />

            <div className={classes.Articolo}>
                <div className={classes.Titolo}>
               <h1>{articolo.titolo}</h1>
               </div>
                <h5>{articolo.categoria}</h5>
            <div className={classes.Sottotitolo}>
            <p>{articolo.sottotitolo} </p>
            </div>
            <div>
            <Autore name={articolo.autore} />
            </div>

            <div className={classes.Imgdiv}>
        { articolo.img ? <img className={classes.Img} src={articolo.img} alt="" /> : null}
            </div>
            <div className={classes.Testo}>
            <p>{articolo.testo}</p>
            </div>
            <div className={classes.TagContainer}>
               {tags} 
            </div>          
                <ActionBar className={classes.Action} color={colore} onClick={() => this.clickHeartHandler()}/>
        </div>
        }

        if(loading){
            articoloVisualizzato = <Spinner />;
        }

        return (
            <div >
            {articoloVisualizzato}
            </div>
            
            );
    }
}

export default Articolo;