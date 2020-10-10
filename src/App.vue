<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <a class="navbar-brand" href="#">Harmonograph</a>
    </nav>

    <div class="row px-3 app-body">
      <div class="col-3 d-flex justify-content-center">
        <global-controls
          @reset="resetControls()"
        />
      </div>
      <div class="col-6 d-flex justify-content-center">
        <div>
          <my-canvas
            :data="points2D"
            :width="width"
            :height="height"
            :color="objectColor"
            :stroke="stroke"
          />
          <my-footer />
        </div>
      </div>
      <div class="col-3 d-flex justify-content-center">
        <oscillations />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex'
import GlobalControls from './components/global-controls';
import MyCanvas from './components/my-canvas';
import MyFooter from './components/my-footer';
import Oscillations from './components/oscillations';
import oscillationTypes from './oscillation-types';
import { scaleAndRotate, degToRad } from './helper-functions.js';

const degreesPerSecond = 90 / 1000;
const width = 640;
const height = 480;

export default {
  name: 'app',
  data: () => ({
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    scale: 1,
    timer: null
  }),
  components: {
    GlobalControls,
    MyCanvas,
    Oscillations,
    MyFooter
  },
  computed: {
    ...mapState([
      'oscillations'
    ]),
    ...mapGetters([
      'stroke',
      'objectColor',
      'sides',
      'steps',
      'rotationXControl',
      'rotationYControl',
      'rotationZControl',
      'scaleControl',
      'points'
    ]),
    points2D() {
      const points = [];
      for (let i = 0; i < this.points.length; i++) {
        const { x, y, z } = this.points[i];
        const p3d = scaleAndRotate(
          x, y, z,
          this.rotationX, this.rotationY, this.rotationZ,
          1 + Math.sin(degToRad(this.scale))
        );
        const p2d = this.convert3DTo2D(p3d.x, p3d.y, p3d.z)
        points.push(p2d);
      }
      return points;
    }
  },
  beforeMount() {
    this.width = width;
    this.height = height;
    this.addOscillation({ type: 'xy', frequency: 1 });
    this.addOscillation({ type: 'xy', frequency: 2 });
    this.timer = new Date();
    this.scaleAndRotate();
  },
  methods: {
    ...mapMutations([
      'addOscillation'
    ]),
    resetControls() {
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
      this.scale = 1;
    },
    convert3DTo2D(x, y, z) {
      /* Translate 3D point for 2D screen */
      const swc = this.width / 2;
      const shc = this.height / 2;
  		const x2 = (x * swc / (swc + z)) + swc;
  		const y2 = (y * swc / (swc + z)) + shc;
      return { x: x2, y: y2 };
    },
    scaleAndRotate() {
      const now = new Date();
      const diff = now - this.timer;
      const movement = degreesPerSecond * diff;
      if (this.rotationXControl) this.rotationX = (this.rotationX + movement) % 360;
      if (this.rotationYControl) this.rotationY = (this.rotationY + movement) % 360;
      if (this.rotationZControl) this.rotationZ = (this.rotationZ + movement) % 360;
      if (this.scaleControl) this.scale = (this.scale + movement) % 360;
      window.requestAnimationFrame(this.scaleAndRotate);
      this.timer = now;
    }
  }
}
</script>

<style>
.app-body {
  width: 100%;
  overflow: hidden;
}
</style>
