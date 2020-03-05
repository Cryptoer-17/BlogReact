import React, {useState} from 'react';
import classes from './Ricerca.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Ricerca = (props) =>{

    const [cerca, setCerca] = useState("");

    return(
        <div className ={classes.Ricerca}>
            <input type="text" placeholder=" Cerca..." onChange={(event) => setCerca(event.target.value) } />
            <NavLink onClick = {() => props.onStartRicerca(cerca) } to="/ricerca" exact className={classes.CercaButton} ><i className="material-icons">search</i></NavLink>
        </div>
    );
}


const mapDispatchToProps = dispatch => {
    return{
    onStartRicerca: (cerca) => dispatch(actions.startRicerca(cerca))
    };
  };



export default connect(null,mapDispatchToProps)(Ricerca);





