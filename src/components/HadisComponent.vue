<template>
  <row justify="center" class="text-center">
          <v-col class="my-5">
            <p>{{ hadisData.gala }}</p>
            <h4>{{ hadisData.arabi }}</h4>
            <p>{{ hadisData.farsi }}</p>
          </v-col>
        </row>
</template>

<script>
export default {
  props: [
    'hadisData',
  ]
}
</script>
