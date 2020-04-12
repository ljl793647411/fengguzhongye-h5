<template>
  <div >
    <div class="info">
      <div class="infoLeft">
        <img class="b" style :src="userinfo.avatar" />
        <div>
          <p>
            {{userinfo.agentname}}
            <span>{{userinfo.level_name}}</span>
          </p>
          <p>联系电话：{{userinfo.telphone}}</p>
        </div>
      </div>
      <div class="infoRight" @click="goPage('/applyWithdrawDeposit')">立即提现</div>
    </div>
    <div class="statistics">
      <div>
        <p>余额</p>
        <p style="color:#0081ff;padding-right: 1rem;">￥{{datainfo.yeprice}}</p>
      </div>
       <div>
        <p>待审核</p>
        <p style="color:rgb(94, 172, 231);padding-right: 1rem;">￥{{datainfo.spprice}}</p>
      </div>
      <div>
        <p>已提现</p>
        <p style="color:rgb(94, 172, 231);padding-right: 1rem;">￥{{datainfo.txprice}}</p>
      </div>
      <div>
        <p>总返利</p>
        <p style="color:#FF8A18;">￥{{datainfo.sumprice}}</p>
      </div>
    </div>

    <div class="top-tab flexAround">
      <span
        v-for="(item,index) in tabList"
        :key="index"
        @click="tab(item.id)"
        :class="{active:tabIndex==index+1}"
      >{{item.name}}</span>
    </div>

    <div
      v-infinite-scroll="GetDataList"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      v-if="state==1"
    >
      <div class="box" v-for="(item,index) in Distribution.Distributions" :key="index">
        <div class="boxTop">
          <span>单号：{{item.ordernum}}</span>
          <span>下单客户：{{item.agentname==""?"普通会员":item.agentname}}</span>
        </div>
        <div class="boxBottom">
          <div v-for="(items,index) in item.proname" :key="index">
            <div>{{items.proname}}</div>
          </div>
          <div class="boxBB">
            <span>{{item.create_date}}</span>
            <span>+{{item.rebateamount}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="total">
      <span>本月累计</span>
      <span>￥{{Distribution.sumprice}}</span>
      </div>-->
      <p class="footer" @click="GetDataList(1)">查看近三月</p>
    </div>


    <div v-if="state==2" v-infinite-scroll="gettxrecord()" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="box" v-for="(item,index) in txrecord" :key="index">
        <div class="boxBottom" style="padding-top:0;">
          <div>
            <div>余额提现</div>
          </div>
          <div class="boxBB">
            <span>{{item.create_date}}</span>
            <span>-{{item.fx_price}}</span>
          </div>
        </div>
      </div>

      <p class="footer" @click="gettxrecord(1)">查看近三月</p>
    </div>
  </div>
</template>

<script>
import { getStore } from "../../config/mUtils";
import { Navbar, TabItem, Toast, MessageBox, InfiniteScroll } from "mint-ui";
import headTop from "src/components/header/newHead";
export default {
  data() {
    return {
      userinfo: {},
      Distribution: {},
      txrecord:[],
      datainfo: {},
      state:1,
      pageindex: 1,
      pageindexs:1,
      pagesize: 10,
      loading: false,
      tabIndex: 0,
      tabList: [
        {
          id: "1",
          name: "返佣"
        },
        {
          id: "2",
          name: "提现"
        }
      ]
    };
  },
  methods: {
    goPage(url) {
      this.$router.push({
        query: {
          yeprice: this.datainfo.yeprice
        },
        path: url
      });
    },
    tab(index) {
      this.tabIndex = index;
      if(index==1)
      {
        this.state=1;
      }
      else
      {
        this.state=2;
      }
    },
    GetDataList(tre) {
      this.$axios
        .get("app.get.fenxiao", {
          params: {
            agentid: this.userinfo.id,
            pageinde: this.pageindex,
            pagesize: this.pagesize,
            tree: tre
          }
        })
        .then(p => {
          if (p.data.Data) {
            if (p.data.Data.Result != null) {
              this.bottomLine = false;
            } else {
              this.bottomLine = true;
            }
            if (this.pageindex <= p.data.Data.Result.Distributions.length) {
              this.pageindex++;
              if (window.name == "") {
                this.Distribution = p.data.Data.Result;
              } else {
                this.Distribution.Distributions = this.Distribution.Distributions.concat(
                  p.data.Data.Result.Distributions
                );
              }
              this.loading = false; //可以加载
            } else {
              this.loading = false; //不可以加载
              Toast({
                message: "没有数据啦",
                duration: 1500
              });
            }
          }
        });
    },
    //获取返佣总金额：提现金额
    getprice() {
      this.$axios
        .get("app.get.countprice", {
          params: {
            agentid: this.userinfo.id
          }
        })
        .then(p => {
          this.datainfo.sumprice = p.data.Data.Result.sumprice;
          this.datainfo.txprice = p.data.Data.Result.txprice;
            this.datainfo.spprice = p.data.Data.Result.spprice;
          this.datainfo.yeprice =
            this.datainfo.sumprice - this.datainfo.txprice;
        });
    },
    //获取提现记录
    gettxrecord(obj) {
      this.$axios
        .get("app.get.txrebate", {
          params: {
            agentid: this.userinfo.id,
            pageindex: this.pageindexs,
            pagesize: this.pagesize,
            state:obj
          }
        })
        .then(p => {
          if (p.data.Data) {
            if (p.data.Data.Count != 0) {
              this.bottomLine = false;
            } else {
              this.bottomLine = true;
            }
            if (this.pageindexs <= p.data.Data.Count) {
              this.pageindexs++;
                this.txrecord = this.txrecord.concat(
                  p.data.Data.Data
                );
              this.loading = false; //可以加载
            } else {
              this.loading = false; //不可以加载
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
    this.getprice();
  }
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  // height: 2.608695rem;
  padding: 1rem 0;
  img {
    width: 1.73913rem;
    height: 1.73913rem;
    border-radius: 50%;
    margin: 0 0.5rem;
  }
  .infoLeft {
    display: flex;

    > div {
      > p:nth-child(1) {
        font-size: 0.608rem;
        > span {
          display: inline-block;
          width: 2.260869rem;
          height: 0.869565rem;
          line-height: 0.869565rem;
          border: solid 0.05rem #0081ff;
          border-radius: 0.1rem;
          text-align: center;
          color: #0081ff;
          font-size: 0.521739rem;
        }
      }
      > p:nth-child(2) {
        font-size: 0.521739rem;
      }
    }
  }
  .infoRight {
    font-size: 0.608rem;
    padding: 0.2rem 0.3rem;
    background-color: #0081ff;
    color: white;
    border-radius: 5px;
    margin-right: 0.5rem;
  }
  .b {
    width: 1.739rem;
    height: 1.739rem;
    border-radius: 50%;
    text-align: center;
    line-height: 1.739rem;
    background-color: #cccccc;
    background-size: 100% 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    font-size: 0.608rem;
    margin: 0 0.5rem 0 1rem;
  }
}
.statistics {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 0;
  border-top: #eeeeee solid 1px;
  background-color: white;
  > div {
    border-right: #eeeeee solid 1px;

    > p:nth-child(1) {
      color: #6f6f6f;
      font-size: 0.521rem;
    }
    > p:nth-child(2) {
      color: #6f6f6f;
      font-size: 0.7rem;
      margin-top: 0.2rem;
    }
  }
  > div:nth-last-child(1) {
    border: none;
  }
}
.top-tab {
  background: white;
  border-bottom: 1px solid #e7eaed;
  margin-top: 0.5rem;
  span {
    font-size: 0.51rem;
    color: #666666;
    line-height: 1.96rem;
    height: 1.96rem;
    text-align: center;
  }
}
.active {
  border-bottom: 2px solid #0081ff;
  color: #0081ff !important;
}
.box {
  font-size: 0.608rem;
  background-color: white;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  .boxTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #eeeeee;
  }
  .boxBottom {
    padding-top: 0.5rem;
    font-size: 0.8rem;
    > .boxBB {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span:nth-child(1) {
        color: #888888;
        font-size: 0.521rem;
      }
      > span:nth-child(2) {
        font-size: 0.8rem;

        color: #0081ff;
      }
    }
  }
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: white;
  > span:nth-child(1) {
    color: #888888;
    font-size: 0.521rem;
  }
  > span:nth-child(2) {
    color: #0081ff;
    font-size: 0.8rem;
  }
}
.footer {
  text-align: center;
  color: #0081ff;
  font-size: 0.521rem;
  margin-top: 0.5rem;
}
</style>