<template>
    <div class="back">
    <!-- <div>
      <img src="./assets/head_bg.png"> 
    </div> -->
    <div style="display: flex;height: 10vh;background-color: #2A272A;">
      <router-link to="/home">    
        <h1  style="color: white; position: absolute;left: 2vw;top: 1vh;">Home</h1>
      </router-link>
      <h1  style="color: white; position: absolute;left: 50%; transform: translate(-50%);top:1vh">核反应堆数字孪生可视化</h1>
      <div style="color: skyblue;font-size: large; position: absolute;right: 2vw;top: 2vh;">{{ currentTime }}</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data() {
      return {
        currentTime: '',
      };
    },
    methods: {
      updateTime() {
        const dt = new Date();
        const y = dt.getFullYear();
        const mt = dt.getMonth() + 1;
        const day = dt.getDate();
        const h = dt.getHours();
        const m = dt.getMinutes();
        const s = dt.getSeconds();
        this.currentTime =
          "当前时间：" +
          y +
          "年" +
          mt +
          "月" +
          day +
          "日-" +
          h +
          "时" +
          m +
          "分" +
          s +
          "秒";
      },
    },
    mounted() {
      this.updateTime();
      setInterval(this.updateTime, 1000);
    },
};
</script>

<style scoped>
.back{
    /* background-image: url('./assets/bg.jpg'); */
    background-color: black;
    width: 100vw;
    height: 100%; 
    min-height: 100vh;
    z-index: -1;
}
</style>