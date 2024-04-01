<template>
    <el-button type="primary" size="large" style="margin-left: 2vw;margin-top: 1vh;font-size: medium;" @click="dialogVisible=true">参数设置</el-button>
    <el-dialog title="参数设置" v-model="dialogVisible" style="border-radius: 20px;">
        <setParam_f2p @setParam="setParam"/>
    </el-dialog>
    <div style="display: flex;align-items: flex-start;">
        <graph3 @zValueClicked="zValueClicked" :data="hist"/>
        <graph1 :Mu_predict="Mu_predict"/>
        <graph2_choose :data="hist"/>
        <graph2 :data="hist" :order="order"/>
    </div>
</template>
  
<script>
import graph2_choose from "../components/graph2_choose.vue";
import graph1 from "../components/graph1.vue";
import graph2 from "../components/graph2.vue";
import graph3 from "../components/graph3_new.vue";
import setParam_f2p from "../components/setParam_f2p.vue";
export default {
    components: {
        graph1,graph2,graph3,setParam_f2p,graph2_choose
    },
    data(){
        return{
            order: 0,
            dialogVisible: false,
            Mu_predict: [],
            hist: [[]]
        }
    },
    methods:{
        setParam(data){
            this.Mu_predict = data.Mu_predict
            this.hist = data.hist
            console.log(this.Mu_predict)
            console.log(this.hist)
        },
        zValueClicked(data){
            this.order = data
        }
    }
};
</script>

<style>

</style>