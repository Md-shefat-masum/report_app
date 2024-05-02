<template>
    <div class="auth-innerright">
        <div class="loader-wrapper" v-if="loading">
            <div class="loader bg-white">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <h4><span>&#x263A;</span></h4>
            </div>
        </div>
        <div class="authentication-box" style="z-index:unset;">
            <h3 class="text-center">Sign Up</h3>
            <h6 class="text-center">Enter required informations</h6>
            <div class="card mt-4 p-4">
                <form class="theme-form" @submit.prevent="create($event)">

                    <div class="mb-3">
                        <label class="col-form-label">Full Name <span class="text-danger">*</span></label>
                        <input type="text" name="first_name" class="form-control" placeholder="Full name">
                    </div>
                    <!-- <div class="mb-3">
                        <label class="col-form-label">Last Name</label>
                        <input type="text" name="last_name" class="form-control" placeholder="Last name">
                    </div> -->
                    <!-- <div class="mb-3">
                        <label class="col-form-label">Username</label>
                        <input type="text" name="user_name" class="form-control" placeholder="username">
                    </div> -->
                    <div class="mb-3">
                        <label class="col-form-label">Email <span class="text-danger">*</span></label>
                        <input @change="send_verify_code" @keyup="isValidEmail" type="email" name="email" class="form-control" placeholder="email">
                        <div class="text-danger mt-1" v-if="is_valid_email.length">
                            {{ is_valid_email }}
                        </div>
                    </div>
                    <div class="mb-3" v-if="is_email_verify_sent">
                        <label class="col-form-label">Email Verification Code <span class="text-danger">*</span></label>
                        <input type="text" name="email_verify_code" class="form-control" placeholder="email verification code">
                        <div class="text-danger mt-1" v-if="is_valid_code_message.length">
                            {{ is_valid_code_message }}
                        </div>
                    </div>
                    <!-- <div class="mb-3">
                        <label class="col-form-label">Contact Number</label>
                        <input type="text" name="mobile_number" class="form-control" placeholder="contact number">
                    </div> -->
                    <!-- <div class="mb-3">
                        <label class="col-form-label">Image</label>
                        <input type="file" name="photo" class="form-control" placeholder="contact number">
                    </div> -->
                    <div class="mb-3">
                        <label class="col-form-label">Password <span class="text-danger">*</span></label>
                        <input type="password" name="password" class="form-control" placeholder="password">
                    </div>
                    <div class="mb-3">
                        <label class="col-form-label">Confirm Password <span class="text-danger">*</span></label>
                        <input type="password" name="password_confirmation" class="form-control" placeholder="retype password">
                    </div>
                    <div class="row g-2">
                        <div class="col-lg-3 col-md-4">
                            <button type="submit" class="btn btn-secondary">Sign Up</button>
                        </div>
                        <div class="col-md-8">
                            <div class="text-start mt-2 m-l-20">
                                Already have an account?&nbsp;&nbsp;<router-link to="/login" class="btn-link text-capitalize">Login</router-link>
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
    data: () => ({
        loading: false,

        is_valid_email: '',

        is_email_verify_sent: false,
        is_valid_code_message: '',
    }),
    methods: {
        create: function(e){
            let formData = new FormData(e.target);
            axios.post('/user/api-register',formData)
                .then(res=>{
                    if (res.data?.access_token) {
                        window.localStorage.setItem('token',res.data.access_token);
                        window.axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
                        this.$router.push({name: 'dailyReport'});
                    }
                })
                .catch(err=>{
                    console.log(err.response.data);
                })
        },
        isValidEmail: function() {
            let email = event.target.value;
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.is_valid_email =  regex.test(email)?'':'invalid email';
        },
        send_verify_code: function(){
            let email = event.target.value;
            this.toggle_loading(true);
            axios.post('/user/email-validate',{email})
                .then(res=>{
                    this.is_email_verify_sent = true;
                    this.is_valid_code_message = res.data.message;
                    this.toggle_loading(false);
                })
                .catch(err=>{
                    this.is_valid_code_message = err.response?.data?.message;
                    this.toggle_loading(false);
                    console.log(err.response.data);
                })
        },
        toggle_loading: function(data=false){
            this.loading = data;
        }
    }
}
</script>

<style>

</style>
