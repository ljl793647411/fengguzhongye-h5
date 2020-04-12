<template>
  <div>
    <div>
      <div class="itemList">
        <a>
          <div
            
            class="main flex"
          >
            <div class="flexCenter">
              <img :src=tabdata.proimg style="width:70px;height:60px" alt />
            </div>
            <div class="intur">
              <div class="inturLeft">{{tabdata.proname}}</div>
            </div>
          </div>
          <div>
            <div>
              存量：
              <span>{{tabdata.storages==null?0:tabdata.storages}}</span>
            </div>
            <div>
              提取量：
              <span>{{tabdata.takedelivery==null?0:tabdata.takedelivery}}</span>
            </div>
            <div>
              库存：
              <span style="color:red;">{{tabdata.stocknum==null?0:tabdata.stocknum}}</span>
            </div>
          </div>
        </a>
      </div>
      <div class="top-tab flexAround">
        <span
          v-for="(item,index) in tabList"
          :key="index"
          @click="tab(index)"
          :class="{active:tabIndex==index}"
        >{{item.name}}</span>
      </div>
      <div v-infinite-scroll="getorderlist"
        infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <div class="listItem" v-for="(item,index) in datalist" :key="index">
            <div>
              <p>单号：{{item.ordernum}}</p>
              <p>{{item.create_date}}</p>
            </div>
            <div>{{item.stocktype==1?'+':'-'}}{{item.pronum}}</div>
          </div>
      </div>
      <div v-if="bottomLine" class="bottom-line flexCenter" style="width:auto;height:100px;text-align: center;vertical-align:center">
                <span></span>
                <span>没有更多数据哦</span>
                <span></span>
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
      proid:0,
      agentid:0,
      userinfo: {},
      userid:0,
      selected: "0",
      tabIndex: 0,
      tabList: [
        {
          id: "0",
          name: "全部"
        },
        {
          id: "1",
          name: "存货"
        },
        {
          id: "2",
          name: "提货"
        },
       {
          id: "3",
          name: "下级存货"
        }
      ],
      itemList: [],
      bottomLine: false,
      pageindex: 1,
      datalist:[],
      tabdata:{},
      loading: false
    };
  },
  computed: {},
  components: {
    headTop
  },
  methods: {
    tab(index) {
      this.tabIndex = index;
      this.pageindex = 1;
      this.datalist=[];
      this.getorderlist();
    },
    getorderlist() {
      this.$axios
        .get("app.inventory.list",{
          params:{
            proid:this.proid,
            userid:this.userid,
            stocktype: this.tabIndex,
            pageindex:this.pageindex,
            pagesize:10
          }
        })
        .then(p => {
            if (p.data.Data.Count > 0) {
              this.bottomLine = false;
            } else {
              this.bottomLine = true;
            }
            if (this.pageindex <= p.data.Data.Count) {
              this.loading = false; //可以加载
              this.pageindex++;
              this.datalist = this.datalist.concat(p.data.Data.Data);
            } else {
              //this.loading = true; //不可以加载
              Toast({
                message: "没有数据啦",
                duration: 1500
              });
            }
        });
    },
    
    getdatalist()
    {
      this.$axios
        .get("app.move.inventory",{
          params:{
            proid:this.proid,
            userid:this.userid
          }
        })
        .then(p=>{
          this.tabdata=p.data.Data;
        })
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    if(this.$route.query.tid==null)
    {
       this.userid=this.userinfo.id
    }
    else
    {
      this.userid=this.$route.query.tid
    }
    this.proid=JSON.parse(this.$route.query.agent);
    this.getdatalist();
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
    width: 33.33%;
    text-align: center;
  }
}
.listItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  height: 2.608695rem;
  width: 100%;
  background-color: white;
  border-bottom: 0.01rem solid #eeeeee;
  > div:nth-child(1) {
    > p:nth-child(1) {
      font-size: 0.608695rem;
    }
    > p:nth-child(2) {
      font-size: 0.521739rem;
      color: #888888;
    }
  }
  > div:nth-child(2) {
    color: red;
    font-size: 0.782608rem;
  }
}

.active {
  border-bottom: 2px solid red;
  color: red !important;
}


.itemList {
  > a {
    display: block;
    color: black;
    background-color: white;
    margin-bottom: 0.5rem;

    > div:nth-child(2) {
      font-size: 0.608695rem;
      color: #9d9d9d;
      display: flex;
      text-align: center;
      height: 1.739130rem;
      line-height: 1.739130rem;
      > div {
        width: 33.33%;
        span {
          font-size: 0.782608rem;
          font-weight: bold;
        }
      }
    }

    .main {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
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
        }
      }
    }
  }
}
</style>
