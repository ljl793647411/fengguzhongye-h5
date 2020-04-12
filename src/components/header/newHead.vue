<template>
<header id='head_top' class="flexBetween">
    <span class="head_goback iconfont iconiconfontjiantou1"  v-if="goBack" @click="$router.go(-1)"></span>
    <slot name="car"></slot>
    <slot name="complete"></slot>
  </header>
</template>

<script>
  // import {mapState, mapActions} from 'vuex'
  export default {
    data(){
      return{

      }
    },
    mounted(){
      //获取用户信息
      // this.getUserInfo();

    },
    props: ['signinUp', 'headTitle', 'goBack'],
    computed: {
//       ...mapState([
//         'userInfo'
//       ]),
    },
    methods: {
//       ...mapActions([
//         'getUserInfo'
//       ]),
    },

  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  #head_top{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.58rem;
    padding: 0 .434783rem 0;
    background: white;
    .iconfont{
      color: rgba(127,127,127, 0.8);
    }
    .icon-fanhui5{
      font-size: 1.4rem;
    }
    .complete{
      font-size: 0.68rem;
      color: rgba(86, 86, 86, 0.8);
    }
  }

</style>
