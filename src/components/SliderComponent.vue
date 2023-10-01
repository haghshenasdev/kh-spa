<template>
  <v-row class="my-5">
          <v-carousel id="slider" cycle hide-delimiter-background :show-arrows="false" class="m-0" height="300px">
            <div v-for="item in sliderData">
              <v-carousel-item :src="item.image" cover></v-carousel-item>
            </div>
          </v-carousel>
        </v-row>
</template>

<script>
export default {
  props: [
    'sliderData',
  ]
}
</script>
