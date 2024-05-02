<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <ul class="advice_message custom_scroll"  style="height: 300px; overflow-y:scroll;">
                            <li class="rounded p-2 my-2 shadow-sm" v-for="sugession in sugessions" :key="sugession.id">
                                <h5>{{sugession.user.first_name}} {{sugession.user.last_name}}</h5>
                                <p class="mb-1">{{new Date(sugession.month).toUTCString()}}</p>
                                <p>{{sugession.sugession}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data: function(){
        return {
            sugessions: [],
        }
    },
    created: function(){
        this.get();
    },
    watch: {
        get_auth_information:{
            handler: function(){
                this.get();
            }
        }
    },
    methods: {
        get: function(){
            axios.post('/user/get-all-sugession',{
                user_id: this.get_auth_information,
            })
            .then(res=>{
                this.sugessions = res.data;
            })
        }
    },
    computed: {
        ...mapGetters(['get_auth_information']),
    }

}
</script>

<style>

</style>
