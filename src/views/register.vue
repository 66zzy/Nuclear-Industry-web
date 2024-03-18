<template>
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
            <button>register</button>
        </router-link>
        <div id="register-link">
            Already have an account? <a href="/">Log in</a>
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
    background-color: rgba(255, 255, 255, 0.7);
    z-index: -1;
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
button{
    width: 10vw;
    height: 2.2vw;
    padding: 8px;
    border-radius: 4px;
    background-color: #1da1f2;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-left: 2vw;
    font-size: medium;
}
button:hover{
    background-color: #0d8bba;
}
#register-link{
    margin: 2vw;
}
</style>