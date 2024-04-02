<template>
  <div class="panel" ref="component" :style="{ width: width + 'px', height: height + 'px' }">
      <h2 style="color: white;">三维数据</h2>
      <div style="display: flex;height: 15px;justify-content: space-evenly;">
        <div style="display:flex;width: 120px;padding-left: 2px;">
          <p style="color: white;font-size:25px;padding: 0;position: relative;top:-45px">x: </p>
          <el-slider v-model="boxWidth" :min="100" :max="500"/>
        </div>    
        <div style="display:flex;width: 120px;padding-left: 2px;">
          <p style="color: white;font-size:25px;padding: 0;position: relative;top:-45px">y:</p>
          <el-slider v-model="boxDepth" :min="100" :max="500"/>
        </div>    
        <div style="display:flex;width: 120px;padding-left: 2px;">
          <p style="color: white;font-size:25px;padding: 0;position: relative;top:-45px">z:</p>
          <el-slider v-model="boxHeight" :min="100" :max="500"/>
        </div>  
      </div>  
      <div class="chart" ref="chart" :style="{width: width+'px',height: height-100+'px'}"></div>
      <!-- <div ref="resizer" style="width: 20px; height: 20px;background-color: #02a6b5;position: absolute; right: 0; bottom: 0; cursor: se-resize;"></div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl'
export default {
  props: {
    data: Array,
    width: Number,
    height: Number
  },
  data(){
    return {
      boxWidth: 100,
      boxDepth: 100,
      boxHeight: 100,
      chart: null,
    }
  },
  mounted() {
    this.drawPlot();
    this.chart.resize();
  },
  updated() {
    this.drawPlot();
    this.chart.resize();
  },
  methods: {
    drawPlot() {
      const data=this.data;
      const x_data = [];
      const y_data = [];
      const z_data = [];
      const value_data = [];
      console.log(data);
      // 将三维数组转换为 x, y, z 坐标
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          for (let k = 0; k < data[i][j].length; k++) {
            if (data[i][j][k] === 0) {
              continue;
            }
            x_data.push(i);
            y_data.push(j);
            z_data.push(k);
            value_data.push(data[i][j][k]);
          }
        }
      }

      const chart = echarts.init(this.$refs.chart);
      this.chart = chart;
      chart.setOption({
          backgroundColor: 'rgba(0,0,0,0)',
          tooltip: {
              axisPointer: {lineStyle: {color: 'white'}},
          },
          xAxis3D: {
              axisLine: {lineStyle: {color: 'white'}},
              axisLabel: {color: 'white',fontWeight: 'bold',fontSize: 18}
          },
          yAxis3D: {
              axisLine: {lineStyle: {color: 'white'}},
              axisLabel: {color: 'white',fontWeight: 'bold',fontSize: 18}
          },
          zAxis3D: {
              axisLine: {lineStyle: {color: 'white'}},
              axisLabel: {color: 'white',fontWeight: 'bold',fontSize: 18}
          },
          grid3D: {
              axisPointer: {lineStyle: {color: 'white'}},
              boxWidth: this.boxWidth,
              boxHeight: this.boxHeight,
              boxDepth: this.boxDepth,
          },
          series: [{
          type: 'scatter3D',
          data: x_data.map((x, idx) => [x, y_data[idx], z_data[idx], value_data[idx]]),
          symbol:'rect',
          symbolSize: 12,
          itemStyle: {
            opacity: 1
          }
          }],
          visualMap: {
              dimension: 3,
              min: 0,
              max: 2,
              calculable: true,
              realtime: false,
              inRange: {
                  color: [
                  '#ffffff', '#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000'
                  ]
              },
              right: 0,
              top: 0
          }
      });

      // 添加点击事件监听器
      chart.on('click', params => {
        const zValue = params.value[2];
        this.$emit('zValueClicked', zValue);
      });
    }
  }
};
</script>
<style src="/Users/12031/Documents/GitHub/Nuclear-Industry-web/vue/src/components/style.css"></style>