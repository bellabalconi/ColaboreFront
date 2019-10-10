import React, { Component } from 'react';
import Header from './shared/header/header';
import { Container, CardColumns, CardTitle  } from 'reactstrap'
import ListaCampanhas from './listaCampanhas';
import CampanhaApi from '../models/api/campanhaApi';
import CardCampanha from './shared/CardCampanha/CardCampanha';

// const contribuicoes = [{
//     id: 1,
//     valor: 200,
//     contribuinte: { id: 1 }, 
//     campanha: { id: 1 }
//   },
//   {
//     id: 2,
//     valor: 300,
//     contribuinte: { id: 1 },
//     campanha: { id: 2 }
//   },
//   {
//     id: 3,
//     valor: 400,
//     contribuinte: { id: 2 },
//     campanha: { id: 2 }
//   }]

// const campanhas = [{
//   id: 1,
//   usuario: "Bruno",
//   contribuicoes: [{
//       id: 1
//     }],
//   titulo: "Quero um sorvete",
//   descricao: "Faz muito tempo que não degusto um",
//   expectativaDataString: "23/05/2019",
//   metaArrecadacao: 2222,
//   valorArrecadado: 1000,
//   metaArrecadacaoString: "R$222,20",
//   valorArrecadadoString: "R$100,00",
//   conclusaoAutomatica: false,
//   ultimaModificacao: "10/02/2009",
//   img: "https://picsum.photos/200/300/?random",
//   tags: [ { id: 1, nome: "Comida" }, { id: 2, nome: "Sorvete" }, { id: 3, nome: "Cultura" } ]
// },
// {
//   id: 2,
//   usuario: "Daniela",
//   contribuicoes: [{
//       id: 2
//     },
//     {
//       id: 3
//     }],
//   titulo: "Quero um livro",
//   descricao: "Quero ler, ler, ler, ler, ler e ler",
//   expectativaDataString: "20/05/2030",
//   metaArrecadacao: 3025,
//   valorArrecadado: 5000,
//   metaArrecadacaoString: "R$3025,00",
//   valorArrecadadoString: "R$5000,00",
//   conclusaoAutomatica: false,
//   ultimaModificacao: "10/02/2009",
//   img: "https://picsum.photos/200/300/?gravity=east",
//   tags: [ { id: 1, nome: "Leitura" }, { id: 2, nome: "Cultura" } ]
// },
// {
//   id: 3,
//   usuario: "Iza",
//   contribuicoes: [{

//   }],
//   titulo: "Note dos guri",
//   descricao: "Tenho o desejo de jogar até cair me ajude a realizar esse sonho",
//   expectativaDataString: "02/02/2020",
//   metaArrecadacao: 10,
//   valorArrecadado: 1,
//   metaArrecadacaoString: "R$10,00",
//   valorArrecadadoString: "R$1,00",
//   conclusaoAutomatica: false,
//   ultimaModificacao: "10/02/2009",
//   img: "https://picsum.photos/200/300",
//   tags: [ { id: 1, nome: "Computador" }, { id: 2, nome: "Cultura" } ]
// }
// ]

// const usuarios = [ 
//   { id: 1, name: "Bruno", UmaPalavra: "Xavrauuuuu", img: "https://picsum.photos/200/300/?random", },
//   { id: 2, name: "Dani", UmaPalavra: "Vruuuuummmm", img: "https://picsum.photos/200/300", },
//   { id: 3, name: "Bella", UmaPalavra: "Spoiler", img: "https://picsum.photos/200", },
//   { id: 4, name: "Slade", UmaPalavra: "Miau", img: "https://picsum.photos/200/300/?gravity=east", texto: "Sou um gato feliz", }]

export default class TelaListaContribuicoes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      campanhas: [],
      metasAtingidas: 0,
      metasNaoAtingidas: 0
    }
  }

  componentDidMount(){
    const campanhaApi = new CampanhaApi();
    campanhaApi.getCampanhasPorContribuinte(localStorage.getItem("idUsuario")).then( campanhasServidor => {
      this.setState({
        campanhas: campanhasServidor.data
      })
    })
  }

  filtrarCampanhas = ( campanha, metaAtingida ) => {
    const meta = campanha.metaArrecadacao
    const arrecadado = campanha.valorArrecadado
    if((meta < arrecadado) && (metaAtingida)) {
      return campanha
    }
    if((meta > arrecadado) && (!metaAtingida)) {
      return campanha
    }
  }

  listagemCampanhasFiltradas = ( metaAtingida ) => {
    const { campanhas } = this.state
    const lista = campanhas.filter( campanha => this.filtrarCampanhas( campanha, metaAtingida ) )
      .map( campanha => <CardCampanha key={ campanha.id } campanha={ campanha } /> )
    return lista  
  }

  render() {
      return (
        <React.Fragment>
          <Header/>
          <Container style={{ paddingTop: '80px', maxWidth: '700px', minWidth: '20px' }}> 
              {/* <CardTitle  >Metas não atingidas</CardTitle> */}
            <CardColumns>
              { this.listagemCampanhasFiltradas( false ) }
            </CardColumns>
              {/* <CardTitle>Metas atingidas</CardTitle> */}
            <CardColumns>
              { this.listagemCampanhasFiltradas( true ) }
            </CardColumns>
          </Container>
        </React.Fragment>
      )
    }
  }


