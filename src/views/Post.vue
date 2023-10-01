<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>
        <v-row justify="space-around">
          <v-col>
            <v-card v-if="postData != null">
            <v-img height="200" :src="postData.img" cover
              class="text-white">
            </v-img>

            <v-card-title>
              {{ postData.title }}
            </v-card-title>
            <v-card-text>
              <div v-html="postData.body"></div>
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
  data(){
    return {
      postData : null
    }
  },
  mounted(){
    this.$axios.get('/blog/post',{
      params: {
          id: this.$route.params.id
        }
    })
      .then( (response) => {
        // handle success
        this.postData = response.data.data[0]
        // console.log(this.postData)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}
</script>

<style>
.v-card-text img {
  width: 100%;
  height: auto;
}
.v-card-text {
  font-size: large;
  line-height: 2rem !important;
}
</style>
