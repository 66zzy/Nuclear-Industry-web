<template>
    <el-button type="primary" size="large" style="margin-left: 2vw;margin-top: 1vh;font-size: medium;" @click="dialogVisible=true">参数设置</el-button>
    <el-dialog title="参数设置" v-model="dialogVisible" style="border-radius: 20px;width: 800px;">
        <setParam_p2f @setParam="setParam"/>
    </el-dialog>
    <div class="grid-stack">
        <div class="grid-stack-item" gs-id="graph3" gs-x="0" gs-y="0" :gs-w="width[0]" :gs-h="height[0]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph3 @zValueClicked="zValueClicked" :data="hist" :width="width[0]*120" :height="height[0]*80-40"/>
        </div>
        <div class="grid-stack-item" gs-id="graph2_choose" gs-x="0" gs-y="6" :gs-w="width[1]" :gs-h="height[1]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph2_choose :data="hist" :width="width[1]*120" :height="height[1]*80-40"/>
        </div>
        <div class="grid-stack-item" gs-id="graph2" gs-x="4" gs-y="6" :gs-w="width[2]" :gs-h="height[2]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph2 :data="hist" :order="order" :width="width[2]*120" :height="height[2]*80-40"/>
        </div>
        <div class="grid-stack-item" gs-id="graph3_14" gs-x="4" gs-y="6" :gs-w="width[3]" :gs-h="height[3]">
            <div class="grid-stack-item-content" style="height: 50px;">
            </div>
            <graph3_14 @zValueClicked="zValueClicked" :data="hist" :width="width[3]*120" :height="height[3]*80-40"/>
        </div>
    </div>
</template>
<script>
import graph2_choose from "../components/graph2_choose.vue";
import graph2 from "../components/graph2.vue";
import graph3 from "../components/graph3_bar.vue";
import graph3_14 from "../components/graph3_14.vue";
import setParam_p2f from "../components/setParam_p2f.vue";
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
export default{
    data(){
        return{
            order: 0,
            dialogVisible: false,
            hist: [[]],
            width: [4,4,4,4],
            height: [6,6,6,6]
        }
    },
    components: {
        graph2,graph3,setParam_p2f,graph2_choose,graph3_14
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
                if (item.id === 'graph2_choose') {
                // 更新graph2_choose的宽度
                this.width[1] = item.w;
                this.height[1] = item.h;
                };
                if (item.id === 'graph2') {
                // 更新graph2的宽度
                this.width[2] = item.w;
                this.height[2] = item.h;
                };
                if (item.id === 'graph3_14') {
                // 更新graph3_14的宽度
                this.width[3] = item.w;
                this.height[3] = item.h;
                };
            });
        });
    },
    methods:{
        setParam(data){
            this.hist = data.hist
            console.log(this.hist)
        },
        zValueClicked(data){
            this.order = data
        }
    }
}
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
</style>