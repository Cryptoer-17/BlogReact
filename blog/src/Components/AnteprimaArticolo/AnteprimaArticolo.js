import React, {Component} from 'react';
import HackerArticle from '../../assets/images/Hack-image-article.png';
import classes from './Anteprimaarticolo.module.css';
import { FaHeart } from "react-icons/fa";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

class anteprimaArticle extends Component{
    state={
        articolo : null,
        loading : false,
       // error : false
    }

    

    componentDidMount(){
        this.setState({loading : true})
        axios.get('https://blog-monika-andrea.firebaseio.com/articoli/-M16ULH3DO_zBRV-OhIL.json')
        .then(response =>{
            //console.log(response.data);
          this.setState({articolo : response.data})
          this.setState({loading:false})
      
        })
        .catch(error => {
          //  this.setState({error:true})
            this.setState({loading:false})
        });
    }

    

    render(){

    const assignedClasses = [];
    if(this.props.color){
        assignedClasses.push(classes.RedHeart);
    }
    if(this.state.loading !== null){
        return (
            this.state.articolo.map(ctrl =>{
            

            let variabile = <div className={classes.Anteprimaarticolo}>
                <div className={classes.Titolo}>
                    <NavLink to="/articolo" style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontWeight: 'bold'
                    }}>Titolo</NavLink>
                </div>
                <div className={classes.Sottotitolo}>
                    <p>Sottotitolo - Autore</p>
                </div>
                <div className={classes.Imgdiv}>
                    <img className={classes.Img} src={HackerArticle} alt="Hack" />
                </div>
                <div className={classes.Testo}>
                    {this.props.children}
                </div>
                <div className={classes.Icon}>
                    <FaHeart className={assignedClasses.join(' ')} />
                </div>
            </div>

            if(this.state.loading){
                variabile= <Spinner />;
            }
            return (
            <div>
                {variabile}
            </div> 
            );
        })
        );
  
    }    
    else return null;
        


    
    }
    


} 


export default anteprimaArticle;