import ContribuicaoApi from './api/contribuicaoApi'

export default class Contribuicao {
    constructor(id, valor, contribuinte, campanha){
        this.id = id;
        this.valor = valor;
        this.contribuinte = contribuinte;
        this.campanha = campanha;
        this.contribuicaoApi = new ContribuicaoApi();
    }

    salvarContribuicao(valor, contribuinte, campanha) {
        console.log(valor, contribuinte, campanha)
        this.valor = valor
        this.contribuinte = contribuinte
        this.campanha = campanha
        console.log( 'valor: ' + valor )
        console.log( 'Id contribuinte: ' + contribuinte )
        console.log( 'Id campanha: ' + campanha )
        return this.contribuicaoApi.salvarContribuicao({ "valor": this.valor, "usuario": { "id": this.contribuinte }, "campanha": { "id": this.campanha } })
    }

}