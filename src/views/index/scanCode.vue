<template>
  <div id="scanCode">
    <div class="flexBetween">
      <div @click="godetail">查看订单详情</div>
      <div>
       
        <span>连扫</span>
        <mt-switch v-model="openValue" @change="switchChange"></mt-switch>
      </div>
    </div>
    <div class="main">
      <div class="mainTop">
        <div>
          <p>单号：{{orderdetail.ordernum}}</p>
          <p>{{orderdetail.create_date}}</p>
        </div>
        <div>
          <p>
            <span>{{orderdetail.fromagentname}}</span>
            <span>{{orderdetail.fromagentlevelname}}</span>
          </p>
          <p>授权码：{{orderdetail.fromagentserialnum}}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>品名</th>
            <th>数量</th>
            <th>物流码</th>
          </tr>
        </thead>
      </table>
      <div class="item" v-for="(pro,g_index) in orderdetail.prolist" :key="g_index">
        <div class="mList">                
          <div>{{pro.proname}}</div>
          <div>
            <span v-if="pro.proid!=3">{{pro.wlcodelist.length}}/</span>
            <span>{{pro.pronum}}</span>
          </div>
          <div v-if="pro.proid!=3" @click="wxScanQRCode(g_index)">扫码</div> 
        </div>

        <div class="mitem" v-for="(wl,w_index) in pro.wlcodelist" :key="w_index">
          <div>
            <div></div>
            <div>{{wl.wlcode}}</div>
          </div>

          <div @click="delcode(g_index,w_index)">删除</div>
        </div>
      </div>
    </div>
    <div class="express">
      <div>
        <div>
          <span>*</span>快递公司
        </div>
        <select v-model="orderdetail.courierid" style="width: 24%">
          <option v-for="item in courierlist" :key="item.key" :value="item.key">{{item.value}}</option>
        </select>
      </div>
      <div>
        <div>
          <span>*</span>快递单号
        </div>
        <div>
          <input type="text" v-model="orderdetail.couriernumber" placeholder="请输入快递单号" style="width:4rem;" />
          <div class="minus" @click="getcouriernumber" >-</div>
        </div>
      </div>
    </div>

    <div class="footerBtn" @click="confirmsend">确定发货</div>
  </div>
