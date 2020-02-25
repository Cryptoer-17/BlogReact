import React, {Component} from 'react';

import classes from './Homepage.module.css';
import Articolo from '../../Components/Articolo/Articolo';



class Homepage extends Component{

render(){

const testo = <p>The continuous evolution of any technology is often accompanied by the greater risks associated with it. 
                 The same happened on the Internet as well. It has been a boon for every existing technology. 
                 Manual working has been greatly reduced with the automation brought about with the internet. 
                 But the Cyber Security threats that are rising with it are certainly impossible to eliminate completely.</p>

return(

<div className = {classes.Homepage}>

<h1>Blog</h1>

<Articolo>
   {testo}
</Articolo>



</div>

);


}

}
export default Homepage;