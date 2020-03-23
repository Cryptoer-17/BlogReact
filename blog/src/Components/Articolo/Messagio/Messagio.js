import React, {useState} from 'react';
import Input from '../../UI/Input/Input';
import classes from './Messagio.module.css';

const Messaggio = (props)=>{

    const [messaggio, setMessaggio] = useState('');

    const changeMessage = (event)=>{
        setMessaggio(event.target.value)
    }



    return (
        <div>
           <Input type="text" value={messaggio} changed={changeMessage} click={()=>{props.clickSendMessage(messaggio);setMessaggio('')}} config={{placeholder:"Scrivi un commento..."}}/>
           <button className={classes.ButtonSend} onClick={()=>{props.clickSendMessage(messaggio);setMessaggio('')}} style={{marginTop:'-30px'}}>INVIA</button>
        </div>
    );

}

export default Messaggio;