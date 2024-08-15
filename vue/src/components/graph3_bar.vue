<template>
    <div class="card" ref="component" :style="{ width: width + 'vw', height: height + 'px' }">
        <h2 class="title">反应堆堆芯分布</h2>
        <button style="position: absolute;top: 10px;right: 10px;background-color: rgb(0,0,0,0);" @click="exportImage">
          <div style="width: 25px;height: 25px;"><img style="width: 25px;height: 25px;" src="../assets/camera.png" alt="导出"></div>
        </button>
        <button style="position: absolute;top: 10px;right: 50px;background-color: rgb(0,0,0,0);" @click="alone=!alone">
          <div style="width: 25px;height: 25px;">
          <img v-if='alone' style="width: 25px;height: 25px;" src="../assets/unvisible.png" alt="不可见">
          <img v-else style="width: 25px;height: 25px;" src="../assets/visible.png" alt="可见">
          </div>
        </button>
        <button style="position: absolute;top: 10px;right: 90px;background-color: rgb(0,0,0,0);" @click="oneFour=!oneFour">
          <div v-if='oneFour' style="width: 25px;height: 25px;color: skyblue;font-size: 17px;">1/4</div>
          <div v-else  style="width: 25px;height: 25px;color: skyblue;font-size: 20px;">All</div>
        </button>
        <div style="display: flex;justify-content: space-evenly;">
          <div style="display:flex;width: 120px;padding-left: 2px;">
            <p style="color: white;font-size:25px;margin-right:20px">x: </p>
            <el-slider v-model="boxWidth" :min="100" :max="500"/>
          </div>    
          <div style="display:flex;width: 120px;padding-left: 2px;">
            <p style="color: white;font-size:25px;margin-right:20px">y:</p>
            <el-slider v-model="boxDepth" :min="100" :max="500"/>
          </div>    
          <div style="display:flex;width: 120px;padding-left: 2px;">
            <p style="color: white;font-size:25px;margin-right:20px">z:</p>
            <el-slider v-model="boxHeight" :min="100" :max="500"/>
          </div>  
        </div>  
        <div class="chart" ref="chart" :style="{ width: width + 'vw'}" style="height:80%;position: absolute;top:15%"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import 'echarts-gl';
import { MIN_MS } from 'plotly.js-dist';
  
  export default {
    props: {
    data: Array,
    width: Number,
    height: Number,
    min_max: Array
  },
  data(){
    return {
      boxWidth: 100,
      boxDepth: 100,
      boxHeight: 100,
      chart: null,
      series: [],
      xValue: null,
      yValue: null,
      alone: false,
      oneFour: false
    }
  },
  mounted() {
    this.drawPlot();
    this.chart.resize();
    window.addEventListener('resize', () => {
      this.chart.resize(); // 当窗口大小改变时，调整图表的大小
    });
  },
  updated() {
    this.drawPlot();
    this.chart.resize();
  },
  watch: {
    data: {
      handler() {
        this.drawPlot();
        this.chart.resize();
      },
      deep: true
    },
  },
  watch: {
    alone: {
      handler() {
        this.drawPlot();
        this.chart.resize();
      },
    },
  },
    methods: {
      drawPlot() {
        console.log(this.data)  
        const value_data = [];
        const generateData = (k) => {
            const data=this.data;
            const barData=[];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j][k] === 0) {
                        continue;
                    }
                    if (this.alone && (i !== this.xValue || j !== this.yValue)) {
                        continue;
                    }
                    barData.push([i,j,1,data[i][j][k],k]);
                    value_data.push(data[i][j][k])
                }
            }
            return barData;
        };
        const generateEmpty = (height) => {
            const data=this.data;
            const barData=[];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    barData.push([i,j,height,-1,-1]);
                }
            }
            return barData;
        };
        const generateData_14 = (k) => {
          const data=this.data;
          const barData=[];
          for (let i = 0; i < data.length/2; i++) {
              for (let j = Math.floor(data[i].length/2); j < data[i].length; j++) {
                  if (data[i][j][k] === 0) {
                      continue;
                  }
                  barData.push([i,j,1,data[i][j][k],k]);
                  value_data.push(data[i][j][k])
              }
          }
          return barData;
        };
        const generateEmpty_14 = (height) => {
            const data=this.data;
            const barData=[];
            for (let i = 0; i < data.length; i++) {
                for (let j = Math.floor(data[i].length/2); j < data[i].length; j++) {
                    barData.push([i,j,height,-1,-1]);
                }
            }
            return barData;
        };
        let series = [];
        for (let i = 0; i < this.data[0][0].length; i++) {
          series.push({
            type: 'bar3D',
            data: this.oneFour ? generateData_14(i): generateData(i),
            stack: 'stack',
            tooltip: { show: false },
            shading: 'lambert',
            barSize:6.6,
            itemStyle:{
                opacity:0.92
            }
          });
          series.push({
            type: 'bar3D',
            data: this.oneFour ? generateEmpty_14(this.boxHeight/100-1): generateEmpty(this.boxHeight/100-1),
            stack: 'stack',
            tooltip: { show: false }, 
            shading: 'lambert',
            barSize:6.6,
            itemStyle:{
                opacity:0
            }
          });
        }
        this.series = series;
        const chart = echarts.init(this.$refs.chart);
        this.chart = chart;
        chart.setOption({
          backgroundColor: 'rgba(0,0,0,0)',
          tooltip: {
            axisPointer: { lineStyle: { color: 'white' } },
          },
          xAxis3D: {
            axisLine: { lineStyle: { color: 'white' } },
            axisLabel: { color: 'white', fontWeight: 'bold', fontSize: 18 }
          },
          yAxis3D: {
            axisLine: { lineStyle: { color: 'white' } },
            axisLabel: { color: 'white', fontWeight: 'bold', fontSize: 18 }
          },
          zAxis3D: {
            axisLine: { lineStyle: { color: 'white' } },
            axisLabel: { color: 'white', fontWeight: 'bold', fontSize: 18 }
          },
          grid3D: {
            axisPointer: { lineStyle: { color: 'white' } },
            boxWidth: this.boxWidth,
            boxHeight: this.boxHeight,
            boxDepth: this.boxDepth,
          },
          series: this.series,
          visualMap: {
              dimension: 3,
              min: this.min_max[0],
              max: this.min_max[1],
              calculable: true,
              realtime: false,
              inRange: {
                  color: [
                  '#eeeeee', '#2222ee', '#22eeee', '#22ee22', '#eeee22', '#ee2222'
                  ],
              },
              right: 0,
              top: 0
          }
        });
  
        // 添加点击事件监听器
        chart.on('click', params => {
          this.xValue = params.value[0];
          this.yValue = params.value[1];
          const zValue = params.value[4];
          this.$emit('zValueClicked', zValue);
        });
      },
      exportImage() {
        const url = this.chart.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#4B4A54'
        });
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chart.png';
        link.click();
      },
    }
  };
  </script>
  <style src="/src/components/style.css"></style>