import React  from 'react';
import classes from './MainPage.module.css';

const MainPage= () =>{

  
    return( 

        <div className ={classes.MainPage}  >
               <p className ={classes.Testo} >Crea il tuo blog </p>
                <button className ={classes.Registrazione} onClick = {() => document.getElementById("btnLoginLogout").click()}> INIZIA ORA</button>
                <div className = {classes.Img}> </div>
        </div>
    );
}
export default MainPage;