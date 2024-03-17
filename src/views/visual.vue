<template>
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