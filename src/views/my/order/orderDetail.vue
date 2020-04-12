<template>
  <div>
    <!-- <head-top goBack="false" @click="goPage('/index')"></head-top> -->
    <div class="newPlaceholder"></div>
    <div class="headTop">
      <span class="head_goback iconfont iconiconfontjiantou1" @click="gourl()"></span>
    </div>
    <div>
      <div class="head">
        <div class="title flex">
          <svg class="icon iconSvg" aria-hidden="true">
            <use xlink:href="#iconwode-dizhi"></use>
          </svg>
          <span>收货地址</span>
        </div>
        <div class="detail flexBetween">
          <div class="flexGrow">
            <div>
              <span>{{orderdetail.receivername==undefined?orderdetail.wreceivername:orderdetail.receivername}}</span>
              <span>{{orderdetail.receiverphone==undefined?orderdetail.wreceiverphone:orderdetail.receiverphone}}</span>
            </div>
            <div>{{orderdetail.receiveraddress==undefined?orderdetail.wreceiveraddress:orderdetail.receiveraddress}}</div>
          </div>
          <span class="iconfont iconxiayige"></span>
        </div>
      </div>
      <div class="main flex" v-for="item in orderdetail.prolist">
        <div class="flexCenter">
          <img :src="item.proimg" alt="">
        </div>
        <div class="flexGrow">
          <div class="flexBetween">{{item.proname}}</div>
          <div class="flexBetween">
            <span>{{item.vipprice==0?item.proprice:item.vipprice}}元</span>
            <span>×{{item.pronum}}</span>
          </div>
        </div>
      </div>
    </div>
    <a class="top flex">
      <div @click="goLogisticsDetails(orderdetail.couriernumber,orderdetail.kdurl)">查看物流</div>
      <div>
        <span v-if="orderdetail.f_logistics==1">未支付</span>
        <span v-else-if="orderdetail.f_logistics==2">待发货</span>
        <span v-else-if="orderdetail.f_logistics==3">已发货</span>
        <span v-else-if="orderdetail.f_logistics==4">交易成功</span>
        <span v-else-if="orderdetail.f_logistics==5">已关闭</span>
        <span class="iconfont iconxiayige"></span>
      </div>
    </a>
    <div class="sendWay flexBetween">
      <span>配送方式：</span>
      <div>
        <span v-if="orderdetail.expressfee==0">免邮</span>
        <span v-else>邮费{{orderdetail.expressfee}}元</span>
        <span>{{orderdetail.dicname}}</span>
      </div>
    </div>
    <div class="orderDetail">
      <div class="flex">
        <span>订单编号：</span>
        <span class="flexGrow">{{orderdetail.ordernum}}</span>
      </div>
      <div class="flexBetween">
        <span>交易方式：</span>
        <span>{{changeWay}}</span>
      </div>
      <div class="flexBetween">
        <span>创建时间：</span>
        <span>{{orderdetail.create_date}}</span>
      </div>
    </div>
    
    <div class="footer" v-if="orderdetail.f_logistics==3&& agentype!=3" @click="confirmreceive">{{btnName}}</div>
    <div class="footer" v-if="orderdetail.f_logistics==2&&agentype==3" @click="saomasend">扫码发货</div>
    <div style="height:1.956522rem;"></div>
    <div v-if="orderdetail.expressfee!=0">
      <div class="footer" v-if="orderdetail.f_logistics==1&&agentype!=2" @click="wxpay">支付运费</div>
    </div>
  </div>
</template>
<script>
import { Toast, MessageBox, Picker, Popup } from "mint-ui";
import { getStore } from "../../../config/mUtils";
// import headTop from "src/components/header/newHead";

