<template>
  <div>
    <!-- <head-top goBack="true" @click="gourl"></head-top>
    <div class="newPlaceholder"></div>-->
    <div class="headTop">
      <span class="head_goback iconfont iconiconfontjiantou1" @click="gourl()"></span>
    </div>
    <div>
      

      <span class="searchIcon iconfont iconfangweiguanli"></span>
      <input
        class="search"
        type="text"
        placeholder="请输入订单号"
        v-on:input="getkeyword"
        v-model="keyword"
      />
      <div class="top-tab flexAround">
        <span
          v-for="(item,index) in tabList"
          :key="index"
          @click="tab(item.id)"
          :class="{active:tabIndex==item.id}"
        >{{item.name}}</span>
      </div>
      <div
        class="itemList"
        v-infinite-scroll="getorderlist"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <div class="itemList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <a v-for="(item,index) in orderlist" :key="index">
            <div class="head flexBetween">
              <span>时间：{{item.create_date}}</span>

              <span v-if="item.f_logistics==1">未支付</span>
              <span v-else-if="item.f_logistics==2">待发货</span>
              <span v-else-if="item.f_logistics==3">已发货</span>
              <span v-else-if="item.f_logistics==4">交易成功</span>
              <span v-else-if="item.f_logistics==5">已关闭</span>
            </div>
            <div
              @click="godetail(item.id)"
              class="main flex"
              v-for="(pro,g_index) in item.prolist"
              :key="g_index"
            >
              <div class="flexCenter">
                <img :src="pro.proimg" alt />
              </div>

              <div class="intur">
                <div class="inturLeft">{{pro.proname}}</div>
                <div class="inturRight">
                  <div>￥{{pro.proprice==0?pro.vipprice:pro.proprice}}</div>
                  <div>x{{pro.pronum}}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <div class="flexBetween">
                <span>单号：{{item.ordernum}}</span>
              </div>
               <div class="addressBox" style="font-size:0.521rem;">
                <p>
                  收件人:
                  <span>{{item.receivername}}</span>
                </p>
                <p>
                  手机号:
                  <span>{{item.receiverphone}}</span>
                </p>
                <p>
                  地&emsp;址:
                  <span
                    style="display:inline-block;width:80%;vertical-align: top;"
                  >{{item.receiveraddress}}</span>
                </p>
              </div>
              <div class="closeOrder" v-if="item.f_logistics==1&&agentype==1">
                <span class="btn" @click="cancelorder(item.id)">关闭订单</span>
                <span
                  class="btn"
                  @click="wxpay(item.id,item.totalmoney)"
                  style="background-color:#E9423A;color: #FFFFFF"
                >去支付</span>
              </div>
              <div
                class="checkOrder"
                @click="saomasend(item.id,item.ordertype)"
                v-else-if="item.f_logistics==2&&agentype==2"
              >
                <span class="btn" style="background-color:#E9423A;color: #FFFFFF">扫码发货</span>
              </div>
              <div class="checkOrder" v-else-if="item.f_logistics==3&&agentype==1">
                <span class="btn" @click="goLogisticsDetails(item.couriernumber,item.kdurl)">查看物流</span>
                <span
                  class="btn"
                  style="background-color:#E9423A;color: #FFFFFF"
                  @click="confirmreceive(item.id)"
                >确认收货</span>
              </div>
              <div class="checkOrder" v-else-if="item.f_logistics==3&&agentype==2">
                <span class="btn" @click="goLogisticsDetails(item.couriernumber,item.kdurl)">查看物流</span>
                <span
                  class="btn"
                  style="background-color:#E9423A;color: #FFFFFF"
                  @click="saomasend(item.id)"
                >编辑发货</span>
              </div>
              <div class="checkOrder" v-else-if="item.f_logistics==4">
                <span class="btn" @click="goLogisticsDetails(item.couriernumber,item.kdurl)">查看物流</span>
              </div>
              <div class="checkOrder" v-else-if="item.f_logistics==5"></div>
            </div>
          </a>
          <div v-if="bottomLine" class="bottom-line flexCenter">
            <span></span>
            <span>没有更多数据哦</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Toast, MessageBox, InfiniteScroll } from "mint-ui";
