<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-card >
              <v-card-title v-if="typeData != null">
                پرداخت جهت {{ typeData.title }}
              </v-card-title>
              <v-card-title v-else>
                پرداخت
              </v-card-title>

              <v-card-text>
                <v-sheet width="90%" class="mx-auto my-5">
                  <v-form @submit.prevent>
                    <v-text-field v-model="firstName" :rules="rules" label="مبلغ (ریال)"></v-text-field>
                    <v-select v-if="typeData == null" v-model="type" :items="types" :rules="[v => !!v || 'Item is required']" label="نوع پرداخت"
                      required></v-select>
                    <v-btn type="submit" block class="mt-2" color="blue">پرداخت</v-btn>
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
export default {
  data() {
    return {
      types: [],
      type: null,
      typeData : null
    }
  },
  mounted() {
    console.log(this.$route.params)
    const $this = this;
    this.$axios.get('/type')
      .then(function (response) {
        // handle success
        $this.types = response.data.data;
        console.log(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    if (!isNaN(this.$route.params.type)) {
      this.$axios.get('/type', {
      params: {
        id: $this.$route.params.type
      },
    })
      .then(function (response) {
        // handle success
        $this.typeData = response.data.data;
        console.log(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }
  }
}
</script>
