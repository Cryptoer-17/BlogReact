import React, { Component } from 'react';
import Tag from '../Tag/Tag';
import checkValidity from '../../utility/validation';
import classes from './Modifica.module.css';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import * as moment from 'moment';
class Modifica extends Component {
    state = {
        form: {
            titolo: {
                type: "text",
                value: "",
                validation: {
                    required: true
                },
                touched: false,
                valid: false,
                config: {
                    placeholder: "Titolo *",
                    autoFocus: true
                }
            },
            sottotitolo: {
                type: "text",
                value: "",
                touched: false,
                valid: true,
                config: {
                    placeholder: "Sottotitolo"
                }
            },
            testo: {
                type: "textarea",
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: true
                },
                config: {
                    placeholder: "Scrivi qualcosa...  *"
                }
            },
            categoria: {
                type: "text",
                value: "",
                touched: false,
                valid: false,
                validation: {
                    required: true
                },
                config: {
                    placeholder: "Categoria *"
                }
            },
            descrizione: {
                type: "text",
                value: "",
                touched: false,
                valid: true,
                config: {
                    placeholder: "Breve descrizione dell'articolo"
                }
            },
        },
        loading: false,
        tagInput: "",
        tags: [],
        tagsList: [],
        img: null,
        anteprimaImg: null,
        isFormValid: false,
        show: false,
        messaggi: null
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        const token = localStorage.getItem("token");
        this.setState({ loading: true });
        let config = {
            headers: {
                authorization: 'Bearer '+ token,
            }
          }
        axios.get('http://localhost:4001/articolo/' + id,config)
            .then(response => {
                /*  if (typeof response.data.tags === 'undefined'){
                      response.data.tags = [];
                  }*/
                  console.log(response);
                  console.log(response.data[0].sottotitolo);
                let form = {
                    titolo: {
                        type: "text",
                        value: "" + response.data[0].titolo + "",
                        validation: {
                            required: true
                        },
                        touched: false,
                        valid: false,
                        config: {
                            placeholder: "Titolo *",
                            autoFocus: true
                        }
                    },
                    sottotitolo: {
                        type: "text",
                        value: "" + response.data[0].sottotitolo + "",
                        touched: false,
                        valid: true,
                        config: {
                            placeholder: "Sottotitolo"
                        }
                    },
                    testo: {
                        type: "textarea",
                        value: "" + response.data[0].testo + "",
                        touched: false,
                        valid: false,
                        validation: {
                            required: true
                        },
                        config: {
                            placeholder: "Scrivi qualcosa...  *"
                        }
                    },
                    categoria: {
                        type: "text",
                        value: "" + response.data[0].categoria + "",
                        touched: false,
                        valid: false,
                        validation: {
                            required: true
                        },
                        config: {
                            placeholder: "Categoria *"
                        }
                    },
                    descrizione: {
                        type: "text",
                        value: "" + response.data[0].descrizione + "",
                        touched: false,
                        valid: true,
                        config: {
                            placeholder: "Breve descrizione dell'articolo"
                        }
                    }
                }
                this.setState({
                    form: form,
                    tags: (response.data.tags === undefined ? [] : response.data[0].tags)
                })
                const updateTags = [...this.state.tags]
                let tagsList = [];
                console.log(updateTags)
                updateTags.map((tag) => {
                    tagsList.push(<Tag key={tag} click={() => this.deleteTagHandler(tag)}>{tag} </Tag>);
                })
                this.setState({ tagsList: tagsList })
                this.setState({ anteprimaImg: (response.data[0].img === undefined ? null : (<div className={classes.ImgClose}><img src={response.data[0].img} alt="" /><i className="material-icons" onClick={() => this.clickCloseImg()}>close</i></div>)), img: (response.data[0].img === undefined ? null : response.data[0].img) })
                this.setState({ loading: false })
                this.setState({ messaggi: (response.data[0].messaggi === undefined ? [] : response.data[0].messaggi) })
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }
    countWordsHandler = (testo) => {
        let minuti = 0;
        let parole = testo.trim().split(' ').length;
        for (let i = 0; i < parole; i++) {
            if (i % 100 === 0 && i > 1)
                minuti++;
        }
        return minuti;
    }
    addTagHandler = (tag) => {
        let tagsList = [...this.state.tagsList];
        let tags = this.state.tags;
        if (tags.indexOf(tag) < 0 && tags.length < 15 && tag.length > 0) {
            tagsList.push(<Tag key={tag} click={() => this.deleteTagHandler(tag)}>{tag} </Tag>);
            tags = tags.concat(tag);
            this.setState({ tagsList: tagsList, tags: tags });
        }
    }
    deleteTagHandler = (tag) => {
        let tagsList = [...this.state.tagsList];
        let tags = this.state.tags;
        tags = tags.filter(t => t !== tag);
        tagsList = tagsList.filter(t => t.key !== tag);
        this.setState({ tagsList: tagsList, tags: tags });
    }
    clickCloseImg() {
        this.setState({
            anteprimaImg: null,
            img: null
        })
        document.getElementById("inputFile").value = null;
    }
    convertFile = (e) => {
        let reader = new FileReader();
        if (e !== undefined) {
            reader.readAsDataURL(e);
            reader.onloadend = () => {
                this.setState({
                    img: reader.result,
                    anteprimaImg: (<div className={classes.ImgClose}><img src={reader.result} alt="" /><i className="material-icons" onClick={() => this.clickCloseImg()}>close</i></div>)
                })
                console.log(reader.result);
            }
        }
    };
    modifyArticleHandler = async () => {
        const id = this.props.match.params.id;
        console.log(new Date().toLocaleDateString());
        const articolo = {
            _id:this.props.match.params.id,
            autore: localStorage.getItem("username"),
            categoria: this.state.form.categoria.value.trim(),
            data: moment(new Date()),
            descrizione: this.state.form.descrizione.value.trim(),
            img: this.state.img,
            like: false,
            messaggi: this.state.messaggi,
            minuti: this.countWordsHandler(this.state.form.testo.value),
            sottotitolo: this.state.form.sottotitolo.value.trim(),
            tags: this.state.tags,
            testo: this.state.form.testo.value,
            titolo: this.state.form.titolo.value.trim(),
            userId: localStorage.getItem("userId")
        }
        console.log(this.state.form.sottotitolo.value.trim());
        this.props.onUpdateArticolo(articolo, id);
        this.setState({ show: true })
        setTimeout(() => {
            if (this.props.esito === "I dati sono stati inviati/modificati con successo.") {
                this.props.mount();
                this.props.history.push("/");
                window.location.reload();
                console.log("fatto tutto ");
            }
        }, 2000)
        /*
        
        await setTimeout(() => this.props.onInitArticoli(), 1000 ) ;  
        this.showModal();
        setTimeout(() => this.props.history.push("/") , 3000)*/
    }
    showModal = () => {
        this.setState({ show: true });
    }
    hideModal = () => {
        this.setState({ show: false });
    }
    checkValidityOfInput = (event, id) => {
        let newObj = { ...this.state.form[id], value: event.target.value, valid: checkValidity(event.target.value, this.state.form[id].validation), touched: true };
        let newForm = { ...this.state.form, [id]: { ...newObj } }
        let formIsValid = true;
        for (let key in newForm) {
            formIsValid = newForm[key].valid && formIsValid;
        }
        this.setState({ isFormValid: formIsValid, form: newForm })
    }
    render() {
        const { form, tagInput, tags, tagsList, anteprimaImg, show } = this.state;
        const { loading, esito } = this.props;
        const formData = [];
        for (let key in form) {
            formData.push({ id: key, obj: form[key] });
        };
        return (
            <div className={classes.ModificaArticolo}>
                <h2>Modifica articolo</h2>
                {formData.map(el =>
                    <Input
                        value={el.obj.value}
                        key={el.id}
                        type={el.obj.type}
                        config={el.obj.config}
                        touched={el.obj.touched}
                        valid={el.obj.valid}
                        changed={(e) => this.checkValidityOfInput(e, el.id)}
                        shouldValidate={el.obj.validation}
                    />
                )}
                <input className={classes.Input} type="text" placeholder="#tag" value={tagInput}
                    onChange={(event) => this.setState({ tagInput: event.target.value })}
                    onKeyPress={event => { if (event.key === 'Enter') { this.addTagHandler(event.target.value); this.setState({ tagInput: "" }) } }} />
                <div className={classes.InputTags}>

                    {tagsList}
                    {tags.length === 15 ? <p><br /> Hai raggiunto il numero massimo di tag consentiti.</p> : null}
                </div>
                <br />
                <hr />
                <div className={classes.InputImg}>
                    <input id="inputFile" type="file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={event => this.convertFile(event.target.files[0])} style={{ display: 'none', visibility: 'hidden', zIndex: '-200' }} />
                    <button className={classes.CaricaImgButton} onClick={() => document.getElementById("inputFile").click()}> <i className="material-icons" style={{ verticalAlign: 'middle' }}>photo_camera</i> Carica una foto</button>
                    {anteprimaImg ? anteprimaImg : null}
                </div>
                <hr />
                <br />
                <button className={classes.PubblicaButton} onClick={this.modifyArticleHandler}> Modifica </button>
                <Modal show={show} modalClosed={this.hideModal} >
                    {!loading ?
                        esito
                        : <Spinner />}
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.articolo.loading,
        esito: state.articolo.esitoCaricamento,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onUpdateArticolo: (articolo, id) => dispatch(actions.updateArticolo(articolo, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modifica);