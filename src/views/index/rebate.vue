<template>
  <div id="rebate">
    <div class="box">
      <div class="directly" @click="aud(1)" :class="{'active':audit}">应收返利</div>
      <div class="undirectly" @click="aud(2)" :class="{'active':!audit}">应付返利</div>
    </div>

    <div class="stati">
      <div class="statiTop">
        <div class="statiTime">
          统计时间:
          <span>{{rebatedata.datetext}}</span>
        </div>
        <div class="statiTopRight">
          <div class="directly" @click="aud(3)" :class="{'active':month}">月</div>
          <div class="undirectly" @click="aud(4)" :class="{'active':!month}">季</div>
        </div>
      </div>
      <div class="statiCenter">
        <div class="statiCenterTop">
          <div class="a" @click="getRebateType(1)">
         <!-- goPage('/rebateItem')-->
            <div>{{rebatedata.uprebate}}</div>
            <div>上推返利</div>
          </div>
          <div class="a b" @click="getRebateType(2)">
            <div>{{rebatedata.directlyrebate}}</div>
            <div>直推返利</div>
          </div>
        </div>
        <div class="statiCenterBottom">
          <div class="a"  @click="getRebateType(3)">
            <div>{{rebatedata.indirectrebate}}</div>
            <div>间推返利</div>
          </div>
          <div class="a b">
            <!-- <div>{{rebatedata.rerevate}}</div>
            <div>直推复购</div> -->
          </div>
        </div>
        <!-- <div class="statiCenterBottom" v-if="userInfo.levelid==1">
          <div class="a">
            <div>{{rebatedata.meibairebate}}</div>
            <div>订单美白奖</div>
          </div>
        </div> -->
      </div>
      <div class="statiBottom">
        {{audit?"本月应收返利总计":"本月应付返利总计"}}
        <span>￥{{rebatedata.sumprice}}</span>
      </div>
    </div>
    <p style="font-size:0.608rem;text-align:center;color:#E9423A;margin-top:0.5rem;" @click="getrebate(1)" >查看近三月</p>

    <div class="detail" @click="lookdetail">查看明细</div>
  </div>
</template>

<script>
import { getStore } from "../../config/mUtils";
export default {
  data() {
    return {
      audit: true,
      month: true,
      rebatetype: 0,
      mothtype: 1,
      rebatedata: {},
      userInfo:{}
    };
  },
  components: {},
  methods: {
    goPage(path) {
      this.$router.push({
        path: path
      });
    },
    lookdetail() {
      this.$router.push({
        path: "/rebateManage",
        query: { rebatetype: this.rebatetype, agentype: 1, tabIndex: 0 }
      });
    },
    aud(obj) {
      if (obj == 1) {
        if ((this.audit = true)) {
          this.rebatetype = 0;
          this.getrebate();
        } else {
          this.audit = !this.audit;
        }
      } else if (obj == 2) {
        if ((this.audit = true)) {
          this.rebatetype = 1;
          this.getrebate();
          this.audit = !this.audit;
        } else {
        }
      }
      //月季
      if (obj == 3) {
        if ((this.month = true)) {
          this.mothtype = 1;
          this.getrebate();
        } else {
          this.month = !this.month;
        }
      } else if (obj == 4) {
        if ((this.month = true)) {
          this.mothtype = 2;
          this.getrebate();
          this.month = !this.month;
        } else {
        }
      }
    },
    getrebate(tre)
    {
     this.$axios
        .get("app.get.rebate",{
          params:{
             agentid:this.userInfo.id,
             rebatetype:this.rebatetype,
             mothtype:this.mothtype,
             tree:tre
          }
        })
        .then(p => {
          this.rebatedata = p.data.Data;
        });
    },
    getRebateType(recommend)
    {
      this.$router.push({
         path: "/rebateItem",
        query: {
          recommend: recommend,
          state:this.rebatetype==0?1:2,
        }
       });
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.getrebate(0);
  }
};
</script>

<style lang="scss" scoped>
#rebate{
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
  }
  .directly {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .undirectly {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
.active {
  background-color: #E9423A;
  color: white;
}

.stati {
  width: 13.043rem;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 0.1rem;
  font-size: 0.608rem;
  color: #9d9d9d;
  .statiTop {
    height: 2rem;
    border-bottom: 0.05rem solid #f3f3f3;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .statiTime {
      margin-left: 0.5rem;
      font-weight: bold;
      span {
        color: #E9423A;
        font-weight: bold;
      }
    }
    .statiTopRight {
      width: 2.82608rem;
      height: 0.86956rem;
      color: #E9423A;
      display: flex;
      border: solid 0.05rem #E9423A;
      font-size: 0.608rem;
      border-radius: 0.2rem;
      margin-right: 0.5rem;

      .directly,
      .undirectly {
        width: 50%;
        height: 0.86956rem;
        text-align: center;
        line-height: 0.86956rem;
        position: relative;
        top: -0.05rem;
      }
      .directly {
        left: -0.05rem;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      .undirectly {
        right: -0.05rem;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
  .statiCenter {
    height: 6rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .statiCenterTop,
    .statiCenterBottom {
      display: flex;
      justify-content: space-around;
      text-align: center;
      .a {
        width: 50%;
        > div {
          font-weight: bold;
        }
        > div:nth-child(1) {
          font-size: 1rem;
          color: #E9423A;
        }
      }
      .b {
        border-left: solid 0.05rem #f3f3f3;
      }
    }
  }
  .statiBottom {
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-top: 0.02rem solid #f3f3f3;
    font-weight: bold;
    span {
      color: #E9423A;
      font-weight: bold;
    }
  }
}

.detail {
  width: 100%;
  height: 1.913043rem;
  color: #fff;
  background-color: #E9423A;
  text-align: center;
  line-height: 1.913043rem;
  position: absolute;
  bottom: 0;
  font-size: 0.782608rem;
}
</style>


