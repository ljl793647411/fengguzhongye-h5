<template>
  <div>
    <div class="head">
      <div class="dropShipping" @click="goStatus">
        <div>
          <span>待发货</span>
          <span>32465465456</span>
        </div>
        <div>
          <span class="iconfont icon-xuanzeqixiayige"></span>
        </div>
      </div>

      <div class="title flex">
        <span class="iconfont icon-dingwei" style="color:#4BA9F3;"></span>
        <span>收货地址</span>
      </div>

      <div class="detail flexBetween">
        <div class="flexGrow" @click="popup">
          <div>
            <span>{{ReName}}</span>
            <span>{{RePhone}}</span>
          </div>
          <div>{{ReAddress}}</div>
        </div>
        <span class="iconfont icon-xuanzeqixiayige"></span>
      </div>
      <div class="sendWay flexBetween" @click="goPage('/addressIndex')">
        <span>+添加收货地址</span>
      </div>
    </div>
    <div class="main flex" v-for="item in selectcartlist" v-bind:key="item.Id">
      <div class="flexCenter">
        <img src="../../images/activity.png" alt />
      </div>
      <div class="flexGrow">
        <div>萨拉丁客观艰苦拉萨价格萨拉丁客观艰苦拉萨价格</div>
        <div>
          <div style="color:red;">￥40.00</div>
          <div style="text-align:right;">x10</div>
        </div>
      </div>
    </div>

    <div class="freight">
      <span>运费:</span>
      <span style="color:red;">￥60.00</span>
    </div>

    <div class="tabList">
      <table>
        <tr>
          <td>订单编号:</td>
          <td>
            <span>456456</span>
            <span class="copy">复制</span>
          </td>
        </tr>
        <tr>
          <td>交易方式:</td>
          <td>积分兑换</td>
        </tr>
        <tr>
          <td>创建时间:</td>
          <td>56456465</td>
        </tr>
        <tr>
          <td>付款时间:</td>
          <td>56456465</td>
        </tr>
        <tr>
          <td>审核时间:</td>
          <td>56456465</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { Toast, MessageBox, Picker, Popup } from "mint-ui";
import { getStore } from "../../config/mUtils";

import headTop from "src/components/header/newHead";

