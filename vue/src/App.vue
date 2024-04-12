<template>
    <div class="back">
    <!-- <div>
      <img src="./assets/head_bg.png"> 
    </div> -->
    <div style="display: flex;height: 10vh;background-color: #2A272A;">
      <router-link to="/">    
        <h1  style="color: white; position: absolute;left: 2vw;top: 1vh;">Home</h1>
      </router-link>
      <h1  style="color: white; position: absolute;left: 50%; transform: translate(-50%);top:1vh">核反应堆数字孪生可视化</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

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