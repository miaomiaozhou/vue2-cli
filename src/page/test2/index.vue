<template>
    <div class="example">{{ msg }}
        <div>咩咩test</div>
    </div>

</template>
<script>
    export default {
        data () {
            return {
                msg: 'Hello world Two!'
            }
        }

    }
</script>
<style>
    .example {
        color: blue;
        background: url('../../assets/images/logo.png') no-repeat;
        height: 400px;
    }
</style>