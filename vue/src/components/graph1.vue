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
      chart: null,
      length: 5,
      param_name:["B_u","S_t","P_w","T_in"]
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
  watch: {
    // 监听 mu_predict 的变化
    mu_predict: {
      handler() {
        this.renderChart();
        this.chart.resize();
      },
      deep: true
    },
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

    let series = [];
    for (let i = 0; i < 4; i++) {
      if (!this.mu_predict[i]) {
        continue;
      }
      let data = this.mu_predict[i]; 
      this.length = data.length;
      series.push({
        id: 'μ' + (i + 1), 
        name: this.param_name[i],
        type: 'line',
        data: data,
        smooth: true,     
      });
      // 现在是最值上下界
      let data_lower = data.map(() => Math.min(...data));
      series.push({
        id: 'μ' + (i + 1) + '预测下界',
        name: this.param_name[i],
        type: 'line',
        data: data_lower,
        smooth: true,
        stack: 'μ' + (i + 1),
        lineStyle: {
          opacity: 0
        },
        tooltip: {
          show: false
        },
        legendHoverLink: false,
        silent: true,
        showSymbol: false         
      });
      let data_upper = data.map(() => Math.max(...data)-Math.min(...data));
      series.push({
        id: 'μ' + (i + 1) + '预测上界',
        name: this.param_name[i],
        type: 'line',
        data: data_upper,
        smooth: true,
        stack: 'μ' + (i + 1),
        areaStyle: {
          opacity: 0.3
        },
        lineStyle: {
          opacity: 0
        },
        tooltip: {
          show: false
        },
        legendHoverLink: false,
        silent: true,
        showSymbol: false     
      });
    }
    // 设置图表的配置项
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: this.length }, (v, k) => k),
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