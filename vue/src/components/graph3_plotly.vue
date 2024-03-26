<template>
    <div class="panel" style="background-color: #4B4A54">
        <h2 style="color: white;">三维数据</h2>
        <div class="chart" id="myDiv" style="height:500px;width: 500px;"></div>
        <div class="panel-footer"></div>
    </div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  props: {
    data: Array,
  },
  mounted() {
    this.drawPlot();
  },
  methods: {
    drawPlot() {
      const data = this.data.map(plane =>
        plane.map(row =>
          row.map(value => value === 0 ? null : value)
        )
      );
      const x_data = [];
      const y_data = [];
      const z_data = [];

      // 将三维数组转换为 x, y, z 坐标
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          for (let k = 0; k < data[i][j].length; k++) {
            x_data.push(i);
            y_data.push(j);
            z_data.push(data[i][j][k]);
          }
        }
      }

      const plotData = [{
        x: x_data,
        y: y_data,
        z: z_data,
        mode: 'markers',
        marker: {
          size: 12,
          color: z_data,
          colorscale: 'Viridis',
          opacity: 0.8
        },
        type: 'scatter3d'
      }];

      const layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        scene:{
          xaxis: {
            color: 'white'
          },
          yaxis: {
            color: 'white'
          },
          zaxis: {
            color: 'white'
          }
        },
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0
        }
      };

      Plotly.newPlot('myDiv', plotData, layout);
      // 添加 plotly_click 事件监听器
      this.$el.querySelector('#myDiv').on('plotly_click', this.handleClick);
    },
    handleClick(data) {
      const xValue = data.points[0].x;
      console.log(xValue);
      this.$emit('xValueClicked', xValue);
    }
  }
};
</script>
<style src="/Users/12031/Documents/GitHub/Nuclear-Industry-web/vue/src/components/style.css"></style>