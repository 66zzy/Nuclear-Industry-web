
<template>
    <div>
    <div class="box">
        <h2 class="title">参数推断</h2>
        <div class="body">
        <video autoplay muted loop src="../assets/param.mp4" class="video"></video>
        <div class="intro">
            <p class="introduction">用户可以通过输入参数域中的参数，快速求解得到物理场</p>
            <router-link to="/param_to_field" style="text-decoration: none;">
                <div class="panel">
                <h2>开 始</h2>
                </div>
            </router-link>
        </div>
        </div>
    </div>
    <div class="box">
        <h2 class="title">物理场重构</h2>
        <div class="body">
        <video autoplay muted loop src="../assets/field.mp4" class="video"></video>
        <div class="intro">
            <p class="introduction">用户可以通过可视化界面实时监测核反应堆重构物理场三维可交互云图，二维截面图和真实参数随时间变化图，实现对核反应堆运行参数和物理场的实时监控。</p>
            <router-link to="/field_to_param" style="text-decoration: none;">
                <div class="panel">
                <h2>开 始</h2>
                </div>
            </router-link>
        </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
.box{
    width: 100vw;
    margin: 20px 0px;
    background-color: #02a6b5;
}
.panel{
    height: 15vh;width:15vw;
    border-radius: 2vw;
    border: 2px solid #02a6b5;
    position: relative;
    margin: 5px;
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #4B4A54;
}
.panel:hover{
    transform: scale(1.1);
    box-shadow: 0 1vw 1.2vw rgba(0,0,0,0.5);
}
#logout{
    position: absolute;
    top: 3vh;
    left: 10vw;
    width: 35px;
}
.body{
    display: flex;
    align-items: center;
    width: 100vw;
}
.video{
    padding: 0 4%;
    width: 50%;
}
.intro{
    width:50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.box .title{
    padding: 4%;
    color: white;
    width: 300px;
    font-size: 50px;
}
p{
    color: white;
    font-size: 25px;
    width: 65%;
}
.panel h2{
    font-size: 40px;
}
@media(max-width: 768px){
.box{
    position: relative;
}
p{
position: absolute;
left: 5%;
top: 11%;
font-size: 16px;
width: 90%;
}
.panel{
    width: 20vw;
    height: 15vw;
    border-radius: 5vw;
}
.panel h2{
    font-size: 20px;
}
.box .title{
    padding: 2% 0 0 2%;
    font-size: 30px;
}
.video{
    padding: 20% 0 2% 4%;
}
}
</style>