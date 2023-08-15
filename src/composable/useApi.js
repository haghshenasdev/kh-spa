import axios from "axios"

  axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/1';
  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*'
  }
  function getHomeData() {
    axios.get('/')
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

export {
  getHomeData
}
