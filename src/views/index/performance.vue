<template>
  <div id="rebate">
    <div class="box" style="display: none;">
      <div class="directly" @click="aud(1)" :class="{'active':audit}">我的业绩1</div>
      <div class="undirectly" @click="aud(2)" :class="{'active':!audit}">团队业绩</div>
    </div>

    <div class="stati" v-for="(item,index) in rebatedata" :key="index">
      <div class="statiTop">
        <div class="statiTime">
          考核时间:
          <span>{{item.dateTime.substring(0,7)}}</span>
        </div>
        <!-- <div class="statiTopRight">
          <div class="directly" @click="aud(3)" :class="{'active':month}">月</div>
          <div class="undirectly" @click="aud(4)" :class="{'active':!month}">季</div>
        </div>-->
      </div>
      <div class="statiCenter">
        <div class="statiCenterTop">
          <div class="a" @click="gopage(1,item.dateTime)">
            <div>{{item.teamDiffMonthCount||'0'}}</div>
            <div>团队销量奖月度</div>
          </div>
          <div class="a b" @click="gopage(2,item.dateTime)">
            <div>{{ item.teamDiffQuarterCount||'0'}}</div>
            <div>团队销量奖季度</div>
          </div>
        </div>
        <div class="statiCenterTop" v-if="rebatetype==1">
          <div class="a" @click="gopage(3,item.dateTime)">
            <div>{{item.platformDiffMonthCount||'0'}}</div>
            <div>平台月度奖</div>
          </div>
          <div class="a b" @click="gopage(4,item.dateTime)">
            <div>{{item.platformDiffQuarteCount||'0'}}</div>
            <div>平台季度奖</div>
          </div>
        </div>
        <div class="statiCenterTop" v-else>
          <div class="a" @click="gopage(3,item.dateTime)">
            <div>{{ item.platformDiffMonthCount||'0'}}</div>
            <div>平台月度奖</div>
          </div>
          <div class="a b" @click="gopage(4,item.dateTime)">
            <div>{{item.platformDiffQuarteCount||'0'}}</div>
            <div>平台季度奖</div>
          </div>
        </div>
      </div>
      <div class="statiBottom">
        本月应收
        <span>￥{{item.money||'0'}}</span>
      </div>
    </div>
    <p v-if="is_load"
      style="font-size:0.608rem;color:#E9423A;text-align:center;margin-top:0.5rem;"
      @click="MoreMonth()"
    >查看近三月</p>
    <!--
    <div class="detail" @click="lookdetail">查看明细</div>-->
  </div>
</template>

<script>
import { getStore } from "../../config/mUtils";
export default {
  data() {
    return {
      audit: true,
      month:1,
      rebatetype: 1,
      mothtype: 1,
      rebatedata: [],
      isshowtarget: true,
      agentid:0,
      is_load:true,
      now:''
    };
  },
  components: {},
  methods: {
    lookdetail() {
      this.$router.push({
        path: "/performanceOrder",
        query: { rebatetype: this.rebatetype }
      });
    },

    gopage(type,date) {
      this.$router.push({
        path: "/performanceBill",
        query: { id: this.agentid, type: type,selectDate:date }
      });
    },
    MoreMonth() {
      this.month = 2;
      this.getrebate();
    },
    aud(obj) {

    },
    getDate(){

       var myDate = new Date();

        //获取当前年
       var year = myDate.getFullYear();

       //获取当前月
       var month = myDate.getMonth() + 1;

        //获取当前日
        var date = myDate.getDate();
        var h = myDate.getHours(); //获取当前小时数(0-23)
        var m = myDate.getMinutes(); //获取当前分钟数(0-59)
        var s = myDate.getSeconds();

       //获取当前时间

       this.now = year + '-' + month;
    },
    getrebate(e) {

      if(this.rebatedata.length >= 3){
          return false;
      }

      this.$axios
        //personage.achievement.list
        .get("app.achievement.list", {
          params: {
            agentid: this.agentid,
            month:this.month
          }
        })
        .then(p => {

          console.log( JSON.stringify(p));

          if(p.data.Data == null){

             this.rebatedata.push({
                 teamDiffMonthCount:0,
                 teamDiffQuarterCount:0,
                 platformDiffMonthCount:0,
                 platformDiffQuarteCount:0,
                 money:0,
                 dateTime:this.now
             });
             return false;
          }

          if (p.data.Code == 100) {
            if(this.rebatedata.length < 3){
                this.rebatedata = this.rebatedata.concat(p.data.Data.Data);

                if(this.rebatedata.length >= 3){
                    this.is_load = false;
                }
            }
          }
        });
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.agentid = this.$route.query.agentid;
    this.getDate();
    this.getrebate();
  }
};
</script>

<style lang="scss" scoped>
#rebate {
  padding-top: 1rem;
}
.box {
  width: 12.695rem;
  height: 1.304rem;
  margin: 0 auto 1rem;

  color: #e9423a;
  display: flex;
  border: solid 0.05rem #e9423a;
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
  background-color: #e9423a;
  color: white;
}

.stati {
  width: 13.043rem;
  background-color: #fff;
  margin: 0.5rem auto;
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
        color: #e9423a;
        font-weight: bold;
      }
    }
    .statiTopRight {
      width: 2.82608rem;
      height: 0.86956rem;
      color: #e9423a;
      display: flex;
      border: solid 0.05rem #e9423a;
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
        border-radius: 0.2rem;
      }
      .directly {
        left: -0.05rem;
      }
      .undirectly {
        right: -0.05rem;
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
          color: #e9423a;
        }
      }
      .b {
        border-left: solid 0.05rem #f3f3f3;
      }
    }
  }
}
.statiBottom {
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-top: 0.02rem solid #f3f3f3;
  font-size: 0.68rem;
  color: #9d9d9d;
  span {
    color: #e9423a;
    font-weight: bold;
  }
}

.detail {
  width: 100%;
  height: 1.913043rem;
  color: #fff;
  background-color: #e9423a;
  text-align: center;
  line-height: 1.913043rem;
  position: absolute;
  bottom: 0;
  font-size: 0.782608rem;
}
</style>
