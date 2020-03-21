import React, {useState} from 'react';
import classes from './Logout.module.css';
import Modal from '../../Components/UI/Modal/Modal';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Logout = ( props) =>{

const {show, onLogout, hideModal,google} = props;
console.log(google);


const [showModalLogoutError, setshowModalLogoutError] = useState(false);


let error;
if(props.error === "Auth token is expired"){
   error = (setTimeout(()=>{
    if(props.error === "Auth token is expired"){
      document.getElementById("btnLogout").style.display = 'none';
      document.getElementById("btnLogout").click()
      hideModal();
    }
   },4500),<Modal  show = {true} hideModal = {hideModal}>
     E' scaduto il tempo di sessione, riaccedi per continuare ad usare il blog
   </Modal>);
}

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

<button id="btnLogout" className = {classes.LogoutButton} onClick = {() => {onLogout(); hideModal();  } }  > Esci</button>
{error}
</div>


</Modal>
  );

}
}

const mapStateToProps = state =>{
  return{
     error:state.articolo.error
  }
}

const mapDispatchToProps = dispatch => {
    return{
 
    onLogout: () => dispatch(actions.logout())
    };
  };



export default connect(mapStateToProps,mapDispatchToProps)(Logout);


