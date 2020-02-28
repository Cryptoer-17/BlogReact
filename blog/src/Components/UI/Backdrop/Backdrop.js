import React from 'react';
import classes from './Backdrop.module.css';
import { Link } from 'react-router-dom';

const backdrop = (props) => (

props.show ? <Link to = "/"> < div className = {classes.Backdrop} onClick = {props.clicked}> </div> </Link>  : null



);
export default backdrop;