<template>
    <div class="panel" :style="{ width: width + 'vw', height: height + 'px' }">
      <button style="position: absolute;top: 2%;right: 4%;background-color: rgb(0,0,0,0);" @click="exportImage"><img style="width: 25px;height: 25px;" src="../assets/camera.png" alt="导出"></button>
        <h2 class="title">一维数据</h2>
        <div class="chart" id="graph1" style="width: 95%;height: 95%;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { el } from 'element-plus/es/locale';

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
      length: 5
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
  watch: {
    // 监听 mu_predict 的变化
    mu_predict: {
      handler() {
        this.renderChart();
        this.chart.resize();
      },
      deep: true
    }
  },
  methods:{
    findNonNull(data, start, step) {
      let i = start;
      while (data[i] === null && i >= 0 && i < data.length) {
        i += step;
      }
      return i;
    },
    replaceNull(data_lower) {
      for (let i = 0; i < data_lower.length; i++) {
        if (data_lower[i] === null) {
          let prevIndex = this.findNonNull(data_lower, i - 1, -1);
          let nextIndex = this.findNonNull(data_lower, i + 1, 1);
          if (prevIndex >= 0 && nextIndex < data_lower.length) {
            data_lower[i] = data_lower[prevIndex] + (data_lower[nextIndex] - data_lower[prevIndex]) * (i - prevIndex) / (nextIndex - prevIndex);
          }
        }
      }
      return data_lower;
    },
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
      if (!this.mu_predict[i]) {
        continue;
      }
      // let data = this.mu_predict[i];  
      let data = [1,5,6,7,5,6,8,5,2,6,4,6,5,6,6,2,2,6,5,8,6,5,16,5];
      this.length = data.length;  
      series.push({
        id: 'μ' + (i + 1),
        name: 'μ' + (i + 1),
        type: 'line',
        data: data,
        smooth: true,     
      });
      let data_lower = data.map((val, i) => {
        if (i === 0 || i === data.length - 1) return val; // 对于数组的第一个和最后一个元素，我们无法确定它们是否是极小值，所以返回null
        if (data[i - 1] >= val && data[i + 1] >= val) return val; // 如果当前元素比其相邻元素小，则返回该元素
        return null; // 否则返回null
      });
      data_lower = this.replaceNull(data_lower);
      series.push({
        id: 'μ' + (i + 1) + '预测下界',
        name: 'μ' + (i + 1),
        type: 'line',
        data: data_lower,
        smooth: true,
        stack: 'μ' + (i + 1),
        lineStyle: {
          opacity: 0
        },
        legendHoverLink: false,
        silent: true,
        showSymbol: false         
      });
      // let data_upper = data.map(() => Math.max(...data)-Math.min(...data));
      let data_upper = data.map((val, i) => {
        if (i === 0 || i === data.length - 1) return val-data_lower[i]; // 对于数组的第一个和最后一个元素，我们无法确定它们是否是极小值，所以返回null
        if (data[i - 1] <= val && data[i + 1] <= val) return val-data_lower[i]; // 如果当前元素比其相邻元素小，则返回该元素
        return null; // 否则返回null
      });
      data_upper = this.replaceNull(data_upper);
      series.push({
        id: 'μ' + (i + 1) + '预测上界',
        name: 'μ' + (i + 1),
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
        legendHoverLink: false,
        silent: true,
        showSymbol: false     
      });
    }
    // 设置图表的配置项
    const option = {
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