<template>
  <v-app id="inspire">

    <v-main class="bg-blue-grey-lighten-5">
      <v-container v-if="projectData == null">
        <LoadingComponent />
      </v-container>
      <v-container v-else>
        <v-row justify="space-around">
          <v-col>
            <v-card v-if="projectData != null">
              <v-img height="200" :src="projectData.image_head" cover class="text-white">
              </v-img>

              <v-card-title>
                {{ projectData.title }}
              </v-card-title>
              <v-card-text>
                <div v-html="projectData.description"></div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-bottom-navigation v-if="projectData != null && projectData.type_pay != null" class="fixed-bottom position-fixed" @click="$router.push({name:'pay',params:{type:projectData.type_pay}})">
          <v-btn block>مشارکت در پروژه</v-btn>
        </v-bottom-navigation>

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
  data() {
    return {
      projectData: null
    }
  },
  mounted() {
    this.$axios.get('/project', {
      params: {
        id: this.$route.params.id
      }
    })
      .then((response) => {
        // handle success
        this.projectData = response.data.data
        // console.log(this.projectData)
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
</style>
