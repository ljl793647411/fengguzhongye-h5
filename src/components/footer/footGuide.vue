<template>
  <section id='foot_guide'>
    <section @click="gotoAddress('/mallIndex')" class="guide_item">
      <span :class="{'UrlActive':$route.path.indexOf('mallIndex') !== -1}" class="icon_style iconfont iconshouye"></span>
      <span :class="{'UrlActive':$route.path.indexOf('mallIndex') !== -1}">首页</span>
    </section>
    <section @click="gotoAddress('/classifyIndex')" class="guide_item">
      <span :class="{'UrlActive':$route.path.indexOf('classifyIndex') !== -1}" class="icon_style iconfont iconkinds"></span>
      <span :class="{'UrlActive':$route.path.indexOf('classifyIndex') !== -1}">分类</span>
    </section>
    <section @click="gotoAddress('/shopCarIndex')" class="guide_item">
      <span :class="{'UrlActive':$route.path.indexOf('shopCarIndex') !== -1}" class="icon_style iconfont icontianchongxing-"></span>
      <span :class="{'UrlActive':$route.path.indexOf('shopCarIndex') !== -1}">购物车</span>
    </section>
    <section @click="gotoURL('/myIndex')" class="guide_item"><!--gotoURL()-->
      <span :class="{'UrlActive':$route.path.indexOf('myIndex') !== -1}" class="icon_style iconfont iconwode"></span>
      <span :class="{'UrlActive':$route.path.indexOf('myIndex') !== -1}">我的</span>
    </section>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  //import golabel from "src/config/global.vue";//
  export default {
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {

    },
    computed: {
      ...mapState([
        'geohash'
      ]),
    },
    methods: {
      gotoAddress(path) {
        this.$router.replace(path)
      },
      gotoURL(path) {
          
          window.location.href = "http://ym.m12315.com/api/agent.oauth2?view_name=myIndex";
          //this.$router.replace(path)
      }
    },
  }

</script>

<style lang="scss" scoped>

  @import '../../style/mixin';

  .UrlActive{
    color:  #0081ff !important;
  }

  #foot_guide {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, 2.2rem);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0, 0, 0, .1);
  }

  .guide_item {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;

    .icon_style {
      margin-top: .3rem;
      font-size: 1rem;
    }

    span {
      @include sc(.45rem, #9D9D9D);
    }
  }

</style>
