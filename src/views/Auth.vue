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
              <v-card-subtitle>
                لطفا وارد حساب کاربری خود شوید یا ثبت نام کنید.
              </v-card-subtitle>

              <v-card-text>
                <v-sheet width="90%" class="mx-auto my-5">
                  <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center" class="mb-5">
                    <v-tab value="byGoogle">ورود/ثبت نام</v-tab>
                    <v-tab value="login">ورود</v-tab>
                    <v-tab value="register">ثبت نام</v-tab>
                  </v-tabs>
                  <v-window v-model="tab">
                    <v-stepper-window-item value="byGoogle">

                    </v-stepper-window-item>
                    <v-window-item value="login">
                      <v-form @submit.prevent>
                        <v-text-field v-model="loginFormData.phone" :rules="rules.phoneRules"
                          label="شماره همراه"></v-text-field>
                        <v-text-field :rules="rules.require" v-model="loginFormData.password" type="password"
                          label="رمز عبور"></v-text-field>
                        <p v-if="loginErrors != null && loginErrors.massage != undefined" class="my-5 text-red">
                          {{ loginErrors.massage }}</p>
                        <v-btn @click="login" type="submit" block class="mt-2" color="blue">ورود</v-btn>
                      </v-form>
                    </v-window-item>

                    <v-window-item value="register">
                      <v-form @submit.prevent>
                        <v-text-field :rules="rules.require" v-model="registerFormData.name" label="نام و نام خانوادگی"></v-text-field>
                        <v-text-field :rules="rules.phoneRules" v-model="registerFormData.phone"
                          label="شماره همراه"></v-text-field>
                          <v-text-field v-model="registerFormData.email"
                          label="آدرس ایمیل (اختیاری)"></v-text-field>
                        <v-text-field :rules="rules.require" v-model="registerFormData.password" type="password"
                          label="رمز عبور"></v-text-field>
                        <v-text-field :rules="rules.password_confirmation" v-model="registerFormData.password_confirmation"
                          type="password" label="تکرار رمز عبور"></v-text-field>

                        <p v-if="registerErrors != null && registerErrors.massage != undefined" class="my-5 text-red">
                          {{ registerErrors.massage }}</p>
                        <div v-if="registerErrors != null && registerErrors.errors != undefined" class="my-5 text-red">
                          <p v-for="item in registerErrors.errors">
                            {{ item }}
                          </p>
                        </div>
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
  data() {
    return {
      tab: null,
      loginFormData: {
        phone: null,
        password: null
      },
      registerFormData: {
        name: null,
        phone: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      loginErrors: null,
      registerErrors: null,
      rules: {
        phoneRules: [
          value => {
            if (value) {
              var regex = new RegExp('^(\\+98|0)?9\\d{9}$');

              if (regex.test(value)) {
                return true;
              }

              return 'فرمت شماره تماس وارد شده درست نیست!'
            }

            return 'وارد کردن شماره تماس ضروری است.'
          },
        ],
        require: [
          value => {
            if (value) return true

            return 'پرکردن این فیلد ضروری است.'
          },
        ],
        password_confirmation: [
          value => {
            if (value) {
              if (value == this.registerFormData.password) {
                return true
              }
              return 'تکرار رمز عبور درست نیست !'
            }

            return 'پرکردن این فیلد ضروری است.'
          },
        ],
      }
    }
  },
  mounted() {
  },
  methods: {
    checkConfirm(value) {
      console.log(this.registerFormData.password)

    },
    login() {
      var res = AuthService.login(this.loginFormData);
      res.then((value) => {
        console.log(value)
        if (value.status == "success") {
          let backPath = '/'
          //bug >>>>>>>>>>>>>>>
          // if (this.$route.params['back'][0] != ''){
          //   backPath = this.$route.params['back'][0];
          // }
          // console.log(backPath)
          // this.$axios.defaults.headers.common = authHeader();
          this.$router.push(backPath).finally(() => {
            window.location.reload();
          })
        } else {
          this.loginErrors = value.errors;
        }
      }).catch((value) => {
        console.log(value)
        this.loginErrors = value;
      })

    },
    register() {
      var res = AuthService.register(this.registerFormData);
      res.then((value) => {
        console.log(value)
        if (value.status == "success") {
          let backPath = '/'
          //bug >>>>>>>>>>>>>>>
          // if (this.$route.params['back'][0] != ''){
          //   backPath = this.$route.params['back'][0];
          // }
          // console.log(backPath)
          // this.$axios.defaults.headers.common = authHeader();
          this.$router.push(backPath).finally(() => {
            window.location.reload();
          })
        } else {
          this.registerErrors = value;
        }
      }).catch((value) => {
        console.log(value)
        this.registerErrors = value;
      })
    }
  }
}
</script>
