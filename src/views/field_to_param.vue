<template>
    <div style="display: flex;">
        <el-button type="primary" size="large" style="margin-left: 2vw;font-size: medium;">filed1</el-button>
        <el-button type="primary" size="large" style="margin-left: 2vw;font-size: medium;">filed2</el-button>
        <el-button type="primary" size="large" style="margin-left: 2vw;font-size: medium;">filed3</el-button>
    </div>
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
export default {
    components: {
        graph1,graph2,graph3
    },
};
</script>

<style>

</style>