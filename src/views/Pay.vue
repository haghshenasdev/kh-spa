<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container v-if="loading">
        <LoadingComponent />
      </v-container>
      <v-container v-else>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-card>
              <v-card-title v-if="paramType">
                پرداخت جهت {{ typeData.title }}
              </v-card-title>
              <v-card-title v-else>
                پرداخت
              </v-card-title>

              <v-card-text>
                <v-sheet width="90%" class="mx-auto my-5">
                  <v-form @submit.prevent>
                    <v-text-field v-model="formData.amount" :rules="rules" label="مبلغ (ریال)"></v-text-field>
                    <p class="mb-2">{{ nToP }}</p>
                    <v-chip-group class="mb-5">
                      <v-chip color="primary" v-if="lastAmount != null" @click="formData.amount = lastAmount">{{ lastAmount/10000 }} تومان</v-chip>
                      <v-chip color="primary" @click="formData.amount = 100000">10 تومان</v-chip>
                      <v-chip color="primary" @click="formData.amount = 500000">50 تومان</v-chip>
                      <v-chip color="primary" @click="formData.amount = 1000000">100 تومان</v-chip>
                    </v-chip-group>

                    <v-select v-if="!paramType" v-model="formData.type" :items="types" item-value="id" label="نوع پرداخت"
                      required></v-select>
                    <p class="mb-5" v-if="!paramType && typeData != null && typeData.description != null">
                      {{ typeData.description }}</p>

                    <v-select v-if="!paramType && subtypes.length > 0" v-model="subType" :items="subtypes" item-value="id"
                      label="نوع جزئی تر پرداخت" required></v-select>
                    <p class="mb-5" v-if="!paramType && subTypeData != null && subTypeData.description != null">
                      {{ subTypeData.description }}</p>

                    <v-btn type="submit" block class="mt-2" color="blue" @click.prevent="sendToPay">پرداخت</v-btn>
                    <p v-if="errorMessage != null" class="my-5 text-red">{{ errorMessage }}</p>
                  </v-form>
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
import Num2persian from 'num2persian';
import LoadingComponent from '@/components/LoadingComponent.vue'


export default {
  data() {
    return {
      loading: true,
      types: [],
      subtypes: [],
      formData: {
        amount: null,
        type: null,
      },
      typeData: null,
      subTypeData: null,
      subType: null,
      paramType: false,
      errorMessage: null,
      lastAmount : null,
    }
  },
  components: {
    LoadingComponent,
  },
  computed: {
    nToP() {
      if (this.formData.amount != null)
        return 'معادل ' + Num2persian(this.formData.amount / 10) + ' تومان '
    },
  },
  watch: {
    'formData.type'(val) {
      this.loadTypeData(val).then((res) => {
        console.log(res)
        this.typeData = res;
      });

      this.subType = null;

      this.$axios.get('/type', {
        params: {
          sub: val
        },
      })
        .then((response) => {
          // handle success
          this.subtypes = response.data.data
          console.log(response.data.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }
  ,
  mounted() {
    this.lastAmount = localStorage.getItem('last_amount');

    if (this.$route.params.type !== undefined && this.$route.params.type != "") {
      this.loadTypeData(this.$route.params.type).then((res) => {
        this.typeData = res;
        this.paramType = true;
        this.formData.type = this.typeData.id;
        this.loading = false;
      })

    } else {
      this.$axios.get('/type')
        .then((response) => {
          // handle success
          this.types = response.data.data;
          this.loading = false;
          // console.log(response.data.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  },
  methods: {
    sendToPay() {

      localStorage.setItem('last_amount',this.formData.amount);

      var bodyFormData = new FormData();
      bodyFormData.append('amount', this.formData.amount / 10);
      // اینجا در مقدار دهی اگر تایپ زیر مجموعه خالی بود تایپ اصلی را در نظر می گیریم
      bodyFormData.append('type', (this.subType == null) ? this.formData.type : this.subType);
      this.$axios.post('/pay', bodyFormData)
        .then((response) => {
          // handle success
          // this.types = response.data.data;
          console.log(response.data)
          window.open(response.data.url)
        })
        .catch((error) => {
          // handle error
          console.log('error');
          console.log(error.response.data);
          this.errorMessage = error.response.data.message;
        });
    },
    async loadTypeData(id) {
      return this.$axios.get('/type', {
        params: {
          id: id
        },
      })
        .then((response) => {
          // handle success
          return response.data.data;
          // console.log(response.data.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }
}
</script>
