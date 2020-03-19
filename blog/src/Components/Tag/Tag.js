import React from 'react';
import classes from './Tag.module.css';
import {withRouter} from 'react-router-dom';


const Tag = (props) =>{
    console.log(props)
    return(
        <div className ={classes.Tag}>
         <span className ={classes.Content}> {props.children}</span> 
    {(props.location.pathname === "/pubblica" || props.match.path === "/modifica/:id") ? <i className="material-icons" onClick = {props.click}>close</i> : null}
        </div>
    );
}
export default withRouter(Tag);