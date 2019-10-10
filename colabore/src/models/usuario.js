import UsuarioApi from './api/usuarioApi';

export default class Usuario{
    constructor(id, nome, email, senha, isCriador, campanhas, contribuicoes){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.isCriador = isCriador;
        this.campanhas = campanhas;
        this.contribuicoes = contribuicoes;
        this.usuarioApi = new UsuarioApi();
    }

    logar(email, senha){
        this.email = email;
        this.senha = senha;
        return this.usuarioApi.fazerLogin({"email": this.email, "senha": this.senha})
    }

    cadastrar(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        return this.usuarioApi.salvarUsuario({"nome": this.nome, "email": this.email, "senha": this.senha})
    }
}