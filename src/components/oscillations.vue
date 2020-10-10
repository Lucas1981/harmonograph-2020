<template>
  <div class="w-100">
    <div class="d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-primary"
        @click="addOscillation"
      >+ Osc</button>
      <button
        type="button"
        class="btn btn-danger"
        @click="clearAllOscillations"
      >Clear all</button>
    </div>

    <template
      v-for="(oscillation, index) of localOscillations"
    >
      <div class="card my-3 p-3" :key="`osc-${index}`">
        <div class="input-group d-flex justify-content-between">
          <div>
            Type:&nbsp;
            <select
              v-model="oscillation.type"
            >
              <option
                v-for="type of oscillationTypes"
                :key="type"
                :value="type"
              >{{ type }}</option>
            </select>
          </div>
          <button
            type="btn"
            class="btn btn-danger btn-sm"
            @click="removeOscillation(index)"
          >- Osc</button>
        </div>
        <div class="input-group">
          Freq:
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            class="slider"
            v-model="oscillation.frequency"
          />
          {{ oscillation.frequency }}
          Inv:&nbsp;<input type="checkbox" class="checkbox" v-model="oscillation.inverted">
        </div>
        <div class="input-group">
          Amp:
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            class="slider"
            v-model="oscillation.amplitude"
          />
          {{ oscillation.amplitude }}
        </div>
        <div class="input-group">
          Phase:
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            class="slider"
            v-model="oscillation.phase"
          />
          {{ oscillation.phase }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import oscillationTypes from '../oscillation-types';
import isEqual from 'lodash/isEqual';
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    localOscillations: []
  }),
  computed: {
    ...mapState([
      'oscillations'
    ])
  },
  watch: {
    oscillations: {
      deep: true,
      handler: 'setLocalOscillations'
    },
    localOscillations: {
      deep: true,
      handler: 'handleChange'
    }
  },
  beforeMount() {
    this.oscillationTypes = oscillationTypes;
    this.setLocalOscillations(this.oscillations);
  },
  methods: {
    ...mapMutations([
      'addOscillation',
      'setOscillations',
      'removeOscillation',
      'clearAllOscillations'
    ]),
    setLocalOscillations(newVal) {
      // Prevent infinite loop
      if (!isEqual(newVal, this.localOscillations)) {
        // The records are also objects, so clone deep to prevent shared pointers
        this.localOscillations = JSON.parse(JSON.stringify(newVal));
      }
    },
    handleChange(newVal) {
      if (!isEqual(newVal, this.oscillations)) {
        this.setOscillations(this.localOscillations.map(osc => ({
            ...osc,
            // Make sure these are all numeric and not string
            frequency: parseInt(osc.frequency),
            amplitude: parseInt(osc.amplitude),
            phase: parseInt(osc.phase),
          }))
        );
      }
    }
  }
}
</script>

<style scoped>
.slider {
  width: 128px;
  display: inline;
}

.checkbox {
  margin-top: 6px;
}
</style>
