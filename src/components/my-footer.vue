<template>
  <div class="text-center">
    <input type="file" id="loadfile" class="loadfile" />
    <button class="btn btn-primary" @click="loadJsonBtn()">Load .json</button> &nbsp;
    <button class="btn btn-primary" @click="saveJson()">Save .json</button> &nbsp;
    <button class="btn btn-primary" @click="saveObj()">Save .obj</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

const downloadFile = (data, filename) => {
  /* From StackOverflow:
  http://stackoverflow.com/questions/20300547/download-csv-file-from-web-api-in-angular-js */

  const encodedURIComponent = encodeURIComponent(data)
  const a = document.createElement('a');
  a.setAttribute('download', filename);
  a.setAttribute('href', `data:text/plain;charset=utf-8,${encodedURIComponent}`);
  a.style.display = 'none';
  document.getElementsByTagName('body')[0].appendChild(a);
  a.click();
  document.getElementsByTagName('body')[0].removeChild(a);
};

export default {
  computed: {
    ...mapState([
      'controls',
      'oscillations'
    ]),
    ...mapGetters([
      'points'
    ]),
    rendition() {
      let rendl = '';
      let rendv = '';
      for (let i = 0; i < this.points.length; i++) {
        const { x, y, z } = this.points[i];
        rendv += `v ${x} ${y} ${z}\n`;
        if(i === this.points.length - 1) {
          rendl += `l ${i + 1} 1\n`;
        } else {
          rendl += `l ${i + 1} ${i + 2}\n`;
        }
      }
      return `${rendv}\n${rendl}`;
    }
  },
  methods: {
    ...mapMutations([
      'setOscillations',
      'setControls'
    ]),
    loadJsonBtn() {
      const reader = new FileReader();
      const fileLoadPointer = document.getElementById("tdh-loadfile");
      const outcome = null;
      fileLoadPointer.addEventListener('change', () => {
        reader.onload = function(e) {
          try {
            outcome = JSON.parse(e.target.result);
            this.setControls(outcome.controls);
            this.setOscillations(outcome.oscillations);
          }
          catch (err){
            console.log("Something went wrong");
            console.log(err);
          }
        };
        reader.readAsText(that.files[0]);
      }, false);
      fileLoadPointer.click();
    },

    saveJson() {
      const filename = prompt('Enter filename');
      const data = JSON.stringify({
        controls: this.controls,
        oscillations: this.oscillations,
      }, null, 2);
      console.log(data);
      downloadFile(data, filename);
    },

    saveObj() {
      const filename = prompt('Enter filename');
      downloadFile(this.rendition, filename);
    }
  }
}
</script>

<style scoped>
.loadfile {
  display: none !important;
}
</style>
