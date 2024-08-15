<template>
    <div class="card" :style="{ width: width + 'vw', height: height + 'px' }">
      <button style="position: absolute;top: 2%;right: 4%;background-color: rgb(0,0,0,0);" @click="exportImage"><img style="width: 25px;height: 25px;" src="../assets/camera.png" alt="导出"></button>
        <h2 class="title">实时参数数据</h2>
        <div class="chart" id="graph1" :style="{ width: width + 'vw'}" style="height:95%"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    mu_predict: Array,
    width: Number,
    height: Number
  },
  data() {
    return {
      resizing: false,
      lastX: 0,
      lastY: 0,
      chart: null
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
  methods:{
    renderChart(){
          // 获取一个具有指定 ID 的 DOM 元素
    const dom = document.getElementById('graph1');

    // 初始化 ECharts 实例，并将其绑定到上面获取的 DOM 元素上
    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    this.chart=myChart;

    // 创建一个空对象 app（这个对象可能在其他地方使用）
    const app = {};
    const data1 = this.mu_predict.map(item => item[0]);
    const data2 = this.mu_predict.map(item => item[1]);
    const data3 = this.mu_predict.map(item => item[2]);
    const data4 = this.mu_predict.map(item => item[3]);
    // 设置图表的配置项
    const option = {
      xAxis: {
        type: 'category',
        data: Array.from({ length: 50 }, (v, k) => k),
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
        type: 'value',
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
      legend: {
        data: ['μ1','μ2','μ3','μ4'], // 图例数据
        textStyle: {
          color: 'white' // 将图例文字颜色设置为白色
        }
      },
      series: [
        {
        name: 'μ1', // 图例显示的名称
        data: data1,
        type: 'line',
        smooth: true,
        areaStyle: {} // 将折线图的区域填充
        },
        {
        name: 'μ2', // 图例显示的名称
        data: data2,
        type: 'line',
        smooth: true,
        areaStyle: {} // 将折线图的区域填充
        },
        {
        name: 'μ3', // 图例显示的名称
        data: data3,
        type: 'line',
        smooth: true,
        areaStyle: {} // 将折线图的区域填充
        },
        {
        name: 'μ4', // 图例显示的名称
        data: data4,
        type: 'line',
        smooth: true,
        areaStyle: {
          origin: 500,
        } // 将折线图的区域填充
        }
      ]
    };
    // 如果 option 存在且类型为对象，则将配置项应用到图表上
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