<template>
    <div class="card" ref="component" :style="{ width: width + 'vw', height: height + 'px' }">
      <button style="position: absolute;top: 2%;right: 4%;background-color: rgb(0,0,0,0);" @click="exportImage"><img style="width: 25px;height: 25px;" src="../assets/camera.png" alt="导出"></button>
        <h2 class="title">反应堆截面数据视图-No.{{ order+1}}</h2>
        <el-input-number v-model="order" :min="0" :max="15" style="position: absolute;left: 4%"/>
        <div class="chart" id="graph2" :style="{ width: width + 'vw'}" style="height:95%"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    data: Array,
    width: Number,
    height: Number,
    min_max: Array
  },
  data() {
    return {
      order: 1,
      resizing: false,
      lastX: 0,
      lastY: 0,
      chart: null,
    };
  },
  mounted() {
    this.renderChart();
    this.chart.resize();
    window.addEventListener('resize', () => {
      this.chart.resize(); // 当窗口大小改变时，调整图表的大小
    });
  },
  updated() {
    this.renderChart();
    this.chart.resize();
  },
  methods: {
    generateData() {
      let data = [];
      let rowData = this.data;
      for (let i = 0; i < rowData.length; i++) {
        for (let j = 0; j < rowData[i].length; j++) {
          if (rowData[i][j][this.order] === 0) {
            continue;
          }
          data.push([j, i, rowData[i][j][this.order]]);
        }
      }
      return data;
    },
    renderChart() {
      let dom = document.getElementById('graph2');
      let myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      this.chart=myChart;
      let option = {
  xAxis: {
    type: 'category',
    data: Array.from({ length: 15 }, (_, i) => i + 1),
    axisLabel: {
      textStyle: {
        color: 'white' // 将 x 轴标签文字颜色设置为白色
      }
    },
    axisLine: {
      lineStyle: {
        color: 'white' // 将 x 轴线的颜色设置为白色
      }
    }
  },
  yAxis: {
    type: 'category',
    data: Array.from({ length: 15 }, (_, i) => i + 1),
    axisLabel: {
      textStyle: {
        color: 'white' // 将 y 轴标签文字颜色设置为白色
      }
    },
    axisLine: {
      lineStyle: {
        color: 'white' // 将 y 轴线的颜色设置为白色
      }
    }
  },
  textStyle: {
    color: 'white' // 将其他所有文字元素的颜色设置为白色
  },
  visualMap: {
    min: this.min_max[0],
    max: this.min_max[1],
    calculable: true,
    realtime: false,
    inRange: {
        color: [
        '#ffffff', '#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000'
        ]
      },
    right: 0,
    top: 0
  },
  series: [
    {
      name: 'Heatmap',
      data: this.generateData(),
      type: 'heatmap',
      label: {
        show: false,
        position: 'inside',
        formatter: function (params) {
          return params.value[2];
        },
        fontSize: 10,
        color: 'black'
      }//区块上的数字
    }
  ]
        // ECharts配置项
      };

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
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
  },
};
</script>

<style src="/src/components/style.css"></style>