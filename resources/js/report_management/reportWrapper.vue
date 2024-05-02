<template>
    <div>
        <router-view></router-view>
        <div class="form_errors"></div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
        };
    },
    created: function () {
    },
    methods: {
    },
    computed: {
    },
};
</script>

<style scoped>
.form_errors {
    position: fixed;
    top: 81px;
    background: white;
    right: 0;
    border: 1px solid #ff000029;
    border-radius: 5px;
}
</style>
