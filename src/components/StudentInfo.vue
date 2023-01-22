<template>
    <div>
        {{ student.name }}
        <img v-bind:src="student.photo" alt="">
    </div>
</template>

<script>


export default {
    props: {
        id: '',
    },
    data: function () {
        return {
            student: {},
        };
    },
    mounted: function () {
        this.axios.get('http://34.82.81.113:3000/students/' + this.id).then(response => {
            console.log(response.data)
            this.student = response.data;
        })
    },
}
</script>