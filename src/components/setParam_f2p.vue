<template>
    <el-form :model="form" style="max-width: 650px">
        <el-form-item label="Example Data:">
            <el-radio-group v-model="form.number">
                <el-radio value="1">1</el-radio>
                <el-radio value="2">2</el-radio>
                <el-radio value="3">3</el-radio>
                <el-radio value="4">4</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Method:">
            <el-radio-group v-model="form.mode">
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
    number: '',
    mode: ''
})
const onSubmit = async () => {
    const response = await axios.post('/paramstofield', form.value)
    console.log(response.data)
}
</script>
