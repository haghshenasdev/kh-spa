<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container v-if="homeData.length == 0">
        <LoadingComponent />
      </v-container>
      <v-container v-else>

        <v-row align="center" justify="center">
          <v-col cols="3" lg="2" v-for="item in homeData.homeItems">
            <v-btn height="100" width="100%" @click="handelHomeItemClick(item.action)" color="blue" stacked>
              <v-img width="40" cover :src="item.icon" class="mb-2"></v-img>
              <p style="font-size:13px;">{{ item.title }}</p>
            </v-btn>
          </v-col>

        </v-row>

        <HadisComponent v-if="homeData.hadis != null && homeData.hadis != undefined" :hadisData="homeData.hadis" />

        <SliderComponent v-if="homeData.slider != null && homeData.slider != undefined && homeData.slider.length > 0" :sliderData="homeData.slider" />


        <PostComponent />

        <ProjectComponent v-if="homeData.projects != undefined && homeData.projects != null && homeData.projects.length > 0" :pData="homeData.projects" />

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProjectComponent from '@/components/ProjectComponent.vue'
import PostComponent from '@/components/PostComponent.vue'
import HadisComponent from '@/components/HadisComponent.vue';
import SliderComponent from '@/components/SliderComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue'

export default {
  data() {
    return {
      homeData: [],
    }
  },
  components: {
    LoadingComponent,
    ProjectComponent,
    PostComponent,
    SliderComponent,
    HadisComponent,
  },
  mounted() {
    this.$axios.get('')
      .then((response) => {
        // handle success
        this.homeData = response.data.data
        // console.log(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  methods: {
    handelHomeItemClick(action) {
      console.log(action)
      switch (action.fnName) {
        case 'openPayment':
          this.$router.push({ name: 'pay', params: action.params })
          break;

        case 'taj':
          this.$router.push({ name: 'taj' })
          break;

        case 'openMyUrl':
          window.open(action.params.url)
          break;

        default:
          console.log('عملیات این دکمه تعریف نشده است ')
          break;
      }
    },
  }
}
</script>
