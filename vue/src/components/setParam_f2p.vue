<template>
    <el-form :model="form" style="max-width: 650px">
        <el-form-item label="样例Example Data:" style="margin: 0;">
            <el-radio-group v-model="form.number">
                <el-radio value="1">1</el-radio>
                <p class="info" :class="{ 'clicked': clickedId === 1 }" @click="showBox('参数按照正弦函数周期波动，幅度为初始默认值的一半。',1)">ⓘ</p>
                <el-radio value="2">2</el-radio>
                <p class="info" :class="{ 'clicked': clickedId === 2 }" @click="showBox('参数添加一个期望为0，标准差为0.627',2)">ⓘ</p>
                <el-radio value="3">3</el-radio>
                <p class="info" :class="{ 'clicked': clickedId === 3 }" @click="showBox('第1个参数从第20s开始指数衰减到0',3)">ⓘ</p>
                <el-radio value="4">4</el-radio>
                <p class="info" :class="{ 'clicked': clickedId === 4 }" @click="showBox('第2个参数从第20s开始指数衰减到0',4)">ⓘ</p>
                <el-radio value="5">5</el-radio>
                <p class="info" :class="{ 'clicked': clickedId === 5 }" @click="showBox('第3个参数从第20s开始指数衰减到0',5)">ⓘ</p>
                <el-radio value="6">6</el-radio>
                <p class="info" :class="{ 'clicked': clickedId === 6 }" @click="showBox('第4个参数从第20s开始指数衰减到0',6)">ⓘ</p>
            </el-radio-group>
        </el-form-item>
        <div v-if="show" class="box">样例信息：{{ boxContent }}</div>
        <el-form-item label="方法Algorithm:">
            <el-radio-group v-model="form.algorithm">
                <el-radio value="knn">KNN</el-radio>
                <el-radio value="nn">NN</el-radio>
                <el-radio value="dt">Decision Tree</el-radio>
                <el-radio value="xgboost">XGBoost</el-radio>
                <el-radio value="svm">SVM</el-radio>
                <el-radio value="cnn">CNN</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">提交Submit</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import {ElMessage} from 'element-plus'
import { ref } from 'vue'
import io from 'socket.io-client';
const form = ref({
    algorithm: '',
    number: ''
})
const show = ref(false)
const boxContent = ref('')
const clickedId = ref(null)
const emit = defineEmits(['setParam', 'refresh']);
var socket = io.connect('http://111.186.37.25:5000')

socket.on('connect', function() {
    console.log('Connected to the server.');
    ElMessage.success("服务器连接成功");
});

socket.on('message', function(data) {
    console.log('Message received');
    emit('setParam', data);
});

socket.on('error', function(error) {
    console.log('Error received: ', error);
});
function showBox(text,id) {
    show.value = true
    boxContent.value = text
    clickedId.value = id 
}
function onSubmit() {
    var formData = {
            'algorithm': form.value.algorithm,
            'number': form.value.number
        };
    socket.emit('submit_form_f2p', formData);
    emit('refresh')
    return false; // Prevent default form submission
}
</script>
<style scoped>
* {
    font-family: 'Times New Roman', Times, serif;
}
.info{
    font-size: 18px;
    position: relative;
    right: 20px;
    cursor: pointer;
    height: 20px;
    display: flex;
    align-items: center;
}
.info.clicked{
    color:aqua;
}
</style>
