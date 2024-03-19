<template>
    <el-form :model="form" style="max-width: 650px">
        <el-form-item label="Param1">
            <el-input v-model="form.param1"/>
        </el-form-item>
        <el-form-item label="Param2">
            <el-input v-model="form.param2"/>
        </el-form-item>
        <el-form-item label="Param3">
            <el-input v-model="form.param3"/>
        </el-form-item>
        <el-form-item label="Param4">
            <el-input v-model="form.param4"/>
        </el-form-item>
        <el-form-item label="Method">
            <el-radio-group v-model="form.method">
                <el-radio value="method1">method1</el-radio>
                <el-radio value="method2">method2</el-radio>
                <el-radio value="method3">method3</el-radio>
                <el-radio value="method4">method4</el-radio>
                <el-radio value="method5">method5</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">Submit</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { ref } from 'vue'
const form = ref({
    param1: '',
    param2: '',
    param3: '',
    param4: '',
    method: ''
})
const onSubmit = () => {
    console.log(form.value)
}
</script>
