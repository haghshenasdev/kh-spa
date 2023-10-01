import axios from "@/plugins/axios";
import {getFormDataBody} from '@/composable/useApi'

class AuthServices {

  async login(user){

    return axios
        .post('login', getFormDataBody({
          phone: user.phone,
          password: user.password,
          device_name: 'web',
        }))
        .then(response => {
          // console.log(response.data.status)
          if (response.data.status == 'success' && response.data.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
          }
          return response.data;
        });
  }

  async register(user){

    return axios
        .post('register', getFormDataBody({
          phone: user.phone,
          email: user.email,
          name: user.name,
          password: user.password,
          password_confirmation: user.password_confirmation,
          device_name: 'web',
        }))
        .then(response => {
          // console.log(response.data.status)
          if (response.data.status == 'success' && response.data.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
          }
          return response.data;
        });
  }

  logout() {
    localStorage.removeItem('user');
  }

  checkAuth(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (user && user.token) return true;
    return false;
  }


}

export default new AuthServices();
