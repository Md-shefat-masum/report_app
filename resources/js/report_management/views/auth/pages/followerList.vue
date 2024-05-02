<template>
    <div class="container">
        <div class="card">
            <div class="card-header d-flex justify-content-lg-between">
                <h3 class="card-title">Follower List</h3>
                <div class="card-options">
                    <form>
                        <input @keyup="find(1)" v-model="key" type="text" class="form-control input_loading" id="mentror_search"
                            placeholder="search mentor by name.." />
                    </form>
                </div>
            </div>
            <div class="card-body table-responsive">
                <table class="table card-table table-striped table-hover table-centered " style="vertical-align: middle;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th class="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users.data" :key="user.id">
                            <td lass="text-center">
                                <span v-if="user.user">
                                    {{user.user.first_name}} {{user.user.last_name}}
                                </span>
                            </td>
                            <td lass="text-center">
                                <span v-if="user.user">
                                    {{user.user.email}}
                                </span>
                            </td>
                            <td class="text-end">
                                <router-link v-if="user.user" class="btn btn-success mr-2 btn-sm"  :to="{ name: 'seeReportDetails', params: { user_id: user.user.id }}">
                                    Watch Report
                                </router-link>
                                <button v-if="user.user" @click.prevent="unfollow(user.user.id)" class="btn btn-primary btn-sm">
                                    <i class="fa fa-pencil"></i> Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
                <Pagination :limit="5" :data="users" @pagination-change-page="find" />
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import LaravelVuePagination from 'laravel-vue-pagination';
export default {
    components: {
        'Pagination': LaravelVuePagination
    },
    data: function(){
        return{
            users: {},
            key: '',
            mentor_id: [],
        }
    },
    created: function(){
        this.find(1);
    },
    methods:{
        find: function(page){
            axios.post('/user/user-followers?page='+page,{key:this.key})
                .then(res=>{
                    // console.log(res.data);
                    this.users = res.data;
                })
        },
        unfollow: function(modarator_id){
            if(confirm('sure want to unfollow')){
                axios.post('/user/modarator-unfollow',{
                    modarator_id,
                    user_id: this.get_auth_information.id,
                })
                .then(res=>{
                    this.find(1);
                })
            }
        },
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
