<template>
  <div>
    <div class="card p-3">
      <div class="input-group mb-2">
        Color:&nbsp;
        <input id="colorPicker" type="color" v-model="localControls.objectColor">
      </div>
      <div class="input-group">
        <label class="checkbox-inline">
          <input
            type="checkbox"
            v-model="localControls.rotationXControl"
          > Rotation X
        </label>
      </div>
      <div class="input-group">
        <label class="checkbox-inline">
          <input
            type="checkbox"
            v-model="localControls.rotationYControl"
          > Rotation Y
        </label>
      </div>
      <div class="input-group">
        <label class="checkbox-inline">
          <input
            type="checkbox"
            v-model="localControls.rotationZControl"
          > Rotation Z
        </label>
      </div>
      <div class="input-group">
        <label class="checkbox-inline">
          <input
            type="checkbox"
            v-model="localControls.scaleControl"
          > Scale
        </label>
      </div>
      <div class="input-group">
        Stroke:
        <input
          class="tdh-slider"
          type="range"
          min="1"
          max="32"
          step="1"
          orient="horizontal"
          v-model="localControls.stroke"
        > {{ localControls.stroke }}
      </div>
      <div class="input-group">
        Sides:
        <input
          class="tdh-slider"
          type="range"
          min="1"
          max="2000"
          step="1"
          orient="horizontal"
          v-model="localControls.sides"
        > {{ localControls.sides }}
      </div>
      <div class="input-group">
        Steps:
        <input
          class="tdh-slider"
          type="range"
          min="1"
          max="100"
          step="1"
          value="1"
          orient="horizontal"
          v-model="localControls.steps"
        > {{ localControls.steps }}
      </div>
      <div class="input-group mt-3">
        <button class="btn btn-primary" @click="resetData()">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data: () => ({
    localControls: {}
  }),
  computed: {
    ...mapState([
      'controls'
    ]),
  },
  watch: {
    localControls: {
      handler: 'handleChange',
      deep: true
    }
  },
  beforeMount() {
    this.localControls = { ...this.controls }
  },
  methods: {
    ...mapMutations([
      'setControls',
      'resetControls'
    ]),
    handleChange() {
      this.setControls({
        ...this.localControls,
        stroke: parseInt(this.localControls.stroke),
        sides: parseInt(this.localControls.sides),
        steps: parseInt(this.localControls.steps)
      });
    },
    resetData() {
      this.resetControls();
      this.localControls = { ...this.controls };
      this.$emit('reset');
    }
  }
}
</script>
