<template>
    <el-button type="primary" size="large" style="margin-left: 2vw;font-size: medium;" @click="dialogVisible=true">参数设置</el-button>
    <el-dialog title="参数设置" v-model="dialogVisible">
        <setParam_f2p/>
    </el-dialog>
    <div style="display: flex;">
        <graph1/>
        <graph2/>
        <graph3/>
    </div>
</template>
  
<script>
import graph1 from "../components/graph1.vue";
import graph2 from "../components/graph2.vue";
import graph3 from "../components/graph3.vue";
import setParam_f2p from "../components/setParam_f2p.vue";
export default {
    components: {
        graph1,graph2,graph3,setParam_f2p
    },
    data(){
        return{
            dialogVisible: false
        }
    }
};
</script>

<style>

</style>