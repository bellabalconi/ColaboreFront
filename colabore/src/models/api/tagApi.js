import axios from 'axios'
export default class TagApi {
  
  getTodasTags() {
    return axios.get('http://localhost:8080/api/tag/',{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    } ); 
  }

  salvarTag({ tag }) {
    return axios.post('http://localhost:8080/api/tag/novo', { tag },{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    } ); 
  }
}
