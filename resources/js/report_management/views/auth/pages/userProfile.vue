<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-xl-6 col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            ব্যক্তিগত তথ্য পরিবর্তন করুন
                        </h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update_profile($event)" enctype="multipart/form-data">
                            <div class="row mb-2">
                                <div class="col-auto">
                                    <img class="img-70 rounded-circle" alt="shefat"
                                        :src="`/${get_auth_information.photo || 'avatar.png'}`" />
                                </div>
                                <div class="col">
                                    <h3 class="text-capitalize">
                                        {{ get_auth_information.first_name }}
                                        {{ get_auth_information.last_name }}
                                    </h3>
                                    <small>#{{ get_auth_information.user_name }}</small>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label text-capitalize">সম্পূর্ণ নাম</label>
                                <input class="form-control" v-model="user.first_name" placeholder="full name" name="first_name"/>
                            </div>
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">last Name</label>
                                <input class="form-control" v-model="user.last_name" placeholder="last name" name="last_name"/>
                            </div> -->
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">user name</label>
                                <input class="form-control" v-model="user.user_name" placeholder="user name" name="user_name"/>
                            </div> -->
                            <div class="form-group mb-3">
                                <label class="form-label">শাখা</label>
                                <input class="form-control" v-model="user.branch" placeholder="organiztion working area" name="branch"/>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">দায়িত্ব</label>
                                <input class="form-control" v-model="user.responsibility" placeholder="responsibiliy" name="responsibility"/>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">মান</label>
                                <input class="form-control" v-model="user.man" placeholder="organization position" name="man"/>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">বর্তমান পড়াশোনা</label>
                                <input class="form-control" v-model="user.study" placeholder="study" name="study"/>
                            </div>
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">mobile number</label>
                                <input class="form-control" v-model="user.mobile_number" placeholder="mobile number" name="mobile_number"/>
                            </div> -->
                            <div class="form-group mb-3">
                                <label class="form-label">ফটো</label>
                                <input class="form-control" type="file" name="photo"/>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">পুরোনো পাসওয়ার্ড</label>
                                <input type="password" name="old_password" class="form-control" placeholder="Old Password" />

                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">নতুন পাসওয়ার্ড</label>
                                <input type="password" id="newpassword" name="newpassword" class="form-control" placeholder="New Password" />

                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">পুনরায় নতুন পাসওয়ার্ড দিন</label>
                                <input type="password" name="newpassword_confirmation" id="repassword" class="form-control" placeholder="Confirm Password" />
                            </div>

                            <div class="form-footer">
                                <button class="btn btn-primary btn-block">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data: function(){
        return {
            user: {},
        }
    },
    created: function(){
        this.user = {...this.get_auth_information};
    },
    watch: {
        get_auth_information: {
            deep: true,
            handler: function(nv){
                this.user = nv;
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_auth_information',
        ]),

        update_profile: function(event){
            let form_data = new FormData(event.target);
            form_data.append('user',JSON.stringify(this.user));

            axios.post('/user/update-profile',form_data)
                .then(res=>{
                    console.log(res.data);
                    this.set_auth_information(res.data);
                    window.s_alert('profile updated','success')
                })
        }
    },
    computed:{
        ...mapGetters([
            'get_auth_information'
        ])
    }
}
</script>

<style>

</style>
