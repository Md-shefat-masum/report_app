<template>
    <div>
        <div class="authentication-main">
            <div class="row">
                <div class="col-md-4 p-0">
                    <div class="auth-innerleft">
                        <div class="text-center">
                            <router-link to="/">
                                <img src="/logo.png" class="w-100" alt="">
                            </router-link>
                            <hr>
                            <div class="card">
                                <div class="card-body">
                                    <div class="text1">
                                        <h3 class="text-center">Welcome to Daily Report</h3>
                                    </div>
                                    <div class="text2">
                                        <p class="text-center">"Read your record. <br>
                                            Sufficient is yourself against you <br>
                                            this Day as accountant." [Surah: Al- Isra: 14]
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created: function(){
        if(localStorage.getItem('token')){
            location.href = "/#/report/";
        }
    }
}
</script>

<style>

</style>
