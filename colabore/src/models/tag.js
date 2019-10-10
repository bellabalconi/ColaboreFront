import TagApi from './api/tagApi';

export default class Tag{
    constructor(id, nome, campanhas){
        this.id = id;
        this.nome = nome;
        this.campanhas = campanhas;
        this.tagApi = new TagApi();
    }
}