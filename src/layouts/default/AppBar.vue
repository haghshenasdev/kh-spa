<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" id="menu"></v-app-bar-nav-icon>

    <v-app-bar-title>{{ getCharityAbout('shortname') }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn @click="dialog = true" icon>
      <v-icon>mdi-information</v-icon>
    </v-btn>


  </v-app-bar>


  <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-title>راهنمای نرم افزار</v-card-title>
        <v-card-text>
          <p>نرم افزار پیش رو برای خیرین عزیز این امکان را فراهم می کند تا به راحتی و بدون نیاز به مراجعه حضوری به خیریه ، بتوانند کمک های نقدی خود را به این خیریه اهدا کنند و از خدمات برخط خیریه استفاده کنند .</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">فهمیدم</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-navigation-drawer v-model="drawer" temporary>

    <v-list-item v-if="checkAuthRes" :title="checkAuthRes.name"></v-list-item>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item @click="$router.push({ name: 'Home' })" prepend-icon="mdi-home" title="صفحه اصلی"
        value="home"></v-list-item>
      <v-list-item @click="$router.push({ name: 'pay' })" prepend-icon="mdi-charity" title="پرداخت کمک نقدی"
        value="pay"></v-list-item>

      <v-item-group v-if="!checkAuthRes">
        <v-list-item @click="$router.push('auth')" prepend-icon="mdi-view-dashboard" title="ورود یا ثبت نام"
          value="login"></v-list-item>
          <v-list-item @click="$router.push({ name: 'About' })" prepend-icon="mdi-information" title="درباره خیریه"
        value="about"></v-list-item>
      </v-item-group>
      <v-item-group v-if="checkAuthRes">
        <v-list-item @click="$router.push('payhistory')" prepend-icon="mdi-history" title="سوابق کمک نقدی"
          value="pay_history"></v-list-item>
        <v-list-item prepend-icon="mdi-view-dashboard" title="خروج از حساب کاربری">
          <v-dialog v-model="logoutDialog" activator="parent" width="auto">
            <v-card>
              <v-card-text>
                آیا قصد خروج از حساب کاربری خود را دارید ؟
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="logoutDialog = false">انصراف</v-btn>
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
import { checkAuth, logout } from '@/composable/useApi'
export default {
  data: () => ({
    drawer: null,
    checkAuthRes: false,
    logoutDialog: false,
    charityAbout: null,
    dialog :false,
  }),
  watch: {
    drawer(val) {
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
  methods: {
    logoutReDire() {
      logout()
      window.location.reload()
    },
    getCharityAbout(key) {
      return (this.charityAbout != null) ? this.charityAbout[key] : ''
    },
  },
}
</script>

