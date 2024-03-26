
<template>
    <video autoplay muted loop src="../assets/nuclear_electricity.mp4" style="width: 100%;"></video>
    <div>
    <div style="width: 50vw;position: absolute;top:13vh;left:10vw">
        <h2 style="color: white;font-size: 40px;">项目介绍</h2>
        <p style="font-size:20px; color:white; line-height: 1.5;">
        研究目的：本项目研究目标为在已经建立的反应堆物理堆芯运行数字孪生模型基础上，通过优化模型降阶方法、机器学习技术和反问题建模，实现对反应堆运行状态的快速准确监测和操纵。
        <br>
        <br>
        可视化系统：通过一维到三维对于核反应堆实时数据的展示，让用户更加直观了解到核反应堆的状况，通过数字化手段监测核反应堆状况。
        </p>
        <div class="panel-footer"></div>
    </div>
    <div class="param">
        <h2 class="title">参数推断</h2>
        <div class="body">
        <video autoplay muted loop src="../assets/param.mp4" class="video"></video>
        <div class="intro">
            <p class="introduction">用户可以通过输入参数域中的参数，快速求解得到物理场</p>
            <router-link to="/param_to_field">
                <div class="panel" id="param" style="height: 15vh;width: 15vw;">
                <h2 style="font-size: 40px;">开 始</h2>
                </div>
            </router-link>
        </div>
        </div>
    </div>
    <div class="field">
        <h2 class="title">物理场重构</h2>
        <div class="body">
        <video autoplay muted loop src="../assets/field.mp4" class="video"></video>
        <div class="intro">
            <p class="introduction">用户可以通过可视化界面实时监测核反应堆重构物理场三维可交互云图，二维截面图和真实参数随时间变化图，实现对核反应堆运行参数和物理场的实时监控。</p>
            <router-link to="/field_to_param">
                <div class="panel" id="visual" style="height: 15vh;width:15vw;">
                <h2 style="font-size: 40px;">开 始</h2>
                </div>
            </router-link>
        </div>
        </div>
    </div>
    <router-link to="/">
        <img src="../assets/logout.png" alt="退出" id="logout"/>
    </router-link>
    </div>
</template>

<style scoped>
#param, #visual{
    width: 20vw;
    border-radius: 2vw;
    border: 2px solid #02a6b5;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#param:hover,#visual:hover{
    transform: scale(1.1);
    box-shadow: 0 1vw 1.2vw rgba(0,0,0,0.5);
}
#logout{
    position: absolute;
    top: 3vh;
    left: 10vw;
    width: 35px;
}
.panel{
    position: relative;
    margin: 5px;
    padding-left: 5px;
    padding-right: 5px;
    border:#02a6b5 solid 4px;
    border-radius: 20px;
    background-color: #4B4A54;
    z-index: 0;
}
.param{
    width: 100vw;
    height: 100vh;
    margin: 20px 0px;
    background-size: 100% 100%;
    background-color: #02a6b5;
}
.field{
    width: 100vw;
    height: 100vh;
    margin: 20px 0px;
    background-size: 100% 100%;
    background-color: #02a6b5;
}
.body{
    display: flex;
    align-items: center;
    width: 100vw;
}
.video{
    padding: 0px 50px;
    width: 50%;
}
.intro{
    width:50%;
    /* background-color: white; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.title{
    padding: 50px;
    color: white;
    width: 300px;
    font-size: 40px;
}
p{
    color: white;
    font-size: 20px;
    width: 400px;
}
/* .title::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-left: 2px solid #007280;
    border-top: 2px solid #007280;
    content: '';
} */
</style>