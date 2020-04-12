<template>
  <div>
    <div class="box">
      <div class="top">
        <div class="person-info">
          <div style="position:absolute;right:0.5rem;top:0;">
            
            <span style="color:white;font-size:0.6rem;">信息</span>
            <span
              class="iconfont iconxinxi"
              @click="goPage('/promptMessage')"
              style="color:white;font-size:1.3rem;vertical-align: middle;"
            ></span>
            <div :class="msgs?'circle':''">{{msgs?msgs:''}}</div>
          </div>
          <div class="message">
            <div class="msgLeft">
              <img :src="userInfo.avatar" alt />
              <div>
                <p style="color:white">{{userInfo.agentname}}</p>
                <p style="color:white">{{userInfo.telphone}}</p>
                <p style="color:white">我的级别:{{userInfo.level_name}}</p>
              </div>
            </div>
            <div class="msgRight">
              <div class="upgrade" v-show="userInfo.levelid==6" @click="goPage('/login')">代理登录></div>
              <div
                class="upgrade"
                @click="showAddress"
                v-show="userInfo.levelid!=2&&userInfo.levelid!=1&&userInfo.levelid!=6"
              >立即升级></div>
              <div class="higherUp">我的上级：{{userInfo.superior_name?userInfo.superior_name:"总部"}}</div>
            </div>
          </div>
        </div>
        <div class="placeholder"></div>
        <div class="four-data flexBetween">
          <!-- <div @click="goPage('/promptMessage')">
            <p>信息</p>
          </div>-->
          <div>
            <p style="color: #FF8A18">{{statistics.AwaitShipments}}</p>
            <p>待发货订单</p>
          </div>
          <div>
            <p style="color: #62ADE5">{{statistics.Earnings+statistics.perf}}</p>
            <p>本月收益</p>
          </div>
          <div>
            <p style="color: #95C73B;">{{statistics.Repertorys?statistics.Repertorys:"0"}}</p>
            <p>我的云库存</p>
          </div>
          <div>
            <p
              style="color: #E9423A"
            >{{userInfo.levelid==5?"0":(userInfo.team_size?userInfo.team_size:"0")}}</p>
            <p>团队人数</p>
          </div>
        </div>
      </div>

      <div class="main">
        <div class="mainTop">
          <span style="font-size:0.695652rem;">我的订单</span>
          <div @click="goPage('/orderIndex?agentype=1&tabIndex=0')">
            <span style="font-size:0.608695rem;">全部订单</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="mainBottom">
          <div @click="goPage('/orderIndex?agentype=1&tabIndex=1')">
            <p class="iconfont icondaifukuan"></p>
            <p>待付款</p>
          </div>
          <div @click="goPage('/orderIndex?agentype=1&tabIndex=2')">
            <p class="iconfont icondaifahuo"></p>
            <p>待发货</p>
          </div>
          <div @click="goPage('/orderIndex?agentype=1&tabIndex=3')">
            <p class="iconfont icondaishouhuo"></p>
            <p>待收货</p>
          </div>
          <div @click="goPage('/orderIndex?agentype=1&tabIndex=4')">
            <p class="iconfont iconshoudaohuo"></p>
            <p>已完成</p>
          </div>
        </div>
      </div>

      <div class="fun-con">
        <div @click="goPage('/setting')" class="fun-item flexColumn">
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-xinxi-copy" />
          </svg>
          <span>我的信息</span>
        </div>

        <div
          @click="goPage('/inviteAgents')"
          class="fun-item flexColumn"
          v-show="userInfo.levelid<=5"
        >
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-yaoqingdaili-copy" />
          </svg>
          <span>邀请代理</span>
        </div>

        <div
          v-show="!(userInfo.levelid==5||userInfo.levelid==6)"
          @click="goPage('/authorizeUpgradeManage')"
          class="fun-item flexColumn"
        >
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-shouquan-copy" />
          </svg>
          <span>升级管理</span>
        </div>
        <div
          v-show="!(userInfo.levelid==5||userInfo.levelid==6)"
          @click="goPage('/myTeam')"
          class="fun-item flexColumn"
        >
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-wodetuandui-copy" />
          </svg>
          <span>我的团队</span>
        </div>

        <div
          @click="goPage('/orderIndex?agentype=1&tabIndex=0')"
          class="fun-item flexColumn"
          style="border-right: 1px solid #F3F3F3"
        >
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-dingdan-copy" />
          </svg>
          <span>订单管理</span>
        </div>
        <div
          v-show="!(userInfo.levelid==6)"
          @click="goPage('/inventory')"
          class="fun-item flexColumn"
        >
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-kucun-copy" />
          </svg>
          <span>库存管理</span>
        </div>
        <div
          v-show="!(userInfo.levelid==7||userInfo.levelid==6)"
          @click="goPage('/rebate')"
          class="fun-item flexColumn"
        >
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-fanli-copy" />
          </svg>
          <span>返利管理</span>
        </div>

        <div
          v-show="!(userInfo.levelid==7||userInfo.levelid==6)"
          @click="goPage('/performance')"
          class="fun-item flexColumn"
        >
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-yeji-copy" />
          </svg>
          <span>我的业绩</span>
        </div>
        <div
          v-show="!(userInfo.levelid==7||userInfo.levelid==6)"
          @click="goPage('/myRebate')"
          class="fun-item flexColumn"
        >
          <svg class="icon iconSvg" aria-hidden="true" style="color:#E9423A;">
            <use xlink:href="#iconwode-yongjin" />
          </svg>
          <span>分销返佣</span>
        </div>

        <div style="clear:both"></div>
      </div>
    </div>
    <foot-guide></foot-guide>
    <div v-if="shareBg" @click="shareBgShowHide" class="shareBg">
      <img src="https://www.m12315.com/mall/img/share.png" alt />
    </div>

    <div class="bg" v-if="visible"></div>
    <upgrade
      @address-confirm="getConfirm"
      @address-cancel="getCancel"
      class="address-select"
      v-if="visible"
    ></upgrade>
  </div>
