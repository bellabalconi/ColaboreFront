import CampanhaApi from './api/campanhaApi'

export default class Campanha {
    constructor(id, usuario, contribuicoes, tags, titulo, descricao, metaArrecadacao, valorArrecadado, expectativaData, expectativaDataString, isConclusaoAutomatica, isConcluida, ultimaModificacao){
        this.id = id;
        this.usuario = usuario;
        this.contribuicoes = contribuicoes
        this.tags = tags
        this.titulo = titulo;
        this.descricao = descricao;
        this.metaArrecadacao = metaArrecadacao;
        this.valorArrecadado = valorArrecadado;
        this.expectativaData = expectativaData;
        this.expectativaDataString = expectativaDataString;
        this.isConclusaoAutomatica= isConclusaoAutomatica
        this.isConcluida = isConcluida;
        this.ultimaModificacao = ultimaModificacao;
        this.campanhaApi = new CampanhaApi();
    }

    salvarCampanha (usuario, tags, titulo, descricao, metaArrecadacao, expectativaDataString, isConclusaoAutomatica){ 
        this.usuario = usuario
        this.metaArrecadacao = metaArrecadacao
        this.expectativaDataString = expectativaDataString
        this.isConclusaoAutomatica = isConclusaoAutomatica
        this.titulo = titulo
        this.descricao = descricao

        if(tags !== null ){
            this.tags = []
            tags.map( tag => this.tags.push({"nome": tag.text}))
        }
        return this.campanhaApi.salvarCampanha({"usuario": {"id": this.usuario},"tags": this.tags, "titulo": this.titulo, "descricao": this.descricao, "metaArrecadacao": this.metaArrecadacao, "expectativaDataString": this.expectativaDataString, "isConclusaoAutomatica": this.isConclusaoAutomatica })
    }

    editarCampanha (idCampanha, usuario, tags, titulo, descricao, metaArrecadacao, expectativaDataString, isConclusaoAutomatica){ 
        this.id = idCampanha
        this.usuario = usuario
        this.metaArrecadacao = metaArrecadacao
        this.expectativaDataString = expectativaDataString
        this.isConclusaoAutomatica = isConclusaoAutomatica
        this.titulo = titulo
        this.descricao = descricao

        if(tags !== null ){
            this.tags = []
            tags.map( tag => this.tags.push({"nome": tag.text}))
        }
        return this.campanhaApi.editarCampanha(this.id,{"usuario": {"id": this.usuario},"tags": this.tags, "titulo": this.titulo, "descricao": this.descricao, "metaArrecadacao": this.metaArrecadacao, "expectativaDataString": this.expectativaDataString, "isConclusaoAutomatica": this.isConclusaoAutomatica })
    }

    pegarImagem(url){
        return this.campanhaApi.pegarImagem({"url" : url})
    }

}