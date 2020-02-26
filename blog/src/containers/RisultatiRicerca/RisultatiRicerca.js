import React, {Component} from 'react';
import classes from './RisultatiRicerca.module.css';

class RisultatiRicerca extends Component{

    state = {
        cerca:"",
        articoli:[
        {
            categoria: 'test',
            tags:['prova','react']
        },
        {
            categoria: 'test',
            tags:['ciao','react']
        },
        {
            categoria: 'prova',
            tags:['ciao','react']
        }
        ]
    }


    render(){
        console.log(this.state)

        let risultati = [];

       const displayCategoryResultsHandler = (cerca) =>{

           risultati= this.state.articoli.filter(art => art.categoria === cerca)
           console.log(risultati.map(r => r))

        }

       const displayTagResultsHandler = (cerca) =>{

            risultati = this.state.articoli.filter(art =>  art.tags.indexOf(cerca)>= 0)
            console.log(risultati.map(r => r))

        }



        return(
            <div className = {classes.RisultatiRicerca}>

            <div>
                <input autoFocus className = {classes.InputRicerca} type = "text" placeholder = ""   onChange={( event ) => this.setState( { cerca: event.target.value } )}  />

            </div>

                <div className = {classes.OpzioniRicerca}>
                    <p>Filtra per </p>
                <a  onClick = {() =>displayCategoryResultsHandler(this.state.cerca)}>Categoria</a> | <a  onClick = {() =>displayTagResultsHandler(this.state.cerca)}>Tag</a>
                <hr  className = {classes.Divisore} />
                </div>


            <div className = {classes.ContainerRisultati}>

            {/* risultati */}
                
            </div>


            </div>
   
        );
     }
    
}
export default RisultatiRicerca;