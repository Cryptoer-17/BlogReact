import React from 'react';
import classes from './MainPage.module.css';

const MainPage= () =>{
    return( 

        <div className ={classes.MainPage} >
                <div  style = {{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../assests/images/bg.jpg')", width:'100%',height:'100%'}}>
   
        <button>REGISTRATI ORA</button>
        <p>o accedi se hai già un account</p>
        </div>
        </div>
    );
}
export default MainPage;