<template>
  <div>
    <div class="headTop">
      <span class="head_goback iconfont iconiconfontjiantou1" @click="$router.go(-1)"></span>
    </div>
    <div>
      <div class="top-tab flexAround">
        <span
          v-for="(item,index) in tabList"
          :key="index"
          @click="tab(index)"
          :class="{active:tabIndex==index}"
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
              <div>
                <p>{{item.create_date}}</p>
              </div>
              <div v-if="item.f_logistics==5 ">已关闭</div>
              <div v-if="item.f_examine==1&&item.f_logistics!=5" >待审核</div>
              <div v-else-if="item.f_examine==2&&item.f_logistics!=5" >审核通过</div>
              <div v-else-if="item.f_examine==3&&item.f_logistics!=5" >审核不通过</div>
            </div>
            <div
              @click="godetail(item.id)"
              class="main flex"
              v-for="(gift,g_index) in item.prolist"
              :key="g_index"
            >
              <div class="flexCenter">
                <img :src="gift.proimg" alt />
              </div>

              <div class="intur">
                <div class="inturLeft">{{gift.proname}}</div>
                <div class="inturRight">
                  <div>￥{{gift.proprice}}</div>
                  <div>x{{gift.pronum}}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <div class="a">
                <div>
                  <span>单号：{{item.ordernum}}</span>
                </div>
                <div>
                  总金额：
                  <span style="color:red;">￥{{item.totalmoney}}</span>
                </div>
              </div>
              <div class="c">
                <div>
                  <span>申请人：{{item.fromagentname}}</span>
                </div>
                <div v-if="islower">
                  <span @click="submitexmain(item.id,3)">不通过</span>
                  <span @click="submitexmain(item.id,2)">审核通过</span>
                </div>
                <div v-if="item.f_examine==1&&item.f_logistics!=5&&agentype!=2 && agentype!=3">
                  <span @click="cancel(item.id)">关闭订单</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Toast, MessageBox, InfiniteScroll } from "mint-ui";
import { getStore } from "../../config/mUtils";

