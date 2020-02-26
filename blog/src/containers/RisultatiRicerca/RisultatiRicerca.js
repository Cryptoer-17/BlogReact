import React, {Component} from 'react';
import classes from './RisultatiRicerca.module.css';

class RisultatiRicerca extends Component{

    state = {
        cerca:""
    }


    render(){




        return(
            <div className = {classes.RisultatiRicerca}>

            <div>
                <input autoFocus className = {classes.InputRicerca} type = "text" placeholder = ""   onChange={( event ) => this.setState( { cerca: event.target.value } )}  />

            </div>

                <div className = {classes.OpzioniRicerca}>
                    <p>Filtra per </p>
                <a href = "">Categoria</a> | <a href = "">Tag</a>
                <hr  className = {classes.Divisore} />
                </div>


            <div className = {classes.ContainerRisultati}>



            </div>


            </div>
   
        );

    }
}
export default RisultatiRicerca;