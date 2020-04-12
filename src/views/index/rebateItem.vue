<template>
  <div id="rebateItem" 
   v-infinite-scroll="getorderlist"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <div infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="itemList" v-for="(item,index) in orderlist" :key="index">
        <a>
          <div class="head flexBetween">
            <div>
              <p>单号：{{item.ordernum}}</p>
              <p>{{item.create_date}}</p>
            </div>
            <div>{{item.state==1?"未发放":"已发放"}}</div>
            <!-- <div >已发放</div> -->
          </div>
          <div class="main flex" v-for="(items,indexs) in item.prolist" :key="indexs">
            <div class="flexCenter">
              <img :src="items.proimg" alt />
            </div>

            <div class="intur">
              <div class="inturLeft">{{items.proname}}</div>
              <div class="inturRight">
                <div>￥{{items.proprice==0?items.vipprice:items.proprice}}</div>
                <div>x{{items.pronum}}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="a">
              <div>
                <span v-if="recommend==1">上推返利</span>
                <span v-else-if="recommend==2">直推返利</span>
                <span v-else-if="recommend==3">间推返利</span>
                <span v-else-if="recommend==4">直推复购</span>
              </div>
              <div>
                返利金额：
                <span style="color:red;">￥{{item.rebateamount}}</span>
              </div>
            </div>

            <div class="b">
              <div>
                <span v-if="state==1">支付方：{{item.sendagentname}}</span>
                <span v-if="state==2">收款方：{{item.reciveagentname}}</span>
                
              </div>
               <div class="bRight" @click="godetail(item.id)">返利详情</div>
            </div>
          </div>
        </a>
      </div>
    </div>
      <!--<div class="total">
        <span>本月返利总计</span>
        <span>￥8000</span>
      </div>-->
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
      recommend:0,
      state:0,
      orderlist: [],
      selected: "0",
      tabIndex: 0,
      agentype: 1,
      rebatetype: 0,
      totalrebate: 0,
      tabList: [
        {
          id: "0",
          name: "全部"
        },
        {
          id: "1",
          name: "未发放"
        },
        {
          id: "2",
          name: "已发放"
        }
      ],
      itemList: [],
      bottomLine: false,
      pageindex: 1,
      loading: false
    };
  },
  computed: {},
  components: {
    headTop
  },
  methods: {
    godetail(id) {
      this.$router.push({
        path: "/rebateManageDetail",
        query: { id: id, agentype: this.agentype, rebatetype: this.state }
      });
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
        .get("app.get.getrebateType", {
          params: {
            agentid:this.userInfo.id,
            recommend:this.recommend,
            state:this.state,
            pageindex:this.pageindex,
            pagesize:10
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
              this.orderlist =this.orderlist.concat( p.data.Data.Data);
            } else {
              Toast({
                message: "没有数据啦",
                duration: 1500
              });
            }
          }
        });
    },
  },
  created() {
      this.userInfo = getStore("userInfo");
       this.recommend = this.$route.query.recommend;
       this.state=this.$route.query.state;
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#rebateItem{
    padding-top: 0.5rem;
}
.total {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  background-color: white;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  > span:nth-child(1) {
    color: #888888;
  }
  > span:nth-child(2) {
    color: red;
    font-weight: bold;
  }
}
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
  border-bottom: 0.01rem solid #e7eaed;
}
.b {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.608rem;
  color: red;
  padding: 0.5rem 0;
  .bRight {
    width: 3.478261rem;
    height: 1.304348rem;
    line-height: 1.304348rem;
    border: solid 0.05rem red;
    border-radius: 0.1rem;
    text-align: center;
  }
}

.top-tab {
  background: white;
  border-bottom: 1px solid #e7eaed;
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
  border-bottom: 2px solid red;
  color: red !important;
}
.aggregate {
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: #9d9d9d;
  padding: 0.3rem 0.5rem;
  font-size: 0.782608rem;

  > span:nth-child(2) {
    color: red;
    font-weight: bold;
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

        > p:nth-child(1) {
          color: red;
        }
      }

      > div:nth-child(2) {
        border: solid 0.05rem red;
        border-radius: 0.1rem;
        text-align: center;
        color: red;
        width: 3.478261rem;
        height: 1.304348rem;
        line-height: 1.304348rem;
      }
    }

    .main {
      border-top: 1px solid #e7eaed;

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
