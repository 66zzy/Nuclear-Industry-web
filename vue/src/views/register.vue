<template>
    <video autoplay muted loop src="../assets/digital.mp4" style="width: 100%;"></video>
    <div id="square"> 
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
        </div>
        
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        </div>

        <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required>
        </div>

        <router-link to="/">
            <el-button type="primary" size="large" style="margin-left: 2vw;font-size: medium;">register</el-button>
        </router-link>
        <div id="register-link">
            Already have an account? <a href="/login">Log in</a>
        </div>
    </div>
</template>

<style>
#square{
    width: 30vw;
    position: absolute;
    left: 35vw;
    top:10vw;
    border: 2px black solid;
    border-radius: 1vw;
    background-color: rgba(255, 255, 255, 0.8);
}
.form-group{
    width: 20vw;
    height: 4vw;
    font-size: large;
    margin: 2vw;
}
input{
    width: 20vw;
    height: 2.5vw;
    border-radius: 0.5vw;
    opacity: 0.4;
    font-size:medium;
}
#register-link{
    margin: 2vw;
}
</style>