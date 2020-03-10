import React, {Component} from 'react';
import classes from './Profilo.module.css';
import {connect } from 'react-redux';


class Profilo extends Component{
render(){

    let email;
    email = localStorage.getItem('email');

    return(
        <div className={classes.Profilo}>
            <div>
            <h1>Profilo Persona</h1>
            </div>
            <div className={classes.Email}>
              <p>Email :</p><p> {email}</p> 
            </div>
        </div>
    );
}

}


const mapStateToProps = state =>{
    console.log(state.articolo.articoli);
    return{
       articoli : state.articolo.articoli
    }
 }
 

export default connect(mapStateToProps)(Profilo);