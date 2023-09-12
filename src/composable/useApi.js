import axios from "@/plugins/axios";

  // function getHomeData() {
  //   var result = {
  //     data : null,
  //     error: null,
  //   };
  //   await axios.get('/')
  //     .then(function (response) {
  //       // handle success
  //       return result.data = response.data;
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       return result.error = error;
  //     });
  // }

  function getFormDataBody(data){
    var bodyFormData = new FormData();
    Object.keys(data).forEach(key => {
      bodyFormData.append(key, data[key]);
    });
    return bodyFormData;
  }

  function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      return {
        'Authorization': `Bearer ${user.token}`
      };
    } else {
      return {};
    }
  }

  function checkAuth(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) return user;
    return false;
  }


  function logout() {
    localStorage.removeItem('user');
  }

export {
  getFormDataBody,
  checkAuth,
  authHeader,
  logout
}
