<template>
  <div>
    <div>
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
              <div></div>
            </div>
            <div
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
                  <span style="color:red;">￥{{item.achievementamount}}</span>
                </div>
              </div>
              <div class="c">
                <div v-if="rebatetype==1">
                  <span>充值代理：{{item.orderagentname}}</span>
                  <span style="padding-left: 100px;">充值方向：{{item.sendagentname}}</span>
                </div>
                <div v-if="rebatetype==2">
                  <span>充值代理：{{item.orderagentname}}</span>
                  <span style="padding-left: 100px;">充值方向：{{item.reciveagentname}}</span>
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
import headTop from "src/components/header/newHead";

export default {
  name: "orderIndex",
  data() {
    return {
      userinfo: {},
      orderlist: [],
      selected: "0",
      itemList: [],
      bottomLine: false,
      pageindex: 1,
      loading: false,
      islower: false,
      rebatetype: 1
    };
  },
  computed: {},
  components: {
    headTop
  },
  methods: {
    getorderlist() {
      this.$axios
        .get("app.get.performance.pagelist", {
          params: {
            performancetype: this.rebatetype,
            agentid: this.userinfo.id,
            pageindex: this.pageindex,
            pagesize: 5
          }
        })
        .then(p => {
          console.log(p);
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
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    this.rebatetype = this.$route.query.rebatetype;
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
  border-bottom: 1px dashed #e7eaed;
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
  border-bottom: 2px solid #d29b48;
  color: #d29b48 !important;
}
.aggregate {
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: #666666;
  padding: 0.3rem 0.5rem;
  font-size: 0.608696rem;

  > span:nth-child(2) {
    color: #d29b48;
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
        color: #d29b48;
        width: 3.478261rem;
        height: 1.304348rem;
        line-height: 1.304348rem;
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
          color: #d29b48;
        }
        > div:nth-child(2) {
          span {
            display: inline-block;
            height: 1.304347rem;
            line-height: 1.304347rem;
            text-align: center;
          }
          > span:nth-child(1) {
            width: 2.608695rem;
            border: solid 0.05rem #888888;
            border-radius: 0.1rem;
            color: #888888;
          }
          > span:nth-child(2) {
            width: 3.47826rem;
            border-radius: 0.1rem;
            background-color: #d29b48;
            border: solid 0.05rem #d29b48;
            color: white;
          }
        }
      }
    }
  }
}
</style>
