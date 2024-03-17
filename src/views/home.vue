
<template>
    <div class="panel bar" style="width: 50vw;position: absolute;top:2vh;left:30vw">
        <h2 style="color: white;">项目介绍</h2>
        <!-- 图表放置盒子 -->
        <!-- <div class="chart" id="graph1"></div> -->
        <p style="font-size:20px; color:gray; line-height: 1.5;">
        研究目的：本项目研究目标为在已经建立的反应堆物理堆芯运行数字孪生模型基础上，通过优化模型降阶方法、机器学习技术和反问题建模，实现对反应堆运行状态的快速准确监测和操纵。

        <br>
        <br>
        可视化系统：通过一维到三维对于核反应堆实时数据的展示，让用户更加直观了解到核反应堆的状况，通过数字化手段监测核反应堆状况。
        
        </p>

        <!-- 伪元素绘制盒子下边角 -->
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
</template>

<style>
#param, #visual{
    position: absolute;
    top: 20vw;
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
</style>