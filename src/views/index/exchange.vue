<template>
  <div>
    <head-top goBack="true"></head-top>
    <div class="newPlaceholder"></div>

    <div class="head">
      <div class="title flex" v-if="addresslist.length>0" @click="goPage('/addressIndex')">
        <svg class="icon iconSvg" aria-hidden="true">
          <use xlink:href="#iconwode-dizhi" />
        </svg>
        <span>收货地址</span>
      </div>

      <div class="detail flexBetween" v-if="addresslist.length>0">
        <div class="flexGrow" @click="goPage('/addressIndex')"><!--popup-->
          <div>
            <span>{{ReName}}</span>
            <span>{{RePhone}}</span>
          </div>
          <div>{{ReAddress}}</div>
        </div>
        <span class="iconfont iconxiayige"></span>
      </div>
      <div class="sendWay flexBetween" @click="goPage('/addressIndex')" v-else>
        <span>+添加收货地址</span>
      </div>
    </div>
    <div class="main flex" v-for="(item,index) in selectcartlist" v-bind:key="item.id">
      <div class="flexCenter">
        <img :src="item.proimg" alt />
      </div>
      <div class="flexGrow">
        <div>{{item.proname}}</div>
        <div class="a1">
          <div style="color:#E9423A;">
            ￥{{item.protype==2?item.vipprice:item.proprice}}
            <s
              style="color:#666466;"
            >￥{{item.marketprice}}</s>
          </div>
          <div>
            <div class="flexCenter" style="touch-action: none;">
              <span @click="minus(item.id,index)">-</span>
              <input
                style="width: 45px;text-align:center;"
                type="num"
                @input="search(item.pronum,index)"
                v-model="item.pronum"
              />
              <span @click="add(item.id,index)">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="remark">
      <p>订单备注：</p>
      <textarea v-model="remark" name id cols rows placeholder="请输入订单备注信息..."></textarea>
    </div>
    <div class="freight" v-show="shows">
      <p style="color:#888888;">
        <span>会员价:</span>
        <span>￥{{marketprice}}</span>
      </p>
      <p style="color:#E9423A;" v-if="IsBuy">
        <span>代理价:</span>
        <span>￥{{sumprice}}</span>
      </p>
    </div>

    <div style="height:1.913043rem;"></div>
    <div class="pay" @click="payandorder">提交订单</div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom">
      <div class="flexBetween">
        <span @click="popup" class="cancel">取消</span>
        <span @click="confirmPopup" class="confirm">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
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
      orderid: 0,
      IsBuy: false,
      pronum:1,
      shows: true,
      Istrue: false,
      sumprice: 0, //订单金额
      marketprice: 0, //市场价
      TotalIntegralValue: 0,
      maskShow: false,
      selectcartlist: [],
      userinfo: {},
      userintegral: {},
      addresslist: [],
      remark: "",
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
      receiveraddress: "",
      addressArrIndex: "",

      ReAddress: "",
      ReName: "",
      RePhone: ""
    };
  },
  components: {
    headTop
  },
  methods: {
    search(pronum, index) {
      var reg = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
      var numRe = new RegExp(reg);
      if (!numRe.test(pronum)) {
        Toast({
          message: "亲，请输入数字哦~",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        this.selectcartlist[index].pronum = "";
      } else {
        this.selectcartlist[index].pronum = Number(
          this.selectcartlist[index].pronum
        );
        if (this.selectcartlist[index].protype == 2 && this.IsBuy == true) {
          this.sumprice = (this.selectcartlist[index].vipprice - 20) * pronum;
          this.marketprice = this.selectcartlist[index].vipprice * pronum;
        } else if (
          this.selectcartlist[index].protype == 2 &&
          this.IsBuy == false
        ) {
          this.sumprice = this.selectcartlist[index].vipprice * pronum;
          this.marketprice = this.selectcartlist[index].vipprice * pronum;
        } else {
          this.sumprice = this.selectcartlist[index].proprice * pronum;
          this.marketprice = this.selectcartlist[index].proprice * pronum;
        }
        this.getexpressfee();
      }
    },
    popup() {
      this.popupVisible = !this.popupVisible;
    },
    payandorder() {
      if (!this.addressid) {
        this.maskShow = false;
        Toast({
          message: "亲，请先添加地址哦~",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
      } else {
        this.UserShopcartList = [];
        this.maskShow = true;
        this.orderinfo.fromagentid = this.userinfo.id;
        this.orderinfo.addressid = this.addressid;
        this.orderinfo.remark = this.remark;
        this.orderinfo.create_userid = this.userinfo.create_userid;
        this.orderinfo.f_payexpress = 1;
        this.orderinfo.agentid = this.userinfo.id;
        this.orderinfo.protype = this.selectcartlist[0].protype;
        this.orderinfo.sumprice = this.sumprice;
        if (this.Istrue) {
          this.selectcartlist.forEach(element => {
            this.UserShopcartList.push({
              proid: element.id,
              proname: element.proname,
              pronum: element.pronum,
              proprice:
                element.proprice == undefined
                  ? element.vipprice
                  : element.proprice,
              proimg: element.proimg
            });
          });
          this.orderinfo.prolist = this.UserShopcartList;
        } else {
          this.selectcartlist.forEach(element => {
            this.UserShopcartList.push({
              id: element.id,
              proid: element.proid,
              proname: element.proname,
              pronum: element.pronum,
              proprice:
                element.proprice == undefined
                  ? element.vipprice
                  : element.proprice,
              proimg: element.proimg
            });
          });
          this.orderinfo.prolist = this.UserShopcartList;
        }
        if (this.orderinfo.protype == 1) {
          this.$axios
            .post("app.post.tihuoorder.add", this.orderinfo)
            .then(p => {
              this.maskShow = false;
              if (p.data.Code == 100) {
                MessageBox.alert("订单提交成功!").then(action => {});
                this.$router.push({
                  path: "/issueEvaluate",
                  query: { abc: 3, orderid: p.data.Data.id }
                });
              } else if (p.data.Code == 114) {
                Toast({
                  message: p.data.Data,
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              } else {
                Toast({
                  message: "下单失败，很抱歉亲~",
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              }
            });
        } else {
          this.$axios
            .post("app.post.tihuoorder.add", this.orderinfo)
            .then(p => {
              this.maskShow = false;
              if (p.data.Code == 100) {
                this.orderid = p.data.Data.id;
                MessageBox.alert("订单提交成功!").then(action => {
                  this.$router.push({
                    path: "/payFreight",
                    query: {
                      id: p.data.Data.id,
                      sumprice: p.data.Data.sumprice
                    }

                  });


              //      this.$axios
              // .post("app.wxpay.tihuoorder", {
              //   id: this.orderid,
              //   out_trade_no:1,
              //   err_msg:1
              // })
              // .then(p=>{
              //   if (p.data.Code == 100) {
              //     MessageBox.alert("交易成功!").then(action => {
              //     });
              //     this.$axios
              //         .get("app.get.CentCommission", {
              //           params: {
              //             orderid: this.orderid
              //           }
              //         })
              //         .then(c => {
              //         });
              //       this.$router.push({
              //         path: "/issueEvaluate",
              //         query: { abc: 1,orderid:this.orderid }
              //       });
              //   } else {
              //     Toast({
              //       message: "订单结算出错，请联系管理员",
              //       iconClass: "iconfont icon-cuo",
              //       duration: 1000
              //     });
              //   }
              // })

                });
              } else if (p.data.Code == 114) {
                Toast({
                  message: p.data.Data,
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              } else {
                Toast({
                  message: "下单失败，很抱歉亲~",
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              }
            });
        }
      }
    },
    getuseraddress() {
      this.$axios
        .get("get.mc.integraladdress.integraladdress", {
          params: {
            IAid: this.userinfo.id
          }
        })
        .then(p => {
          this.addresslist = p.data.Data;
          this.arr = p.data.Data;
          for (var i = 0; i < p.data.Data.length; i++) {
            this.addressArr.push(
              this.arr[i].province +
                this.arr[i].city +
                this.arr[i].area +
                this.arr[i].receiveraddress
            );
          }
          this.slots[0].values = this.addressArr;
          for (var i = 0; i < p.data.Data.length; i++) {
            if (p.data.Data[i].f_default == 0) {
              //默认地址
              this.addressid = p.data.Data[i].id;
              this.ReAddress =
                p.data.Data[i].province +
                p.data.Data[i].city +
                p.data.Data[i].area +
                p.data.Data[i].receiveraddress;
              this.ReName = p.data.Data[i].receivername;
              this.RePhone = p.data.Data[i].receiverphone;
              break;
            } else {
              this.addressid = p.data.Data[0].id;
              this.ReAddress =
                p.data.Data[0].province +
                p.data.Data[0].city +
                p.data.Data[0].area +
                p.data.Data[0].receiveraddress;
              this.ReName = p.data.Data[0].receivername;
              this.RePhone = p.data.Data[0].receiverphone;
            }
          }
        });
    },
    confirmPopup() {
      this.addressArrIndex = this.addressArr.indexOf(this.receiveraddress);
      this.ReAddress = this.receiveraddress;
      this.ReName = this.arr[this.addressArrIndex].receivername;
      this.RePhone = this.arr[this.addressArrIndex].receiverphone;
      this.addressid = this.arr[this.addressArrIndex].id;
      this.popupVisible = false;
    },
    onValuesChange(picker, values) {
      this.receiveraddress = values[0];
      this.getexpressfee();
    },
    cancel() {
      this.maskShow = false;
    },
    goPage(path) {
      if(path=='/addressIndex')
      {
       this.$router.push({
        path: path,
        query:{ids:2}
        });
      }
      else
      {
      this.$router.push({
        path: path
      });
      }
    },
    minus(id, index) {
      if (this.selectcartlist[index].pronum - 1 > 0) {
        this.showLoading = true;
        this.$axios
          .post("app.update.agent.shopcart", {
            id: id,
            pronum: 1,
            dealtype: "Minus"
          })
          .then(p => {
            if (p.data.Code == "100") {
              this.showLoading = false;
              this.selectcartlist[index].pronum =
                Number(this.selectcartlist[index].pronum) - 1;
              if (
                this.selectcartlist[index].protype == 2 &&
                this.IsBuy == true
              ) {
                this.sumprice -= this.selectcartlist[index].vipprice - 20;
                this.marketprice -= this.selectcartlist[index].vipprice;
              } else if (
                this.selectcartlist[index].protype == 2 &&
                this.IsBuy == false
              ) {
                this.sumprice -= this.selectcartlist[index].vipprice;
                this.marketprice -= this.selectcartlist[index].vipprice;
              } else {
                this.sumprice -= this.selectcartlist[index].proprice;
                this.marketprice -= this.selectcartlist[index].proprice;
              }
              this.getexpressfee();
            } else {
              Toast({
                message: "很抱歉亲~，网络出现错误",
                iconClass: "iconfont icon-cuo",
                duration: 1000
              });
            }
          });
      } else {
        MessageBox.confirm("已达到最小数量,是否自动移除该项?")
          .then(action => {
            this.showLoading = true;
            this.$axios.post("app.del.agent.shopcart", { id: id }).then(p => {
              if (p.data.Code == "100") {
                this.showLoading = false;
                this.selectcartlist.splice(index, 1);
                if (this.selectcartlist.length > 0) {
                  this.hasItem = false;
                } else {
                  this.hasItem = true;
                }
                this.getexpressfee();
              } else {
                Toast({
                  message: "很抱歉亲~，网络出现错误",
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              }
            });
          })
          .catch(() => {});
      }
    }, //加
    add(id, index) {
      this.showLoading = true;
      this.$axios
        .post("app.update.agent.shopcart", {
          id: id,
          pronum: 1,
          dealtype: "Add"
        })
        .then(p => {
          if (p.data.Code == "100") {
            this.showLoading = false;
            this.selectcartlist[index].pronum =
              Number(this.selectcartlist[index].pronum) + 1;
            if (this.selectcartlist[index].protype == 2 && this.IsBuy == true) {
              this.sumprice += this.selectcartlist[index].vipprice - 20;
              this.marketprice += this.selectcartlist[index].vipprice;
            } else if (
              this.selectcartlist[index].protype == 2 &&
              this.IsBuy == false
            ) {
              this.sumprice += this.selectcartlist[index].vipprice;
              this.marketprice += this.selectcartlist[index].vipprice;
            } else {
              this.sumprice += this.selectcartlist[index].proprice;
              this.marketprice += this.selectcartlist[index].proprice;
            }
            this.getexpressfee();
          } else {
            Toast({
              message: "很抱歉亲~，网络出现错误",
              iconClass: "iconfont icon-cuo",
              duration: 1000
            });
          }
        });
    }, //获取购物车产品信息
    getselectcartlist(cartids) {
      var _this = this;
      this.$axios
        .get("app.get.agentselect.shopcartlist", {
          params: {
            cartids: cartids
          }
        })
        .then(p => {
          _this.selectcartlist = p.data.Data;
          _this.selectcartlist.forEach(element => {
            if (this.IsBuy) {
              _this.sumprice += (element.vipprice - 20) * element.pronum;
              _this.marketprice += element.vipprice * element.pronum;
            } else {
              _this.sumprice += element.vipprice * element.pronum;
              _this.marketprice += element.vipprice * element.pronum;
            }
          });
          /*if(_this.ReAddress){
             if(_this.ReAddress.indexOf("上海")>=0||_this.ReAddress.indexOf("江苏")>=0||_this.ReAddress.indexOf("浙江")>=0){
        if(_this.sumprice<=5){
          _this.expressfee=6;
        }else if(_this.sumprice > 5 && _this.sumprice < 100){
          _this.expressfee = 6 + (_this.sumprice - 5) * 0.2;
        }else{
           _this.expressfee =0;
        }
      }else{
           if(_this.sumprice<=5){
          _this.expressfee=20;
        }else if(_this.sumprice > 5 && _this.sumprice < 100){
          _this.expressfee = 20 + (_this.sumprice - 5) * 0.8;
        }else{
           _this.expressfee =0;
        }
      }
      }*/
        });
    },

    getproduct() {
      this.$axios
        .get("app.get.productlist", {
          params: {
            levelid: this.userinfo.levelid,
            pageindex: 1,
            pagesize: 20,
            protype: 1,
            agentid: this.userinfo.id
          }
        })
        .then(p => {
          this.selectcartlist = p.data.Data;
          this.selectcartlist[0].pronum = 0;
        });
    },
    getexpressfee() {
      var totalnum = 0;
      this.selectcartlist.forEach(element => {
        totalnum += element.pronum;
      });
      /* if(this.ReAddress){
             if(this.ReAddress.indexOf("上海")>=0||this.ReAddress.indexOf("江苏")>=0||this.ReAddress.indexOf("浙江")>=0){
        if(totalnum<=5){
          this.expressfee=6;
        }else if(totalnum > 5 && totalnum < 100){
          this.expressfee = 6 + (totalnum - 5) * 0.2;
        }else{
           this.expressfee =0;
        }
      }else{
           if(totalnum<=5){
          this.expressfee=20;
        }else if(totalnum > 5 && totalnum < 100){
          this.expressfee = 20 + (totalnum - 5) * 0.8;
        }else{
           this.expressfee =0;
        }
      }
      }*/
    },
    //商品金额计算
    sumprices() {
      this.selectcartlist.forEach(p => {
        if (p.protype == 1) {
          this.sumprice += p.proprice;
          this.marketprice += p.proprice;
        } else {
          this.sumprice += p.discounts;
          this.marketprice += p.vipprice;
        }
      });
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
          //this.getlevelpronum(this.userinfo.levelid);
        });

    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    //this.Iscount();
    this.getuseraddress();

    if (this.$route.query.type == 1) {
      //商品入口
      this.selectcartlist = JSON.parse(this.$route.query.giftlist);

      this.sumprices();
      this.getexpressfee();
    } else if (this.$route.query.type == 2) {
      //购物车入口
      this.getselectcartlist(this.$route.query.cartids);
    } else {
      this.shows = false;
      this.Istrue = true;
      this.$axios
        .get("app.get.productlist", {
          params: {
            levelid: this.userinfo.levelid,
            pageindex: 1,
            pagesize: 10,
            protype: 1,
            agentid: this.userinfo.id
          }
        })
        .then(p => {
          this.selectcartlist = p.data.Data;
          this.selectcartlist.forEach(p => {
            p.pronum = this.pronum;
          });
          this.sumprices();
        });
    }
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
.head {
  background-color: white;
  .title {
    padding: 0.434783rem 0.652174rem;
    border-bottom: 1px solid #eee;
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
    flex-direction: column;
    justify-content: space-between;
    height: 3.478261rem;
    font-size: 0.608695rem;

    .a1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    > div {
      span {
        display: inline-block;
      }
      span:nth-child(1),
      span:nth-child(3) {
        width: 1.086956rem;
        height: 1.086956rem;
        line-height: 0.9rem;
        color: #ddd;
        font-size: 0.8rem;
        background-color: #e9423a;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
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
    height: 2.3rem;
    color: #888888;
  }
}
.freight {
  background-color: white;
  padding: 0.2rem 0.652174rem;
  margin: 0.434783rem 0;
  text-align: right;
  font-size: 0.608695rem;
}
.pay {
  width: 100%;
  height: 1.913043rem;
  line-height: 1.913043rem;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #e9423a;
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
