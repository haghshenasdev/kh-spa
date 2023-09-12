<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-card>
              <v-card-title>
                احراز هویت
              </v-card-title>

              <v-card-text>
                <v-sheet width="90%" class="mx-auto my-5">
                  <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center" class="mb-5">
                    <v-tab value="login">ورود</v-tab>
                    <v-tab value="register">ثبت نام</v-tab>
                  </v-tabs>
                  <v-window v-model="tab">
                    <v-window-item value="login">
                      <v-form @submit.prevent>
                        <v-text-field v-model="loginFormData.phone" label="شماره همراه"></v-text-field>
                        <v-text-field v-model="loginFormData.password" type="password"  label="رمز عبور"></v-text-field>
                        <p v-if="loginErrors != null" class="my-5 text-red">{{ loginErrors }}</p>
                        <v-btn @click="login" type="submit" block class="mt-2" color="blue">ورود</v-btn>
                      </v-form>
                    </v-window-item>

                    <v-window-item value="register">
                      <v-form @submit.prevent>
                        <v-text-field label="نام و نام خانوادگی"></v-text-field>
                        <v-text-field v-model="registerFormData.phone" label="شماره همراه"></v-text-field>
                        <v-text-field v-model="loginFormData.password" type="password"  label="رمز عبور"></v-text-field>
                        <v-text-field v-model="loginFormData.password" type="confirm_password"  label="تکرار رمز عبور"></v-text-field>

                        <v-btn @click="register" type="submit" block class="mt-2" color="blue">ثبت نام</v-btn>
                      </v-form>
                    </v-window-item>
                  </v-window>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AuthService from '@/classes/AuthServices'

export default {
  data(){
    return {
      tab: null,
      loginFormData: {
        phone:null,
        password:null
      },
      registerFormData:{
        name:null,
        phone:null,
        password:null,
        confirm_password:null,
      },
      loginErrors:null,
    }
  },
  mounted(){
  },
  methods:{

    login(){
      var res = AuthService.login(this.loginFormData);

      let backPath = '/'
      //bug >>>>>>>>>>>>>>>
      // if (this.$route.params['back'][0] != ''){
      //   backPath = this.$route.params['back'][0];
      // }
      // console.log(backPath)
      this.$router.push(backPath)
    },
    register(){

    }
  }
}
</script>
