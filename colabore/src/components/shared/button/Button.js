import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './button.css'
import React, { Component } from 'react'


export default class Button extends Component {

  geraHtmlInterno = ( { link, textoBotao, dadosNavegacao } ) => {
    return link ? (
      <Link to = {{ pathname: link, state: dadosNavegacao}} className="botao-link" >{ textoBotao } </Link>
    ) : textoBotao

  }

  render() {
    const { corBotao, textoBotao, funcBotao, link, dadosNavegacao, desabilitado } = this.props
    return (
      <React.Fragment>
        <button className={`button ${corBotao}`} onClick={ funcBotao } disabled = {desabilitado}>
        { this.geraHtmlInterno( { link, textoBotao, dadosNavegacao } ) }
        </button>
      </React.Fragment>
    )
  }
}

Button.propTypes = {
  textoBotao: PropTypes.string.isRequired,
  corBotao: PropTypes.oneOf(['verde','azul','vermelho']),
  funcBotao: PropTypes.func,
  link: PropTypes.string
}

Button.defaultProps = {
  corBotao: 'verde'
}