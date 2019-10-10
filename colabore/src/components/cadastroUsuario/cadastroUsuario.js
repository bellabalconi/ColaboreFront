import React, { Component } from 'react';
import Input from '../shared/input/input';
import Button from '../shared/button/Button.js';
import './cadastroUsuario.css'
import '../../App.css'
import ImageUploader from 'react-images-upload';
import Usuario from '../../models/usuario';
import UsuarioApi from '../../models/api/usuarioApi';

export default class CadastroUsuario extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagem: []
    };

  };

  handleNome = valor => {
    this.setState({ nome: valor });
  };

  handleEmail = valor => {
    this.setState({ email: valor});
  };

  handleSenha = valor => {
    this.setState({ senha: valor });
  };

  handleConfirmarSenha = valor => {
    this.setState({ confirmarSenha: valor });

  };

  onDrop = picture => {
    this.setState({
      imagem: this.state.imagem.concat(picture),
    });
  }

  cadastrar = () => {
    let usuario = new Usuario();
    let usuarioApi = new UsuarioApi();
    usuario.cadastrar(this.state.nome, this.state.email, this.state.senha).then(res => {
      if (this.state.imagem.length === 1) {
        const formData = new FormData();
        formData.append('file', this.state.imagem[0])
        usuarioApi.salvarFotoUsuario(formData, res.data.id)
      }
      if (res.status === 200) {
        usuario.logar(this.state.email, this.state.senha).then(statusLogin => {
          if (statusLogin === 200) {
            this.props.history.push('/campanhas')
          }
          else {
            alert("Email ou senha incorretos, tente novamente")
          }
        })
        //
      }
      else {
        alert("Ocorreu um erro, tente novamente.")

      }
    })
  }

  render() {
    return (
      <div className="container">

        <h1>Cadastro </h1>

        <div className="content">
          <label className="required">Nome Completo</label>
          <Input
            atualizarValor={this.handleNome}
          />
          

          <label className="required">E-mail</label>
          <Input placeholder = {"@dbccompany.com.br"}
            atualizarValor={this.handleEmail}
          />
          
          <label className="required">Senha</label>
          <Input 
            atualizarValor={this.handleSenha}
            type="password"
          />

          <label className="required">Confirmar senha</label>
          <Input
            atualizarValor={this.handleConfirmarSenha}
            type="password"
          />
          <small>*Campos Obrigatórios</small>

          <div className="erro-senhas">
            {this.state.confirmarSenha !== this.state.senha ?
              <span>Senhas não correspondem!</span> :
              null
            }
          </div>

          <section className="margin-15px">
            <h5>Adicione uma foto no seu perfil:</h5>
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
              labelStyles={{ "color": "#686765", "fontSize": "16px" }}
              buttonStyles={{
                "border": "none", "color": "white", "bordeRadius": "10px", "padding": "15px 32px", "margin": "10px 10px",
                "cursor": "pointer", "backgroundColor": "rgba(89, 201, 165, 100)", "fontWeight": "bold"
              }}
            />
          </section>


        </div>
        <Button corBotao="verde" textoBotao="Cadastrar" funcBotao={this.cadastrar} desabilitado={!this.state.nome || !this.state.email || !this.state.senha || !this.state.confirmarSenha || this.state.confirmarSenha !== this.state.senha} />


      </div>

    )

  }
}


