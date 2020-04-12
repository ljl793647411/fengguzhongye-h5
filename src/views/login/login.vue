<template>
  <div>
    <div class="container">
      <div class="cell flexLeft">
        <!-- <span class="iconfont icon-shouji"></span> -->
        <span>手机号</span>
        <input type="text" v-model="info.username" placeholder="请输入账号" />
      </div>
      <div class="cell flexLeft">
        <!-- <span class="iconfont icon-mima"></span> -->
        <span>&emsp;密码</span>
        <input type="password" v-model="info.userpwd" placeholder="请输入密码" />
      </div>
      <button @click="login" class="btn-big">登录</button>
      <div class="tips flexBetween">
        <span @click="forgetPwd">忘记密码？</span>
      </div>
      <!-- <div class="weixin" @click="wxLogin()" v-show="hidshow">
        <svg class="icon iconSvg" aria-hidden="true">
          <use xlink:href="#iconweixin" />
        </svg>
        <p>微信登录</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import { setStore, getStore } from "../../config/mUtils";
import { Toast } from "mint-ui";
import global from "src/config/global.vue";

export default {
  name: "login",
  data() {
    return {
      info: {
        username: "",
        userpwd: "",
        date: ""
      },
      openId: "",
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true //显示或者隐藏footer
    };
  },
  methods: {
    forgetPwd() {
      this.$router.push({
        path: "/forgetPwd",
        query: {
          // eid: this.info.eid
        }
      });
    },
    goMallIndex() {
      //replace不会在history中留下记录，就能禁止返回到登录页了
      this.$router.replace({
        path: "/mallIndex"
      });
    },
    goRegister() {
      location.href =
        ""+global.YMBaseURL+"/wap/#/register?refereeid=0&levelid=5";
    },

    login() {
      if (this.info.username == "") {
        Toast({ message: "账号不能为空" });
        return false;
      }
      if (this.info.userpwd == "") {
        Toast({ message: "密码不能为空" });
        return false;
      }
      var _this = this;
      this.$axios.post("agent.login", this.info).then(p => {
        if (p.data.Code == "100") {
          setStore("userInfo", p.data.Data);
          _this.info.date = new Date();
          setStore("cookie", _this.info);
          Toast({
            message: "登录成功",
            iconClass: "iconfont icon-dui",
            duration: 1500
          });
          if (p.data.Data.usertype == 1) {
            setTimeout(() => {
              this.goMallIndex();
            }, 1500);
          } else {
            setTimeout(() => {
              this.$router.push({
                path: "/sysIndex"
              });
            }, 1500);
          }
        } else {
          Toast({
            message: p.data.Msg,
            iconClass: "iconfont icon-cuo",
            duration: 1800
          });
        }
      });
    },
    //手机系统类型
    systemType() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        return "sys_android";
      }
      if (isIOS) {
        //这个是ios操作系统
        return "sys_ios";
      }
    },
    //拉取授权 获取 openid
    wxWarranty() {
      this.code = this.GetQueryString("code");
      if (!this.code) {
        location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.$global.appid +
          "&redirect_uri=" +
          encodeURIComponent(location.href) +
          "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
      }
    },
    //微信登录
    wxLogin() {
      this.code = this.GetQueryString("code");
      if (this.code) {
        this.$axios
          .get("wx.get.wxopenid", {
            params: {
              code: this.code
            }
          })
          .then(p => {
            if (p.data.Data.openid) {
              this.info.openId = p.data.Data.openid;
              this.info.superior = 0;
              this.info.refereeid = 0;
              //通过openid 注册用户
              this.$axios.post("wx.agent.login.sales", this.info).then(o => {
                if (o.data.Code == 100) {
                  this.userinfo = o.data.Data;
                  setStore("userInfo", o.data.Data);
                  Toast({
                    message: "登录成功",
                    iconClass: "iconfont icon-dui",
                    duration: 1500
                  });

                  setTimeout(() => {
                    this.goMallIndex();
                  }, 1500);
                } else {
                  //未注册提示
                  if (p.data.Code == "104") {
                    Toast({
                      message: p.data.Msg,
                      iconClass: "iconfont icon-cuo",
                      duration: 2000
                    });
                    setTimeout(() => {
                      this.goRegister();
                    }, 3000);
                  } else {
                    Toast({
                      message: p.data.Msg,
                      iconClass: "iconfont icon-cuo",
                      duration: 1800
                    });
                  }
                }
              });
            }
          });
      }
    },

    GetQueryString(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    //获取储存账号信息
    loginCookie() {
      if (getStore("cookie")) {
        //判断登录时间是否超出7天
        var cookie = getStore("cookie");
        if (this.getPrevDay(cookie.date, 7)) {
          this.info.username = cookie.username;
          this.info.userpwd = cookie.userpwd;
        }
      }
    },
    //客户端是android 还是ios
    clientType() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "client_android";
      } else {
        return "client_ios";
      }
    },
    //判断登录时间是否超出7天
    getPrevDay(currentTime, sky) {
      var aBol = false;
      var date = new Date();
      var myDate = new Date(currentTime);
      myDate.setDate(myDate.getDate() + sky);
      if (myDate.getTime() > date.getTime()) {
        aBol = true;
      }
      return aBol;
    }
  },
  created() {
    this.loginCookie();
    
    //this.wxWarranty();
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    showHeight() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

  padding-top: 1rem;
  .flexLeft {
    font-size: 0.608695rem;
    span {
      display: inline-block;
      width: 2.782608rem;
      height: 1rem;
      line-height: 1rem;
      color: #e9423a;
    }
  }
  .btn-big {
    width: 90%;
    margin: 2rem auto 0;
    display: block;
    outline: none;
    border: none;
    text-align: center;
    color: white;
    border-radius: 0.17rem;
    padding: 0.34rem;
    font-size: 0.68rem;
    background-color: #e9423a;
  }

  .cell {
    border-bottom: 1px solid #e7eaed;
    padding-bottom: 5px;
    margin-bottom: 10px;
    height: 2rem;
    .iconfont {
      font-size: 1rem;
      margin-right: 0.43rem;
      margin-left: 0.43rem;
      color: #b8b8b8;
    }

    input {
      flex: 1;
      background: none;
      height: 100%;
      border: none;
      outline: none;
      font-size: 0.68rem;
    }
  }

  .tips {
    span {
      color: #b8b8b8;
      font-size: 0.51rem;
      margin: 0.43rem auto;
      padding: 0.43rem;
    }
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

.weixin {
  // width: 90%;
  text-align: center;
  position: absolute;
  bottom: 2rem;
  left: 43%;
  .iconSvg {
    font-size: 1.3rem;
  }
  p {
    font-size: 0.608rem;
    color: #888888;
  }
}
</style>
