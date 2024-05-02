<template>
    <div class="auth-innerright">
        <div class="authentication-box">
            <h4>Forgot password</h4>
            <h6>Enter your email </h6>
            <h6>A temporary password will be sent to your email</h6>
            <div class="card mt-4 p-4 mb-0">
                <form class="theme-form" @submit.prevent="forget_password($event)">
                    <div class="mb-3">
                        <label class="col-form-label pt-0">Your Email</label>
                        <input type="text" name="email" class="form-control form-control-lg">
                    </div>

                    <div class="row">
                        <div class="col-12" v-if="response_message.length">
                            <div class="alert alert-success">{{ response_message }}</div>
                        </div>
                        <div class="col-md-4">
                            <button type="submit" class="btn btn-secondary">Submit</button>
                        </div>
                        <div class="col-md-8">
                            <div class="text-end mt-2">
                                Don't have an account?&nbsp;&nbsp;<router-link to="/register" class="btn-link text-capitalize">Register</router-link>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="text-end">
                                Already have an acount? <router-link to="/login" class="btn-link text-capitalize">Login</router-link>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: ()=>({
        response_message: '',
    }),
    methods:{
        forget_password: function(event){
            this.response_message = "loading..."
            axios.post('/user/forget-mail',new FormData(event.target))
                .then(res=>{
                    this.response_message = res.data.message;
                    window.s_alert('an email has been sent to your email.','success')
                })
        }
    }
}
</script>

<style>

</style>
