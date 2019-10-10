import React, { Component } from 'react';
import FormCampanha from './shared/formCampanha/formCampanha';
import Campanha from '../models/campanha'
import CampanhaApi from '../models/api/campanhaApi';

export default class CadastroCampanha extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  cadastrarCampanha = (idUsuario, tags, imagem, titulo, descricao, metaArrecadacao, expectativaData, conclusaoAutomatica) =>{
    const campanhaApi = new CampanhaApi();
    let campanha = new Campanha();
    campanha.salvarCampanha(idUsuario, tags, titulo, descricao, metaArrecadacao, expectativaData, conclusaoAutomatica).then( resCampanha => {
      
      //campanhaApi.salvarFotoCampanha(imagem, resCampanha.data.id)

      if(resCampanha.status === 200){
        this.props.history.push('/campanhas')
      }
      else{
        alert("Houve um erro ao salvar sua campanha, tente novamente")
      }
    })
  }

  render() {
      return (
        <FormCampanha funcLidarDados = {this.cadastrarCampanha}></FormCampanha>
      )
    }
  }


