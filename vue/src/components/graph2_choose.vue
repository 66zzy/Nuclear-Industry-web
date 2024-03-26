<template>
    <div class="panel">
        <h2 style="color: white;">二维数据-No.{{ order+1}}</h2>
        <div class="chart" id="graph2" style="height: 400px;width: 350px;"></div>
        <div class="panel-footer"></div>
        <el-input-number v-model="order" :min="0" :max="15" />
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
      order: 1
    };
  },
  mounted() {
    this.renderChart();
    window.addEventListener('resize', this.handleResize);
  },
  updated() {
    this.renderChart();
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
      }
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
    handleResize() {
      this.myChart.resize();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style src="/Users/12031/Documents/GitHub/Nuclear-Industry-web/vue/src/components/style.css"></style>