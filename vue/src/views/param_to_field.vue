<template>
    <el-button type="primary" size="large" style="margin-left: 2vw;margin-top: 1vh;font-size: medium;" @click="dialogVisible=true">参数设置</el-button>
    <el-dialog title="参数设置" v-model="dialogVisible" style="border-radius: 20px;width: 800px;">
        <setParam_p2f @setParam="setParam"/>
    </el-dialog>
    <div style="display: flex;">
        <graph3 @zValueClicked="zValueClicked" :data="hist"/>
        <div style="display: flex;height: 70%;">
        <graph2_choose :data="hist"/>
        <graph2 :data="hist" :order="order"/>
        </div>
    </div>
</template>
<script>
import graph2_choose from "../components/graph2_choose.vue";
import graph2 from "../components/graph2.vue";
import graph3 from "../components/graph3.vue";
import setParam_p2f from "../components/setParam_p2f.vue";
export default{
    data(){
        return{
            order: 0,
            dialogVisible: false,
            hist: [[]],
        }
    },
    components: {
        graph2,graph3,setParam_p2f,graph2_choose
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

</style>