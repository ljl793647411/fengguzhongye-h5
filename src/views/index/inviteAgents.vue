<template>
  <div id="boxInvite">
    <div class="boxItem">
      <table>
        <thead>
          <tr>
            <th>代理名称</th>
            <th>级别</th>
            <th>授权号</th>
            <th>状态</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{{userInfo.agentname}}</td>
            <td>{{levelMsg(userInfo.levelid)}}</td>
            <td>{{userInfo.serialnum}}</td>
            <td>{{disableMsg(userInfo.f_disable)}}</td>
          </tr>
        </tbody>
      </table>
      <div class="newAgent" @click="popup">邀请新代理</div>
      <div class="newAgent" @click="go_authManage()">邀请记录</div>
    </div>

    <div class="agentRank" v-if="popupVisible">
      <div class="agentBox">
        <div class="agentRankItem">
          <div class="agentBoxItem" @click="share(2);">
            <svg class="icon iconSvg" aria-hidden="true">
              <use xlink:href="#icon04f" style="color:#DD2727;" />
            </svg>
            <p>合伙人</p>
          </div>
          <div class="agentBoxItem" @click="share(3);">
            <svg class="icon iconSvg" aria-hidden="true">
              <use xlink:href="#icon04f" style="color:#FF9800;" />
            </svg>
            <p>董事</p>
          </div>
          <div class="agentBoxItem" @click="share(4);">
            <svg class="icon iconSvg" aria-hidden="true">
              <use xlink:href="#icon04f" style="color:#F1745E;" />
            </svg>
            <p>总代</p>
          </div>
          <div class="agentBoxItem" @click="share(5);">
            <svg class="icon iconSvg" aria-hidden="true">
              <use xlink:href="#icon04f" style="color:#F1745E;" />
            </svg>
            <p>VIP</p>
          </div>
        </div>
        <span class="iconfont iconerror cuo" @click="popup"></span>
      </div>
    </div>
    <div v-if="shareBg" @click="shareBgShowHide" class="shareBg">
      <img src="https://www.m12315.com/mall/img/share.png" alt />
    </div>
  </div>
</template>

<script>
import { getStore } from "../../config/mUtils";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      popupVisible: false,
      userInfo: {},
      shareBg: false
    };
  },
  components: {},
  methods: {
    shareBgShowHide() {
      this.shareBg = !this.shareBg;
    },
    levelMsg(e) {
      switch (e) {
          case "1":
            return "联创";
          case 2:
            return "合伙人";
          case "3":
            return "董事";
          case "4":
            return "总代";
          case "5":
            return "VIP";
          case "6":
            return "零售";
        }
    },
    disableMsg(e) {
      switch (e) {
        case 0:
          return "正常";
          break;
        case 1:
          return "禁用";
          break;
      }
    },

    //微信配置
    getWXConfig() {
      this.$axios
        .get("integral.wx.setting", {
          // params: { callback: window.location.href }
          params: { callback: window.location.href }
        })
        .then(p => {
          console.log(p);
          this.wxParams(
            p.data.Data.AppId,
            p.data.Data.Timestamp,
            p.data.Data.RndStr,
            p.data.Data.Signature
          );
        });
    },
    go_authManage(){
        this.$router.push("/authManage?agentid="+this.$route.query.agentid);
    },
    wxParams(appId, timestamp, nonceStr, signature) {
      wx.config({
        debug: false,
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "getLocation",
          "scanQRCode" // 微信扫一扫接口
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.error(function(res) {
        console.log(res.errMsg);
      });
    },
    //微信分享
    share(e) {
      this.shareBg = !this.shareBg;
      var _this = this;
      var timestamp = new Date().valueOf();
      var link ="http://ym.m12315.com/IndexUrl.html?refereeid=" +this.userInfo.id +"&levelid=" +e +"&timestamp=" + timestamp+"&UrlType=1";

      wx.ready(() => {
        let shareData = {
          title: "丰谷种业",
          desc: "代理商邀请注册链接",
          link: link,
          imgUrl: "https://www.m12315.com/mall/img/fenxiang.png",
          success: function() {
            console.log("分享成功");
          },
          cancel: function() {
            console.log("分享失败");
          }
        };
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareQQ(shareData);
      });
    },
    popup() {
      this.popupVisible = !this.popupVisible;
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
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.getWXConfig();
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";

.iconSvg {
  font-size: 1.5rem;
}
#boxInvite{
  padding-top: 1rem;
}
.boxItem {
  width: 15rem;
  background-color: #fff;
  margin: 0 auto;
  padding-bottom: 0.5rem;
}
table {
  width: 100%;
  text-align: center;
  font-size: 0.6rem;
  border-collapse: collapse;
  thead th {
    color: white;
    background-color: #0081ff;
    width: 25%;
    height: 1.391304rem;
  }
  td {
    height: 2rem;
  }
}
.newAgent,
.record {
  width: 13.04rem;
  height: 1.739rem;
  line-height: 1.739rem;
  margin: 0.391rem auto;
  text-align: center;
  font-size: 0.608rem;
  border-radius: 0.3rem;
  border: solid 0.1rem #0081ff;
}
.newAgent {
  background-color: #0081ff;
  color: white;
  margin-top: 0.5rem;
}
.record {
  color: #0081ff;
}

.agentRank {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  .agentBox {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    z-index: 99999999;
    opacity: 1;
  }

  .agentRankItem {
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .agentBoxItem {
      width: 33.33%;
      p {
        font-size: 0.5rem;
        margin-top: 0.5rem;
      }
    }
  }
  .cuo {
    color: rgb(210, 155, 72);
    font-size: 1rem;
  }
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
</style>
