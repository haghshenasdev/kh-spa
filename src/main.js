/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import axios from "axios"

  axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/1';
  axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*'
  }

const app = createApp(App)
registerPlugins(app)
app.config.globalProperties.$axios = axios
app.mount('#app')
