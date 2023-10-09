<template>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ getCharityAbout('shortname') }}</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >

    <v-list-item
    v-if="checkAuthRes"
          :title="checkAuthRes.name"
        ></v-list-item>

        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item @click="$router.push({name : 'Home'})" prepend-icon="mdi-home" title="صفحه اصلی" value="home"></v-list-item>
          <v-list-item @click="$router.push({name : 'pay'})" prepend-icon="mdi-charity" title="پرداخت کمک نقدی" value="pay"></v-list-item>

          <v-item-group v-if="!checkAuthRes">
            <v-list-item @click="$router.push('auth')" prepend-icon="mdi-view-dashboard" title="ورود یا ثبت نام" value="login"></v-list-item>
          </v-item-group>
          <v-item-group v-if="checkAuthRes">
            <v-list-item @click="$router.push('payhistory')" prepend-icon="mdi-history" title="سوابق کمک نقدی" value="pay_history"></v-list-item>
            <v-list-item prepend-icon="mdi-view-dashboard" title="خروج از حساب کاربری">
              <v-dialog
        v-model="logoutDialog"
        activator="parent"
        width="auto"
      >
        <v-card>
          <v-card-text>
            آیا قصد خروج از حساب کاربری خود را دارید ؟
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"  @click="logoutDialog = false">انصراف</v-btn>
            <v-btn class="bg-red" @click="logoutReDire()">خروج</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
            </v-list-item>
          </v-item-group>
        </v-list>
    </v-navigation-drawer>

</template>


<script setup>
  import { ref } from 'vue'

  const drawer = ref(null)
</script>

<script>
import {checkAuth,logout} from '@/composable/useApi'
  export default {
    data: () => ({
      drawer: null,
      checkAuthRes: false,
      logoutDialog : false,
      charityAbout : null,
    }),
    watch:{
      drawer(val){
        console.log(val)
      }
    },
    mounted() {
      this.checkAuthRes = checkAuth()
      this.$axios.get('/about')
        .then((response) => {
          // handle success
          this.charityAbout = response.data[0];
          document.title = 'نرم افزار ' + this.getCharityAbout('shortname')
          // console.log(response.data)
        })
    },
    methods:{
      logoutReDire(){
        logout()
        window.location.reload()
      },
      getCharityAbout(key){
        return (this.charityAbout != null) ? this.charityAbout[key] : ''
      }
    }
  }
</script>

