<template>
    <el-form :model="form" style="max-width: 900px">
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">燃耗 B<sub>u</sub>:</p>
            <el-input v-model="form.B_u"/>
            <p style="width: 500px;margin: 0px 20px;"> (0~615步)</p>
        </div>
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">控制棒棒位 S<sub>t</sub>:</p>
            <el-input v-model="form.S_t"/>
            <p style="width: 500px;margin: 0px 20px;"> (0~2 500 MWd/tU)</p>
        </div>
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">功率水平 P<sub>w</sub>:</p>
            <el-input v-model="form.P_w"/>
            <p style="width: 500px;margin: 0px 20px;"> (30%FP~100%FP,FP为满功率)</p>
        </div>
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">冷却剂入口温度 T<sub>in</sub>:</p>
            <el-input v-model="form.T_in"/>
            <p style="width: 500px;margin: 0px 20px;"> (290~300 ℃)</p>
        </div>
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
    B_u: '',
    S_t: '',
    P_w: '',
    T_in: '',
    algorithm: ''
})
const emit = defineEmits(['setParam'])

var socket = io.connect('http://111.186.37.25:5000')

socket.on('connect', function() {
    console.log('Connected to the server.');
});

socket.on('message', function(data) {
    console.log('Message received');
    emit('setParam', data);
});

socket.on('error', function(error) {
    console.log('Error received: ', error);
});
function onSubmit() {
    var formData = {
            B_u: form.value.B_u,
            S_t: form.value.S_t,
            P_w: form.value.P_w,
            T_in: form.value.T_in,
            algorithm: form.value.algorithm,
        };
    socket.emit('submit_form_p2f', formData);
    return false; // Prevent default form submission
}
</script>
<style scoped>
* {
    font-family: 'Times New Roman', Times, serif;
}
</style>
