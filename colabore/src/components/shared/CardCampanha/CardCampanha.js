import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CardCampanha.css'

import NumberFormat from 'react-number-format';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Modal, ModalHeader,
    ModalBody, ModalFooter, Input
} from 'reactstrap';
import UsuarioApi from '../../../models/api/usuarioApi';
import Contribuicao from '../../../models/contribuicao'
import CampanhaApi from '../../../models/api/campanhaApi';
import Button from '../button/Button'

export default class CardCampanha extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            nextModal: false,
            usuariosContribuintes: [],
            doacao: '',
            campanha: this.props.campanha,
            id: this.props.campanha.id,

        }
    }

    componentDidMount() {
        const { campanha } = this.props
        const usuarioApi = new UsuarioApi();
        console.log(campanha)
        usuarioApi.buscarContribuintesDeCampanha(campanha.id).then(usuariosServidor => {
            this.setState({
                usuariosContribuintes: usuariosServidor.data
            })
        })
        

        const campanhaApi = new CampanhaApi();
        campanhaApi.getCampanhaDetalhes(campanha.id).then(campanhaServidor => {
            console.log(campanhaServidor.data)
            this.setState({
                titulo: campanhaServidor.data.titulo,
                descricao: campanhaServidor.data.descricao,
                metaArrecadacao: campanhaServidor.data.metaArrecadacao,
                metaArrecadacaoString: campanhaServidor.data.metaArrecadacaoString,
                isConcluida: campanhaServidor.data.isConcluida,
                expectativaDataString: campanhaServidor.data.expectativaDataString,
                valorArrecadado: campanhaServidor.data.valorArrecadado,
                valorArrecadadoString: campanhaServidor.data.valorArrecadadoString,
                tags: campanhaServidor.data.tags,
                ultimaModificacao: campanhaServidor.data.ultimaModificacao,
                criador: campanhaServidor.data.usuario
            })
        })

        campanhaApi.pegarImagem(this.state.imagem).then(imagemServidor => {
            this.setState({
                imagem: imagemServidor
            })
        })
    }

    tags = () => {
        const listaTags = this.props.campanha.tags.map(tag =>
            <p style={{ fontSize: '15px' }}>  {tag.nome}  </p>
        )
        return listaTags
    }

    metaConcluida = () => {
        //const { campanha } = this.props
        if (this.state.metaArrecadacao <= this.state.valorArrecadado) {
            return (
                <CardText style={{ textAlign: 'center', width: '100%', backgroundColor: 'green', margin: '0', borderTopRightRadius: '14px' }} >
                    Meta concluida
                </CardText>
            )
        }
    }

    valoresCampanha = (cor) => {
        // const metaString = this.props.campanha.metaArrecadacaoString
        // const arrecadadoString = this.props.campanha.valorArrecadadoString
        // console.log('Valor string: ' + arrecadadoString)
        return (
            <Card>
                <CardText
                    style={{ width: '100%', textAlign: 'center' }} >
                    Meta: {this.state.metaArrecadacaoString}
                </CardText>
                <CardText style={{ width: '100%', backgroundColor: cor, textAlign: 'center' }}>
                    Arrecadado: {this.state.valorArrecadadoString}
                </CardText>
            </Card>
        )
    }

    corValor = () => {
        //const { campanha } = this.props
        const meta = this.state.metaArrecadacao
        const arrecadado = this.state.valorArrecadado
        console.log("aaaaaaaaa" + this.state.valorArrecadado)
        if ((meta * 0.8) < arrecadado) {
            return this.valoresCampanha('green')
        }
        if (arrecadado < (meta * 0.3)) {
            return this.valoresCampanha('red')
        }
        else { return this.valoresCampanha('orange') }
    }

    valorInputDoacao = e => {
        this.setState({
            doacao: e.target.value
        })
    }

    enviarDoacao = () => {
        const { doacao } = this.state
        //const { campanha } = this.props
        let contribuicao = new Contribuicao()
        contribuicao.salvarContribuicao(doacao, localStorage.getItem("idUsuario"), this.state.id).then(res => {
            console.log(res)
            this.setState({
                valorArrecadado: res.data.valorArrecadado,
            })
        })
    }


    checarSeCriouCampanha = () => {
        console.log( localStorage.getItem("idUsuario") )
        console.log( this.state.id )
        return (
            <React.Fragment>
                {localStorage.getItem("idUsuario") == this.state.criador.id ?
                    <div style={{display: "inline-block"}}>
                        
                        <Button textoBotao= "Editar Campanha" link = {`/edicaoCampanha/${this.state.id}`} dadosNavegacao = {this.props.campanha.tags} >Editar Campanha</Button>
                        <Button textoBotao="Fechar" corBotao = "vermelho" funcBotao={this.toggle}>Fechar</Button>
                    </div>
                    :
                    <div>
                        <Input
                            onChange={this.valorInputDoacao} />
                        {/* <NumberFormat className={"input-meta"} thousandSeparator={'.'}
                            prefix={'R$'} 
                            decimalSeparator={','} decimalScale={2}
                            fixedDecimalScale={true} isNumericString={true}
                            onChange = { this.valorInputDoacao }
                            /> */}
                        <Button textoBotao="Colabore!"  funcBotao={this.enviarDoacao}>Colabore!</Button>
                        <Button textoBotao="Fechar" corBotao="vermelho" funcBotao={this.toggle}>Fechar</Button>
                    </div>
                }
            </React.Fragment>
        )
    }

    listaDeUsuariosContribuintes = () => {
        const { usuariosContribuintes } = this.state
        console.log(usuariosContribuintes)
        const lista = usuariosContribuintes.map(usuario =>
            <div>{usuario.nome}</div>
        )
        return lista
    }

    modalDetalhesCampanha = () => {
        const { modal, usuariosContribuintes } = this.state
        const { campanha } = this.state
        return (
            <React.Fragment>
                <Modal isOpen={modal}>
                    <ModalHeader toggle={this.toggle}>
                    
                        <img src={'https://picsum.photos/g/200/300/'}></img>
                    
                        
                        <div>
                            {this.state.titulo}
                        </div>
                        <div> Meta: {this.state.metaArrecadacaoString} </div>
                    </ModalHeader>
                    <ModalBody>
                        {this.state.descricao}
                    </ModalBody>
                    <ModalFooter>
                        <Button textoBotao={"Contribuintes:"+this.state.usuariosContribuintes.length} funcBotao={this.nextToggle} corBotao="azul">
                            <CardText>Contribuintes: </CardText>
                            {this.state.usuariosContribuintes.length}
                        </Button>
                        <Modal isOpen={this.state.nextModal} toggle={this.nextToggle} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>Contribuintes</ModalHeader>
                            <ModalBody>{this.listaDeUsuariosContribuintes(this)}</ModalBody>
                            <ModalFooter>
                                <Button textoBotao="Fechar" funcBotao={this.nextToggle}>Fechar</Button>
                            </ModalFooter>
                        </Modal>
                        {/* <CardText>
                            {this.tags(this)}
                        </CardText> */}
                        {this.checarSeCriouCampanha(this)}
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    nextToggle = () => {
        this.setState({
            nextModal: !this.state.nextModal
        })
    }

    render() {
        const { campanha } = this.props
        return (
            <React.Fragment>
                {!this.state.titulo ?
                    <h2>Aguarde...</h2>
                    :
                    <Card outline color="success" style={{ borderRadius: "2px 15px" }} xs="3">
                        {this.metaConcluida(this)}
                        <CardImg onClick={this.toggle} style={{ borderRadius: "2px 15px", cursor: 'pointer' }} top width="100%" src={this.state.imagem ? this.state.imagem : 'https://picsum.photos/g/200/300/'} alt="Card image cap" />
                        {this.modalDetalhesCampanha(this)}
                        <CardBody>
                            {this.corValor(this)}
                            <CardTitle style={{ fontWeight: 'bold' }}>{this.state.titulo}</CardTitle>
                            <CardSubtitle>{this.state.expectativaDataString}</CardSubtitle>
                            {/* {<CardText>{ campanha.descricao ? campanha.descricao : "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."}</CardText>} */}
                            <CardText>
                                {this.tags(this)}
                            </CardText>
                            <p> Criador: {campanha.usuario.nome}</p>
                            <CardText>
                                <p> Ultima data de edição: {this.state.ultimaModificacao}</p>
                            </CardText>
                        </CardBody>
                    </Card>
                }

            </React.Fragment>
        )
    }
}

CardCampanha.propTypes = {
    campanha: PropTypes.object,
    funcaos: PropTypes.func
}