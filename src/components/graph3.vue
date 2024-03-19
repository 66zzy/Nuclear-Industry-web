<template>
    <div class="panel bar2">
        <h2 style="color: white;">三维数据</h2>
        <div class="chart" id="graph3" style="height:500px;width: 500px;"></div>
        <div class="panel-footer"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.renderChart();
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    generateData() {
      let data = [];
      let rowData = [
    [null, null, null, null, null, 51, 52, 50, 51, 52, null, null, null, null, null],
    [null, null, null, 46, 47, 48, 49, 45, 46, 47, 48, 49, null, null, null],
    [null, null, 40, 41, 42, 43, 44, 39, 40, 41, 42, 43, 44, null, null],
    [null, 26, 27, 28, 29, 30, 31, 25, 26, 27, 28, 29, 30, 31, null],
    [null, 33, 34, 35, 36, 37, 38, 32, 33, 34, 35, 36, 37, 38, null],
    [10, 11, 12, 13, 14, 15, 16, 9, 10, 11, 12, 13, 14, 15, 16],
    [18, 19, 20, 21, 22, 23, 24, 7, 18, 19, 20, 21, 22, 23, 24],
    [2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8],
    [10, 11, 12, 13, 14, 15, 16, 9, 10, 11, 12, 13, 14, 15, 16],
    [18, 19, 20, 21, 22, 23, 24, 7, 18, 19, 20, 21, 22, 23, 24],
    [null, 26, 27, 28, 29, 30, 31, 25, 26, 27, 28, 29, 30, 31, null],
    [null, 33, 34, 35, 36, 37, 38, 32, 33, 34, 35, 36, 37, 38, null],
    [null, null, 40, 41, 42, 43, 44, 39, 40, 41, 42, 43, 44, null, null],
    [null, null, null, 46, 47, 48, 49, 45, 46, 47, 48, 49, null, null, null],
    [null, null, null, null, null, 51, 52, 50, 51, 52, null, null, null, null, null]
  ];

      for (let i = 0; i < rowData.length; i++) {
        for (let j = 0; j < rowData[i].length; j++) {
          data.push([j, i, rowData[i][j]]);
        }
      }

      return data;
    },
    renderChart() {
      let dom = document.getElementById('graph3');
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
            max: 52,
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
                show: true,
                position: 'inside',
                formatter: function (params) {
                    return params.value[2];
                },
                fontSize: 10,
                color: 'black'
                }
            }
            ]
        };
        // ECharts配置项

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
<style>
.panel{
  position: relative;
  margin: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
.panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
</style>