<template>
  <div class="empty">
    <div style="text-align: center;padding-top: 1.92rem;padding-bottom: 0.6rem;">
      <span :class="icon" class="iconfont"></span>
    </div>
    <div style="font-size: 0.60rem;text-align: center;color: #9D9D9D;padding-bottom: 0.6rem;">{{text}}</div>

    <div style="text-align: center;">
      <slot name="btn">
      </slot>
    </div>


  </div>

</template>

<script>

  export default {
    name: "noneData",
    data() {
      return {}
    },
    props: ['btn_text', 'text', 'icon', 'url'],
    components: {},
    methods: {

    }

  }
</script>


<style lang="scss" scoped>
  .empty {
    .iconfont {
      font-size: 2.13rem;
      color: #BFBFBF;

    }
  }
</style>
