import axios from 'axios'
export default class UsuarioApi {

  salvarUsuario({nome, email, senha}) {
    return axios.post('http://localhost:8080/api/usuario/novo', { nome, email, senha }).then( res => {
      return res
    }).catch(function (error) {
      if (error.response) {
        return 403
      }
    })
  }

  salvarFotoUsuario(file, idUsuario){
    console.log(file, idUsuario)
    return axios.post(`http://localhost:8080/api/usuario/salvarImagem/${idUsuario}`, file, 
    {headers: {
      'Content-Type': 'multipart/form-data; boundary=--------'
  }}).then(res => {
      return res
    })
  }

  

  getUsuarioDetalhes(id) {
    return axios.get(`http://localhost:8080/api/usuario/${id}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  editarStatusCriadorUsuario(id, { status }) {
    return axios.put(`http://localhost:8080/api/usuario/editarValorCriador/${id}`, { status }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  getUsuarioPorEmail(email) {
    return axios.get(`http://localhost:8080/api/usuario/buscarPorEmail/${email}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  buscarContribuintesDeCampanha(id) {
    console.log("id no api: " + id)
    return axios.get(`http://localhost:8080/api/usuario/buscarContribuintesDeCampanha/${id}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
  }

  fazerLogin({ email, senha }) {
    return axios.post('http://localhost:8080/api/login', { email, senha }).then(res => {
      localStorage.setItem("token", res.headers.authorization)
      this.getUsuarioPorEmail(email).then ( usuario => {
        localStorage.setItem("idUsuario", usuario.data.id)
      })
      return res.status;
    }).catch(function (error) {
      if (error.response) {
        return 403
      }
    })
  }
}
