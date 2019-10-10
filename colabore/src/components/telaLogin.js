import React, { Component } from 'react';
import Input from './shared/input/input';
import Button from './shared/button/Button.js';
import Usuario from '../models/usuario'
import './telaLogin.css'
import '../App.css'



export default class TelaLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      senha: ""
    }
  }

  handleEmail = valor => {
    this.setState({ email: valor });
  }
  handleSenha = valor => {
    this.setState({ senha: valor });
  }

  logar = () => {
    const usuario = new Usuario();
    usuario.logar(this.state.email, this.state.senha).then(status => {
      if (status === 200) {
        this.props.history.push('/campanhas')
      }
      else {
        this.setState({ email: "" });
        alert("Email ou senha incorretos, tente novamente")
      }
    })
  }

  render() {
    return (
      <React.Fragment >
        <div className="screen">
          <h1>Colabore </h1>

          <Input placeholder="E-mail"
            mensagemCampo="E-mail"
            valorCampo={this.state.email}
            atualizarValor={this.handleEmail}
          />

          <Input placeholder="Senha"
            mensagemCampo="Senha"
            type="password"
            valorCampo={this.state.senha}
            atualizarValor={this.handleSenha}
          />
          <Button corBotao="verde" textoBotao="Entrar" funcBotao={this.logar} />

          <h5>Ainda não possui conta? <a href="/cadastroUsuario">Cadastre-se aqui!</a></h5>

        </div>


      </React.Fragment>
    )
  }
}
