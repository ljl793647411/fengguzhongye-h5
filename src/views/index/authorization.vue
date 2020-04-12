<template>
  <div id="authManage">
    <img :src="img" alt />
  </div>
</template>

<script>
import global from "src/config/global.vue";
export default {
  data() {
    return {
      img: ""
    };
  },
  components: {},
  methods: {},
  created() {
    this.img = "http://www.tttt.com:788/app.agent.generating.ce?id=" +this.$route.query.id;
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