</template>

<script>
import footGuide from "src/components/footer/footGuide";
import { setStore, getStore } from "../../config/mUtils";
import { Toast, MessageBox } from "mint-ui";
import wx from "weixin-js-sdk";
import upgrade from "src/components/common/upgrade";

export default {
  name: "my-index",
  data() {
    return {
      openId: "",
      headTitle: "购物车",
      showLoading: true,
      hasItem: false,
      checkArr: [],
      userInfo: {},
      statistics: {
        AwaitShipments: 0,
        Earnings: 0,
        Repertorys: 0,
        perf: 0
      },
      fwCode: "20960053750005101249",
      userAgent: "",
      shareBg: false,
      userinfos: {},
      visible: false,
      levelid: "",
      msgs: 0
    };
  },
  components: {
    footGuide,
    upgrade
  },
  methods: {
    showAddress() {
      // if (this.userInfo.levelid == "联创") {
      // } else {
      this.visible = !this.visible;
      document.addEventListener("touchmove", function(event) {
        //监听滚动事件
        if (this.visible) {
          //判断是遮罩显示时执行，禁止滚屏
          event.stopPropagation();
          event.preventDefault(); //最关键的一句，禁止浏览器默认行为
        }
      });
      // }
    },
    getPimModel() {
      this.$axios
        .get("get.search.message", {
          params: {
            agentid: this.userInfo.id
          }
        })
        .then(p => {
          if (p.data.Data) {
            this.statistics = p.data.Data;
          }
        });
    },
    getCancel(res) {
      this.visible = !this.visible;
    },
    getConfirm(res) {
      this.visible = !this.visible;
    },
    getLocation() {
      // wx.getLocation({
      //   type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //   success: function(res) {
      //     var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //     var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //     var speed = res.speed; // 速度，以米/每秒计
      //     var accuracy = res.accuracy; // 位置精度
      //     alert(accuracy);
      //   }
      // });
    },
    shareBgShowHide() {
      this.shareBg = !this.shareBg;
    },

    // 查询信息
    getNewList() {
      this.$axios
        .get("app.get.agent.news", {
          params: {
            agent_id: this.userInfo.id,
            pageindex: 1,
            pagesize: 10,
            is_read: 0 //0.未读  1.已读
          }
        })
        .then(o => {
          // console.log(o.data)
          if (o.data.Code == 100) {
            if (o.data.Data.Data != null) {
              this.msgs = o.data.Data.Data.length;
            }
          }
        });
    },
    goPage(url) {
      this.$router.push({
        path: url,
        query: {
          agentid: this.userInfo.id,
          eid: this.userInfo.id,
          openId: this.openId
        }
      });
    },
    goAgentInfo(url) {
      this.$router.push({
        path: "/setting"
      });
    },
    //上传图片
    selectImg(imgFile) {
      var instance = this.$axios.create({
        baseURL: "http://www.m12315.com/"
      });
      let param = new FormData(); // 创建form对象
      param.append("file", imgFile.files[0]); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      instance.post("wscore/upload.file", param, config).then(p => {
        this.$axios
          .post("Integral.user.avatar.modify", {
            Id: this.userInfo.Id,
            Avatar: p.data
          })
          .then(res => {
            if (res.data.status == "100") {
              this.userInfo.Avatar = p.data;
              this.userinfos.Avatar = p.data;
              setStore("userInfo", this.userInfo);
              Toast({
                message: "头像修改成功",
                iconClass: "iconfont icon-dui",
                duration: 2000
              });
            }
          });
      });
    },
    //刷新用户信息
    getagnetinfo() {
      this.userInfo = getStore("userInfo");
      // console.log(this.userInfo);
      this.$axios
        .get("agent.info", {
          params: {
            id: this.userInfo.id
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            if (p.data.Data) {
              this.userInfo = p.data.Data;
              setStore("userInfo", this.userInfo);
            }
          }
        });
    },
    //获取统计信息
    getStatistics() {
      // this.$axios.get('the.integral.statistics', {
      //   params: {
      //     InuserId: this.userInfo.Id,
      //     eid: this.userInfo.EnterpriseId,
      //     UserType: this.userInfo.UserType
      //   }
      // }).then((p) => {
      //   this.statistics = p.data.result;
      // })
    },
    //判断是微信还是支付宝
    isAlipayOrWechat() {
      // var Agent = navigator.userAgent.toLowerCase();
      // if (Agent.match(/Alipay/i) == "alipay") {
      //   this.userAgent = "alipay";
      // } else if (Agent.match(/MicroMessenger/i) == "micromessenger") {
      //   this.userAgent = "wechat";
      // } else {
      //   this.userAgent = "none";
      // }
    },
    //扫码
    scanCode() {
      // if (this.userAgent == "alipay") {
      //   this.apScanQRCode();
      // } else if (this.userAgent == "wechat") {
      //   this.wxScanQRCode();
      // } else {
      //   Toast({
      //     message: "扫码请前往微信或者支付宝",
      //     iconClass: "iconfont icon-dui",
      //     duration: 2000
      //   });
      // }
    },
    //微信配置
    getWXConfig() {
      // this.$axios
      //   .get("integral.wx.setting", {
      //     params: { callback: window.location.href }
      //   })
      //   .then(Msg => {
      //     console.log(Msg);
      //     this.wxParams(
      //       Msg.data.result.AppId,
      //       Msg.data.result.Timestamp,
      //       Msg.data.result.RndStr,
      //       Msg.data.result.Signature
      //     );
      //   });
    },
    wxParams(appId, timestamp, nonceStr, signature) {
      // wx.config({
      //   debug: false,
      //   appId: appId, // 必填，公众号的唯一标识
      //   timestamp: timestamp, // 必填，生成签名的时间戳
      //   nonceStr: nonceStr, // 必填，生成签名的随机串
      //   signature: signature, // 必填，签名，见附录1
      //   jsApiList: [
      //     "onMenuShareTimeline",
      //     "onMenuShareAppMessage",
      //     "onMenuShareQQ",
      //     "onMenuShareWeibo",
      //     "getLocation",
      //     "scanQRCode" // 微信扫一扫接口
      //   ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      // });
      // wx.error(function(res) {
      //   console.log(res.errMsg);
      // });
    },
    //微信扫码
    wxScanQRCode() {
      // var that = this;
      // wx.scanQRCode({
      //   needResult: 1,
      //   desc: "scanQRCode desc",
      //   scanType: ["qrCode", "barCode"],
      //   success: function(res) {
      //     that.fwCode = res.resultStr.split("=")[1];
      //     that.getCode();
      //   },
      //   cancel: function(res) {}
      // });
    },
    getCode() {
      // if (this.fwCode.length < 18) {
      //   //输四位码
      //   MessageBox.prompt("输入后四位码").then(({ value, action }) => {
      //     if (action == "confirm" && value) {
      //       this.$axios
      //         .post("integral.user.Receive", {
      //           fwCode: this.fwCode,
      //           inuserId: this.userInfo.Id,
      //           VerCode: value || ""
      //         })
      //         .then(p => {
      //           if (p.data.result.Status == "1") {
      //             Toast({
      //               message: "+" + p.data.result.Integral + "积分",
      //               iconClass: "iconfont icon-dui",
      //               duration: 2000
      //             });
      //             this.getStatistics();
      //           } else {
      //             Toast({
      //               message: p.data.result.msg,
      //               iconClass: "iconfont icon-cuowu",
      //               duration: 2000
      //             });
      //           }
      //         });
      //     }
      //   });
      // } else {
      //   this.$axios
      //     .post("integral.user.Receive", {
      //       fwCode: this.fwCode,
      //       inuserId: this.userInfo.Id,
      //       VerCode: ""
      //     })
      //     .then(p => {
      //       if (p.data.result.Status == 1) {
      //         Toast({
      //           message: "+" + p.data.result.Integral + "积分",
      //           iconClass: "iconfont icon-dui",
      //           duration: 2000
      //         });
      //         this.getStatistics();
      //       } else {
      //         Toast({
      //           message: p.data.result.msg,
      //           iconClass: "iconfont icon-cuowu",
      //           duration: 2000
      //         });
      //       }
      //     });
      // }
    },
    //支付宝扫码
    apScanQRCode() {
      // ap.scan(res => {
      //   ap.alert(res.code);
      //   ap.alert(res.error);
      // });
    },

    //微信分享
    share() {
      // let _this = this;
      // wx.ready(function() {
      //   let shareData = {
      //     title: "积分商城",
      //     desc: "积分商城邀请注册链接",
      //     link:
      //       "http://www.m12315.com/mall/#/register?iuid=" +
      //       _this.userInfo.Id +
      //       "&eid=" +
      //       _this.userInfo.EnterpriseId,
      //     //link:'http://tx.m12315.com/mall/#/register?iuid='+_this.userInfo.Id+'&eid='+_this.userInfo.EnterpriseId,
      //     imgUrl: "https://www.m12315.com/mall/img/fenxiang.png"
      //   };
      //   wx.onMenuShareAppMessage(shareData);
      //   wx.onMenuShareTimeline(shareData);
      //   wx.onMenuShareQQ(shareData);
      //   wx.onMenuShareWeibo(shareData);
      // });
    }
  },
  created() {
    this.openId = this.$route.query.openid;
    //alert(this.openId);
    if (this.code == "" || typeof this.openId == "undefined") {
      //window.location.href = "http://lh.m12315.com/api/agent.oauth2?view=myIndex";
    }

    this.getagnetinfo();
    this.getPimModel();

    // 查询信息
    this.getNewList();
    // console.log(this.userInfo);
    // console.log(this.statistics.Repertorys);
    // if (this.$route.query.code) {
    //   this.fwCode = this.$route.query.code;
    //   this.scanCode();
    // } else {
    //   this.getStatistics(this.$route.query.code);
    // }
  },

  mounted() {
    this.getWXConfig();
    this.share();
  }
};
</script>


