<template>
  <div>
    <div class="container">
      <div class="avatarImg">
        <input style="position:absolute;width:80px;height:40px;opacity:0;z-index: 10" @change="uploadimg($event.target)"
          accept="image/*" type="file" name="name" value />
        <img :src="info.avatar" />
      </div>
      <!-- <div class="cell flexLeft">
        <span>昵称：</span>
        <span>{{info.agentname}}</span>
      </div>-->
      <div class="cell flexLeft">
        <span>姓名：</span>
        <input type="text" v-model="info.agentname" placeholder="请输入姓名" />
      </div>
      <div class="cell flexLeft">
        <span>密码：</span>
        <input type="text" v-model="info.loginpwd" placeholder="请输入密码" />
      </div>
      <div class="cell flexLeft">
        <span>手机号：</span>
        <input type="text" v-model="info.telphone" placeholder="请输入手机号" />
      </div>
      <div class="cell flexLeft">
        <span>身份证号码：</span>
        <input type="text" v-model="info.idnum" placeholder="请输入身份证号码" />
      </div>
      <div class="cell flexLeft">
        <span>级别：</span>
        <span>{{level}}</span>
      </div>

      <button v-if="submitboot" @click="registerInfo" class="btn-big btn-big-default btn-color">提交</button>
      <!-- <button class="btn-big btn-big-default btn-color">{{diffdate}}</button> -->

      <Countdown class="coutdown" :endTime="endTime" v-show="hidshow"></Countdown>
    </div>
  </div>
</template>

