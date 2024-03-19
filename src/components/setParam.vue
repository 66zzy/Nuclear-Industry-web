<template>
    <el-form :model="form" style="max-width: 650px">
        <el-form-item label="B_u:">
            <el-input v-model="form.B_u"/>
        </el-form-item>
        <el-form-item label="S_t:">
            <el-input v-model="form.S_t"/>
        </el-form-item>
        <el-form-item label="P_w:">
            <el-input v-model="form.P_w"/>
        </el-form-item>
        <el-form-item label="T_in:">
            <el-input v-model="form.T_in"/>
        </el-form-item>
        <el-form-item label="Method:">
            <el-radio-group v-model="form.method">
                <el-radio value="KNN">KNN</el-radio>
                <el-radio value="nn">NN</el-radio>
                <el-radio value="dt">Decision Tree</el-radio>
                <el-radio value="gbdt">GBDT</el-radio>
                <el-radio value="adaboost">AdaBoost</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">Submit</el-button>
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
    method: ''
})
const onSubmit = async () => {
    const response = await axios.post('/paramstofield', form.value)
    console.log(response.data)
}
</script>