export default {
  data() {
    return {
      sendWay: "普通快递",
      changeWay: "微信支付",
      btnName: "确认收货",
      orderdetail: {},
      userinfo: {},
      agentype: 1,
      tabIndex: 0
    };
  },
  components: {
    // headTop
  },
  methods: {
    goPage(url) {
      this.$router.push({
        path: url
      });
    },

    saomasend() {
      this.$router.push({
        path: "/scanCode",
        query: { id: this.$route.query.id, agentype: this.agentype }
      });
    },
    wxpay() {
      this.$router.push({
        path: "/payFreight",
        query: {
          id: this.orderdetail.id,
          expressfee: this.orderdetail.expressfee
        }
      });
    },
    getorderdetail(id) {
      this.$axios
        .get("app.get.order.detail", {
          params: {
            id: id
          }
        })
        .then(p => {
          this.orderdetail = p.data.Data;
         console.log( this.orderdetail );
        });
    },
    gourl() {
      this.$router.push({
        path: "/orderIndex",
        query: { agentype: this.agentype, tabIndex: this.tabIndex }
      });
    },
    goLogisticsDetails(CourierNumber, UrlStr) {
      if (CourierNumber != null && CourierNumber != "") {
        window.location =
          "http://m.kuaidi100.com/result.jsp?com=" +
          UrlStr +
          "&nu=" +
          CourierNumber;
      }
    },
    confirmreceive() {
      MessageBox.confirm("亲，确定宝贝已经收到了吗?").then(res => {
        if (res == "confirm") {
          this.$axios
            .post("app.confirmrecive.order", { Id: this.orderdetail.id })
            .then(p => {
              if (p.data.Code == "100") {
                this.$router.push({
                  path: "/issueEvaluate",
                  query: {
                    ordernum: this.orderdetail.ordernum,
                    orderid: this.orderdetail.id,
                    agentid:this.agentid
                  }
                });
                // Toast({
                //   message: "收货成功",
                //   iconClass: "iconfont icondui",
                //   duration: 1500
                // });
                // this.getorderdetail(this.$route.query.id);
              } else {
                // Toast({
                //   message: "收货失败",
                //   iconClass: "iconfont iconerror",
                //   duration: 1500
                // });
              }
            });
        }
      });
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    this.agentype = this.$route.query.agentype;
    this.tabIndex = this.$route.query.tabIndex;
    this.getorderdetail(this.$route.query.orderid);

    this.agentid=this.$route.query.agentid;
  }
};
</script>
<style lang="scss" scoped>
.headTop {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 1.58rem;
  padding: 0 0.434783rem 0;
  background: white;
  .iconfont {
    color: rgba(127, 127, 127, 0.8);
  }
}

.top {
  color: black;
  background-color: white;
  padding: 0.26087rem 0.652174rem;
  margin-bottom: 0.26087rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-size: 0.608696rem;
    color: #888888;
  }
  span:nth-child(1) {
    font-size: 0.608696rem;
    color: #fa9d26;
    margin-right: 0.869565rem;
  }

  span:nth-child(2) {
    font-size: 0.521739rem;
  }
}

.head {
  background-color: white;

  .title {
    padding: 0.26087rem 0.652174rem;
    border-bottom: 1px solid #eee;

    span:nth-child(1) {
      font-size: 0.869565rem;
      color: #4ba9f3;
      margin-right: 0.434783rem;
    }

    span:nth-child(2) {
      font-size: 0.695652rem;
      margin-left: 0.5rem;
    }
  }

  .detail {
    padding: 0.26087rem 0.652174rem;

    > div {
      > div:nth-child(1) {
        > span:nth-child(1) {
          font-size: 0.695652rem;
        }

        > span:nth-child(2) {
          font-size: 0.608696rem;
        }
      }

      > div:nth-child(2) {
        font-size: 0.521739rem;
        color: #888888;
      }
    }

    > span {
      color: #999999;
    }
  }
}

.main {
  padding: 0.652174rem;
  background-color: white;
  margin: 0.434783rem 0;

  > div:nth-child(1) {
    width: 3.478261rem;
    height: 3.478261rem;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  > div:nth-child(2) {
    padding-left: 0.652174rem;
    display: flex;
    justify-content: space-between;
    flex: 1;

    height: 3.478261rem;
    > div:nth-child(1) {
      flex-direction: column;
      font-size: 0.608696rem;
      width: 80%;
    }
    > div:nth-child(2) {
      font-size: 0.608696rem;
      text-align: right;
      flex-direction: column;
      width: 20%;
      span {
        display: inline-block;
        width: 100%;
      }
      > span:nth-child(1) {
        color: #e51c23;
      }
    }
  }
}

.sendWay {
  font-size: 0.608696rem;
  padding: 0.434783rem 0.652174rem;
  background-color: white;

  > div {
    > span:nth-child(1) {
      font-size: 0.521739rem;
      background-color: #00a0e9;
      color: white;
      padding: 0.086957rem 0.217391rem;
      border-radius: 0.086957rem;
    }
  }
}

.orderDetail {
  font-size: 0.521739rem;
  color: #888;
  padding: 0.26087rem 0.652174rem;
  background-color: white;
  margin-top: 0.434783rem;

  > div {
    padding: 0.217391rem 0;
  }

  > div:nth-child(1) {
    > span:nth-child(2) {
      text-align: right;
    }
  }

  .btn {
    padding: 0.086957rem 0.434783rem;
    color: #888;
    border: 1px solid #eee;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fb5d57;
  color: white;
  height: 1.956522rem;
  line-height: 1.956522rem;
  text-align: center;
  font-size: 0.695652rem;
}
</style>
