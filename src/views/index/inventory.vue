<template>
  <div id="inventory">
    <div class="box">
      <div class="directly" @click="aud(audit=1)" :class="audit==1?'active':''" >我的库存</div>
      <div class="undirectly" @click="aud(audit=3)" :class="audit==3?'active':''">升级库存</div>
      <div class="undirectly" @click="aud(audit=2)" :class="audit==2?'active':''">下级库存</div>
    </div>

    <div class="per">
      <div class="perLeft">{{a}}</div>
      <div class="perRight" @click="goPage('/stockOrders?tabIndex=0&agentype='+agentype)">{{b}}</div>
       <div class="perRight" v-if="stateshow" @click="goPage('/orderIndexth')">{{c}}</div>
    </div>

    <!-- 我的库存 -->
    <div v-for="(item,index) in datalist" :key="'data'+index">
      <div class="main flex" v-if="audit==1" @click="goPage('/overstock',item.id)">
        <div class="flexCenter">
          <img :src="item.proimg" alt />
        </div>
        <div class="flexGrow">
          <div>{{item.proname}}</div>
          <div class="a1">
            库存:&emsp;
            <span
              style="color:#E9423A;font-size:0.782608rem;"
            >{{item.stocknum==null?0:item.stocknum}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 下级库存 -->
    <div v-for="(items,index) in nextData" :key="index">
      <div v-if="audit==2" class="teamList" @click="goPage('/agentInventory',items)">
        <div class="teamLisLeft">
          <svg v-if="index<=2" class="a icon iconSvg" aria-hidden="true">
            <use :xlink:href="icon[index]" />
          </svg>
          <span v-else class="a">{{index+1}}</span>

          <div>
            <img class="b" :src="items.avatar" style="width:40px;height:40px;" />
          </div>
          <div class="c">
            <div class="cTop">
              <span>{{items.agentname}}</span>
              <span>{{items.levelname}}</span>
            </div>
            <div class="cBottom">
              <span>授权码：{{items.serialnum}}</span>

              <span>
                库存：
                <span>{{items.totalstock==null?0:items.totalstock}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 升级前代理库存 -->
    <div v-for="(items,index) in superAgentList" :key="index">
      <div v-if="audit==3" class="teamList">
        <div class="teamLisLeft">
          <svg v-if="index<=2" class="a icon iconSvg" aria-hidden="true">
            <use :xlink:href="icon[index]" />
          </svg>
          <span v-else class="a">{{index+1}}</span>

          <div>
            <img class="b" :src="items.avatar" style="width:40px;height:40px;" />
          </div>
          <div class="c">
            <div class="cTop">
              <span>{{items.agentname}}</span>
              <span>{{items.levelname}}</span>
            </div>
            <div class="cBottom">
              <span>授权码：{{items.serialnum}}</span>

              <span>
                库存：
                <span>{{items.stocknum==null?0:items.stocknum}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
   


    <div style="height:4rem;"></div>
    <div class="pick" @click="goPage('/exchange')" v-if="shows">提货</div>
    <div class="recharge" @click="goPage('/recharge?isbuy='+bools+'')"  v-if="shows">充值</div>
  </div>
</template>

<script>
import footGuide from "src/components/footer/footGuide";
import "src/plugins/swiper.min.js";
import "src/style/swiper.min.css";
import { getStore } from "../../config/mUtils";
export default {
  data() {
    return {
      audit: 1,
      bools:false,
      stateshow:true,
      show: false,
      shows:true,
      SupAgent:false,
      userinfo: {},
      superAgentList:[],
      datalist: [],
      nextData: [],
      a: "我的库存",
      b: "查看充值订单",
      c: "查看提货订单",
      agentype: 1,
      icon: ["#iconxunzhang-", "#iconxunzhang-1", "#iconxunzhang-2"]
    };
  },
  components: {},
  methods: {
    goPage(url, agent) {
      this.$router.push({
        path: url,
        query: {
          agent: JSON.stringify(agent)
        }
      });
    },
    aud(obj) {
      if (obj == 1) {
        this.stateshow=true;
        this.shows=true;
        this.a = "我的库存";
        this.b = "查看充值订单";
        this.c = "查看提货订单";
        this.agentype = 1;
      } else if (obj == 2) {
         this.stateshow=false;
        this.shows=false;
        this.a = "下级库存";
        this.b = "审核充值订单";
         this.c = "查看提货订单";
        this.agentype = 2;
      }
      else if(obj==3)
      {
        
         this.stateshow=false;
        this.shows=false;
      
        this.a = "已升级代理库存";
        this.b = "历史充值订单";
         this.c = "查看提货订单";
           this.agentype = 3;
        // if ((this.audit = true)) {
        //   this.audit = !this.audit;
        // } else {
        // }
      }
    },
    //个人库存
    getinventory() {
      this.$axios
        .get("app.get.agent.proinventory", {
          params: {
            agentid: this.userinfo.id
          }
        })
        .then(p => {
          this.datalist = p.data.Data;
        });
    },
    //下级库存
    getNextLevelInventory() {
      this.$axios
        .get("app.get.agent.inventory", {
          params: {
            agentid: this.userinfo.id,
            pagesize: 999,
            pageindex: 1
          }
        })
        .then(p => {
          if (p.data.Data) {
            this.nextData = p.data.Data.Data;
          }
        });
    },
    //升级前下级库存
    GetEverInventoryList()
    {
       this.$axios
        .get("app.get.EverInventory", {
          params: {
            agentid: this.userinfo.id,
            pagesize: 999,
            pageindex: 1
          }
        })
        .then(p => {
          if (p.data.Data) {
            this.superAgentList = p.data.Data;
           
          }
        });
    },
    isbuy()
    {
        this.$axios
        .get("app.get.IsBuy", {
          params: {
            agentid: getStore("userInfo").id,
            agent_levelid:getStore("userInfo").levelid
          }
        })
        .then(p => {
          this.bools=p.data.Data.Result;
        })
    }
  },
  created() {
    this.userinfo = getStore("userInfo");
    this.isbuy();
    this.getinventory();
    this.getNextLevelInventory();
    this.GetEverInventoryList();
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";

.iconSvg {
  font-size: 1rem;
}
#inventory{
  padding-top: 1rem;
}
.box {
  width: 12.695rem;
  height: 1.304rem;
  margin: 0 auto 1rem;
  color: #E9423A;
  display: flex;
  border: solid 0.05rem #E9423A;
  font-size: 0.608rem;
  border-radius: 0.2rem;
  .directly,
  .undirectly {
    width: 50%;
    height: 1.304rem;
    text-align: center;
    line-height: 1.304rem;
    position: relative;
    top: -0.05rem;
    border-radius: 0.2rem;
  }
}
.active {
  background-color: #E9423A;
  color: white;
}

.per {
  padding: 0 0.5rem;
  margin-top: 1rem;
  height: 1.304rem;
  border-left: 0.5rem solid #E9423A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .perLeft {
    font-size: 0.695rem;
  }
  .perRight {
    padding: 0.1rem 0.3rem;
    text-align: center;
    font-size: 0.608rem;
    color: #E9423A;
    border: solid 0.05rem #E9423A;
    border-radius: 0.1rem;
  }
}

.recharge,
.pick {
  width: 100%;
  height: 1.913043rem;
  line-height: 1.913043rem;
  text-align: center;
  color: white;
  position: fixed;
  bottom: 0;
  font-size: 0.782608rem;
}
.pick {
  background-color: #E9423A;
  position: fixed;
  bottom: 2rem;
}
.recharge {
  background-color: #FF9800;
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
      text-align: right;
    }
    > div {
      span {
        display: inline-block;
        font-weight: bold;
      }
    }
  }
}

.teamList {
  height: 3.478rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 0.608rem;
  border-top: 1px solid #eeeeee;
  .teamLisLeft {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    .a {
      color: #9d9d9d;
      display: inline-block;
      width: 1rem;
      text-align: center;
    }
    .a,
    .b,
    .c {
      margin-left: 0.5rem;
    }
    .b {
      width: 1.739rem;
      height: 1.739rem;
      border-radius: 50%;
      text-align: center;
      line-height: 1.739rem;
      background-color: #cccccc;
    }
    .c {
      flex-grow: 1;
    }
    .cTop span:nth-child(2) {
      display: inline-block;
      width: 2.2608rem;
      height: 0.869rem;
      font-size: 0.521rem;
      color: #E9423A;
      border: solid 0.05rem #E9423A;
      border-radius: 0.1rem;
      text-align: center;
    }
    .cBottom {
      font-size: 0.608rem;
      display: flex;
      justify-content: space-between;
      color: #888888;
      > span:nth-child(2) {
        margin-right: 0.5rem;

        > span {
          color: #E9423A;
          font-weight: bold;
        }
      }
    }
  }
}
.inventoryTotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.68rem;
  padding: 0.5rem;
  background-color: white;
  border-top: 1px solid #eeeeee;
  > span:nth-child(1) {
    color: #9d9d9d;
  }
  > span:nth-child(2) {
    color: #E9423A;
    font-weight: bold;
  }
}
</style>



