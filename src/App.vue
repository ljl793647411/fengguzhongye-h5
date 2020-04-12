<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import svgIcon from './components/common/svg';

  export default {
    components: {
      svgIcon
    },
    mounted() {
    }
  }

</script>

<style lang="scss">

  @import './style/common';
  

</style>
