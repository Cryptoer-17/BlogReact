import React, {Component} from 'react';
import classes from './Comments.module.css';
import NomePersona from '../../Components/Persona/NomePersona';
import Comment from '../../Components/Articolo/Commento/Commento';
import Messaggio from '../../Components/Articolo/Messagio/Messagio';

class Comments extends Component{

    resizeDivComments(){
        console.log("ok")
    }

    componentDidMount(){
        if(this.props.articolo.messaggi !== undefined){
            if(this.props.articolo.messaggi.length > 1){
                document.getElementById("divCommts").style.height= '400px';
                document.getElementById("divCommts").style.overflow= 'scroll';
            }
        }
    }

    render(){
        const {clickSendMessage,articolo} = this.props;
        let tempUserArray = [];
        let colorArray=['red','blue','aqua','black','blueviolet','brown','chocolate','coral','chartreuse','crimson','darkcyan','darkgoldenrod','darkgreen',
                        'darkmagenta','darkorange','darkred','forestgreen','gold','green','indigo','lawngreen','lime','maroon','mediumblue']
        articolo.messaggi.map((messaggio)=>{
            if(!tempUserArray.includes(messaggio.username)){
                let colore;
               // while (colore.length < 8) {
                  colore = Math.floor(Math.random() * colorArray.length-1 + 1) 
                  console.log(colore)
            //    }
                tempUserArray.push({username:messaggio.username,colore:colorArray[colore]})
            }
        })
        console.log(tempUserArray);

        

        let commenti
        if(articolo.messaggi !== undefined){
        commenti = articolo.messaggi.map((messaggio,index)=>{
            return (<div className={classes.Commento} key={index}>
            <NomePersona userArray={tempUserArray}>{messaggio.username}</NomePersona>
            <Comment>
                {messaggio.testo}
            </Comment>
            </div>)
        }) 
        } else commenti = null;

        return(
        <div id="parentDiv" className={classes.ContitoreMessaggi}>
            <div  id="divCommts" className={classes.Commenti} >
            {commenti}          
            </div>    
            <Messaggio clickSendMessage={clickSendMessage}/>
        </div>
        );  
    }
} 

export default Comments;