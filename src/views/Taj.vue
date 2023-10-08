<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8">

            <v-card class="mx-auto" max-width="500">
              <v-card-title class="text-h6 font-weight-regular justify-space-between">
                <v-row>
                  <v-col>
                    <span>{{ currentTitle }}</span>
                  </v-col>
                  <v-col cols="auto">
                    <v-avatar class="text-caption" size="25" color="primary" v-text="step + '/4'"></v-avatar>
                  </v-col>
                </v-row>
              </v-card-title>

              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-card-text>
                    <v-img src="./../assets/taj_gol.png"></v-img>
                    <p class="mt-3 text-center">با این سرویس می توانید در مراسمات ترحیم پیش رو به نام دلخواه تاج گل قرار
                      دهید . هزینه های دریافتی صرف امور خیر می شوند و هم شما و مرحوم از ثواب آن بهرمند می شوید .</p>
                  </v-card-text>
                </v-window-item>

                <!-- <v-window-item :value="2">
                  <v-card-text>
                    <div v-if="marasemData == null" class="text-center">
                      <v-progress-circular color="primary" indeterminate></v-progress-circular>
                    </div>
                    <v-item-group selected-class="bg-primary">
                      <v-item v-if="marasemData != null" v-for="item in marasemData"
                        v-slot="{ isSelected, selectedClass, toggle }">
                        <v-card class="mb-3" :class="[selectedClass]" dark @click="toggle">
                          <v-card-text>
                            <v-row>
                              <v-col>نام مرحوم</v-col>
                              <v-col cols="auto">{{ item.marhoom_name }}</v-col>
                            </v-row>
                            <v-row>
                              <v-col>محل</v-col>
                              <v-col cols="auto">{{ item.location }}</v-col>
                            </v-row>
                            <v-row>
                              <v-col>تاریخ برگزاری</v-col>
                              <v-col cols="auto">{{ item.date }}</v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-item>
                    </v-item-group>
                  </v-card-text>
                </v-window-item>


                <v-window-item :value="3">
                  <v-card-text>

                    <v-form @submit.prevent>
                      <v-text-field v-model="tarfStage.name" :rules="rules" label="نام و نام خانوادگی"></v-text-field>

                      <v-row class="mb-3">
                        <v-col><v-btn width="100%" type="button">انتخاب تاج گل</v-btn></v-col>
                        <v-col><v-btn width="100%" type="button">انتخاب طرح</v-btn></v-col>
                      </v-row>

                      <v-btn type="submit" color="primary" @click="addTarf" block class="mb-5">افزودن</v-btn>
                    </v-form>
                    <p v-if="trafList.length == 0" class="text-center">هیچ نامی وجود ندارد . لطفا از قسمت بالا یک نام
                      اضافه کنید</p>
                    <v-item-group v-else selected-class="bg-primary">
                      <v-item v-for="(item, key) in trafList" v-slot="{ isSelected, selectedClass, toggle }">
                        <v-card class="mb-3" :class="[selectedClass]" dark>
                          <v-card-text @click="toggle">
                            <v-row>
                              <v-col>ازطرف</v-col>
                              <v-col cols="auto">{{ item.name }}</v-col>
                            </v-row>
                            <v-row>
                              <v-col>طرح</v-col>
                              <v-col cols="auto">{{ (item.tarh == null) ? 'پیشفرض' : item.tarh }}</v-col>
                            </v-row>
                            <v-row>
                              <v-col>نوع تاج گل</v-col>
                              <v-col cols="auto">{{ (item.taj == null) ? 'پیشفرض' : item.taj }}</v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn block color="red" variant="tonal" @click="trafList.splice(key, 1)">
                              حذف
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-item>
                    </v-item-group>
                  </v-card-text>
                </v-window-item>


                <v-window-item :value="4">
                  <div class="pa-4 text-center">
                    <v-img class="mb-4" contain height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg"></v-img>
                    <h3 class="text-h6 font-weight-light mb-2">
                      Welcome to Vuetify
                    </h3>
                    <span class="text-caption text-grey">Thanks for signing up!</span>
                  </div>
                </v-window-item> -->

                <v-window-item :value="2">
                  <div class="pa-4 text-center">
                    <v-img class="mb-4" contain height="128" src="https://kheiriehemamali.ir/css/images/logo-blue.svg"></v-img>
                    <h3 class="mb-2">
                      این قابلیت به زودی در دسترس قرار خواهد گرفت
                    </h3>
                    <span class="text-grey">ما مشغول توسعه زیر ساخت های این قابلیت هستیم . از همراهی شما سپاس گزاریم.</span>
                  </div>
                </v-window-item>
              </v-window>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn v-if="step < 2" color="primary" variant="flat" @click="step++">
                  ادامه
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="step > 1" variant="text" @click="step--">
                  بازگشت
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    marasemData: null,
    trafList: [],
    tarfStage: {
      name: null,
      tarh: null,
      type: null,
    }
  }),
  watch: {
    step(val) {
      switch (val) {
        case 2:
          this.getMarasemData()
          return val
        default: return val
      }
    }
  },
  methods: {
    getMarasemData() {
      this.$axios.get('/marasem')
        .then((response) => {
          // handle success
          this.marasemData = response.data.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    addTarf() {
      if (this.tarfStage.name != null && this.tarfStage.name.trim() != '') {
        this.trafList.push(this.tarfStage)
        this.tarfStage = {
          name: null,
          tarh: null,
          type: null,
        }
      }
    }
  },
  computed: {
    currentTitle() {
      // switch (this.step) {
      //   case 1: return 'سفارش تاج گل'
      //   case 2: return 'مراسمات پیش رو'
      //   case 3: return 'از طرف'
      //   default: return 'تایید سفارش'
      // }
      switch (this.step) {
        case 1: return 'سفارش تاج گل'
        default: return 'درآینده'
      }
    },

  },
}
</script>
