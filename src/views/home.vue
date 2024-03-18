
<template>
    <div style="display: flex;">
    <div class="panel bar" style="width: 50vw;position: absolute;top:13vh;left:10vw">
        <h2 style="color: white;">项目介绍</h2>
        <p style="font-size:20px; color:gray; line-height: 1.5;">
        研究目的：本项目研究目标为在已经建立的反应堆物理堆芯运行数字孪生模型基础上，通过优化模型降阶方法、机器学习技术和反问题建模，实现对反应堆运行状态的快速准确监测和操纵。
        <br>
        <br>
        可视化系统：通过一维到三维对于核反应堆实时数据的展示，让用户更加直观了解到核反应堆的状况，通过数字化手段监测核反应堆状况。
        </p>
        <div class="panel-footer"></div>
    </div>
    <div>
    <router-link to="/param">
        <img src="../assets/param.jpg" alt="参数设置" id="param"/>
    </router-link>
    <router-link to="/visual">
        <img src="../assets/visual.png" alt="可视化" id="visual"/>
    </router-link>
    </div>
    <router-link to="/">
        <img src="../assets/logout.png" alt="退出" id="logout"/>
    </router-link>
    </div>
</template>

<style>
#param, #visual{
    position: absolute;
    top: 55vh;
    width: 35vw;
    border-radius: 2vw;
}
#param:hover,#visual:hover{
    transform: scale(1.1);
    box-shadow: 0 1vw 1.2vw rgba(0,0,0,0.5);
}
#param{
    left: 10vw;
}
#visual{
    right: 10vw;
}
#logout{
    position: absolute;
    top: 3vh;
    left: 10vw;
    width: 35px;
}
.panel{
  position: relative;
  margin: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
.panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
</style>