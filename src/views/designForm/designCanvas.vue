<template>
  <div class="canvas">
    <canvas ref="myCanvas" width="1000" height="800" style="border:1px solid #d3d3d3;"></canvas>
    <img :src="src"/>
  </div>
</template>

<script>
export default {
  data () {
    return { src: '' }
  },
  mounted () {
    console.log(this.$refs)
    let dom = this.$refs.myCanvas
    let ctx = dom.getContext('2d')
    // 线条宽度
    ctx.lineWidth = 0.1
    // 透明度
    ctx.globalAlpha = 0.2
    ctx.beginPath()
    // 画矩形（x, y , w, h）
    ctx.rect(0, 0, 50, 50)
    ctx.fill()
    this.src = dom.toDataURL('image/png')
  }
}
</script>

<style>

</style>
