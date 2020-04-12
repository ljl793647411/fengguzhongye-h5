<template>
  <div>
    <head-top goBack="true"></head-top>
    <div class="newPlaceholder"></div>
    <button @click="layout" class="btn-big btn-big-error">退出登录</button>
  </div>
</template>

<script>
  import headTop from "src/components/header/newHead";
  export default {
    name: "scan",
    data() {
      return {
        headTitle:''
      }
    },
    components: {
      headTop,
    },
    computed: {

    },
    methods: {
      layout(){
        this.$router.replace({
          path:'/login'
        })
      }
    },
    created() {

    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>

</style>
