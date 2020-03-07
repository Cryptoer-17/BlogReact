import React from 'react';
import classes from './Logout.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Logout = ( props) =>{

const {show, onLogout, hideModal,google} = props;
console.log(google);
if(google){
const user = JSON.parse(localStorage.getItem("userId"));
console.log("entrato");




return(

<Modal show = {show}  modalClosed = {  hideModal }>
<div className = {classes.Logout}>
<h3>Logout</h3>

<p> {user.displayName} </p>

<img src = {user.photoURL}   className = {classes.UserImg} alt = "" />

<button className = {classes.LogoutButton} onClick = {() => {onLogout(); hideModal();  } }  > Esci</button>

</div>


</Modal>

);
}else {
  return(
    <Modal show = {show}  modalClosed = {  hideModal }>
<div className = {classes.Logout}>
<h3>Logout</h3>

{/*<p> {user.displayName} </p>*/}

{/*<img src = {user.photoURL}   className = {classes.UserImg} alt = "" />*/}

<button className = {classes.LogoutButton} onClick = {() => {onLogout(); hideModal();  } }  > Esci</button>

</div>


</Modal>
  );

}
}



const mapDispatchToProps = dispatch => {
    return{
    onLogout: () => dispatch(actions.logout())
    };
  };



export default connect(null,mapDispatchToProps)(Logout);

