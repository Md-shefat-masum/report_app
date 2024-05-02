<template>
    <div>
        <div class="d-flex flex-wrap mb-4">
            <router-link :to="{name:'createCourseContent'}" class="btn px-3 btn-outline-primary m-1">Create Content</router-link>
            <router-link :to="{name:'createQuiz'}" class="btn px-3 btn-outline-dark m-1">Create Quiz</router-link>
            <router-link :to="{name:'allCategory'}" class="btn px-3 btn-outline-success m-1">Course Category</router-link>
            <router-link :to="{name:'allCourses'}" class="btn px-3 btn-outline-secondary m-1">Courses</router-link>
            <router-link :to="{name:'allCourseBatch'}" class="btn px-3 btn-outline-info m-1">Course Batch</router-link>
            <router-link :to="{name:'courseBatchSeason'}" class="btn px-3 btn-outline-success m-1">Course Batch Season</router-link>
            <router-link :to="{name:'courseBatchSeasonWeek'}" class="btn px-3 btn-outline-dark m-1">Course Batch Season Week</router-link>
            <router-link :to="{name:'courseBatchSeasonWeekEpisode'}" class="btn px-3 btn-outline-success m-1">Course Batch Season Week Episode</router-link>
        </div>
        <hr>
        <router-view/>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
