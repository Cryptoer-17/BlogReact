import React, {Component} from 'react';
import Tag from '../../Components/Tag/Tag';
import checkValidity from '../../utility/validation';
import classes from './Modifica.module.css';


class Modifica extends Component{

    state = {
        form :{
            titolo :{ 
                type: "text",
                value:"",
                validation:{
                required:true},
                touched:false,
                valid:false,
                config:{
                placeholder: "Titolo *",
                autoFocus:true
                }
            },
            sottotitolo : { 
                type: "text",
                value:"",
                touched:false,
                valid:true,
                config:{
                placeholder: "Sottotitolo"}
            },
            testo :{ 
                type: "textarea",
                value:"",
                touched:false,
                valid:false,
                validation:{
                    required:true},
                    config:{
                    placeholder: "Scrivi qualcosa...  *"
                    }
            },
            categoria: { 
                type: "text",
                value:"",
                touched:false,
                valid:false,
                validation:{
                    required:true},
                config:{
                placeholder: "Categoria *"}
            },
            descrizione: { 
                type: "text",
                value:"",
                touched:false,
                valid:true,
                config:{
                placeholder: "Breve descrizione dell'articolo"
                 }
            },
        },
        tagInput:"",
        tags : [],
        tagsList:[],
        img : null,
        anteprimaImg:null,
        isFormValid : false,
        show:false
    }

    countWordsHandler = (testo) =>{
        let minuti = 0;
        let parole = testo.trim().split(' ').length;
          for(let i = 0; i < parole; i++){
              if(i%100 === 0 && i>1)
              minuti++;
          }
      return minuti;
      }


      
addTagHandler = (tag) =>{
    let tagsList = [...this.state.tagsList];
    let tags = this.state.tags;
    if(tags.indexOf(tag) < 0 && tags.length < 15 && tag.length>0){
    tagsList.push(<Tag key = {tag} click = {() =>this.deleteTagHandler(tag)}>{tag} </Tag>);
    tags = tags.concat(tag);
    this.setState( { tagsList:tagsList, tags:tags } );
    }
}


deleteTagHandler = (tag) =>{
    let tagsList = [...this.state.tagsList];
    let tags = this.state.tags;
    tags = tags.filter(t => t!== tag);
    tagsList = tagsList.filter(t => t.key !== tag);
    this.setState( { tagsList:tagsList, tags:tags } );
}


 convertFile = (e)=>  { 
        let reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onloadend = () => {
        this.setState({img: reader.result, anteprimaImg: <img src = {reader.result} alt = "" />})
        }
      };
  
  

  publishArticleHandler = async () => {


    const articolo = {
        titolo: this.state.form.titolo.value.trim(),
        sottotitolo: this.state.form.sottotitolo.value.trim(),
        autore: localStorage.getItem("username"),
        testo: this.state.form.testo.value,
        descrizione: this.state.form.descrizione.value.trim(),
        categoria: this.state.form.categoria.value.trim(),
        tags: this.state.tags,
        img: this.state.img,
        data: new Date().toLocaleDateString(),
        minuti: this.countWordsHandler(this.state.form.testo.value),
        userId: localStorage.getItem("userId")
    }
    await this.props.onPostArticolo(articolo);
    
    await setTimeout(() => this.props.onInitArticoli(), 1000 ) ;  
    this.showModal();
    setTimeout(() => this.props.history.push("/") , 3000)  

}


 showModal = () =>{
    this.setState( {show:true} );
}

 hideModal = () =>{
    this.setState( {show:false} );
        }

     
    

checkValidityOfInput = (event, id) =>{

    let newObj = { ...this.state.form[id], value: event.target.value, valid:checkValidity(event.target.value, this.state.form[id].validation), touched:true };
    let newForm = {...this.state.form,  [id]: {...newObj}}
    let formIsValid = true;
    for (let key in newForm) {
        formIsValid = newForm[key].valid && formIsValid;
    }
        this.setState({isFormValid:formIsValid, form: newForm})
    }


    render(){

        const {form} = this.state;


        const formData = [];
        for(let key in  form){
            formData.push( {id: key , obj:  form[key] });
        };



        return (
            <div className={classes.ModificaArticolo}>
                <h2>Modifica articolo</h2>

            </div>
        );
    }
}

export default Modifica;