<template>
    <div class="auth-innerright">
        <div class="authentication-box">
            <div class="text-center">
                <h4>LOGIN</h4>
            </div>
            <div class="card mt-4 p-4 mb-0">
                <form class="theme-form" @submit.prevent="login($event)">
                    <div class="mb-3">
                        <label class="col-form-label pt-0">Email</label>
                        <input type="text" name="email" class="form-control form-control-lg">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label">Password</label>
                        <input type="password" name="password" class="form-control form-control-lg">
                    </div>
                    <div class="form-check checkbox">
                        <!-- <input class="form-check-input" id="checkbox1" type="checkbox"> -->
                        <!-- <label class="form-check-label" for="checkbox1">Remember me</label> -->
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <button type="submit" class="btn btn-secondary">Login</button>
                        </div>
                        <div class="col-md-8">
                            <div class="text-end mt-2">
                                Don't have an account?&nbsp;&nbsp;<router-link to="/register" class="btn-link text-capitalize">Register</router-link>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="text-end">
                                <router-link to="/forget-password" class="btn-link text-capitalize">Forget password?</router-link>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import isAppOnline from '../../../../helpers/isOnline';

export default {
    methods: {
        login: async function(e){
            let check_internet = await isAppOnline();

            if(check_internet){
                let formData = new FormData(e.target);
                if(localStorage.token){
                    localStorage.removeItem('token');
                }
                axios.post('/user/api-login',formData)
                    .then(async res=>{
                        if (res.data?.access_token) {
                            window.localStorage.setItem('token',res.data.access_token);
                            await localforage.setItem('token',res.data.access_token);
                            window.axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
                            this.$router.push({name: 'dailyReport'});
                        }
                    })
                    .catch(err=>{
                        console.log(err.response?.data);
                    })
            }else{
                window.s_alert("internet conenction lost.", "error");
            }
        }
    }
}
</script>

<style>

</style>
