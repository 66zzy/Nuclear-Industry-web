<template>
    <div class="panel bar2">
        <h2 style="color: white;">三维数据</h2>
        <div class="chart" id="graph3" style="height:500px;width: 500px;"></div>
        <div class="panel-footer"></div>
    </div>
</template>

<script>
import Plotly from 'plotly.js-dist';
export default {
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      fetch('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv')
        .then(response => response.text())
        .then(data => {
          const rows = data.split('\n').map(row => row.split(','));
          
          function unpack(rows, key) {
            return rows.map(row => row[key]);
          }
          
          let z_data = [];
          for (let i = 0; i < 24; i++) {
            z_data.push(unpack(rows, i));
          }
          
          const trace = {
            z: z_data,
            type: 'surface'
          };
          
          const layout = {
            autosize: false,
            width: 400,
            height: 400,
            margin: {
              l: 10,
              r: 10,
              b: 10,
              t: 10
            }
          };
          
          Plotly.newPlot('graph3', [trace], layout);
        })
        .catch(error => {
          console.error('Error loading data:', error);
        });
    }
  }
};
</script>

<style>
.panel{
  position: relative;
  margin: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
.panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
</style>