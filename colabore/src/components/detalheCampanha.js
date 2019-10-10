import React, { Component } from 'react';
import CampanhaApi from '../models/api/campanhaApi'
import Campanha from '../models/campanha'

export default class DetalheCampanha extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campanha: "",
      tags: []
    }
  }
  
  componentDidMount(){
    const campanhaApi = new CampanhaApi();
    this.tags = []
    this.idCampanha = this.props.match.params.idCampanha
    campanhaApi.getCampanhaDetalhes(this.idCampanha).then(campanhaServer => {
      this.campanha = new Campanha(campanhaServer.data.id, campanhaServer.data.usuario, campanhaServer.data.contribuicoes, campanhaServer.data.tags, campanhaServer.data.titulo, campanhaServer.data.descricao, campanhaServer.data.metaArrecadacao, campanhaServer.data.valorArrecadado, campanhaServer.data.expectativaData, campanhaServer.data.conclusaoAutomatica, campanhaServer.data.isConcluida, campanhaServer.data.ultimaModificacao);
      campanhaServer.data.tags.map( tag => {
        this.tags.push(tag.nome)
      })
      
      
      this.setState({campanha: this.campanha, tags: this.tags })
    })
  
  }

  render() {
      return 
    }
  }