export default {
  data() {
    return {
      sendWay: "普通快递",
      TotalIntegralValue: 0,
      maskShow: false,
      selectcartlist: [],
      userinfo: {},
      userintegral: {},
      addresslist: [
        {
          Province:"辽宁省",
          City:"鞍山市",
          Area:"立山区",
          ReceiverAddress:"皮卡丘和契诃夫你皮卡多",
          ReceiverName:"asj",
          ReceiverPhone:"456465564",
          
        }
      ],
      orderinfo: {},
      addressid: 0,
      UserShopcartList: [],

      popupVisible: false,
      addressArr: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot",
          textAlign: "center"
        }
      ],
      ReceiverAddress: "",
      addressArrIndex: "",

      ReAddress: "辽宁省鞍山市立山区皮卡丘和契诃夫你皮卡多",
      ReName: "女孩子",
      RePhone: "13246546598",
    };
  },
  components: {
    headTop
  },
  methods: {
    goStatus() {
      this.$router.push({
        path: "/deliverStatus",
        query: {}
      });
    },

    del() {},
    add() {},
    popup() {
      this.popupVisible = !this.popupVisible;
    },
    getuseraddress() {
      // this.$axios
      //   .get("get.mc.integraladdress.integraladdress", {
      //     params: {
      //       IAid: this.userinfo.Id
      //     }
      //   })
      //   .then(p => {
      //     this.addresslist = p.data.result;
      //     this.arr = p.data.result;
      //     for (var i = 0; i < p.data.result.length; i++) {
      //       this.addressArr.push(
      //         this.arr[i].Province +
      //           this.arr[i].City +
      //           this.arr[i].Area +
      //           this.arr[i].ReceiverAddress
      //       );
      //     }
      //     this.slots[0].values = this.addressArr;
      //     for (var i = 0; i < p.data.result.length; i++) {
      //       if (p.data.result[i].F_Default == 0) {
      //         //默认地址
      //         this.addressid = p.data.result[i].Id;
      //         this.ReAddress =
      //           p.data.result[i].Province +
      //           p.data.result[i].City +
      //           p.data.result[i].Area +
      //           p.data.result[i].ReceiverAddress;
      //         this.ReName = p.data.result[i].ReceiverName;
      //         this.RePhone = p.data.result[i].ReceiverPhone;
      //         break;
      //       } else {
      //         this.addressid = p.data.result[0].Id;
      //         this.ReAddress =
      //           p.data.result[0].Province +
      //           p.data.result[0].City +
      //           p.data.result[0].Area +
      //           p.data.result[0].ReceiverAddress;
      //         this.ReName = p.data.result[0].ReceiverName;
      //         this.RePhone = p.data.result[0].ReceiverPhone;
      //       }
      //     }
      //   });
      this.arr = this.addresslist;
          for (var i = 0; i < this.addresslist.length; i++) {
            this.addressArr.push(
              this.arr[i].Province +
                this.arr[i].City +
                this.arr[i].Area +
                this.arr[i].ReceiverAddress
            );
          }
          this.slots[0].values = this.addressArr;
          for (var i = 0; i < this.addresslist.length; i++) {
            if (this.addresslist[i].F_Default == 0) {
              //默认地址
              this.addressid = this.addresslist[i].Id;
              this.ReAddress =
               this.addresslist.Province +
                this.addresslist.City +
                this.addresslist.Area +
                this.addresslist.ReceiverAddress;
              this.ReName = this.addresslist.ReceiverName;
              this.RePhone = this.addresslist.ReceiverPhone;
              break;
            } else {
              this.addressid = this.addresslist[0].Id;
              this.ReAddress =
                this.addresslist[0].Province +
                this.addresslist[0].City +
                this.addresslist[0].Area +
                this.addresslist[0].ReceiverAddress;
              this.ReName = this.addresslist[0].ReceiverName;
              this.RePhone = this.addresslist[0].ReceiverPhone;
            }
          }
    },
    confirmPopup() {
      this.addressArrIndex = this.addressArr.indexOf(this.ReceiverAddress);
      this.ReAddress = this.ReceiverAddress;
      this.ReName = this.arr[this.addressArrIndex].ReceiverName;
      this.RePhone = this.arr[this.addressArrIndex].ReceiverPhone;
      this.addressid = this.arr[this.addressArrIndex].Id;
      this.popupVisible = false;
    },
    onValuesChange(picker, values) {
      this.ReceiverAddress = values[0];
    },
    submit() {
      if (!this.addressid) {
        this.maskShow = false;
        Toast({
          message: "亲，请先添加地址哦~",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
      } else {
        this.maskShow = true;
      }
    },
    cancel() {
      this.maskShow = false;
    },
    confirm() {
      // if (this.userintegral.AvailableIntegral >= this.TotalIntegralValue) {
      //   if (!this.addressid) {
      //     this.maskShow = false;
      //     Toast({
      //       message: "亲，请先添加地址哦~",
      //       iconClass: "iconfont icon-cuo",
      //       duration: 1000
      //     });
      //   } else {
      //     this.orderinfo.EnterpriseId = this.userinfo.EnterpriseId;
      //     this.orderinfo.InuserId = this.userinfo.Id;
      //     this.orderinfo.TotalIntegralValue = this.TotalIntegralValue;
      //     this.orderinfo.AddressId = this.addressid;
      //     this.selectcartlist.forEach(element => {
      //       this.UserShopcartList.push({
      //         GiftTypeId: element.GiftTypeId,
      //         GiftId: element.GiftId,
      //         GiftNum: element.GiftNum,
      //         IntegralValue: element.IntegralValue,
      //         Id: element.Id
      //       });
      //     });
      //     this.orderinfo.GiftList = this.UserShopcartList;
      //     this.$axios
      //       .post("integral.shoppingcart.settlement", this.orderinfo)
      //       .then(p => {
      //         this.maskShow = false;
      //         if (p.data.Code == "100") {
      //           MessageBox.alert("订单提交成功!").then(action => {
      //             this.$router.push({ path: "/shopCarIndex" });
      //           });
      //         } else if (p.data.Code == "30019") {
      //           Toast({
      //             message: "库存不足，很抱歉亲~",
      //             iconClass: "iconfont icon-cuo",
      //             duration: 1000
      //           });
      //         } else {
      //           Toast({
      //             message: "下单失败，很抱歉亲~",
      //             iconClass: "iconfont icon-cuo",
      //             duration: 1000
      //           });
      //         }
      //       });
      //   }
      // } else {
      //   this.maskShow = false;
      //   Toast({
      //     message: "很抱歉，您的积分余额不足",
      //     iconClass: "iconfont icon-cuo",
      //     duration: 1500
      //   });
      // }
    },
    goPage(path) {
      this.$router.push({
        path: path
      });
    },
    getselectcartlist(cartids) {
      // this.$axios
      //   .get("integral.user.getselectshopcartlist", {
      //     params: {
      //       cartids: cartids
      //     }
      //   })
      //   .then(p => {
      //     this.selectcartlist = p.data.result;
      //     this.TotalIntegralValue = 0;
      //     this.selectcartlist.forEach(element => {
      //       this.TotalIntegralValue += element.IntegralValue * element.GiftNum;
      //     });
      //   });
    },
    binduserinfo() {
      // this.$axios
      //   .get("the.integral.statistics", {
      //     params: {
      //       InuserId: this.userinfo.Id,
      //       eid: this.userinfo.EnterpriseId
      //     }
      //   })
      //   .then(p => {
      //     this.userintegral = p.data.result;
      //   });
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    this.binduserinfo();
    if (this.$route.query.type == 1) {
      this.selectcartlist = JSON.parse(this.$route.query.giftlist);
      this.TotalIntegralValue = 0;
      this.selectcartlist.forEach(element => {
        this.TotalIntegralValue += element.IntegralValue * element.GiftNum;
      });
    } else {
      this.getselectcartlist(this.$route.query.cartids);
    }
    this.getuseraddress();
  }
};
</script>
<style lang="scss" scoped>
.mint-popup {
  width: 100%;
  .cancel {
    font-size: 0.68rem;
    padding: 0.21rem;
  }
  .confirm {
    font-size: 0.68rem;
    color: #007aff;
    padding: 0.21rem;
  }
}

.dropShipping {
  width: 100%;
  height: 1.956521rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.521739rem;
  margin: 0 0 0.3rem;
  padding: 0.434783rem 0.652174rem;
  color: #888888;
  > div:nth-child(1) {
    width: 80%;
    span:nth-child(1) {
      color: #fa9d26;
      font-size: 0.608696rem;
    }
  }
  > div:nth-child(2) {
    width: 20%;
    text-align: right;
  }
}
.tabList {
  width: 100%;
  background-color: white;
  margin: 0.3rem 0;
  font-size: 0.608696rem;
  padding: 0.434783rem 0.652174rem;
  color: #888888;

  > table {
    width: 100%;

    .copy {
      display: inline-block;
      width: 2.434782rem;
      height: 1.086956rem;
      line-height: 1.086956rem;
      border: 0.05rem solid #888888;
      text-align: center;
      border-radius: 0.2rem;
    }
    > tr:nth-child(1) td {
      height: 1.086956rem;
    }
    > tr td:nth-child(1) {
      width: 30%;
      text-align: left;
    }
    > tr td:nth-child(2) {
      width: 70%;
      text-align: right;
    }
  }
}

.head {
  //   background-color: white;
  .title {
    padding: 0.434783rem 0.652174rem;
    border-bottom: 1px solid #eee;
    background-color: white;
    span:nth-child(1) {
      font-size: 0.869565rem;
      color: #fb5d57;
      margin-right: 0.434783rem;
    }
    span:nth-child(2) {
      font-size: 0.695652rem;
    }
  }
  .detail {
    padding: 0.434783rem 0.652174rem;
    background-color: white;
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
        color: #888;
      }
    }
    > span {
      color: #999;
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
    margin-right: 0.652174rem;
    img {
      width: 100%;
    }
  }
  > div:nth-child(2) {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    width: 70%;
    height: 3.478261rem;
    font-size: 0.608695rem;
    // > div:nth-child(1) {
    //   > div:nth-child(1) {
    //     font-size: 0.608696rem;
    //   }
    //   > div:nth-child(2) {
    //     font-size: 0.521739rem;
    //     color: #888;
    //   }
    // }
    // > div:nth-child(2) {
    //   font-size: 0.521739rem;
    //   color: #888;
    //   > span:nth-child(1) {
    //     margin-right: 0.217391rem;
    //   }
    // }
    .a1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    > div {
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        width: 1.086956rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        color: #ddd;
        font-size: 0.8rem;
        background-color: #d29b48;
        border-radius: 0.1rem;
        text-align: center;
      }

      span:nth-child(2) {
        width: 1.391304rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        color: rgba(16, 16, 16, 0.4);
        font-size: 0.77rem;
        padding: 0 0.217391rem;
        background-color: #f3f3f3;
        border-radius: 0.1rem;
        text-align: center;
      }

      span:nth-child(3) {
        width: 1.086956rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        color: #ddd;
        font-size: 0.9rem;
        background-color: #d29b48;
        border-radius: 0.1rem;
        text-align: center;
      }
    }
  }
}
.remark {
  height: 4.782608rem;
  background-color: white;
  padding: 0.434783rem 0.652174rem;
  margin: 0.434783rem 0;
  p {
    font-size: 0.695652rem;
    margin-bottom: 0.5rem;
  }
  textarea {
    width: 100%;
    height: 3rem;
    color: #888888;
  }
}
.freight {
  height: 1.7391304rem;
  background-color: white;
  padding: 0 0.652174rem;
  margin: 0.434783rem 0;
  text-align: right;
  font-size: 0.608695rem;
  line-height: 1.7391304rem;
}
.pay {
  width: 100%;
  height: 1.913043rem;
  line-height: 1.913043rem;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #d29b48;
  color: white;
  font-size: 0.608695rem;
}

