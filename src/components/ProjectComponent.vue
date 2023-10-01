<template>
  <v-row>

    <v-col class="mt-2" cols="12">
      <strong>پروژه ها</strong>
    </v-col>
  </v-row>
  <v-row>
    <v-slide-group v-model="model" show-arrows>
      <v-slide-group-item v-for="item in pData" :key="item">

        <v-col>
          <v-card width="250px" @click="$router.push({ name: 'project', params: { id: item.id } })">
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

      </v-slide-group-item>
    </v-slide-group>
  </v-row>
</template>

<script>
export default {
  props: [
    'pData',
  ]
}
</script>
