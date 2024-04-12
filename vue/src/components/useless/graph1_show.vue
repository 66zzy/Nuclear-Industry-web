<template>
    <div class="panel">
        <h2 style="color: white;">功率水平</h2>
        <div class="chart" style="height: 400px;width:400px;" ref="chart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    props: {
        origin_data: {
            type: Array,
            default: () => []
        },
        now_data: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        // 获取一个具有指定 ID 的 DOM 元素
        const dom = this.$refs.chart;

        // 初始化 ECharts 实例，并将其绑定到上面获取的 DOM 元素上
        const myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
        });

        // 创建一个空对象 app（这个对象可能在其他地方使用）
        const app = {};

        // 设置图表的配置项
        const option = {
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7'],
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
            max: 100,
            type: 'value',
            name: '%',
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
            data: ['origin_power','now_power','safe'], // 图例数据
            textStyle: {
            color: 'white' // 将图例文字颜色设置为白色
            }
        },
        series: [
            {
            name: 'origin_power',
            data: this.origin_data,
            type: 'line',
            smooth: true
            },
            {
            name: 'now_power',
            data: this.now_data,
            type: 'line',
            smooth: true
            },
            {
            name: 'safe',
            data: [95, 95, 95, 95, 95, 95, 95],
            type: 'line',
            smooth: true,
            color: 'red'
            }
        ]
        };

    // 如果 option 存在且类型为对象，则将配置项应用到图表上
    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    // 监听窗口的 resize 事件，并在事件触发时调用 myChart.resize() 方法重新调整图表尺寸
    window.addEventListener('resize', function() {
        myChart.resize();
    });
  }
};
</script>

<style src="/Users/12031/Documents/GitHub/Nuclear-Industry-web/vue/src/components/style.css"></style>