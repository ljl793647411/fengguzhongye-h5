<template>
  <div>
    <div class="container">
      <div class="cell flexLeft">
        <span class="iconfont icon-shouji"></span>
        <input type="tel" v-model="info.UserPhone" placeholder="请输入账号">
      </div>
      <div class="cell flexLeft">
        <span class="iconfont icon-mima"></span>
        <input type="password" v-model="info.UserPwd" placeholder="请输入密码">
      </div>

      <div class="cell flexLeft">
        <span class="iconfont icon-mima"></span>
        <input type="password" v-model="info.UserPwd" placeholder="请输入密码">
      </div>
      <div class="cell flexLeft">
        <span class="iconfont icon-mima"></span>
        <input type="password" v-model="info.UserPwd" placeholder="请输入密码">
      </div>
      <div class="cell flexLeft">
        <span class="iconfont icon-mima"></span>
        <input type="password" v-model="info.UserPwd" placeholder="请输入密码">
      </div>
      <div class="cell flexLeft">
        <span class="iconfont icon-mima"></span>
        <input type="password" v-model="info.UserPwd" placeholder="请输入密码">
      </div>
      <div class="cell flexLeft">
        <span class="iconfont icon-mima"></span>
        <input type="password" v-model="info.UserPwd" placeholder="请输入密码">
      </div>

      <button @click="login" class="btn-big btn-big-error">提交信息</button>



    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    name: "login",
    data() {
      return {
        info: {
          UserPhone: '',
          UserPwd: '',
          UserType: 2,
          eid: 0
        }
      }
    },
    methods: {

    },
    created() {

    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  body {
    background: white;
  }

  .top {
    position: relative;

    .person-info {
      padding: 2.13rem 0;

      img {
        width: 2.99rem;
        height: 2.99rem;
        /*border-radius: 100%;*/
      }
    }
  }

  .container {
    width: 90%;
    margin: 0 auto;

    .cell {
      border-bottom: 1px solid #E7EAED;
      padding-bottom: 5px;
      margin-bottom: 10px;

      .iconfont {
        font-size: 1rem;
        margin-right: 0.43rem;
        margin-left: 0.43rem;
        color: #B8B8B8;
      }

      input {
        flex: 1;
        background: none;
        height: 1.49rem;
        border: none;
        outline: none;
        font-size: 16px;
      }
    }

    .tips {
      span {
        color: #B8B8B8;
        font-size: 0.51rem;
        margin-top: 0.43rem;
        padding: 0.43rem;
      }
    }
  }

  .registerType {
    font-size: 0.68rem;
    margin: 0.43rem 0 0.64rem;
    color: #B8B8B8;

    input {
      margin-left: 0.43rem;
    }
  }

</style>
