<template>
  <canvas
    class="canvas"
    ref="canvas"
  ></canvas>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    stroke: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    canvas: null,
    ctx: null
  }),
  mounted() {
    this.canvas = this.$refs.canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.mainLoop();
  },
  methods: {
    mainLoop() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.beginPath();
      this.ctx.lineWidth = this.stroke;
      this.ctx.strokeStyle = this.color;
      for (let i = 0; i < this.data.length; i++) {
        if (i === 0) this.ctx.moveTo(this.data[i].x, this.data[i].y);
        else this.ctx.lineTo(this.data[i].x, this.data[i].y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
      window.requestAnimationFrame(this.mainLoop);
    }
  }
}
</script>

<style>
.canvas {
  background-color: black;
}
</style>
