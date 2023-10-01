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
              <v-card-title v-if="typeData != null">
                پرداخت جهت {{ typeData.title }}
              </v-card-title>
              <v-card-title v-else>
                پرداخت
              </v-card-title>

              <v-card-text>
                <v-sheet width="90%" class="mx-auto my-5">
                  <v-form @submit.prevent>
                    <v-text-field v-model="formData.amount" :rules="rules" label="مبلغ (ریال)"></v-text-field>
                    <p class="mb-5">{{ nToP }}</p>
                    <v-select v-if="typeData == null" v-model="formData.type" :items="types" item-value="id" label="نوع پرداخت" required></v-select>
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
      loading:true,
      types: [],
      formData: {
        amount: null,
        type: null,
      },
      typeData: null,
      errorMessage: null,
    }
  },
  components:{
    LoadingComponent,
  },
  computed: {
    nToP() {
      if (this.formData.amount != null)
        return 'معادل ' + Num2persian(this.formData.amount / 10) + ' تومان '
    }
  },
  mounted() {
    if (this.$route.params.type !== undefined && this.$route.params.type != "") {
      this.$axios.get('/type', {
        params: {
          id: this.$route.params.type
        },
      })
        .then( (response) => {
          // handle success
          this.typeData = response.data.data;
          this.formData.type = this.typeData.id;
          this.loading = false;
          // console.log(response.data.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }else{
      this.$axios.get('/type')
      .then( (response) => {
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
  methods:{
    sendToPay(){

console.log(this.formData)
      var bodyFormData = new FormData();
      bodyFormData.append('amount',this.formData.amount/10);
      bodyFormData.append('type',this.formData.type);

    this.$axios.post('/pay',bodyFormData)
      .then( (response) => {
        // handle success
        // this.types = response.data.data;
        console.log(response.data)
        window.open(response.data.url)
      })
      .catch( (error) => {
        // handle error
        console.log('error');
        console.log(error.response.data);
        this.errorMessage = error.response.data.message;
      });
    }
  }
}
</script>
