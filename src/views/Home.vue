<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container>

        <v-row align="center" justify="center">
          <v-col cols="auto" v-for="item in homeData.homeItems">
            <v-btn @click="handelHomeItemClick(item.action)" color="blue" stacked>
              <v-img :width="50" cover :src="item.icon"></v-img>
              {{ item.title }}
            </v-btn>
          </v-col>
        </v-row>


        <v-row>

          <v-col class="mt-2" cols="12">
            <strong>اخبار</strong>
          </v-col>

          <v-col v-for="item in posts" cols="8" lg="4">

            <v-card>
              <v-img :src="item.img" height="200px" cover></v-img>

              <v-card-title>
                {{ item.title }}
              </v-card-title>
            </v-card>
          </v-col>

        </v-row>


        <v-row>

          <v-col class="mt-2" cols="12">
            <strong>پروژه ها</strong>
          </v-col>

          <v-col v-for="item in homeData.projects" cols="8" lg="4">

            <v-card>
              <v-img :src="item.image_head" height="200px" cover></v-img>

              <v-card-title>
                {{ item.title }}
              </v-card-title>

              <v-card-text>
                <v-progress-linear v-model="item.pishraft" color="blue" height="25">
                  <template v-slot:default="{ value }">
                    <strong>{{ item.pishraft }}%</strong>
                  </template>
                </v-progress-linear>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

</script>
<script>
export default {
  data() {
    return {
      homeData: [],
      posts: [],
    }
  },
  mounted() {
    const $this = this;
    this.$axios.get('/')
      .then(function (response) {
        // handle success
        $this.homeData = response.data.data
        console.log(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    this.$axios.get('/blog/post')
      .then(function (response) {
        // handle success
        $this.posts = response.data.data
        console.log($this.posts)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  methods: {
    handelHomeItemClick(action) {
      // console.log(action.params)
      switch (action.fnName) {
        case 'openPayment':
          this.$router.push({ name: 'pay', params: action.params })
          break;

        case 'taj':
          this.$router.push({ name: 'taj' })
          break;

        default:
          console.log('عملیات این دکمه تعریف نشده است ')
          break;
      }
    },
  }
}
</script>
