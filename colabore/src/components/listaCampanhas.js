import React, { Component } from 'react';
import Header from './shared/header/header';
import { ButtonGroup, CardColumns, Container, Input, Button } from 'reactstrap';
import CardCampanha from './shared/CardCampanha/CardCampanha';

import CampanhaApi from '../models/api/campanhaApi'

export default class ListaCampanhas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filtroMeta: " ",
      busca: "",
      campanhas: [],
    }

  }

  componentDidMount() {
    const campanhaApi = new CampanhaApi();
    campanhaApi.getCampanhas().then( campanhas => {
      console.log(campanhas.data)
      this.setState({campanhas: campanhas.data})
    })
  }

  buscador = e => {
    this.setState({ 
      busca: e.target.value 
      })
  }
  
  filtro = campanha => {
    const { busca } = this.state
    let tagsConcat = ''
    campanha.tags.map( tag => tagsConcat += `${tag.nome} ` )
    return campanha.titulo.toLowerCase().includes( busca.toLowerCase() ) 
            || campanha.descricao.toLowerCase().includes( busca.toLowerCase() )
            || tagsConcat.toLowerCase().includes( busca.toLowerCase() )
            || !busca
  }

  filtroMeta = e => {
    const { filtroMeta } = this.state
    if( filtroMeta === e.target.value ) {
      this.setState({
        filtroMeta: " "
      })
      return null
    }
    this.setState({
      filtroMeta: e.target.value
    })
  }

  filtroPorMeta = campanha => {
    const { filtroMeta } = this.state
    const meta = campanha.metaArrecadacao
    const arrecadado = campanha.valorArrecadado
    const isConcluida = campanha.isConcluida
    if((!isConcluida) && (filtroMeta === "naoAtingiuMeta")) {
      return campanha
    }
    if((isConcluida) && (filtroMeta === "atingiuMeta")) {
      return campanha
    }
    if(filtroMeta === " ") {
      return campanha
    }
  }

  ordemData = ( a, b ) => {
    return a.metaArrecadacao - b.metaArrecadacao
  }
 
  // removeCartao = (id) => {
  //   this.setState( { campanhas: this.state.campanhas.filter( campanha => campanha.id !== id )})
  // }

  listagemCampanhas = () => {
    const { campanhas } = this.state

    console.log(campanhas)
    
    const ordemCampanhas = campanhas.sort( this.ordemData )
    const lista = ordemCampanhas.filter( campanha => !campanha.conclusaoAutomatica )
      .filter( campanha => this.filtro(campanha) )
      .filter( campanha => this.filtroPorMeta(campanha) )
      .map( campanha => 
      <CardCampanha key={ campanha.id } campanha={ campanha } /> )
      return lista
  }

  render() {
      const { busca } = this.state
      return (
        !this.state.campanhas ?
        <h2>Aguarde ...</h2> :
        (
        <React.Fragment>
          <Header/>
            <Container style={{ paddingTop: '80px', maxWidth: '700px', minWidth: '20px' }}> 
              <Container>
                <ButtonGroup>
                  <Button className="metas" outline color="success" 
                  onClick={ this.filtroMeta }
                  value={ "atingiuMeta" }>Meta atingida</Button>
                  <Button  className="metas" outline color="success" 
                  onClick={ this.filtroMeta }
                  value={ "naoAtingiuMeta" }>Meta não atingida</Button>
                </ButtonGroup>
              </Container>
              <Input
              type="text"
              onChange={ this.buscador }
              value={ busca }
              placeholder="Faça uma pesquisa" 
              style={{ marginTop: '5px', marginBottom: '10px', textAlign: "center" }}/>
                <CardColumns>
                  { this.listagemCampanhas(this) }
                </CardColumns>
            </Container>
        </React.Fragment>
        )
      )
    }
  }