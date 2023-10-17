<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container v-if="aboutData == null">
        <LoadingComponent />
      </v-container>
      <v-container v-else>
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-card>
              <v-img height="200" :src="aboutData.logo"
              class="text-white">
            </v-img>
              <v-card-title>
                درباره {{ aboutData.shortname }}
              </v-card-title>
              <v-card-text v-html="aboutData.about"></v-card-text>
              <v-card-actions>
                <a :href="'tel:' + aboutData.phone">شماره تماس : {{ aboutData.phone }}</a>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue'

export default {
  components: {
    LoadingComponent
  },
  data(){
    return {
      aboutData : null
    }
  },
  mounted(){
    this.$axios.get('about')
      .then( (response) => {
        // handle success
        // console.log(response.data[0])
        this.aboutData = response.data[0]
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}
</script>
