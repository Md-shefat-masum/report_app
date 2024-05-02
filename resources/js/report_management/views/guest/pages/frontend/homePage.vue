<template>
    <div id="home_page">
        <div class="content">
            <img src="/logo_white.png" alt="">
            <br><br><br>
            <router-link v-if="!check_token" class="btn btn-secondary btn-lg" :to="{ name: 'login' }">login</router-link>
            <router-link v-else class="btn btn-secondary btn-lg" :to="{ name: 'dailyReport' }">Goto Report</router-link>
            <!-- <router-link :to="{ name: 'register' }">register</router-link>
            <router-link :to="{ name: 'report' }">dashboard</router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            check_token: false,
        }
    },
    created: function(){
        // console.log(window?.localStorage?.token);
        if(window?.localStorage?.token){
            this.check_token = true;
        }
    }
}
</script>

<style scoped>
    #home_page{
        background-image: url('/homebg.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;
        height: 100vh;

    }
    #home_page .content{
        padding: 200px 0px;
        backdrop-filter: blur(15px);
        text-align: center;
        border-radius: 5px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        background: rgba(0, 0, 0, 0.404);
    }

    #home_page .content img{
        width: 100%;
        max-width: 500px;
        min-width: 320px;
    }
</style>
