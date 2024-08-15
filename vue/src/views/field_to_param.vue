<template>
    <el-button type="primary" size="large" style="margin-left: 2vw;margin-top: 1vh;font-size: medium;" @click="dialogVisible=true">参数设置</el-button>
    <el-dialog class="set" title="参数设置" v-model="dialogVisible" style="border-radius: 20px;">
        <setParam_f2p @setParam="setParam" @refresh="refresh"/>
    </el-dialog>
    <el-button type="primary" size="large" style="margin-left: 2vw;margin-top: 1vh;font-size: medium;" @click="exportMuPredict">导出μ的预测值</el-button>
    <div class="grid-stack">
        <div class="grid-stack-item" gs-id="graph3" :gs-x="position[0][0]" :gs-y="position[0][1]" :gs-w="width[0]" :gs-h="height[0]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph3 @zValueClicked="zValueClicked" :data="hist" :width="width[0]*8" :height="height[0]*80" :min_max="min_max"/>
        </div>
        <div class="grid-stack-item" gs-id="graph1" :gs-x="position[1][0]" :gs-y="position[1][1]" :gs-w="width[1]" :gs-h="height[1]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph1 :mu_predict="mu_predict" :width="width[1]*8" :height="height[1]*80"/>
        </div>
        <div class="grid-stack-item" gs-id="graph2_choose" :gs-x="position[2][0]" :gs-y="position[2][1]" :gs-w="width[2]" :gs-h="height[2]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph2_choose :data="hist" :width="width[2]*8" :height="height[2]*80" :min_max="min_max"/>
        </div>
        <div class="grid-stack-item" gs-id="graph2" :gs-x="position[3][0]" :gs-y="position[3][1]" :gs-w="width[3]" :gs-h="height[3]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph2 :data="hist" :order="order" :width="width[3]*8" :height="height[3]*80" :min_max="min_max"/>
        </div>
    </div>
</template>
  
<script>
import graph2_choose from "../components/graph2_choose.vue";
import graph1 from "../components/graph1.vue";
import graph2 from "../components/graph2.vue";
import graph3 from "../components/graph3_bar.vue";
import setParam_f2p from "../components/setParam_f2p.vue";
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { pointsOnEllipse } from "plotly.js-dist";
export default {
    components: {
        graph1,graph2,graph3,setParam_f2p,graph2_choose
    },
    data(){
        let windowWidth = window.innerWidth;
        let width, height,position;
        if (windowWidth <= 768) {
        width = [10, 10, 10, 10];
        height = [4, 3, 3, 3];
        position = [[0,0],[0,4],[0,7],[0,10]]
        }else {
        width = [5, 6, 3, 3];
        height = [9, 4, 5, 5];
        position = [[0,0],[5,9],[5,0],[8,0]]
        }
        return{
            order: 0,
            dialogVisible: false,
            mu_predict: [[]],
            hist: [[[]]],
            width: width,
            height: height,
            min_max:[0,2],
            position: position
        }
    },
    mounted(){
        var options = {
            cellHeight: 80,
            column: 12,
        };
        var grid = GridStack.init(options);
        grid.on('change', (event, items) => {
            items.forEach(item => {
                if (item.id === 'graph3') {
                // 更新graph3的宽度
                this.width[0] = item.w;
                this.height[0] = item.h;
                };
                if (item.id === 'graph1') {
                // 更新graph1的宽度
                this.width[1] = item.w;
                this.height[1] = item.h;
                };
                if (item.id === 'graph2_choose') {
                // 更新graph2_choose的宽度
                this.width[2] = item.w;
                this.height[2] = item.h;
                };
                if (item.id === 'graph2') {
                // 更新graph2的宽度
                this.width[3] = item.w;
                this.height[3] = item.h;
                };
                if (item.id === 'graph3_1-4') {
                // 更新graph3_1-4的宽度
                this.width[4] = item.w;
                this.height[4] = item.h;
                };
            });
        });
    },
    methods:{
        refresh(){
            this.mu_predict = [[]];
        },
        setParam(data){
            for (let i = 0; i < data.mu_predict[0].length; i++) {
                if (!this.mu_predict[i]) {
                this.mu_predict[i] = [];
            }
                this.mu_predict[i].push(data.mu_predict[0][i]);
            }
            this.hist = data.hist
            console.log(this.mu_predict)
            console.log(this.hist)
            let all=[];
            for (let i = 0; i < this.hist.length; i++) {
                for (let j = 0; j < this.hist[i].length; j++) {
                    for (let k = 0; k < this.hist[i][j].length; k++) {
                        let value = this.hist[i][j][k];
                        if (value !== undefined && !isNaN(value)) {
                        all.push(this.hist[i][j][k])
                        }
                    }
                }
            }
            this.min_max = [Math.min(...all),Math.max(...all)]
            console.log(this.min_max)
        },
        zValueClicked(data){
            this.order = data
        },
        exportYPredict() {
            // 将 this.Y_predict 转换为 JSON 字符串
            var dataStr = JSON.stringify(this.Y_predict, null, 2);
            // 创建一个 Blob 对象
            var blob = new Blob([dataStr], {type: 'text/plain'});
            // 创建一个可以下载的 URL
            var url = URL.createObjectURL(blob);
            // 创建一个新的 <a> 元素
            var link = document.createElement('a');
            link.href = url;
            link.download = 'Y_predict.txt';
            // 模拟点击这个元素来开始下载
            link.click();
        },
    }
};
</script>

<style>
.grid-stack-item {
    margin: 2vw;
    border:#02a6b5 solid 5px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #4B4A54;
}
.grid-stack-item .ui-resizable-handle.ui-resizable-se{
    width: 20px; 
    height: 20px;
    border-radius: 10px;
    background-color: #02a6b5;
    z-index: 1000;
    cursor: se-resize;
}
@media(max-width: 768px){
.set{
    width: 90vw;
}
}
</style>