import { getStore } from "../../../config/mUtils";
import headTop from "src/components/header/newHead";

export default {
  name: "orderIndex",
  data() {
    return {
      agentid:0,
      keyword: "",
      userinfo: {},
      orderrype:2,
      orderlist: [],
      selected: "0",
      tabIndex: 0,
      tabList: [
        {
          id: "0",
          name: "全部"
        },
        {
          id: "2",
          name: "待发货"
        },
        {
          id: "3",
          name: "待收货"
        },
        {
          id: "4",
          name: "交易成功"
        },
        {
          id: "5",
          name: "已关闭"
        },
      
      ],
      itemList: [],
      Sproid: 0,
      bottomLine: false,
      pageindex: 1,
      loading: false,
      agentype: 1,
      codes: false
    };
  },
  computed: {},
  components: {
    headTop
  },
  methods: {
    saomasend(id,ordertype) {
      this.$router.push({
        path: "/scanCode",
        query: { id: id, agentype: this.agentype, tabIndex: this.tabIndex}
      });
    },
    tab(index) {
      this.tabIndex = index;
      this.orderlist = [];
      this.pageindex = 1;
      this.getorderlist();
    },
    getkeyword() {
      this.orderlist = [];
      this.pageindex = 1;
      this.getorderlist();
    },
    getorderlist() {
      var sysuid = 0;
      var agentid = 0;
      if (this.agentype == 2) {
        agentid = 0;
        sysuid = this.userinfo.id;
      } else {
        agentid = this.userinfo.id;
        sysuid = 0;
      }
      this.$axios
        .get("app.get.order.pagelist", {
          params: {
            agentid: agentid,
            sysuid: 0,
            agentype: 1,
            ordertype: 2,
            keyword: this.keyword,
            logistics: this.tabIndex,
            pageindex: this.pageindex,
            pagesize: 5
          }
        })
        .then(p => {
          if (p.data.Data) {
            if (p.data.Data.Data.length > 0) {
              this.bottomLine = false;
            } else {
              this.bottomLine = true;
            }

            if (this.pageindex <= p.data.Data.Count) {
              this.loading = false; //可以加载
              this.pageindex++;

              this.orderlist = this.orderlist.concat(p.data.Data.Data);
              console.log( this.orderlist);
            } else {
              this.loading = true; //不可以加载
              Toast({
                message: "没有数据啦",
                duration: 1500
              });
            }
          }
        });
    },
    gourl() {
      if (this.agentype == 1) {
        this.$router.push({ path: "/mallIndex" });
      } else {
        this.$router.push({ path: "/sysIndex" });
      }
    },
    godetail(id) {
      this.$router.push({
        path: "/orderDetail",
        query: { orderid: id, agentype: this.agentype, tabIndex: this.tabIndex,agentid:this.agentid }
      });
    },
    cancelorder(id) {
      var _this = this;
      MessageBox.confirm("确定取消该订单吗？").then(res => {
        if (res == "confirm") {
          this.$axios.post("app.cancel.order", { id: id }).then(p => {
            if (p.data.Code == 100) {
              Toast({
                message: "取消成功",
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
              _this.orderlist = [];
              _this.pageindex = 1;
              _this.getorderlist();
            } else {
              Toast({
                message: "取消失败",
                iconClass: "iconfont icon-cuo",
                duration: 1500
              });
            }
          });
        }
      });
    },
    confirmreceive(id) {
      MessageBox.confirm("亲，确定宝贝已经收到了吗?").then(res => {
        if (res == "confirm") {
          this.$axios.post("app.confirmrecive.order", { id: id }).then(p => {
            if (p.data.Code == "100") {
              Toast({
                message: "收货成功",
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
              this.tab(this.tabIndex);
            } else {
              Toast({
                message: "收货失败",
                iconClass: "iconfont icon-cuo",
                duration: 1500
              });
            }
          });
        }
      });
    },
    goLogisticsDetails(CourierNumber, UrlStr) {
      window.location =
        "http://m.kuaidi100.com/result.jsp?com=" +
        UrlStr +
        "&nu=" +
        CourierNumber;
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.searchIcon {
  font-size: 1rem;
  color: #e9423a;
  position: absolute;
  top: 1.65rem;
  left: 0.15rem;
}
.search {
  width: 15.652173rem;
  height: 1.304347rem;
  margin: 0.3rem auto;
  margin-left: 0.15rem;
  border-radius: 0.1rem;
  background-color: white;
  padding: 0.05rem;
  padding-left: 0.8rem;
}

.intur {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.608rem;

  .inturRight div:nth-child(1) {
    color: #e51c23;
  }
  .inturRight div:nth-child(2) {
    text-align: right;
  }
}

.top-tab {
  background: white;
  border-bottom: 0.5px solid #e7eaed;
  span {
    font-size: 0.51rem;
    color: #666666;
    line-height: 1.96rem;
    height: 1.96rem;
    // width: 25%;
    text-align: center;
  }
}

.active {
  border-bottom: 2px solid #e9423a;
  color: #e9423a !important;
}

.itemList {
  /*padding-top: 2.1rem;*/
  > a {
    display: block;
    color: black;
    background-color: white;
    margin-bottom: 0.5rem;

    .head {
      padding: 0.26087rem 0.652174rem;

      > span:nth-child(1) {
        font-size: 0.521739rem;
        color: #888888;
      }

      > span:nth-child(2) {
        font-size: 0.608696rem;
        color: #d29b48;
      }
    }

    .main {
      border-top: 1px solid #e7eaed;
      // border-bottom: 1px solid #e7eaed;
      padding: 0.26087rem 0.652174rem;

      > div:nth-child(1) {
        width: 2.608696rem;
        height: 2.608696rem;
        overflow: hidden;

        > img {
          width: 100%;
        }
      }

      > div:nth-child(2) {
        padding-left: 0.652174rem;

        > div:nth-child(1) {
          margin-bottom: 0.217391rem;

          > span:nth-child(1) {
            font-size: 0.608696rem;
          }

          > span:nth-child(2) {
            font-size: 0.695652rem;
            color: #e51c23;

            > span {
              font-size: 0.521739rem;
              color: #888888;
            }
          }
        }

        > div:nth-child(2) {
          > span:nth-child(1) {
            font-size: 0.521739rem;
            color: #888888;
          }

          > span:nth-child(2) {
            font-size: 0.608696rem;
          }
        }
      }
    }

    .footer {
      padding: 0.26087rem 0.652174rem;
      border-top: 1px solid #e7eaed;
      > div:nth-child(1) {
        > span:nth-child(1) {
          font-size: 0.521739rem;
        }

        > span:nth-child(2) {
          font-size: 0.608696rem;
          color: #888888;

          > span {
            color: #e51c23;
          }
        }
      }

      .btn {
        color: #888;
        font-size: 0.608696rem;
        border: 1px solid #eee;
        border-radius: 0.217391rem;
        width: 3.478261rem;
        height: 1.304348rem;
        line-height: 1.304348rem;
        padding: 0;
      }

      > .closeOrder {
        text-align: right;
        margin-top: 0.26087rem;
      }

      > .checkOrder {
        text-align: right;
        margin-top: 0.26087rem;

        > span:nth-child(2) {
          color: white;
          background-color: #00a0e9;
          border: none;
        }
      }
    }
  }
}

.bottom-line {
  margin-top: 5rem;
  padding-bottom: 0.85rem;
  span:nth-child(1),
  span:nth-child(3) {
    width: 2.13rem;
    height: 1px;
    background: #e7eaed;
    margin: 0 0.6rem;
  }
  span:nth-child(2) {
    font-size: 0.51rem;
    color: #999;
  }
}
</style>
