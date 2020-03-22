import React, {useState} from 'react';
import Input from '../../UI/Input/Input';
import classes from './Messagio.module.css';

const Messaggio = ()=>{

    const [messaggio, setMessaggio] = useState('');

    const changeMessage = (event)=>{
        setMessaggio(event.target.value)
    }


    return (
        <div>
           <Input type="text" value={messaggio} changed={changeMessage} config={{placeholder:"Scrivi un commento..."}}/>
           <button className={classes.ButtonSend} style={{marginTop:'-30px'}}>INVIA</button>
        </div>
    );

}

export default Messaggio;