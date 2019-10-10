import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './input.css'

export default class Input extends Component {

    perderFoco = evento => {
        // const { obrigatorio, atualizarValor } = this.props
        const { atualizarValor } = this.props
        //const valorCampo = evento.target.value
        // const erro = obrigatorio && !valorCampo
        // atualizarValor({ valorCampo, erro })
        atualizarValor( evento.target.value )
    }    

    render() {
        const { type, style, placeholder, mensagemCampo, valorCampo } = this.props
        return (
            <div className = "input-mensagem">
                {
                    mensagemCampo && <span className="mensagem-campo">{mensagemCampo}</span>
                }
                <div>
                    <input type={type} className={style || "estilo-input"} placeholder={placeholder} onBlur={this.perderFoco} defaultValue={valorCampo}/>
                </div>

            </div >
        )
        
    }

}

Input.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.string,
    obrigatorio: PropTypes.bool
}

Input.defaultProp = {
    placeholder: "",
    type: "",
    style: "estilo-input",
    obrigatorio: true
}