<style lang="scss" scoped>
.iconSvg {
  font-size: 2rem;
}

.circle {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.5rem;
  color: white;
  border-radius: 50%;
  background-color: #ff9800;
  width: 0.5rem;
  height: 0.5rem;
  text-align: center;
}

.box {
  padding-bottom: 2.5rem;

  .top {
    position: relative;
    overflow: hidden;
    .person-info {
      background: #e9423a;
      padding: 2.13rem 0;

      > div:nth-child(1) span {
        font-size: 0.8rem;
      }
      .message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3.043478rem;
        font-size: 0.608695rem;
        color: white;

        position: relative;
        top: -0.5rem;
        .msgLeft {
          // width: 60%;
          // height: 3.043478rem;
          display: flex;

          > img {
            width: 3.043478rem;
            height: 3.043478rem;
            border-radius: 50%;
            margin: 0 0.8rem;
            border: solid;
          }
          p {
            height: 33.33%;
          }
        }
        .msgRight {
          .upgrade {
            width: 4.043478rem;
            height: 1.304347rem;
            line-height: 1.304347rem;
            background-color: white;
            color: #e9423a;
            text-align: center;
            border-radius: 1.304347rem;
            margin: 0 auto 0.3rem;
            position: relative;
            right: -0.5rem;
          }
          .higherUp {
            width: 5.760869rem;
            height: 1.304347rem;
            line-height: 1.304347rem;
            background-color: #ff9800;
            color: white;
            text-align: center;
            border-radius: 1.304347rem;
            font-size: 0.521739rem;
            position: relative;
            right: -0.5rem;
          }
        }
      }
    }
    .placeholder {
      height: 1.5rem;
    }
    .four-data {
      height: 2.56rem;
      position: absolute;
      bottom: 0.5rem;
      width: 90%;
      margin-left: 5%;
      background: white;
      border-radius: 0.43rem;

      div {
        flex: 1;

        p:nth-child(1) {
          font-size: 0.782608rem;
          text-align: center;
          font-family: "Arial";
        }

        p:nth-child(2) {
          font-size: 0.521739rem;
          text-align: center;
        }
      }
    }
  }
  .main {
    width: 100%;
    height: 4.782608rem;
    background-color: white;
    margin-bottom: 0.5rem;

    .mainTop {
      height: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
      border-bottom: 0.02rem solid #eeeeee;
    }
    .mainBottom {
      height: 50%;
      display: flex;
      align-items: center;
      font-size: 0.521739rem;
      text-align: center;
      color: gray;
      > div {
        width: 25%;

        > p:nth-child(1) {
          font-size: 1rem;
        }
      }
    }
  }

  .fun-con {
    background: white;
    width: 100%;
    .fun-item {
      flex: 1;
      height: 4rem;
      float: left;
      width: 33.333%;
      border-right: 1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
      .iconfont {
        font-size: 1.71rem;
      }

      span {
        font-size: 0.6rem;
        color: grey;
        margin-top: 0.2rem;
      }
    }
  }
}

.level {
  padding: 0.1rem 0.55rem;
  background: #fa9d28;
  font-size: 0.5rem;
  border-radius: 0.17rem;
  margin-left: 0.43rem;
}

.usertype {
  padding: 0.1rem 0.55rem;
  background: rgb(106, 4, 146);
  font-size: 0.5rem;
  border-radius: 0.17rem;
  margin-left: 0.43rem;
}

.shareBg {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  text-align: right;
}

.bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
}

.address-select {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 20000;
  background: white;
}
</style>


<style>
.mint-msgbox-input input {
  height: 1.54rem;
}
</style>