.sendWay {
  font-size: 0.608696rem;
  padding: 0.434783rem 0.652174rem;
  background-color: white;
  > div {
    > span:nth-child(1) {
      font-size: 0.521739rem;
      background-color: #fb5d57;
      color: white;
      padding: 0.086957rem 0.217391rem;
      border-radius: 0.086957rem;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f8f8;
  > div:nth-child(1) {
    padding-right: 0.434783rem;
    > div {
      text-align: right;
      font-size: 0.521739rem;
    }
    > div:nth-child(1) {
      > span:nth-child(1) {
        font-size: 0.695652rem;
        color: #e51c23;
      }
      > span:nth-child(2) {
        color: #888;
        margin-left: 0.217391rem;
      }
    }
  }
  > div:nth-child(2) {
    width: 3.608696rem;
    height: 2.173913rem;
    line-height: 2.173913rem;
    text-align: center;
    background-color: #fb5d57;
    color: white;
    font-size: 0.608696rem;
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
    background-color: white;
    width: 11.304348rem;
    border-radius: 0.434783rem;
    > div:nth-child(1) {
      padding: 0.782609rem 1.521739rem 1.521739rem;
      border-bottom: 1px solid #eee;
      > div:nth-child(1) {
        text-align: center;
        font-size: 0.695652rem;
        margin-bottom: 0.434783rem;
      }
      > div:nth-child(2) {
        font-size: 0.608696rem;
      }
    }
    > .footer_2 {
      height: 1.478261rem;
      line-height: 1.478261rem;
      font-size: 0.608696rem;
      > div {
        text-align: center;
        color: #3f51b5;
      }
      > div:nth-child(1) {
        border-right: 1px solid #eee;
      }
    }
  }
}
</style>
