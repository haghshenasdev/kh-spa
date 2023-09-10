import axios from "axios"
import {authHeader} from '@/composable/useApi'

  axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/1';
  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept' : 'application/json'
  }

  axios.defaults.headers.common = authHeader();

  export default axios

