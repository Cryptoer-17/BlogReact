import React, { Component } from 'react';
import classes from './Articolo.module.css';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import ActionBar from '../ActionBar/ActionBar';
import Tag from '../Tag/Tag';
import Info from '../InfoArticolo/InfoArticolo';
import Comments from '../../containers/Comments/Comments';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class Articolo extends Component {
    state = {
        articolo: null,
        loading: false,
        comments: null
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ loading: true })
        axios.get('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json?auth=' + localStorage.getItem("token"))
            .then(response => {
                if (typeof response.data.tags === 'undefined') {
                    response.data.tags = [];
                }
                if (typeof response.data.messaggi === 'undefined') {
                    response.data.messaggi = [];
                }
                this.setState({ articolo: response.data })
                this.setState({ loading: false })
            })
            .catch(error => {

                this.setState({ loading: false })
            });
    }
    clickHeartHandler() {
        let length = this.state.articolo.like.length;
        console.log(length)
        let c = 0;
        let heartChange = this.state.articolo.like.map((object) => {
            if (object.username === localStorage.getItem("username")) {
                object.like = !object.like
            }
            else {
                c++;
            }
            return object
        })
        if (c === length) {
            heartChange.push({ like: true, username: localStorage.getItem("username") })
        }
        const anteprima = {
            ...this.state.articolo
        }
        this.setState({
            articolo: anteprima
        })
        const id = this.props.match.params.id;
        axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json?auth=' + localStorage.getItem("token"), anteprima)
            .then(response => {
                console.log(response)
                this.props.onInitArticoli();
            })
            .catch(error => console.log(error));
    }
    handlerSendMessage = (props) => {
        let messaggio;
        const messaggi = [
            ...this.state.articolo.messaggi,
            messaggio = {
                username: localStorage.getItem("username"),
                testo: props
            }
        ]
        const anteprima = {
            ...this.state.articolo,
            messaggi: messaggi,
        }
        this.setState({
            articolo: anteprima
        })
        const id = this.props.match.params.id;
        axios.put('https://blog-monika-andrea.firebaseio.com/articoli/' + id + '.json?auth=' + localStorage.getItem("token"), anteprima)
            .then(response => {
                this.props.onInitArticoli();
            })
            .catch(error => console.log(error));
    }
    viewCommentsHandler() {
        this.setState({ comments: true })
        setTimeout(() => {
            window.scrollTo(0, 9999)
        }, 1);
    }
    render() {
        const { articolo, loading } = this.state;
        let articoloVisualizzato;
        let colore = 'black';
        let tags;
        if (articolo !== null) {
            if (articolo.tags.length) {
                const newtags = [...articolo.tags];
                tags = newtags.map((tag, index) => {
                    return (
                        <div className={classes.Tag} key={index}>
                            <Tag>{tag}</Tag>
                        </div>
                    );
                })
            }
            articolo.like.map((object) => {
                if (object.username === localStorage.getItem("username")) {
                    if (object.like) {
                        colore = 'red';
                    }
                }
            })
            articoloVisualizzato =
                <div className={classes.Articolo}>
                    <Info className={classes.Info} autore={articolo.autore} categoria={articolo.categoria} data={articolo.data} tempoLettura={articolo.minuti} />
                    <div className={classes.Titolo}>
                        <h1>{articolo.titolo}</h1>
                    </div>
                    <div className={classes.Sottotitolo}>
                        <p>{articolo.sottotitolo} </p>
                    </div>
                    <div>
                    </div>
                    <div className={classes.Imgdiv}>
                        {articolo.img ? <img className={classes.Img} src={articolo.img} alt="" /> : null}
                    </div>
                    <div className={classes.Testo}>
                        <p>{articolo.testo}</p>
                    </div>
                    <div className={classes.TagContainer}>
                        {tags}
                    </div>
                    <ActionBar className={classes.Action} color={colore} disableMore={true} viewComments={() => this.viewCommentsHandler()} onClick={() => this.clickHeartHandler()} />
                </div>
        }
        if (loading) {
            articoloVisualizzato = <Spinner />;
        }
        let error;
        if (this.props.error === "Auth token is expired") {
            console.log("ok");
            error = document.getElementById("btnLoginLogout").click()
        }
        return (
            <div >
                {articoloVisualizzato}
                {this.state.comments && <Comments articolo={articolo} clickSendMessage={this.handlerSendMessage} />}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        error: state.articolo.error,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onInitArticoli: () => dispatch(actions.initArticoli()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Articolo);