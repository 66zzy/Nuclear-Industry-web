<template>
    <el-button type="primary" size="large" style="margin-left: 2vw;font-size: medium;" @click="dialogVisible=true">参数设置</el-button>
    <el-dialog title="参数设置" v-model="dialogVisible">
        <setParam_p2f/>
    </el-dialog>
    <div style="display: flex;">
        <graph2/>
        <graph3/>
    </div>
</template>
<script>
import graph2 from "../components/graph2.vue";
import graph3 from "../components/graph3.vue";
import setParam_p2f from "../components/setParam_p2f.vue";
export default{
    data(){
        return{
            dialogVisible: false
        }
    },
    components: {
        graph2,graph3,setParam_p2f
    },
}
</script>
<style>

</style>