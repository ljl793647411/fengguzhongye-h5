<template>
  <div
    v-infinite-scroll="GetDataList(0)"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <div class="box" v-for="(item,index) in Distribution.Distributions" :key="index">
      <div class="boxTop">
        <span>单号：{{item.ordernum}}</span>
        <span>下单客户：{{item.agentname}}</span>
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
    <div class="total">
      <span>本月累计</span>
      <span>￥{{Distribution.sumprice}}</span>
    </div>
    <p class="footer" @click="GetDataList(1)">查看近三月</p>
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
      pageindex: 1,
      pagesize: 10,
      loading: false
    };
  },
  methods: {
    /*GetDataList(tre)
    {
      this.$axios
      .get("app.get.fenxiao",{
        params:{
          agentid:this.userinfo.id,
          pageinde:1,
          pagesize:10,
          tree:tre
        }
      })
      .then(p=>{
        this.Distribution=p.data.Data.Result;
      })

    },*/
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
          console.log(p);
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
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
  }
};
</script>

<style lang="scss" scoped>
.box {
  font-size: 0.608rem;
  background-color: white;
  padding: 0.5rem;
  .boxTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    line-height: 1rem;
  }
  .boxBottom {
    border-top: 1px solid #eeeeee;
    padding-top: 0.5rem;
    > .boxBB {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span:nth-child(1) {
        color: #888888;
      }
      > span:nth-child(2) {
        font-size: 0.8rem;

        color: red;
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
    color: red;
    font-size: 0.8rem;
  }
}
.footer {
  text-align: center;
  color: red;
  font-size: 0.521rem;
  margin-top: 0.5rem;
}
</style>