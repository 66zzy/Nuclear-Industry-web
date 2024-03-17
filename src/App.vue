<template>
    <div>
      <img src="./assets/bg.jpg" id="back">
    </div>
    <header>
      <h1  style="color: white;">核反应堆数字孪生可视化</h1>
      <div class="show-time"  style="color: white;">{{ currentTime }}</div>
    </header>
    <router-link to="/home">    
      <h1  style="color: white;">Home</h1>
    </router-link>
  <router-view></router-view>
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
#back{
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
</style>