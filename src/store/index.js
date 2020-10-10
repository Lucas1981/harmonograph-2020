import Vue from 'vue';
import Vuex from 'vuex';
import { degToRad } from '../helper-functions';

const defaultSides = 360;
const defaultSteps = 1;
const defaultStroke = 1;
const defaultControls = {
  stroke: defaultStroke,
  objectColor: '#ff0000',
  sides: defaultSides,
  steps: defaultSteps,
  rotationXControl: false,
  rotationYControl: false,
  rotationZControl: false,
  scaleControl: false,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    controls: { ...defaultControls },
    oscillations: []
  },
  getters: {
    stroke: state => state.controls.stroke,
    objectColor: state => state.controls.objectColor,
    sides: state => state.controls.sides,
    steps: state => state.controls.steps,
    rotationXControl: state => state.controls.rotationXControl,
    rotationYControl: state => state.controls.rotationYControl,
    rotationZControl: state => state.controls.rotationZControl,
    scaleControl: state => state.controls.scaleControl,
    points: state => {
      const points = [];
      const step = 360 / state.controls.sides;
      for (let i = 0; i < 360; i += step) {
        let x = 0;
        let y = 0;
        let z = 1;
        state.oscillations.forEach(osc => {
          const rend = osc.inverted ? 360 - i * state.controls.steps : i * state.controls.steps;
          const scale = osc.amplitude;
          const angle = degToRad(osc.phase + rend * osc.frequency); // Ensure osc.phase is numeric
          switch (osc.type) {
              case 'x':
                  x += Math.sin(angle) * scale;
                  break;
              case 'y':
                  y += Math.sin(angle) * scale;
                  break;
              case 'z':
                  z += Math.sin(angle) * scale;
              case 'xy':
                  x += Math.sin(angle) * scale;
                  y += Math.cos(angle) * scale;
                  break;
              case 'xz':
                  x += Math.sin(angle) * scale;
                  z += Math.cos(angle) * scale;
                  break;
              case 'yz':
                  y += Math.sin(angle) * scale;
                  z += Math.cos(angle) * scale;
                  break;
              default:
                  throw new Error('Illegal oscillation type');
            }
          });
        points.push({ x, y, z });
      }
      return points;
    },
  },
  mutations: {
    setControl(state, { key, value }) {
      state.controls[key] = value;
    },
    setControls(state, controls) {
      state.controls = controls;
    },
    resetControls(state) {
      state.controls = { ...defaultControls };
    },
    addOscillation(state, osc) {
      const defaultOsc = { type: 'x', frequency: 1, amplitude: 50, phase: 0, inverted: false };
      state.oscillations.push({
        ...defaultOsc,
        ...osc
      });
    },
    setOscillations(state, oscillations) {
      state.oscillations = [ ...oscillations ];
    },
    removeOscillation(state, index) {
      state.oscillations.splice(index, 1);
    },
    clearAllOscillations(state) {
      state.oscillations = [];
    }
  }
})
