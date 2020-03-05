import React, {useState} from 'react';
import classes from './Ricerca.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Ricerca = (props) =>{

    const [cerca, setCerca] = useState("");

    const clickHandler = () =>{
        if(cerca !== "")
         props.onStartRicerca(cerca);
         setTimeout( document.getElementById("filtroCategoria").click(), 200);
        

    }

    return(
        <div className ={classes.Ricerca}>
            <input type="text" placeholder=" Cerca..." onChange={(event) => setCerca(event.target.value) } />
            <NavLink onClick = { clickHandler } to="/ricerca" exact className={classes.CercaButton} ><i className="material-icons">search</i></NavLink>
        </div>
    );
}


const mapDispatchToProps = dispatch => {
    return{
    onStartRicerca: (cerca) => dispatch(actions.startRicerca(cerca))
    };
  };



export default connect(null,mapDispatchToProps)(Ricerca);





