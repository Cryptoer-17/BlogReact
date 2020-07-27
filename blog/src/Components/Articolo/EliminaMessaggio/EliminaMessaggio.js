import React, {  } from 'react';
import classes from './EliminaMessaggio.module.css';

import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';


const EliminaMessaggio = (props) => {

    

    const clickBtnSi = () => {
        const id = props.match.params.id;
        console.log(props.articolo)
        console.log(props.indexmsg);

        let messageUpdate=[...props.articolo.messaggi];
        messageUpdate.splice(props.indexmsg,1)

        let updateArticolo={
            ...props.articolo,
            messaggi:messageUpdate
        }
        console.log(updateArticolo);
        props.onUpdateArticolo(updateArticolo,id);
        props.hideModal();
        setTimeout(() => {
            props.cmpDidMount();
        }, 300);
       
    }
    return (
        <div>
            {props.loading ? <Spinner /> : null}
            <p>SEI SICURO DI VOLER ELIMINARE IL MESSAGGIO?</p>
            <button className={classes.ButtonDelete} onClick={clickBtnSi}>SI</button>
            <button className={classes.ButtonNoDelete} onClick={props.hideModal}>NO</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.articolo.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateArticolo: (articolo, idArticolo) => dispatch(actions.updateArticolo(articolo, idArticolo)),
        onInitArticoli: () => dispatch(actions.initArticoli()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(EliminaMessaggio);