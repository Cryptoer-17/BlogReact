import React, {useState} from 'react';
import classes from './Ricerca.module.css';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Ricerca = (props) =>{

    const [cerca, setCerca] = useState("");

    const clickHandler = () =>{
        if(cerca !== ""){
         props.onStartRicerca(cerca);
         props.history.push("/ricerca");
        }
    }

    return(
        <div className ={classes.Ricerca}>
            <input type="text" placeholder=" Cerca..." onChange={(event) => setCerca(event.target.value) } onKeyPress={ event => { if(event.key === 'Enter') clickHandler() }}/>
            <NavLink onClick = { clickHandler } to="/ricerca" exact className={classes.CercaButton} ><i className="material-icons">search</i></NavLink>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return{
    onStartRicerca: (cerca) => dispatch(actions.startRicerca(cerca))
    };
  };

export default connect(null,mapDispatchToProps)(withRouter(Ricerca));





