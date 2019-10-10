import axios from 'axios'
export default class CampanhaApi {
  getCampanhas() {
    return axios.get('http://localhost:8080/api/campanha/', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  getCampanhasPorStatus(status) {
    return axios.get(`http://localhost:8080/api/campanha/buscarPorStatus/${status}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  getCampanhasPorCriador(criadorId) {
    return axios.get(`http://localhost:8080/api/campanha/buscarPorCriador/${criadorId}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  getCampanhasPorContribuinte(contribuinteId) {
    return axios.get(`http://localhost:8080/api/campanha/buscarPorContribuinte/${contribuinteId}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  getCampanhasPorTags({ tags }) {
    return axios.post('http://localhost:8080/api/campanha/buscarPorTags', { tags }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  getCampanhaDetalhes(id) {
    return axios.get(`http://localhost:8080/api/campanha/buscarPorId/${id}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  salvarCampanha({ usuario, tags, titulo, descricao, metaArrecadacao, expectativaDataString, isConclusaoAutomatica }) {
    return axios.post('http://localhost:8080/api/campanha/novo', { usuario, tags, titulo, descricao, metaArrecadacao, expectativaDataString, isConclusaoAutomatica }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => {
      return res
    }).catch(function (error) {
      if (error.response) {
        return 403
      }
    })
  }

  salvarFotoCampanha(file, idCampanha) {
    console.log(file, idCampanha)
    return axios.post(`http://localhost:8080/api/campanha/salvarImagem/${idCampanha}`, file,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=--------',
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
      })
  }

  pegarImagem(url){
    return axios.post(`http://localhost:8080/api/campanha/downloadImagem/`, {url}, 
    {headers: {
      "Authorization": localStorage.getItem("token")
  }}).then(res => {
      return res
    })
  }

  editarCampanha(id, { usuario, tags, titulo, descricao, metaArrecadacao, expectativaDataString, isConclusaoAutomatica }) {
    return axios.put(`http://localhost:8080/api/campanha/editar/${id}`, { id, usuario, tags, titulo, descricao, metaArrecadacao, expectativaDataString, isConclusaoAutomatica }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then( res => {return res}).catch(function (error) {
      if (error.response) {
        return 403
      }
    })
  }

  deletarCampanha(id) {
    return axios.delete(`http://localhost:8080/api/campanha/deletar/${id}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

}