</template>
<script>
import { Toast, MessageBox, Switch } from "mint-ui";
import { getStore } from "../../config/mUtils";
import headTop from "src/components/header/newHead";
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      orderdetail: {},
      userinfo: {},
      agentype: 1,
      courierlist: [],
      courierid: 0,
      couriernumber: "",
      openValue: false,
      tabIndex:0
    };
  },
  components: {
    headTop
  },
  methods: {
    switchChange(e) {
      this.openValue = !e;
    },
    //微信配置
    getWXConfig() {
      this.$axios
        .get("integral.wx.setting", {
          params: { callback: window.location.href }
        })
        .then(Msg => {
          this.wxParams(
            Msg.data.Data.AppId,
            Msg.data.Data.Timestamp,
            Msg.data.Data.RndStr,
            Msg.data.Data.Signature
          );
        });
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
    delcode(g_index, w_index) {
      this.orderdetail.prolist[g_index].wlcodelist.splice(w_index, 1);
    },
    getcouriernumber(){
      var that=this;
       wx.scanQRCode({
            needResult: 1,
            desc: "scanQRCode desc",
            scanType: ["qrCode", "barCode"],
            success: function(res) {
              var scancode = "";
              if (res.resultStr.split("=").length > 1) {
                scancode = res.resultStr.split("=")[1];
              } else {
                scancode = res.resultStr;
              }
            that.orderdetail.couriernumber=scancode;
            },
            cancel: function(res) {}
      });
    },
    //单扫
    wxScanQRCode(g_index) {
      var that = this;
      if (
        that.orderdetail.prolist[g_index].pronum >
        that.orderdetail.prolist[g_index].wlcodelist.length
      ) {
        if (that.openValue) {
          that.allscanMore(that, g_index);
        } else {
          wx.scanQRCode({
            needResult: 1,
            desc: "scanQRCode desc",
            scanType: ["qrCode", "barCode"],
            success: function(res) {
              var scancode = "";
              if(res.resultStr.split(",").length>1)
              {
                scancode=res.resultStr.split(",")[1];
              }
              else if (res.resultStr.split("=").length > 1) {
                scancode = res.resultStr.split("=")[1];
              } else {
                scancode = res.resultStr;
              }

              var flag = false; //是否有重复存在
              that.orderdetail.prolist[g_index].wlcodelist.forEach(orderpro => {
                if (orderpro.wlcode == scancode) {
                  flag = true;
                }
              });
              if (!flag) {
                var instance = that.$axios.create({
                  baseURL: "http://www.m12315.com/mgjapi/"
                });
                instance
                  .get("fleedtools.get.wlcodenum", {
                    params: {
                      wlcode: scancode
                    }
                  })
                  .then(p => {
                    if (p.data.msg == "10001") {
                      if (
                        Number(p.data.result.DragNum) +
                          that.orderdetail.prolist[g_index].wlcodelist.length <=
                        that.orderdetail.prolist[g_index].pronum
                      ) {
                        that.orderdetail.prolist[g_index].wlcodelist.push({
                          wlcode: scancode
                        });
                      } else {
                        Toast({
                          message:
                            "该码包含" +
                            p.data.result.DragNum +
                            "个单标,已达上限",
                          iconClass: "iconfont icon-cuo",
                          duration: 1500
                        });
                      }
                    } else {
                      Toast({
                        message: "请求出现异常",
                        iconClass: "iconfont icon-cuo",
                        duration: 1500
                      });
                    }
                  });
              } else {
                Toast({
                  message: "该码已重复",
                  iconClass: "iconfont icon-cuo",
                  duration: 1500
                });
              }
            },
            cancel: function(res) {}
          });
        }
      } else {
        Toast({
          message: "扫码达上限",
          iconClass: "iconfont icon-cuo",
          duration: 1500
        });
      }
    },
    //连扫
   allscanMore(that, g_index) {
      if (
        that.orderdetail.prolist[g_index].pronum >
        that.orderdetail.prolist[g_index].wlcodelist.length
      ) {
        wx.scanQRCode({
          needResult: 1,
          desc: "scanQRCode desc",
          scanType: ["qrCode", "barCode"],
          success: function(res) {
            var scancode = "";
            if (res.resultStr.split("=").length > 1) {
              scancode = res.resultStr.split("=")[1];
            } else {
              scancode = res.resultStr;
            }

            var flag = false; //是否有重复存在
            that.orderdetail.prolist[g_index].wlcodelist.forEach(orderpro => {
              if (orderpro.wlcode == scancode) {
                flag = true;
              }
            });
            if (!flag) {
              var instance = that.$axios.create({
                baseURL: "http://www.m12315.com/mgjapi/"
              });
              instance
                .get("fleedtools.get.wlcodenum", {
                  params: {
                    wlcode: scancode
                  }
                })
                .then(p => {
                  if (p.data.msg == "10001") {
                    if (
                      Number(p.data.result.DragNum) +
                        that.orderdetail.prolist[g_index].wlcodelist.length <=
                      that.orderdetail.prolist[g_index].pronum
                    ) {
                      that.orderdetail.prolist[g_index].wlcodelist.push({
                        wlcode: scancode
                      });
                    } else {
                      Toast({
                        message:
                          "该码包含" +
                          p.data.result.DragNum +
                          "个单标,已达上限",
                        iconClass: "iconfont icon-cuo",
                        duration: 1500
                      });
                    }
                  } else {
                    Toast({
                      message: "请求出现异常",
                      iconClass: "iconfont icon-cuo",
                      duration: 1500
                    });
                  }
                });
            } else {
              Toast({
                message: "该码已重复",
                iconClass: "iconfont icon-cuo",
                duration: 1500
              });
            }
            that.timer = setTimeout(function() {
              that.allscanMore(that, g_index);
            }, 1500);
          },
          cancel: function(res) {
            if (that.timer) {
              clearTimeout(that.timer);
            }
          }
        });
      } else {
        Toast({
          message: "扫码达上限",
          iconClass: "iconfont icon-cuo",
          duration: 1500
        });
      }
    },
    godetail() {
      this.$router.push({
        path: "/orderDetail",
        query: { orderid: this.$route.query.id, agentype: this.agentype,tabIndex:this.tabIndex }
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
          this.courierid= this.orderdetail.courierid;
          console.log(this.orderdetail)
        });
    },
    getdictionary: function(id) {
      this.$axios
        .get("get.dictionary.select", {
          params: {
            type: 1
          }
        })
        .then(p => {
          this.courierlist = p.data.Data;
          if(this.courierlist.length>0){
            this.orderdetail.courierid=this.courierlist[0].key;
          }
        });
    },
    confirmsend(){
      if(!this.orderdetail.courierid){
          Toast({
                  message: "请选择快递公司",
                  iconClass: "iconfont icon-dui",
                  duration: 1500
                });
                return;
      }
       if(!this.orderdetail.couriernumber){
          Toast({
                  message: "请填写快递单号",
                  iconClass: "iconfont icon-dui",
                  duration: 1500
                });
                return;
      }
       var flag=false;
      this.orderdetail.prolist.forEach(element => {
        if(element.wlcodelist.length>0){
          flag=true;
        }
      });
       if(flag){  
         MessageBox.confirm("亲，确认发货吗?").then(res => {
        if (res == "confirm") {
          this.$axios
            .post("tihuo.order.send", { id: this.$route.query.id ,prolist:this.orderdetail.prolist,courierid:this.orderdetail.courierid,couriernumber:this.orderdetail.couriernumber})
            .then(p => {
              if (p.data.Code == "100") {
                Toast({
                  message: "发货成功",
                  iconClass: "iconfont icon-dui",
                  duration: 1500
                });
                this.getorderdetail(this.$route.query.id);
              } else {
                Toast({
                  message: "发货失败",
                  iconClass: "iconfont icon-cuo",
                  duration: 1500
                });
              }
            });
        }
      });
      }
      else{
        Toast({
          message: "请扫码再发货",
          iconClass: "iconfont icon-cuo",
          duration: 1500
        });
      }
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    this.getorderdetail(this.$route.query.id);
    this.agentype = this.$route.query.agentype;
    this.tabIndex=this.$route.query.tabIndex;
    this.getdictionary();
    this.getWXConfig();
  }
};
</script>
<style lang="scss" scoped>
.mint-switch-input:checked + .mint-switch-core {
  border-color: green;
  background-color: green;
}
.flexBetween {
  height: 1.913043rem;
  background-color: #ffffff;
  font-size: 0.608695rem;
  > div:nth-child(1) {
    width: 4.347826rem;
    height: 1.304347rem;
    border: solid 1px #d29b48;
    border-radius: 5px;
    text-align: center;
    line-height: 1.304347rem;
    color: #d29b48;
    margin-left: 0.5rem;
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;

    > span:nth-child(2) {
      margin-right: 0.3rem;
      margin-left: 0.5rem;
    }
  }
}
.main {
  margin-top: 0.5rem;
  background-color: white;
  .mainTop {
    height: 2.608695rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      p:nth-child(1) {
        font-size: 0.608695rem;
      }
      p:nth-child(2) {
        font-size: 0.521739rem;
        color: #888888;
      }
    }
    > div:nth-child(1) {
      margin-left: 0.5rem;
    }
    > div:nth-child(2) {
      margin-right: 0.5rem;

      > p:nth-child(1) {
        > span:nth-child(2) {
          display: inline-block;
          width: 2.260869rem;
          height: 0.869565rem;
          border-radius: 3px;
          border: solid 1px #d29b48;
          color: #d29b48;
          text-align: center;
          line-height: 0.869565rem;
        }
      }
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.608695rem;
    text-align: center;
    table-layout: fixed;
    thead {
      background-color: #d29b48;
      color: white;
      th {
        height: 1.391304rem;
      }
      th:nth-child(1) {
        width: 60%;
      }
      th:nth-child(2),
      th:nth-child(3) {
        width: 21%;
      }
    }
  }
  .item {
    .mList {
      width: 100%;
      display: flex;
      text-align: center;
      line-height: 1.391304rem;
      font-size: 0.608695rem;
      border-collapse: collapse;
      div {
        border: solid 1px #f3f3f3;
        margin-right: -1px;
        margin-bottom: -1px;
      }
      > div:nth-child(1) {
        width: 60%;
        overflow: hidden; //盒子溢出隐藏
        text-overflow: ellipsis; //文字溢出显示省略号
        white-space: nowrap; //文字不换行
      }
      > div:nth-child(2),
      > div:nth-child(3) {
        width: 21%;
      }
      > div:nth-child(2) {
        > span:nth-child(2) {
          color: red;
        }
      }
      > div:nth-child(3) {
        color: #d29b48;
      }
      
    }
    .mitem {
      height: 1.73913rem;
      line-height: 1.73913rem;
      font-size: 0.608695rem;
      border-bottom: 1px solid #f3f3f3;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div:nth-child(1) {
        width: 80%;
        display: flex;
        align-items: center;
        > div:nth-child(1) {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #f3f5f7;
          margin: 0 1rem 0 0.5rem;
        }
      }

      > div:nth-child(2) {
        color: red;
        margin-right: 0.5rem;
      }
    }
  }
}
.express {
  padding: 0.5rem;
  font-size: 0.608695rem;
  margin-top: 0.5rem;
  background-color: white;
  > div {
    height: 1.73913rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f3f3f3;
    > div span {
      color: red;
    }
    > select {
      border: 1px solid #bbbbbb;
      border-radius: 3px;
      color: #888888;
    }
  }
  > div:nth-child(2) {
    border: none;
  }
  .minus {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    border: solid 2px #bbbbbb;
    text-align: center;
  }
}

.footerBtn {
  width: 100%;
  height: 1.913043rem;
  line-height: 1.913043rem;
  position: fixed;
  bottom: 0;
  background-color: #d29b48;
  color: white;
  text-align: center;
  font-size: 0.782608rem;
}
</style>


