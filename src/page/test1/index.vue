<template>
    <div class="example">{{ msg }}
        <img :src="hh" height="200px" width="200px"/>
    </div>

</template>
<script>
    import {testMockRequest} from 'services/test.js';

    export default {
        data () {
            return {
                msg: 'Hello world!hahahhahaha ',
                hh: require("assets/images/logo.png")
            }
        },
        created() {
            testMockRequest({s: 'a'})
                .then(data=> {
                    this.msg = data;
                })
        },
    }
</script>
<style>
    /*.example {*/
        /*color: red;*/
        /*background: url('../../assets/images/logo.png') no-repeat;*/
        /*height: 400px;*/
    /*}*/
</style>