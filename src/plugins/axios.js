import axios from "axios"
import {authHeader} from '@/composable/useApi'
var chidElement = document.getElementById('chid');
let charityID = chidElement.value;
chidElement.remove()
  axios.defaults.baseURL = 'https://kh-app.ir/api/v1/' + charityID;
  // axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/1';
  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept' : 'application/json',
  }
  axios.defaults.headers.common = authHeader();
  // console.log(axios.defaults.headers)

  export default axios

