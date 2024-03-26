<template>
    <el-form :model="form" style="max-width: 900px">
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">燃耗 B<sub>u</sub>:</p>
            <el-input v-model="form.B_u"/>
            <p style="width: 500px;margin: 0px 20px;"> 取值范围0~615步</p>
        </div>
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">控制棒棒位 S<sub>t</sub>:</p>
            <el-input v-model="form.S_t"/>
            <p style="width: 500px;margin: 0px 20px;"> 取值范围0~2 500 MWd/tU</p>
        </div>
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">功率水平 P<sub>w</sub>:</p>
            <el-input v-model="form.P_w"/>
            <p style="width: 500px;margin: 0px 20px;"> 取值范围30%FP~100%FP,FP为满功率</p>
        </div>
        <div style="display: flex;margin: 3px 0px;">
            <p style="width: 300px;margin: 0px">冷却剂入口温度 T<sub>in</sub>:</p>
            <el-input v-model="form.T_in"/>
            <p style="width: 500px;margin: 0px 20px;"> 取值范围290~300 ℃</p>
        </div>
        <el-form-item label="方法Method:">
            <el-radio-group v-model="form.mode">
                <el-radio value="KNN">KNN</el-radio>
                <el-radio value="nn">NN</el-radio>
                <el-radio value="dt">Decision Tree</el-radio>
                <el-radio value="gbdt">GBDT</el-radio>
                <el-radio value="adaboost">AdaBoost</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">提交Submit</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
const form = ref({
    B_u: '',
    S_t: '',
    P_w: '',
    T_in: '',
    mode: ''
})
const emit = defineEmits(['setParam'])

const onSubmit = async () => {
    const response = await axios.post('/api/paramstofield', form.value);
    emit('setParam', response.data);
    console.log(response.data);
}
</script>
<style scoped>
* {
    font-family: 'Times New Roman', Times, serif;
}
</style>
