import axios from 'axios'
export default class ContribuicaoApi {



  getContribuicoesPorCampanha(campanhaId) {
    return axios.get(`http://localhost:8080/api/contribuicao/buscarPorCampanha/${campanhaId}`,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    } );
  }

  getContribuicoesPorContribuinte(contribuinteId) {
    return axios.get(`http://localhost:8080/api/contribuicao/buscarPorContribuinte/${contribuinteId}`,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    } );
  }

  getContribuicaoDetalhes(id) {
    return axios.get(`http://localhost:8080/api/contribuicao/buscarPorId/${id}`,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    } );
  }

  salvarContribuicao({ valor, usuario, campanha }) {
    console.log(valor, usuario, campanha)
    return axios.post('http://localhost:8080/api/contribuicao/novo', { valor, usuario, campanha },{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    } ).then( res => {
      return res
    })
  }

  deletarContribuicao(id) {
    return axios.delete(`http://localhost:8080/api/contribuicao/deletar/${id}`,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    } );
  }

}
