<template>
    <div class="container">
        <div class="card">
            <div class="card-header d-flex justify-content-lg-between">
                <h3 class="card-title">Mentors List</h3>
                <div class="card-options">
                    <form class="d-flex gap-2">
                        <input @change="find(1)" v-model="key" type="text" class="form-control input_loading" id="mentror_search"
                            placeholder="enter mentor email" />
                        <button type="button" class="btn px-2 btn-sm btn-outline-info">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
            <div class="card-body table-responsive">
                <table class="table card-table table-striped table-hover " style="vertical-align: middle;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users.data" :key="user.id">
                            <td>{{user.first_name}} {{user.last_name}}</td>
                            <td>{{user.email}}</td>
                            <td class="text-center">
                                <button @click.prevent="unfollow(user.id)" v-if="mentor_id.includes(user.id)" class="btn btn-primary btn-sm">
                                    <i class="fa fa-pencil"></i> Un Follow
                                </button>
                                <button @click.prevent="follow(user.id)" v-else class="btn btn-info btn-sm">
                                    <i class="fa fa-plus"></i> Follow
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
        // this.mentors();
        // this.find(1);
    },
    methods:{
        find: function(page){
            axios.post('/user/find-users-by-email?page='+page,{key:this.key})
                .then(res=>{
                    // console.log(res.data);
                    this.users = res.data;
                })
        },
        mentors: function(){
            axios.post('/user/user-mentors')
                .then(res=>{
                    // console.log(res.data);
                    this.mentor_id = res.data;
                })
        },
        follow: function(modarator_id){
            if(confirm('sure want to follow')){
                axios.post('/user/modarator-follow',{
                    modarator_id,
                    user_id: this.get_auth_information.id,
                })
                .then(res=>{
                   this.mentor_id.push(res.data.modarator_id);
                })
            }
        },
        unfollow: function(modarator_id){
            if(confirm('sure want to unfollow')){
                axios.post('/user/modarator-unfollow',{
                    modarator_id,
                    user_id: this.get_auth_information.id,
                })
                .then(res=>{
                     this.mentor_id.splice(this.mentor_id?.indexOf(res.data));
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
