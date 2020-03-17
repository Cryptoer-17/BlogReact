import React, {Component} from 'react';


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


    render(){

        return <p>OK</p>
    }
}

export default Modifica;