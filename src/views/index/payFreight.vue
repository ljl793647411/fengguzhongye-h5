<template>
  <div id="payFreight">
    <div class="stipulate">
      <p>
        请在
        <span style="color:#D29B48;">2小时</span>内完成支付
      </p>
      <p>
        需要支付：
        <span style="color:#D29B48;">{{expressfee}}</span>元
      </p>
    </div>

    <div class="pattern">
      <div class="patternLeft">
        <!-- <img src="../../images/activity.png" alt /> -->
        <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconweixinzhifu" />
          </svg>
        <div>
          <p>微信支付</p>
          <p>使用微信支付，安全便捷</p>
        </div>
      </div>
      <div class="patternRight iconfonts iconxiaolvdashitubiao22"></div>
    </div>

    <div class="footer">
      <div @click="detail">返回列表</div>
      <div @click="wxpay">立即支付</div>
    </div>
  </div>
</template>
  <script type="text/javascript" src=" http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script>
import { setStore, getStore } from "../../config/mUtils";
import { Toast, MessageBox, Picker, Popup } from "mint-ui";
export default {
  data() {
    return {
      code: "",
      openid: "",
      orderid: 0,
      expressfee: 0,
      userinfo: {}
    };
  },
  methods: {
    wxpay() {
      this.$axios
        .get("wxpay.h5", {
          params: {
            orderid: this.orderid,
            openid:  getStore("openId_h5").openid,
            fees: 1
            // fees: this.expressfee
          }
        })
        .then(res => {
          if (res.data.Code == 100) {
            const pay_params = res.data.Data;
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  function(){
                   onBridgeReady
                },
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady",function(){ onBridgeReady});
                document.attachEvent("onWeixinJSBridgeReady",function(){ onBridgeReady});
              }
            } else {
              this.onBridgeReady(pay_params);
            }
          } else {
            alert("微信支付调起失败！");
          }
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    },
    onBridgeReady(params) {
      const pay_params = params;
      var _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: pay_params.appId, //公众号名称，由商户传入
          timeStamp: pay_params.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: pay_params.nonceStr, //随机串
          package: pay_params.package,
          signType: pay_params.signType, //微信签名方式：
          paySign: pay_params.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            _this.$axios
              .post("app.wxpay.tihuoorder", {
                id: _this.orderid,
                out_trade_no:pay_params.out_trade_no,
                err_msg:res.err_msg
              })
              .then(p => {
                if (p.data.Code == 100) {
                  MessageBox.alert("交易成功!").then(action => {
                  });
                  _this.$axios
                      .get("app.get.CentCommission", {
                        params: {
                          orderid: _this.orderid
                        }
                      })
                      .then(c => {
                      });
                    _this.$router.push({
                      path: "/issueEvaluate",
                      query: { abc: 1,orderid:_this.orderid }
                    });
                } else {
                  Toast({
                    message: "订单结算出错，请联系管理员",
                    iconClass: "iconfont icon-cuo",
                    duration: 1000
                  });
                }
              });
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          } else {
            alert(res.err_msg);
          }
        }
      );
    },
    detail() {
      this.$router.push({
        path: "/orderIndex",
        query: { agentype: 1, tabIndex: 0 }
      });
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
    wxWarranty() {
      this.code = this.GetQueryString("code");
    
      if (!this.code) {
        location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf37fb4f17d6256c3&redirect_uri=" +
          encodeURIComponent(location.href) +
          "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
      } else {
        if (this.code) {
          this.$axios
            .get("wx.get.openid_h5", {
              params: {
                code: this.code
              }
            })
            .then(p => {
              if (p.data.Data.openid) {
                setStore("openId_h5", { openid: p.data.Data.openid });
              }
            });
        }
      }
    }
  },
  created() {
    this.orderid = this.$route.query.id;
    this.expressfee = this.$route.query.sumprice;
    this.userinfo = getStore("userInfo");
    this.wxWarranty();
  }
};
</script>
<style lang="scss" scoped>
#payFreight{
  padding-top: 0.5rem;
}
.iconSvg {
  font-size: 2rem;
  margin: 0 0.5rem;
  color: #3cb035;
}
.stipulate {
  width: 100%;
  height: 3.260869rem;
  margin-bottom: 0.5rem;
  background-color: rgba(255, 250, 246, 1);
  font-size: 0.608695rem;
  padding: 0.434783rem 0.652174rem;

  p {
    height: 50%;
    line-height: 1.3rem;
  }
}

.pattern {
  width: 100%;
  height: 2.695652rem;
  background-color: white;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.608695rem;

  .patternLeft {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 1.956521rem;
      height: 1.956521rem;
      margin: 0 0.5rem;
      border-radius: 0.1rem;
    }
    > div {
      p:nth-child(1) {
        font-size: 0.695652rem;
      }
      p:nth-child(2) {
        font-size: 0.521739rem;
        color: #9d9d9d;
      }
    }
  }
  .patternRight {
    width: 10%;
    color: #09bb07;
    text-align: center;
  }
}

.footer {
  width: 100%;
  height: 1.782608rem;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;

  > div {
    width: 50%;
    height: 1.782608rem;
    color: white;
    text-align: center;
    font-size: 0.608695rem;
    line-height: 1.782608rem;
  }
  div:nth-child(1) {
    background-color: #0081ff;
  }
  div:nth-child(2) {
    background-color: #ff9800;
  }
}
</style>


