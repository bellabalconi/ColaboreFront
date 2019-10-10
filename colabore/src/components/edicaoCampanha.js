import React, { Component } from 'react';
import CampanhaApi from '../models/api/campanhaApi'
import Campanha from '../models/campanha'
import FormCampanha from './shared/formCampanha/formCampanha';

export default class EdicaoCampanha extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  editarCampanha = (idUsuario, tags, titulo, descricao, metaArrecadacao, expectativaData, conclusaoAutomatica) => {
    let campanhaEditada= new Campanha();
    campanhaEditada.editarCampanha(this.state.campanha.id, idUsuario, tags, titulo, descricao, metaArrecadacao, expectativaData, conclusaoAutomatica).then( res => {
      if(res.status === 200){
        this.props.history.push('/campanhas')
      }
      else{
        alert("Houve um erro ao salvar sua campanha, tente novamente")
      }
    })
  }

  componentDidMount(){
    const campanhaApi = new CampanhaApi();
      campanhaApi.getCampanhaDetalhes(this.props.match.params.id).then(campanhaServidor => {
        this.setState({
          campanha:  new Campanha(campanhaServidor.data.id, campanhaServidor.data.usuario, campanhaServidor.data.contribuicoes, campanhaServidor.data.tags, campanhaServidor.data.titulo, campanhaServidor.data.descricao, campanhaServidor.data.metaArrecadacao, campanhaServidor.data.valorArrecadao, campanhaServidor.data.expectativaData, campanhaServidor.data.expectativaDataString, campanhaServidor.data.isConclusaoAutomatica)
        })
      })
  }

  render() {
      return (   
        !this.state.campanha ?
        <h2>Aguarde ...</h2> :
      (<FormCampanha campanhaDados={this.state.campanha} funcLidarDados = {this.editarCampanha}></FormCampanha>)
      )
    }
  }






