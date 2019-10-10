import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TagApi from '../../../models/api/tagApi'
import Stepper from 'react-stepper-horizontal';
import '../../../App.css'
import './formCampanha.css'
import Button from '../button/Button'
import Input from '../input/input'
import ImageUploader from 'react-images-upload';
import { WithContext as ReactTags } from 'react-tag-input';
import Header from '../header/header'
import NumberFormat from 'react-number-format';



const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


export default class FormCampanha extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passoAtivo: 0,
      conclusaoAutomatica: "sim",
      imagem: [],
      tags: [],
      suggestions: [
        { id: 'Rifas', text: 'Rifas' },
        { id: 'Doações', text: 'Doações' },
        { id: 'Livros', text: 'Livros' },
        { id: 'Roupas', text: 'Roupas' },

      ]
    }
  }

  componentDidMount() {
    this.tags = this.state.suggestions

    const tagApi = new TagApi();
    tagApi.getTodasTags().then(tagsServidor => {
      tagsServidor.data.map(tag => {
        if (tag.nome !== undefined) {
          return this.tags.push({ id: tag.nome, text: tag.nome })
        }
        return
      })
      this.setState({ suggestions: this.tags })
    })

    if (this.props.campanhaDados) {

      const { campanhaDados } = this.props
      let conclusao;
      campanhaDados.isConclusaoAutomatica ? conclusao = "sim" : conclusao = "nao"

      let tagsFormatadas = []
      campanhaDados.tags.map(tag => {
        return tagsFormatadas.push({ id: tag.nome, text: tag.nome })
      })
      let metaString = parseFloat(campanhaDados.metaArrecadacao)
      this.setState({
        titulo: campanhaDados.titulo,
        descricao: campanhaDados.descricao,
        metaArrecadacao: campanhaDados.metaArrecadacao,
        metaFormatada:metaString,
        expectativaData: campanhaDados.expectativaDataString,
        tags: tagsFormatadas,
        conclusaoAutomatica: conclusao
      })
    }
  }

  handleTitulo = valor => {
    this.setState({ titulo: valor });
  };

  handleMeta = valor => {
    this.setState({ metaArrecadacao: valor.floatValue });
  };

  handleRadio = event => {
    this.setState({ conclusaoAutomatica: event.target.value });
  };

  handleDescricao = event => {
    this.setState({ descricao: event.target.value });
  }

  handleData = valor => {
    this.setState({ expectativaData: valor });
  };

  onDrop = picture => {
    this.setState({
      imagem: this.state.imagem.concat(picture),
    });
  }

  handleNext = () => {
    this.setState(state => ({
      passoAtivo: state.passoAtivo + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      passoAtivo: state.passoAtivo - 1,
    }));
  };

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  salvar = () => {
    const { funcLidarDados } = this.props
    let valorConclusao;
    this.state.conclusaoAutomatica === "sim" ? valorConclusao = true : valorConclusao = false
    const formData = new FormData();
    formData.append('file', this.state.imagem[0])
    funcLidarDados(localStorage.getItem("idUsuario"), this.state.tags, formData, this.state.titulo, this.state.descricao, this.state.metaArrecadacao, this.state.expectativaData, valorConclusao)
  }

  conteudoStepper = (passoAtivo) => {
    switch (passoAtivo) {
      case 0:
        return (
          <div>
            <div>
              <label className="nome-campo required">Título</label>
              <Input type="text" atualizarValor={this.handleTitulo} valorCampo={this.state.titulo} ></Input>
            </div>
            <div>
              {/* https://www.npmjs.com/package/react-number-format */}
              <label className="nome-campo required" value={this.props.metaArrecadacao}>Meta de Arrecadação </label>
              <div>
                <NumberFormat
                className={"input-meta"}
                thousandSeparator={'.'}
                prefix={'R$'}
                onValueChange={this.handleMeta}
                decimalSeparator={','} decimalScale={2}
                fixedDecimalScale={true}
                isNumericString = {true}
                value={this.state.metaArrecadacao} 
                />
              </div>
              
            </div>
            <div>
              <label className="nome-campo">Ao atingir a meta deseja concluir a campanha?</label>

              <label className="radio-input-label">
                <input type="radio" name="react-tips" value="sim" checked={this.state.conclusaoAutomatica === "sim"} onChange={this.handleRadio} className="radio-input" />
                Sim
              </label>
              <label className="radio-input-label">
                <input type="radio" name="react-tips" value="nao" checked={this.state.conclusaoAutomatica === "nao"} onChange={this.handleRadio} />
                Não
              </label>

            </div>
            <label className="nome-campo required" value={this.props.descricao}>Descrição</label>
            <div>
              <textarea value={this.state.descricao} onChange={this.handleDescricao} className="descricao"></textarea>
            </div>
            <div>
              <Input type="text" mensagemCampo="Expectativa de Data" placeholder="02/05/2019" atualizarValor={this.handleData} valorCampo={this.state.expectativaData}></Input>
            </div>
            <small>*Campos Obrigatórios</small>
          </div>
          
        )
        

      case 1:
        return (
          <div className="upload-imagem">
            {/* https://www.npmjs.com/package/react-images-upload */}
            {/* Para alterar o backgroung: /Users/daniela/Documents/vemser/colabore-front/colabore/node_modules/react-images-upload/index.css */}
            <ImageUploader
              withIcon={true}
              withPreview={true}
              buttonText='Escolha uma imagem'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png']}
              maxFileSize={5242880}
              singleImage={true}
              withLabel={true}
              label="Escolha uma imagem de tamanho máximo de 5mb e nos formatos .jpg ou .png"
              labelStyles={{ "color": "#686765", "fontSize": "24px" }}
              buttonStyles={{
                "border": "none", "color": "white", "bordeRadius": "10px", "padding": "15px 32px", "margin": "10px 10px",
                "cursor": "pointer", "backgroundColor": "rgba(89, 201, 165, 100)", "fontWeight": "bold"
              }}
            />
          </div>
        )

      case 2:
        return (
          <div>
            <p className="tags-titulo nome-campo" >Adicione pelo menos uma tag para sua campanha:</p>
            <ReactTags
              inline={true}
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              delimiters={delimiters}
              autocomplete={true}
              allowDeleteFromEmptyInput={false}
              allowDragDrop={false}
              placeholder="Adicione uma Tag"
              inputFieldPosition="top"
            />
          </div>
        )
      default:
        return;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <div className="container">
          <section>
            <h1 className="titulo-tela">Cadastro de Campanha</h1>
          </section>

          <div className="stepper">
            {/* https://www.npmjs.com/package/@zbuttram/react-stepper-horizontal */}
            <Stepper steps={[{ title: 'Informações' }, { title: 'Banner' }, { title: 'Tags' }]}
              activeStep={this.state.passoAtivo}
              activeColor={"#59c9a5"}
              completeColor={"#54c242"}
              completeBarColor={"#a0da95"}
            />
          </div>
          <section className="content ">
            {this.conteudoStepper(this.state.passoAtivo)}
          </section>

          <div className="botoes">
            {this.state.passoAtivo === 0 &&
              <Button
                funcBotao={this.handleNext}
                textoBotao={"Próximo"}
                corBotao={"azul"}
                desabilitado={!this.state.titulo || !this.state.metaArrecadacao || !this.state.descricao}
              />
            }
            {this.state.passoAtivo === 1 &&
              <div>
                <Button
                  funcBotao={this.handleBack}
                  textoBotao={"Anterior"}
                  corBotao={"verde"}
                />
                <Button
                  funcBotao={this.handleNext}
                  textoBotao={"Próximo"}
                  corBotao={"azul"}
                />
              </div>

            }
            {this.state.passoAtivo === 2 &&
              <div>
                <Button
                  funcBotao={this.handleBack}
                  textoBotao={"Anterior"}
                  corBotao={"verde"}
                />
                <Button
                  funcBotao={this.salvar}
                  textoBotao={"Cadastrar"}
                  corBotao={"azul"}
                />
              </div>
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

FormCampanha.propTypes = {
  campanhaDados: PropTypes.object,
  funcLidarDados: PropTypes.func
}

