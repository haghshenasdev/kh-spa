<template>
  <div v-if="errorData != null && errorData != undefined"
                          v-for="item in errorData">
                          <p class="mb-3 text-red">{{ item }}</p>
                        </div>
</template>
<script>
export default{
  props:{
    errorData : null,
  }
}
</script>
