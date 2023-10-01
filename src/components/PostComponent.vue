<template>
  <v-row>
    <v-col class="mt-2" cols="12">
      <strong>اخبار</strong>
    </v-col>
  </v-row>
  <div class="d-flex flex-nowrap overflow-x-auto">
    <v-sheet class="ma-5 flex-1-0" v-for="item in posts" >
      <v-card width="300" @click="$router.push({ name: 'post', params: { id: item.id } })">
        <v-img :src="item.img" height="150px" cover></v-img>

        <v-card-title>
          {{ item.title }}
        </v-card-title>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.$axios.get('/blog/post')
      .then((response) => {
        // handle success
        this.posts = response.data.data
        // console.log(this.posts)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}
</script>