<script>
  import {
    Toast,
    Popup,
    Picker
  } from "mint-ui";
  import {
    setStore,
    getStore
  } from "../../config/mUtils";
  import headTop from "src/components/header/newHead";
  import Countdown from "src/components/common/countdownShow";
  import wx from "weixin-js-sdk";
  import global from "src/config/global.vue";
  export default {
    name: "register",
    data() {
      return {
        InviteTime: 0,
        info: {
          refereeid: 0,
          levelid: 0,
          avatar: "https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg",
          telphone: "",
          agentname: "",
          nickname: "",
          idnum: "",
          wxnum: "",
          openId: "",
          timestamp: ""
        },
        submitboot: true,
        level: "",
        Interval: "",
        isClick: true,
        popupVisible: false,
        showToolbar: true,
        showSearch: false,
        distributorArr: [],
        storeArr: [],
        keywords: "",
        keywordsArr: [],
        selectArr: [],
        endTime: "2019-10-29 9:51:00",
        sky: 1,
        FwSignature: "",
        code: "",
        openid: "",
        docmHeight: document.documentElement.clientHeight, //默认屏幕高度
        showHeight: document.documentElement.clientHeight, //实时屏幕高度
        hidshow: true //显示或者隐藏footer
      };
    },
    components: {
      headTop,
      Countdown
    },
    computed: {},
    methods: {
      Search() {
        this.keywordsArr = [];
        this.keywords = "";
        this.showSearch = !this.showSearch;
      },
      getKeywords(item) {
        this.Search();
        this.info.distributorName = item.Text;
        this.info.DistributorId = item.Value;
      },

      registerInfo() {
        if (this.info.agentname == "") {
          Toast({
            message: "请输入姓名"
          });
          return false;
        }
        if (this.info.telphone == "") {
          Toast({
            message: "请输入手机号码"
          });
          return false;
        }
        if (!/^1[3456789]\d{9}$/.test(this.info.telphone)) {
          Toast({
            message: "手机号码格式有误"
          });
          return false;
        }
        // if (this.info.idnum == "") {
        //   Toast({ message: "请输入身份证号码" });
        //   return false;
        // }
        // if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.info.idnum)) {
        //   Toast({ message: "身份证号码填写有误" });
        //   return false;
        // }
        console.log(this.info);
        this.$axios.post("register.agent", this.info).then(p => {
          console.log(p);
          if (p.data.Code == 100) {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-dui",
              duration: 1500
            });
            setStore("cookie", null);
            setTimeout(() => {
              //alert(global.YMBaseURL+"/wap/#/login");
              //location.href = global.YMBaseURL+"/wap/#/login";
              this.$router.replace({
                path: "/login"
              });
            }, 1500);
          } else {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 3000
            });
          }
        });
      },

      levelName(e) {
        var _this = this;
        switch (e) {
          case "1":
            _this.level = "联创";
            return;
          case "2":
            _this.level = "合伙人";
            return;
          case "3":
            _this.level = "董事";
            return;
          case "4":
            _this.level = "总代";
            return;
          case "5":
            _this.level = "VIP";
            return;
          case "6":
            _this.level = "零售";
            return;
        }
      },
      wxWarranty() {
        this.code = this.GetQueryString("code");
        if (!this.code) {
          this.info.refereeid = this.$route.query.refereeid;
          this.info.levelid = this.$route.query.levelid;
          this.info.timestamp = this.$route.query.timestamp;
          this.endTime = this.formatDate(this.info.timestamp);

          setStore("agent_info", this.info);
          this.getendTime().then(p => {
            if (p) {
              location.href =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                this.$global.appid +
                "&redirect_uri=" +
                encodeURIComponent(location.href) +
                "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
            }
          });
        } else {
          this.$axios
            .get("wx.get.wxopenid", {
              params: {
                code: this.code
              }
            })
            .then(p => {
              if (p.data.Data.openid) {
                console.log(p.data.Data.openid);
                this.info.openId = p.data.Data.openid;
                setStore("agent_info", this.info);
              }
            });
        }
        this.info = getStore("agent_info");
        this.endTime = this.formatDate(this.info.timestamp);
        this.levelName(this.info.levelid);
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
      dealData(data) {
        if (data != null) {
          var date = new Date(data);
          return (
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds()
          );
        }
      },
      formatDate(data) {
        // var timestamp = new Date("2019-08-08").valueOf();
        var myDate = new Date(parseInt(data || new Date().valueOf()));
        var now = new Date(myDate);
        now.setDate(now.getDate() + this.sky);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return (
          year +
          "-" +
          month +
          "-" +
          date +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second
        );
      },
      //上传图像
      uploadimg(imgFile) {
        var instance = this.$axios.create({
          baseURL: "http://mq.m12315.com/"
        });
        let param = new FormData(); // 创建form对象
        param.append("file", imgFile.files[0]); // 通过append向form对象添加数据
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        instance.post("api/upload.file", param, config).then(p => {
          this.info.avatar = p.data;
        });
      },
      //是否超过修改时间
      getPrevDay(currentTime, sky) {
        // currentTime = currentTime.split(" ")[0] + " " + day;
        currentTime = currentTime.replace(/-/g, "/");
        var aBol = false;
        var date = new Date();
        var myDate = new Date(currentTime);
        myDate.setDate(myDate.getDate() + sky);
        if (myDate.getTime() < date.getTime()) {
          aBol = true;
        }
        return aBol;
      },
      getendTime() {
        return new Promise((resolve, reject) => {
          var myDate = new Date(this.endTime);
          myDate.setDate(myDate.getDate() + this.sky);
          if (this.getPrevDay(this.endTime, 0)) {
            this.submitboot = false;
            Toast({
              message: "注册时间已过"
            });
            //关闭页面
            document.addEventListener(
              "WeixinJSBridgeReady",
              function() {
                WeixinJSBridge.call("closeWindow");
              },
              false
            );
            WeixinJSBridge.call("closeWindow");
            resolve(false);
          }
          resolve(true);
        });
      }
    },
    created() {
       this.wxWarranty();
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
  .avatarImg {
    text-align: center;

    >img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
  }

  .top {
    padding: 2.13rem 0;

    >div {
      width: 2.99rem;
      height: 2.99rem;
      overflow: hidden;
    }

    img {
      width: 100%;
      /*border-radius: 50%;*/
    }
  }

  .container {
    width: 90%;
    margin: 0 auto;
    padding-top: 1rem;

    .cell {
      border-bottom: 1px solid #e7eaed;
      padding-bottom: 5px;
      margin-bottom: 10px;
      height: 2rem;

      span {
        display: inline-block;
        width: 4.5rem;
        font-size: 0.68rem;
        text-align: justify;
        text-align-last: justify;
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
  }

  .btn-big {
    height: 1.73913rem;
    margin: 0.5rem auto;
  }

  .btn-color {
    background-color: #0081ff;
  }

  .coutdown {
    position: absolute;
    bottom: 1.9rem;
  }
</style>
