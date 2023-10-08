import axios from "axios"
import {authHeader} from '@/composable/useApi'
console.log(document.getElementById('chid'))
  axios.defaults.baseURL = 'https://khapp.kheiriehemamali.ir/api/v1/1';
  // axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/1';
  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept' : 'application/json'
  }
  axios.defaults.headers.common = authHeader();
  console.log(axios.defaults.headers)

  export default axios

