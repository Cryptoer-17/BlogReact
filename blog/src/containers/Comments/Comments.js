import React, {Component} from 'react';
import classes from './Comments.module.css';
import NomePersona from '../../Components/Persona/NomePersona';
import Comment from '../../Components/Articolo/Commento/Commento';
import Messaggio from '../../Components/Articolo/Messagio/Messagio';

class Comments extends Component{


    clickDiv(){
        {console.log(document.getElementById("divCommts"))}
    }

    render(){
        const {clickSendMessage} = this.props;
        
        
   
        return(
        <div className={classes.ContitoreMessaggi}>
            <div onChange={this.clickDiv} id="divCommts" className={classes.Commenti} >
            {/* <div className={classes.Commento}>
                <NomePersona>Props Nome Persona</NomePersona>
                <Comment>
                    NWERIOFWOIWEFINWEFI  WIENEWI NWEIFIEWN INFIWENF EWN NFN  eiewif
                    iewiiewfiewfefi   jefeiw jewi  weimcimcm mc  cm cm ewccme cmew mc
                    c oewowomcewmwc ocw om ewomweoowemwemomewomcoe emcm
                </Comment>
                </div> 
                <div className={classes.Commento}>
                <NomePersona>Props Nome Persona2</NomePersona>
                <Comment>
                    NWERIOFWOIWEFIN wemomewomcoe emcm
                </Comment>
                </div>
                <div className={classes.Commento}>
                <NomePersona>Props Nome Persona2</NomePersona>
                <Comment>
                    NWERIOFWOIWEFIN wemdsdscmdsmdkckmkmckdmcksdmmkcdskmdcomewomcoe emcm
                    dsincisdkckdndsjkn   id mid mi dsd  sddsmd d dmdii dsmvdis mvdmds 
                    di v idsvidsm sdimvs dimv d dsmvsdmidsmvsdimsimv  imdim dvmi m  d
                </Comment>
                </div>
                <div className={classes.Commento}>
                <NomePersona>Props Nome Persona2</NomePersona>
                <Comment>
                NWERIOFWOIWEFIN wemdsdscmdsmdkckmkmckdmcksdmmkcdskmdcomewomcoe emcm
                    dsincisdkckdndsjkn   id mid mi dsd  sddsmd d dmdii dsmvdis mvdmds 
                    di v idsvidsm sdimvs dimv d dsmvsdmidsmvsdimsimv  imdim dvmi m  
                    dNWERIOFWOIWEFIN wemdsdscmdsmdkckmkmckdmcksdmmkcdskmdcomewomcoe emcm
                    dsincisdkckdndsjkn   id mid mi dsd  sddsmd d dmdii dsmvdis mvdmds 
                    di v idsvidsm sdimvs dimv d dsmvsdmidsmvsdimsimv  imdim dvmi m  
                    dNWERIOFWOIWEFIN wemdsdscmdsmdkckmkmckdmcksdmmkcdskmdcomewomcoe emcm
                    dsincisdkckdndsjkn   id mid mi dsd  sddsmd d dmdii dsmvdis mvdmds 
                    di v idsvidsm sdimvs dimv d dsmvsdmidsmvsdimsimv  imdim dvmi m  
                    dNWERIOFWOIWEFIN wemdsdscmdsmdkckmkmckdmcksdmmkcdskmdcomewomcoe emcm
                    dsincisdkckdndsjkn   id mid mi dsd  sddsmd d dmdii dsmvdis mvdmds 
                    di v idsvidsm sdimvs dimv d dsmvsdmidsmvsdimsimv  imdim dvmi m  
                    dNWERIOFWOIWEFIN wemdsdscmdsmdkckmkmckdmcksdmmkcdskmdcomewomcoe emcm
                    dsincisdkckdndsjkn   id mid mi dsd  sddsmd d dmdii dsmvdis mvdmds 
                    di v idsvidsm sdimvs dimv d dsmvsdmidsmvsdimsimv  imdim dvmi m  d
                </Comment>
                </div> */}    
            </div>    
            <Messaggio clickSendMessage={clickSendMessage}/>
        </div>
        );
       
    }
} 

export default Comments;