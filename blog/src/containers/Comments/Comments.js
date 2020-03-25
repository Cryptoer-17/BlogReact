import React, { Component } from 'react';
import classes from './Comments.module.css';
import NomePersona from '../../Components/Persona/NomePersona';
import Comment from '../../Components/Articolo/Commento/Commento';
import Messaggio from '../../Components/Articolo/Messagio/Messagio';
import Modal from '../../Components/UI/Modal/Modal';
import EliminaMessaggio from '../../Components/Articolo/EliminaMessaggio/EliminaMessaggio';



class Comments extends Component {
    state={
        showModalDelete: false,
        indexmsg:null
    }

    componentDidMount() {
        if (this.props.articolo.messaggi !== undefined) {
            if (this.props.articolo.messaggi.length > 1) {
                document.getElementById("divCommts").style.height = '400px';
                document.getElementById("divCommts").style.overflow = 'scroll';
            }
        }
    }

    clickModalDelete() {
        this.setState({ showModalDelete: true })
    }
    hideModalDelete() {
        this.setState({ showModalDelete: false })
    }

    modalRemoveComment = (index)=>{
        this.setState({showModalDelete:true})
        this.setState({indexmsg:index})
        //this.props.onUpdateArticolo();
    }

    render() {
        const { clickSendMessage, articolo } = this.props;
        let showModalDelete;
        let tempUserArray = [];
        let colorArray = ['red', 'blue', 'aqua', 'black', 'blueviolet', 'brown', 'chocolate', 'coral', 'chartreuse', 'crimson', 'darkcyan', 'darkgoldenrod', 'darkgreen',
            'darkmagenta', 'darkorange', 'darkred', 'forestgreen', 'gold', 'green', 'indigo', 'lawngreen', 'lime', 'maroon', 'mediumblue']
        articolo.messaggi.map((messaggio) => {
            if (!tempUserArray.includes(messaggio.username)) {
                let colore;
                colore = Math.floor(Math.random() * colorArray.length - 1 + 1)
                tempUserArray.push({ username: messaggio.username, colore: colorArray[colore] })
            }
        })
        let commenti
        if (articolo.messaggi !== undefined) {
            commenti = articolo.messaggi.map((messaggio, index) => {
                return (<div className={classes.Commento} key={index}>
                    <NomePersona userArray={tempUserArray}>{messaggio.username}</NomePersona>
                    <Comment>
                        {messaggio.testo}
                    </Comment>
                     {messaggio.username === localStorage.getItem("username") ? <i className="material-icons" onClick = {()=>this.modalRemoveComment(index)}>close</i> : null}
                    
                </div>)
            })
        } else commenti = null;

        if (this.state.showModalDelete) {
        showModalDelete = <Modal show={this.state.showModalDelete}><EliminaMessaggio {...this.props} cmpDidMount={this.props.cmpDidMount} indexmsg={this.state.indexmsg} articolo={articolo} hideModal={() => this.hideModalDelete()} /*mount={this.props.mount}*/ /></Modal>
        console.log(showModalDelete);
        }
        return (
            //ritornare il modal da renderizzare
            <div id="parentDiv" className={classes.ContitoreMessaggi}>
                {showModalDelete}
                <div id="divCommts" className={classes.Commenti} >
                    {commenti}
                </div>
                <Messaggio clickSendMessage={clickSendMessage} />
            </div>
        );
    }
}


export default Comments;