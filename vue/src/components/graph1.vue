<template>
    <div class="panel" :style="{ width: width + 'px', height: height + 'px' }">
        <h2 class="title">一维数据</h2>
        <div class="chart" id="graph1" :style="{width: width+'px',height: height+'px'}"></div>
        <!-- <div ref="resizer" style="width: 20px; height: 20px;background-color: #02a6b5;position: absolute; right: 0; bottom: 0; cursor: se-resize;"></div> -->
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    Mu_predict: Array,
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

/*     const data1 = this.Mu_predict.map(item => item[0]);
    const data2 = this.Mu_predict.map(item => item[1]);
    const data3 = this.Mu_predict.map(item => item[2]);
    const data4 = this.Mu_predict.map(item => item[3]); */
    let series = [];
    for (let i = 0; i < 4; i++) {
      let data = this.Mu_predict.map(item => item[i]);
      series.push({
        id: 'μ' + (i + 1),
        name: 'μ' + (i + 1),
        type: 'line',
        data: data,
        smooth: true,     
      });
      series.push({
        id: 'μ' + (i + 1) + '预测下界',
        name: 'μ' + (i + 1),
        type: 'line',
        data: data.map(() => Math.min(...data)),
        smooth: true,
        stack: 'μ' + (i + 1),
        lineStyle: {
          opacity: 0
        },
        legendHoverLink: false,
        silent: true,
        showSymbol: false         
      });
      series.push({
        id: 'μ' + (i + 1) + '预测上界',
        name: 'μ' + (i + 1),
        type: 'line',
        data: data.map(() => Math.max(...data)-Math.min(...data)),
        smooth: true,
        stack: 'μ' + (i + 1),
        areaStyle: {
          opacity: 0.3
        },
        lineStyle: {
          opacity: 0
        },
        legendHoverLink: false,
        silent: true,
        showSymbol: false     
      });
    }
    // 设置图表的配置项
    const option = {
      xAxis: {
        type: 'category',
        data: Array.from({ length: 500 }, (v, k) => k),
        axisLabel: {
          textStyle: {color: 'white'}
        },
        axisLine: {
          lineStyle: {color: 'white'}
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {color: 'white'}
        },
        axisLine: {
          lineStyle: {color: 'white'}
        }
      },
      textStyle: {color: 'white'},
      legend: {
      textStyle: {color: 'white'},
      },
      series:series
    };
    // 如果 option 存在且类型为对象，则将配置项应用到图表上
    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }
    }
  },
};
</script>

<style src="/src/components/style.css"></style>