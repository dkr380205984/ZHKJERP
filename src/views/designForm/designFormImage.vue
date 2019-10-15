<template>
  <div id="designFormImage"></div>
</template>
<script>
import { craftOne } from '@/assets/js/api.js'
export default {
  mounted () {
    craftOne({
      id: this.$route.params.id
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>
<style lang="less">
</style>
