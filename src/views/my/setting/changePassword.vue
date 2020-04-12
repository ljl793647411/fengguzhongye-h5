<template>
  <div>
    <head-top goBack="true"></head-top>
    <div class="newPlaceholder"></div>
    <div class="changePassword">
      <div class="flexBetween">
        <span>填写旧密码</span>
        <input type="text" placeholder="输入旧密码" v-model="OldPwd" />
      </div>
      <div class="flexBetween">
        <span>填写新密码</span>
        <input type="text" placeholder="输入新密码" v-model="NewPwd" />
      </div>
      <div class="flexBetween">
        <span>校验新密码</span>
        <input type="text" placeholder="再次输入密码" v-model="NewPwdAgain" />
      </div>
      <button class="btn-big btn-big-error" @click="dataSaveSubmit">确认</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { getStore, removeStore } from "../../../config/mUtils";
import headTop from "src/components/header/newHead";

export default {
  data() {
    return {
      OldPwd: "",
      NewPwd: "",
      NewPwdAgain: "",
      UserId: "",
      Eid: "",
      UserType: ""
    };
  },
  components: {
    headTop
  },
  methods: {
    dataSaveSubmit() {
      var OldPwd = this.OldPwd;
      if (this.OldPwd == "") {
        Toast({
          message: "请输入旧密码",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      }
      if (this.NewPwd == "") {
        Toast({
          message: "请输入新密码",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      }
      if (this.NewPwd == "") {
        Toast({
          message: "请再次输入新密码",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      }
      if (this.NewPwd == this.NewPwdAgain) {
        this.$axios
          .post("alter.pwd.update", {
            AgentId: this.agent_Id,
            OldPwd: this.OldPwd,
            NewPwd: this.NewPwd
          })
          .then(p => {
            if (p.data.Code == 100) {
              Toast({
                message: p.data.Msg,
                iconClass: "iconfont icon-dui",
                duration: 1000
              });
              setTimeout(() => {
                this.$router.replace({
                  path: "/login",
                  query: {}
                });
              }, 1500);
              removeStore("userInfo");
            } else {
              Toast({
                message: p.data.Msg,
                iconClass: "iconfont icon-cuo",
                duration: 1000
              });
            }
          })
          .catch(p => {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 1000
            });
          });
      } else {
        Toast({
          message: "两次密码输入不一致，请重新输入！",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      }
    }
  },
  created() {
    this.agent_Id = getStore("userInfo").id; //用户id
  }
};
</script>
<style lang="scss" scoped>
.changePassword {
  input {
    -webkit-appearance: none;
    outline: none;
    border: none;
  }
  > div {
    background-color: white;
    font-size: 0.608696rem;
    padding: 0.434783rem 0.652174rem;
    border-bottom: 1px solid #eee;
    > input {
      text-align: right;
      width: 70%;
    }
  }
  > div:last-child {
    border-bottom: none;
  }
  .btn-big-error {
    margin-top: 1.304348rem;
    background-color: red;
  }
}
</style>
