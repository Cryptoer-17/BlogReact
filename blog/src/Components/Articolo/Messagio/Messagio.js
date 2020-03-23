import React, {useState} from 'react';
import Input from '../../UI/Input/Input';
import classes from './Messagio.module.css';
import Username from '../../../containers/Username/Username';

const Messaggio = (props)=>{

    const [messaggio, setMessaggio] = useState('');
    const [showUsername,setShowUsername] = useState(false);

    const changeMessage = (event)=>{
        setMessaggio(event.target.value)
    }


    const showUsernameModal = () => {
        setShowUsername(!showUsername);
    
    }
    
    


    return (
        <div>
            <Username show ={showUsername} modalClosed ={showUsernameModal}/>
           <Input type="text" value={messaggio} changed={changeMessage} click={(localStorage.getItem("username")? ()=>{props.clickSendMessage(messaggio);setMessaggio('')}: ()=>showUsernameModal())} config={{placeholder:"Scrivi un commento..."}}/>
           <button className={classes.ButtonSend} onClick={  (localStorage.getItem("username")? ()=>{props.clickSendMessage(messaggio);setMessaggio('')} : ()=>showUsernameModal())} style={{marginTop:'-30px'}}>INVIA</button>
        </div>
    );

}

export default Messaggio;