<template>
  <div class="giftDetail">
    <div class="head">
      <head-top goBack="true"></head-top>
      <div class="newPlaceholder"></div>
      <img :src="proinfo.proimg" alt />
      <div class="title">
        <div style="display:flex;justify-content: space-between;">
          <span>{{proinfo.proname}}</span>
          <span class="iconfont iconzuzhijiegou" @click="wxshare()">分享</span>
        </div>
        <p style="font-weight:bold;color:red;">
          ￥{{proinfo.vipprice==0?proinfo.proprice:proinfo.vipprice}}
          <s
            style="color:#666466;font-weight:normal;"
          >￥{{proinfo.marketprice}}</s>
        </p>
      </div>
    </div>
    <div class="evaluate">
      <div>
        <span>宝贝评价{{this.Count}}</span>
        <span @click="goPage('/allEvaluate')">
          全部评价
          <span class="iconfont iconxiayige"></span>
        </span>
      </div>
      <div>
        <button
          class="btn"
          v-for="(item,index) in btnList"
          :key="index"
          @click="goPage('/allEvaluate')"
        >{{item.name }}</button>
      </div>
      <div>
        <div>
          <img v-if="remark.avatar" :src="remark.avatar" alt class="imgavatar" />
          <span style="color:#6F6F6F;">{{remark.agentname}}</span>
        </div>
        <div>
          <span style="color:#6F6F6F;">时间：{{remark.remark_time}}</span>
        </div>
        <p>评论：{{remark.remark}}</p>
      </div>
    </div>
    <div class="proDetail">
      <span>产品详情</span>
    </div>
    <div class="main">
      <div id="GiftContent" style="width:100%" v-html="proinfo.procontent"></div>
    </div>
    <div style="height:1.913043rem;"></div>


    <div class="footer flex">
      <div
        @click="kfurl('http://p.qiao.baidu.com/cps/chat?siteId=14111725&userId=29338973&cp=http%3A%2F%2Fym.m12315.com%2Fwap&cr=&cw=')"
      >
        <p class="iconfont iconzaixiankefu iconP" style="color:red;"></p>
        <p class="titP">客服</p>
      </div>
      <div @click="goPage('/mallIndex')">
        <p class="iconfont iconshouye iconP"></p>
        <p class="titP">首页</p>
      </div>
      <div @click="gourl">
        <p class="iconfont icontianchongxing- iconP"></p>
        <p class="titP">购物车</p>
      </div>
      <div class="flexGrow add" @click="addCard">加入购物车</div>
      <a class="flexGrow" @click="goseletment">立即下单</a>
    </div>
    <div class="mask" v-if="maskShow">
      <div class="bigCon">
        <div class="top">
          <div class="topImg flexCenter">
            <img :src="proinfo.proimg" alt />
          </div>
          <div class="flexGrow" style="display:flex;flex-direction:column;">
            <span style="display:block;width:70%">{{proinfo.proname}}</span>
            <span>
              ￥{{proinfo.vipprice}}
              <s>￥{{proinfo.marketprice}}</s>
            </span>
          </div>
          <span class="iconfont iconerror" style="color:#0081ff;" @click="close"></span>
        </div>
        <div class="detail">
          <div class="flexBetween">
            <p style="font-size:0.695652rem">
              总价
              <span style="color:#0081ff;font-size:0.608695rem;">{{proinfo.vipprice*pronum }}</span>
            </p>
            <div class="flexCenter" style="touch-action: none;">
              <span @click="del">-</span>
              <input
                style="width: 45px;text-align:center;"
                type="number"
                @change="search(pronum)"
                v-model="pronum"
              />
              <span @click="add">+</span>
            </div>
          </div>
        </div>
        <span @click="addshopcart" class="footer_2">确定</span>
      </div>
    </div>
    <div v-if="shareBg" @click="shareBgShowHide" class="shareBg">
      <img src="https://www.m12315.com/mall/img/share.png" alt />
    </div>

    <div v-if="usershow" class="modal flexCenter" style="z-index: 20;">
      <div class="msgbox">
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-input">
            <input style="height: 1.54rem" v-model="usephone" placeholder="请输入手机号" type="text" />
          </div>
          <div class="mint-msgbox-input">
            <input style="height: 1.54rem" v-model="usepwd" placeholder="请输入密码" type="password" />
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="clear">取消</button>
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="submit">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
import global from "src/config/global.vue";
import { setStore, getStore } from "../../config/mUtils";
import headTop from "src/components/header/newHead";
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      btnList: [
        {
          id: "0",
          name: "好评"
        },
        {
          id: "1",
          name: "中评"
        },
        {
          id: "2",
          name: "差评"
        }
      ],
      remark: {
        agentname: "",
        avatar: "",
        id: 0,
        order_id: 0,
        ordernum: "",
        proid: 0,
        remark: "",
        remark_img: "",
        remark_star: 0,
        remark_time: "",
        remark_type: 0,
        remark_uid: 0,
        response: ""
      },
      usephone: "",
      usepwd: "",
      usershow: false,
      Count: 0,
      proid: 0,
      proinfo: {},
      agentid: null,
      IsBuy: false,
      pronum: "1",
      maskShow: false,
      sureGiftNum: "",
      shopcartinfo: {},
      userinfo: {
        levelid:0,
        id:0
      },
      datalist: {},
      productid: 0,
      shareBg: false,
      aId: 0,
      code: "",
      info: {
        refereeid: 0,
        superior: 0,
        levelid: 0,
        avatar: "",
        telphone: "",
        agentname: "",
        idnum: "",
        wxnum: ""
      }
    };
  },
  components: {
    headTop
  },
  filters: {
    formatDate: function(val) {
      if (val) {
        return val.split(" ")[0];
      }
    }
  },
  methods: {
    clear() {
      this.usershow = !this.usershow;
    },
    //注册用户
    submit() {
     
        if (this.usephone == "") {
          Toast({
            message: "请输入手机号码"
          });
          return;
        }
       if (!/^1[3456789]\d{9}$/.test(this.usephone)) {
          Toast({
            message: "手机号码格式有误"
          });
          return ;
        }
       if(this.usepwd=="")
       {
         Toast({
            message: "请输入密码"
          });
          return ;
       }
      this.info.superior = this.agentid;
      this.info.refereeid = this.agentid;
      this.info.telphone = this.usephone;
      this.info.loginpwd = this.usepwd;
      
      this.$axios.post("wx.agent.login.sales", this.info).then(o => {
        if (o.data.Code == 100) {
           setStore("userInfo", o.data.Data);
          //this.userinfo = o.data.Data;
         
          this.usershow=!this.usershow;
        }
        else{
           Toast({
            message: "手机号已存在"
          });
          return ;
        }
      });
    },
    goPage(url) {
      this.$router.push({
        path: url,
        query: {
          id: this.aId
        }
      });
    },
    //评论条数
    getremarkcount() {
      this.$axios
        .get("app.get.remarks", {
          params: {
            proid: this.aId
          }
        })
        .then(p => {
          this.Count = p.data.Data.Count;
        });
    },
    //评论
    getorderlist() {
      this.$axios
        .get("app.get.good.remark", {
          params: {
            proid: this.aId,
            remark_uid: this.userinfo.id,
            pageindex: 1,
            pagesize: 1
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            if (p.data.Data.Data) {
              // console.log(p.data.Data.Data[0]);
              this.remark = p.data.Data.Data[0];
            }
          }
          //console.log(this.remark);
        });
    },
    getgiftdetail(id) {
      this.$axios
        .get("integral.gift.getdetail", {
          params: {
            id: id
          }
        })
        .then(p => {
          this.proinfo = p.data.result;
        });
    },
    del() {
      if (this.pronum - 1 > 0) {
        this.pronum--;
      } else {
        Toast({
          message: "受不了了，宝贝不能再减少了哦",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
      }
    },
    //微信配置
    getWXConfig() {
      this.$axios
        .get("integral.wx.setting", {
          params: { callback: window.location.href }
        })
        .then(p => {
          this.wxParams(
            p.data.Data.AppId,
            p.data.Data.Timestamp,
            p.data.Data.RndStr,
            p.data.Data.Signature
          );
        });
    },
    wxParams(appId, timestamp, nonceStr, signature) {
      var _this = this;
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
      _this.share();
      wx.error(function(res) {
        console.log(res.errMsg);
      });
    },
    wxshare() {
      this.getWXConfig();
      this.shareBg = !this.shareBg;
    },
    share() {
      var agent_Id = getStore("userInfo").id;
      var _this = this;
      var link =
        "http://ym.m12315.com/" +
        "/IndexUrl.html?id=" +
        this.aId +
        "&agentid=" +
        agent_Id +
        "&UrlType=2";
      wx.ready(() => {
        let shareData = {
          title: "丰谷种业商品分销",
          desc: _this.proinfo.proname,
          link: link,
          imgUrl: _this.proinfo.proimg,
          success: function() {
            console.log("分享成功");
          },
          cancel: function() {
            console.log("分享失败");
          }
        };
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
      });
    },
    //分销判断
    distribution() {
      this.productDetails(this.aId);
    },
    search(pronum) {
      this.pronum = pronum;
    },
    //获取微信用户信息 注册用户
    // wxWarranty() {
    //   this.userinfo = undefined;
    //   if (!this.userinfo) {
    //     this.code = this.GetQueryString("code");
    //     if (!this.code) {
    //       location.href =
    //         "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    //         this.$global.appid +
    //         "&redirect_uri=" +
    //         encodeURIComponent(location.href) +
    //         "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    //     } else {
    //       this.$axios
    //         .get("wx.get.wxopenid", {
    //           params: {
    //             code: this.code
    //           }
    //         })
    //         .then(p => {
    //           if (p.data.Data.openid) {
    //             this.info.openId = p.data.Data.openid;
    //             this.info.superior = this.agentid;
    //             this.info.refereeid = this.agentid;
    //             //通过openid 注册用户
    //             this.$axios.post("wx.agent.login.sales", this.info).then(o => {
    //               if (o.data.Code == 100) {
    //                 this.userinfo = o.data.Data;
    //                 setStore("userInfo", o.data.Data);
    //                 this.productDetails(this.$route.query.id);
    //               }
    //             });
    //           }
    //         });
    //     }
    //     //获取微信配置 分享
    //     setTimeout(() => {
    //       this.getWXConfig();
    //     }, 1500);
    //   } else {
    //     this.productDetails(this.$route.query.id);
    //   }
    // },
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
    //判断当前用户是否购买眼霜
    Iscount() {
      this.$axios
        .get("app.get.iscount", {
          params: {
            agentid: this.userinfo.id
          }
        })
        .then(p => {
          this.IsBuy = p.data.Data;
        });
    },
    goseletment() {
      if (!getStore("userInfo")) 
      {
        this.usershow=!this.usershow;
      } 
      else 
      {
        if (this.IsBuy) 
        {
          this.shopcartinfo.discounts = this.proinfo.vipprice - 20;
        } else 
        {
          this.shopcartinfo.discounts = this.proinfo.vipprice;
        }
        this.shopcartinfo.proid = this.proinfo.id;
        this.shopcartinfo.proname = this.proinfo.proname;
        this.shopcartinfo.brandid = this.proinfo.brandid;
        this.shopcartinfo.vipprice = this.proinfo.vipprice;
        this.shopcartinfo.marketprice = this.proinfo.marketprice;
        this.shopcartinfo.pronum = 1;
        this.shopcartinfo.proimg = this.proinfo.proimg;
        this.shopcartinfo.protype = this.proinfo.protype;
        this.shopcartinfo.proprice = this.proinfo.proprice;
        this.$router.push({
          path: "/exchange",
          query: {
            giftlist: JSON.stringify([this.shopcartinfo]),
            type: 1
          }
        });
      }
    },
    add() {
      this.pronum++;
    },
    gourl() {
       if (!getStore("userInfo")) 
      {
        this.usershow=!this.usershow;
      }
      else{
      this.$router.push({
        path: "/shopCarIndex"
      });
      }
    },
    //客服链接
    kfurl(url) {
      location.href = url;
    },
    addshopcart() {
      /*if (this.pronum > this.proinfo.stocknum) {
        Toast({
          message: "库存不足",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      }*/
      this.shopcartinfo.proid = this.proinfo.id;
      this.shopcartinfo.brandid = this.proinfo.brandid;
      this.shopcartinfo.pronum = this.pronum;
      this.sureGiftNum = this.pronum;
      this.shopcartinfo.agentid = this.userinfo.id;
      this.shopcartinfo.protype = this.proinfo.protype;
      this.$axios.post("app.add.agent.shopcart", this.shopcartinfo).then(p => {
        if (p.data.Code == "100") {
          Toast({
            message: "添加成功，在购物车等亲~",
            iconClass: "iconfont icon-dui",
            duration: 1000
          });
          this.maskShow = false;
        } else {
          Toast({
            message: "添加失败，很抱歉亲~",
            iconClass: "iconfont icon-cuo",
            duration: 1000
          });
        }
      });
    },
    //产品详情
    productDetails(id) {
      this.$axios
        .get("app.get.product", {
          params: {
            leveid: this.userinfo.levelid,
            id: id,
            tid: this.userinfo.id,
            protype: 2
          }
        })
        .then(p => {
          this.proinfo = p.data.Data;
        });
    },
    addCard() {
      if(!getStore("userInfo"))
      {
         this.usershow = !this.usershow;
      }
      else
      {
         this.maskShow = true;
      }
    },
    close() {
      this.maskShow = false;
    }
  },
  created() {
    if(getStore("userInfo")!=null)
    {
      this.userinfo = getStore("userInfo");
    }
    console.log(this.userinfo);
   this.getWXConfig();
    this.aId = this.$route.query.id;
    this.agentid = this.$route.query.agentid;
    this.distribution();
    //this.Iscount(); //判断当前用户是否购买眼霜
    this.getorderlist(); //评论
    this.getremarkcount(); //条数
  }
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.msgbox {
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
}
.giftDetail {
  // background-color: white;
  position: relative;

  .evaluate {
    padding: 0.5rem;
    background-color: white;
    margin: 0.5rem 0;
    > div:nth-child(1) {
      display: flex;
      justify-content: space-between;
      color: #6f6f6f;
      font-size: 0.608rem;
      margin-bottom: 0.3rem;
    }
    > div:nth-child(2) {
      border-top: solid 1px #eeeeee;
      border-bottom: solid 1px #eeeeee;
      .btn {
        background-color: rgba(255, 245, 244, 1);
      }
      > button {
        margin: 0.2rem;
        margin-left: 0;
        color: #101010;
      }
    }
    > div:nth-child(3) {
      // padding: 0.2rem 0;
      font-size: 0.608rem;
      > div {
        margin: 0.3rem 0;
      }
      .imgavatar {
        display: inline-block;
        width: 1.304347rem;
        height: 1.304347rem;
        border-radius: 50%;
        background-color: #f3f3f3;
        font-size: 0.4rem;
        text-align: center;
        line-height: 1.304347rem;
      }
    }
  }

  .head {
    background-color: #fff;
    .iconfont {
      color: rgba(86, 86, 86, 0.5);
    }

    .icon-gouwuche2 {
      font-size: 1.391304rem;
    }

    img {
      width: 100%;
    }
    .title {
      padding: 0 0.652174rem 0.434783rem;
      font-size: 0.608696rem;
    }
  }
  .proDetail {
    font-size: 0.608696rem;
    height: 1.391304rem;
    line-height: 1.391304rem;
    border-left: 0.2rem solid red;
    color: #0081ff;
    margin: 0.2rem 0;
    background-color: white;
    > span {
      margin-left: 0.5rem;
    }
  }

  .main {
    font-size: 0.608696rem;
    // padding: 0.652174rem 0.652174rem 2.608696rem;

    .mainItem {
      margin-bottom: 0.869565rem;

      .title {
        padding-bottom: 0.217391rem;
        font-size: 0.695652rem;
      }

      .content {
        text-align: justify;
        word-break: break-all;
      }
    }

    > div:last-child {
      margin-bottom: 0;

      img {
        width: 100%;
      }
    }
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    // left: 0;
    // right: 0;
    display: flex;

    div:nth-child(1),
    div:nth-child(2),
    div:nth-child(3) {
      width: 13.33%;
      height: 1.913043rem;
      // line-height: 1.913043rem;
      text-align: center;
      color: #cccccc;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .iconP{
      font-size: 0.8rem;
      margin-top: 0.3rem;
    }
    .titP{
      font-size: 12px;
    }
    .add {
      text-align: center;
      color: white;
      font-size: 0.608696rem;
      width: 30%;
      height: 1.913043rem;
      line-height: 1.913043rem;
      background-color: #ff9800;
    }
    a {
      display: block;
      width: 30%;
      text-align: center;
      color: white;
      font-size: 0.608696rem;
      height: 1.913043rem;
      line-height: 1.913043rem;
      background-color: #0081ff;
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;

    .bigCon {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: white;

      .top {
        display: flex;
        padding: 0.652174rem;

        .topImg {
          width: 3.434783rem;
          height: 3.521739rem;
          background-color: white;
          margin-top: -1.086957rem;
          overflow: hidden;
          padding: 3px;
          border-radius: 4px;

          img {
            width: 100%;
          }
        }

        > div:nth-child(2) {
          padding-left: 0.434783rem;

          span:nth-child(1) {
            font-size: 0.608696rem;
            font-weight: 700;
            color: #101010;
          }

          span:nth-child(2) {
            font-size: 0.782609rem;
            font-weight: 700;
            color: #fb5d57;

            s {
              font-size: 0.6rem;
              color: #666466;
              font-weight: 400;
              padding-left: 0.217391rem;
            }
          }
        }

        .icon-cuo {
          font-size: 1.086957rem;
          color: #ec4033;
          // margin-top: -0.086957rem;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .detail {
        > div {
          border-top: 1px solid #eee;
          padding: 0.434783rem 1.130435rem;

          > span {
            font-size: 0.695652rem;
            width: 19%;
          }

          > div {
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              width: 1.565217rem;
              height: 1.30434rem;
              line-height: 1.30434rem;
              color: #ddd;
              font-size: 0.8rem;
              background-color: #0081ff;
              border-top-left-radius: 0.1rem;
              border-bottom-left-radius: 0.1rem;
              text-align: center;
            }

            span:nth-child(2) {
              width: 2.47826rem;
              height: 1.30434rem;
              line-height: 1.30434rem;
              color: rgba(16, 16, 16, 0.4);
              font-size: 0.77rem;
              padding: 0 0.217391rem;
              background-color: #f3f3f3;
              border-radius: 0.1rem;
              text-align: center;
            }

            span:nth-child(3) {
              width: 1.565217rem;
              height: 1.30434rem;
              line-height: 1.30434rem;
              color: #ddd;
              font-size: 0.9rem;
              background-color: #0081ff;
              border-top-right-radius: 0.1rem;
              border-bottom-right-radius: 0.1rem;
              text-align: center;
            }
          }
        }
      }
    }

    .footer_2 {
      height: 1.913043rem;
      line-height: 1.913043rem;
      background-color: #0081ff;
      color: white;
      font-size: 0.608696rem;
      text-align: center;
      display: block;
    }
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
