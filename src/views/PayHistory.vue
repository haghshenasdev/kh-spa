<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container v-if="pays == null">
        <LoadingComponent />
      </v-container>
      <v-container v-else>
        <div v-for="item in pays">
          <v-card class="mb-3">
            <v-card-text>
              <v-row>
                <v-col>وضعیت</v-col>
                <v-col cols="auto">{{ (item.is_pardakht == 1) ? "پرداخت شده" : "در انتظار پرداخت" }}</v-col>
              </v-row>
              <v-row>
                <v-col>مبلغ</v-col>
                <v-col cols="auto">{{ (item.amount).toLocaleString('en-US') }} تومان</v-col>
              </v-row>
              <v-row>
                <v-col>شماره ثبت</v-col>
                <v-col cols="auto">{{ item.sabtid }}</v-col>
              </v-row>
              <v-row>
                <v-col>پرداخت جهت</v-col>
                <v-col cols="auto">{{ item.title }}</v-col>
              </v-row>
              <v-row>
                <v-col>تاریخ پرداخت</v-col>
                <v-col cols="auto">{{ toJalali(item.updated_at) }}</v-col>
              </v-row>
            </v-card-text>
            <v-card-actions v-if="item.is_pardakht == 0">
              <v-btn block color="primary" variant="tonal" @click="sendToPay(item.sabtid)">
                پرداخت
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import LoadingComponent from '@/components/LoadingComponent.vue'
import moment from 'jalali-moment'


export default {
  components: {
    LoadingComponent
  },
  data() {
    return {
      pays: null
    }
  },
  mounted() {
    this.$axios.get('profile/faktoors')
      .then((response) => {
        // handle success
        // console.log(response.data.data)
        this.pays = response.data.data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  methods: {
    sendToPay(sabtid) {
      window.open("https://kh-app.ir/invoice/" + sabtid)
    },
    toJalali(date){
      if (date == null) return "بدون تاریخ"

      return moment(date).locale('fa').format('H:m:s YYYY/MM/DD')
    }
  }
}
</script>
