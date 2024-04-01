<template>
    <div class="panel" :style="{ width: width + 'px', height: height + 'px' }">
        <h2 style="color: white;">一维数据</h2>
        <div class="chart" id="graph1" :style="{width: width+'px',height: height-100+'px'}"></div>
        <div ref="resizer" style="width: 20px; height: 20px;background-color: #02a6b5;position: absolute; right: 0; bottom: 0; cursor: se-resize;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    Mu_predict: Array
  },
  data() {
    return {
      width: 350,
      height: 450,
      resizing: false,
      lastX: 0,
      lastY: 0,
      chart: null
    };
  },
  mounted() {
    this.$refs.resizer.addEventListener('mousedown', this.startResize);
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  },
  updated() {
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
    const data1 = this.Mu_predict.map(item => item[0]);
    const data2 = this.Mu_predict.map(item => item[1]);
    const data3 = this.Mu_predict.map(item => item[2]);
    const data4 = this.Mu_predict.map(item => item[3]);
    // 设置图表的配置项
    const option = {
      xAxis: {
        type: 'category',
        data: Array.from({ length: 500 }, (v, k) => k),
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
        areaStyle: {} // 将折线图的区域填充
        }
      ]
    };
    // 如果 option 存在且类型为对象，则将配置项应用到图表上
    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }
  },
  beforeDestroy() {
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
    }
  }
};
</script>

<style src="/Users/12031/Documents/GitHub/Nuclear-Industry-web/vue/src/components/style.css"></style>