<template>
  <div >
    <div class="container">
      <div class="cell flexLeft">
        <span>手机号</span>
        <input class="phoneVerify" maxlength="11" type="tel" v-model="info.phone" placeholder="请输入手机号" />
        <button @click="getSms" class="btn verifyCode">{{btnName}}</button>
      </div>
      
      <div class="cell flexLeft">
        <span>验证码</span>
        <input type="text" v-model="info.SMS" placeholder="请输入验证码" />
      </div>
      <div class="cell flexLeft">
        <span>&emsp;密码</span>
        <input class="passNew" type="password" v-model="info.NewPwd" placeholder="请输入新密码" />
        <span class="iconfont iconyanjing"></span>
      </div>
      <button @click="registerInfo" class="btn-big">确认</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { setInterval, clearInterval } from "timers";
import { getStore } from "../../config/mUtils";
import headTop from "src/components/header/newHead";

export default {
  data() {
    return {
      info: {
        phone: "",
        NewPwd: "",
        SMS: "",
        Gid: ""
      },
      time: 60,
      btnName: "获取验证码",
      Interval: "",
      isClick: true
    };
  },
  components: {
    headTop
  },
  computed: {},
  methods: {
    getSms() {
      if (this.info.phone == "") {
        Toast({ message: "请输入手机号码" });
        return false;
      }
      if (!/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.info.phone)) {
        Toast({ message: "手机号码格式有误" });
        return false;
      }
      this.isClick = false;
      this.btnName = this.time + "s后重新获取";
      this.$axios
        .post("sms", {
          phone: this.info.phone
        })
        .then(p => {
          console.log(p);
          this.info.Gid = p.data.Data;
          if (p.data.Code == 100) {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icondui",
              duration: 1500
            });
            this.Interval = setInterval(() => {
              this.time--;
              if (this.time > 0) {
                this.isClick = false;
                this.btnName = this.time + "s后重新获取";
              } else {
                this.time = 60;
                this.btnName = "重新发送";
                this.isClick = true;
                clearInterval(this.Interval);
              }
            }, 1000);
          } else {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont iconerror",
              duration: 1500
            });
          }
        });
    },
    registerInfo() {
      if (this.info.phone == "") {
        Toast({ message: "请输入手机号码" });
        return false;
      }
      if (!/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.info.phone)) {
        Toast({ message: "手机号码格式有误" });
        return false;
      }
      if (this.info.SMS == "") {
        Toast({ message: "请输入验证码" });
        return false;
      }
      if (this.info.Gid == "") {
        Toast({ message: "请获取验证码" });
        return false;
      }
      if (this.info.NewPwd == "") {
        Toast({ message: "请输入密码" });
        return false;
      }
      if (this.info.Gid) {
        this.$axios.post("retrieve.alter", this.info).then(p => {
          if (p.data.Code == 100) {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-dui",
              duration: 1500
            });
            setTimeout(() => {
              var info = {
                username: this.info.phone,
                userpwd: this.info.NewPwd,
                date: new Date()
              };
              setStore("cookie", info);
              this.$router.replace({
                path: "/login",
                query: {}
              });
            }, 1500);
          } else {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 1500
            });
          }
        });
      } else {
        Toast({
          message: "请先获取验证码",
          iconClass: "iconfont icon-cuo",
          duration: 1500
        });
      }
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.top {
  padding: 2.13rem 0;
  > div {
    width: 2.99rem;
    height: 2.99rem;
    overflow: hidden;
  }
  img {
    width: 100%;
    /*border-radius: 50%;*/
  }
}

.btn {
  background-color: #E9423A;
  padding: 0.2rem 0.2rem;
}
.btn-big {
  background-color: #E9423A;
}
.container {
  width: 90%;
  margin: 0 auto;
padding-top: 1rem;
  .flexLeft {
    font-size: 0.608695rem;
    span {
      display: inline-block;
      width: 20%;
      height: 1rem;
      line-height: 1rem;
      color: #E9423A;
    }
  }
  .cell {
    border-bottom: 1px solid #e7eaed;
    padding-bottom: 5px;
    margin-bottom: 10px;
    width: 100%;
    .iconfont {
      font-size: 1rem;
      margin-right: 0.43rem;
      margin-left: 0.43rem;
      width: 1rem;
      color: #E9423A;
    }
    input {
      // flex: 1;
      width: 80%;
      background: none;
      height: 1.49rem;
      border: none;
      outline: none;
    }
    .phoneVerify{
      width: 55% !important;
    }
    .passNew{
      width: 65%;
    }
    .verifyCode{
      width: 25%;
    }
  }
  .tips {
    span {
      color: #b8b8b8;
      font-size: 0.51rem;
      margin-top: 0.43rem;
      padding: 0.43rem;
    }
  }
  .registerType {
    font-size: 0.68rem;
    margin: 0.43rem 0 0.64rem;
    color: #b8b8b8;
    input {
      margin-left: 0.43rem;
    }
  }
}
</style>
