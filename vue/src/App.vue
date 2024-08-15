<template>
    <div class="back">
    <div style="display: flex;height: 10vh;background-color: #2A272A;">
      <router-link to="/">    
        <h1 class="home">Home</h1>
      </router-link>
      <h1  class="name">核反应堆数字孪生可视化</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.back{
    background-color: black;
    width: 100vw;
    height: 200%; 
    min-height: 120vh;
    z-index: -1;
}
.home{
  color: white; 
  position: absolute;
  left: 2vw;
  margin: 1%;
}
.name{
  color: white; 
  position: absolute;
  left: 50%; 
  transform: translate(-50%);
  top:0;
  white-space: nowrap;
}
@media(max-width: 768px){
.home{
  font-size: 6vw;
}
.name{
  font-size: 5vw;
  top:5vw
}
}
</style>