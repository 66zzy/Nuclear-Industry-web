<template>
    <div class="panel" ref="component" :style="{ width: width + 'px', height: height + 'px' }">
        <h2 style="color: white;">二维数据-No.{{ order+1}}</h2>
        <div class="chart" id="graph2" :style="{width: width+'px',height: height-100+'px'}"></div>
        <el-input-number v-model="order" :min="0" :max="15" style="position: relative;bottom: 20px;"/>
        <div ref="resizer" style="width: 20px; height: 20px;background-color: #02a6b5;position: absolute; right: 0; bottom: 0; cursor: se-resize;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    data: Array,
  },
  data() {
    return {
      order: 1,
      width: 350,
      height: 450,
      resizing: false,
      lastX: 0,
      lastY: 0,
      chart: null
    };
  },
  mounted() {
    this.renderChart();
    this.$refs.resizer.addEventListener('mousedown', this.startResize);
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  },
  updated() {
    this.renderChart();
  },
  beforeDestroy(){
    this.$refs.resizer.removeEventListener('mousedown', this.startResize);
    document.removeEventListener('mousemove', this.resize);
    document.removeEventListener('mouseup', this.stopResize);
  },
  methods: {
    startResize(event) {
      this.resizing = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    },
    resize(event) {
      if (!this.resizing) return;
      this.width += event.clientX - this.lastX;
      this.height += event.clientY - this.lastY;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
      this.chart.resize();
    },
    stopResize() {
      this.resizing = false;
    },
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
  },
};
</script>

<style src="/Users/12031/Documents/GitHub/Nuclear-Industry-web/vue/src/components/style.css"></style>