export default {
  name: "orderIndex",
  data() {
    return {
      userinfo: {},
      orderlist: [],
      selected: "0",
      tabIndex: 0,
      tabList: [
        {
          id: "0",
          name: "全部"
        },
        {
          id: "1",
          name: "待审核"
        },
        {
          id: "2",
          name: "审核通过"
        },
        {
          id: "3",
          name: "审核不通过"
        }
      ],
      itemList: [],
      bottomLine: false,
      pageindex: 1,
      loading: false,
      islower: false,
      agentype: 1
    };
  },
  computed: {},
  components: {
  },
  methods: {
    tab(index) {
      this.tabIndex = index;
      this.orderlist = [];
      this.pageindex = 1;
      this.getorderlist();
    },
    getorderlist() {
      var sysuid = 0;
      var agentid = 0;
      if (this.agentype == 2 && this.userinfo.usertype == 2) {
        agentid = 0;
        sysuid = this.userinfo.id;
      } else {
        agentid = this.userinfo.id;
        sysuid = this.userinfo.create_userid;
      }
      this.$axios
        .get("app.get.order.pagelist", {
          params: {
            agentid: agentid,
            sysuid: sysuid,
            agentype: this.agentype,
            ordertype: 1,
            examine: this.tabIndex,
            pageindex: this.pageindex,
            pagesize: 5,
            agtate:1
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
            } else {
              Toast({
                message: "没有数据啦",
                duration: 1500
              });
            }
          }
        });
    },
    godetail(id) {
      this.$router.push({
        path: "/stockOrdersDetail",
        query: { id: id, agentype: this.agentype }
      });
    },
    cancel(id) {
      var _this = this;
      MessageBox.confirm("确定取消该订单吗？").then(res => {
        if (res == "confirm") {
          _this.$axios.post("app.cancel.order", { id: id }).then(p => {
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
    submitexmain(id, f_examine) {
      var _this = this;
      var msg = "";
      if (f_examine == 2) {
        msg = "亲，确定审核通过吗？";
      } else if (f_examine == 3) {
        msg = "亲，确定审核不通过吗？";
      }
      MessageBox.confirm(msg).then(res => {
        if (res == "confirm") {
          _this.$axios
            .post("app.examine.cloudorder", { id: id, f_examine: f_examine })
            .then(p => {
              if (p.data.Code == 100) {
                Toast({
                  message: "操作成功",
                  iconClass: "iconfont icon-dui",
                  duration: 1500
                });
                _this.orderlist = [];
                _this.pageindex = 1;
                _this.getorderlist();
              } else if (p.data.Code == 114) {
                Toast({
                  message: "库存不足",
                  iconClass: "iconfont icon-cuo",
                  duration: 1500
                });
              } else {
                Toast({
                  message: "操作失败",
                  iconClass: "iconfont icon-cuo",
                  duration: 1500
                });
              }
            });
        }
      });
    },
    gourl() {
      if (this.agentype == 1) {
        this.$router.push({ path: "/inventory" });
      } else {
        this.$router.push({ path: "/sysIndex" });
      }
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    this.agentype = this.$route.query.agentype;
    this.tabIndex = this.$route.query.tabIndex;
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.intur {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.608rem;
  .inturleft {
    width: 60%;
  }
  .inturRight {
    width: 40%;
    text-align: right;

    > div:nth-child(1) {
      color: #e51c23;
    }
  }
}
.a {
  display: flex;
  justify-content: space-between;
  font-size: 0.608rem;
  color: #bbbbbb;
  padding-bottom: 0.5rem;
}

.top-tab {
  background: white;
  border-bottom: 1px solid #e7eaed;
  span {
    font-size: 0.51rem;
    color: #666666;
    line-height: 1.96rem;
    height: 1.96rem;
    width: 25%;
    text-align: center;
  }
}

.active {
  border-bottom: 2px solid #E9423A;
  color: #E9423A !important;
}
.aggregate {
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: #666666;
  padding: 0.3rem 0.5rem;
  font-size: 0.608696rem;

  > span:nth-child(2) {
    color: #E9423A;
  }
}

.itemList {
  > a {
    display: block;
    color: black;
    background-color: white;
    margin-bottom: 0.5rem;

    .head {
      padding: 0.26087rem 0.652174rem;

      > div {
        font-size: 0.521739rem;
        color: #888888;
      }

      > div:nth-child(2) {
        text-align: center;
        color: #E9423A;
        // width: 3.478261rem;
        // height: 1.304348rem;
        // line-height: 1.304348rem;
      }
    }

    .main {
      border-top: 1px solid #eee;
      // border-bottom: 1px solid #eee;
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
      border-top: 1px solid #eee;
      .b {
        text-align: right;
        span {
          display: inline-block;
          width: 3.47826rem;
          height: 1.304347rem;
          line-height: 1.304347rem;
          border-radius: 0.1rem;
          text-align: center;
          color: #888888;
          font-size: 0.608695rem;
          border: 0.05rem solid #888888;
        }
      }
      .c {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.608695rem;

        > div:nth-child(1) {
          color: #E9423A;
        }
        > div:nth-child(2) {
          span {
            display: inline-block;
            // height: 1.304347rem;
            // line-height: 1.304347rem;
            padding: 0.1rem;
            text-align: center;
          }
          > span:nth-child(1) {
            // width: 2.608695rem;
            border: solid 0.05rem #888888;
            border-radius: 0.1rem;
            color: #888888;
          }
          > span:nth-child(2) {
            // width: 3.47826rem;
            border-radius: 0.1rem;
            background-color: #E9423A;
            border: solid 0.05rem #E9423A;
            color: white;
          }
        }
      }
    }
  }
}
</style>
