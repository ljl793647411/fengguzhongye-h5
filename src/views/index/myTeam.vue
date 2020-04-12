<template>
  <div
    id="myTeam"
    v-infinite-scroll="getTeamPage"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <div class="box">
      <div v-show="userInfo.levelid!=5" class="directly" @click="aud(audit=1)" :class="audit==1?'active':''">直属</div>
      <div v-show="userInfo.levelid!=5" class="undirectly" @click="aud(audit=2)" :class="audit==2?'active':''">非直属</div>
      <div class="undirectly" @click="aud(audit=3)" :class="audit==3||userInfo.levelid==5?'active':''">推荐代理</div>
    </div>

    <div v-if="audit==3">
      <div class="showMsg">
        <div class="circle">
          <div class="circleList">
            <span class="iconfont icontuandui"></span>
            <span>{{group.count}}</span>
            <span>我的团队</span>
          </div>
          <div class="circleList">
            <span class="iconfont iconjiagou-zhishu"></span>
            <span>{{group.directly}}</span>
            <span>直属</span>
          </div>
          <div class="circleList">
            <span class="iconfont iconjiagou-feizhishu"></span>
            <span>{{group.not_directly}}</span>
            <span>非直属</span>
          </div>
        </div>
        <p>
          本月新增直属:
          <span>{{group.p_directly}}</span>
        </p>
      </div>
      <div class="per" >
        <div class="perLeft">我的团队</div>

      </div>
      <div class="teamList" v-for="(item,index) in data" :key="index">
        <div class="teamLisLeft">
          <svg v-if="index<=2" class="a icon iconSvg" aria-hidden="true">
            <use :xlink:href="icon[index]" />
          </svg>
          <span v-else class="a">{{index+1}}</span>
          <div
            class="b"
            :style="{backgroundImage: 'url(' + (item.avatar ? item.avatar : '') + ')'}"
          >{{item.avatar ? '' : '头像'}}</div>
          <div class="c">
            <div class="cTop">
              <span>{{item.agentname}}</span>
              <span>{{item.levelname}}</span>
            </div>
            <div class="cBottom">授权码：{{item.serialnum}}</div>
          </div>
        </div>
        <div class="teamLisRight">
          <div>
            <div class="d">{{item.performance}}</div>
            <div class="e">{{title}}成员：{{item.team_size}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="showMsg" v-show="audit!=3">
      <div class="circle">
        <div class="circleList">
          <span class="iconfont icontuandui"></span>
          <span>{{group.count}}</span>
          <span>我的团队</span>
        </div>
        <div v-show="userInfo.levelid!=5" class="circleList">
          <span class="iconfont iconjiagou-zhishu"></span>
          <span>{{group.directly}}</span>
          <span>直属</span>
        </div>
        <div v-show="userInfo.levelid!=5" class="circleList">
          <span class="iconfont iconjiagou-feizhishu"></span>
          <span>{{group.not_directly}}</span>
          <span>非直属</span>
        </div>
      </div>
      <p v-if="audit==1">
        本月新增直属:
        <span>{{group.directly}}</span>
      </p>
      <p v-if="audit==2">
        本月新增非直属:
        <span>{{group.not_directly}}</span>
      </p>
    </div>
    <div class="per" v-show="audit!=3">
      <div class="perLeft">{{title}}团队</div>

    </div>
    <div class="teamList" v-show="audit!=3" v-for="(item,index) in data" :key="index">
      <div class="teamLisLeft">
        <svg v-if="index<=2" class="a icon iconSvg" aria-hidden="true">
          <use :xlink:href="icon[index]" />
        </svg>
        <span v-else class="a">{{index+1}}</span>
        <div
          class="b"
          :style="{backgroundImage: 'url(' + (item.avatar ? item.avatar : '') + ')'}"
        >{{item.avatar ? '' : '头像'}}</div>
        <div class="c">
          <div class="cTop">
            <span>{{item.agentname}}</span>
            <span>{{item.levelname}}</span>
          </div>
          <div class="cBottom">授权码：{{item.serialnum}}</div>
        </div>
      </div>
      <div class="teamLisRight">
        <div>
          <div class="d">{{item.performance}}</div>
          <div class="e">{{title}}成员：{{item.team_size}}</div>
        </div>
      </div>
    </div>

    <div class="aggregate" v-show="audit!=3">
      <span>本月直属业绩总计</span>
      <span>{{team_performance}}</span>
    </div>

    <div v-if="bottomLine" class="bottom-line flexCenter">
      <span></span>
      <span>没有更多数据哦</span>
      <span></span>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Toast, MessageBox, InfiniteScroll } from "mint-ui";
import { getStore } from "../../config/mUtils";
export default {
  data() {
    return {
      group: {
        count: 0,
        directly: 0,
        not_directly: 0,
        this_month: 0
      },
      loading: false,
      bottomLine: false,
      data: [],
      title: "直属",
      Count: 0,
      team_performance: 0,
      pageindex: 1,
      pagesize: 5,
      type: 1,
      userInfo: {},
      audit: 1,
      icon: ["#iconxunzhang-", "#iconxunzhang-1", "#iconxunzhang-2"]
    };
  },
  components: {},
  methods: {
    aud(obj) {
    this.type=obj;
    this.pageindex=1;
      this.team_performance = 0;
      this.title = obj == 1 ? "直属" : "非直属";
      this.getTeamPage();
    },
    //团队统计
    getTeamStatistics() {
      var _this = this;
      this.$axios
        .get("team.size.statistics", {
          params: {
            id: _this.userInfo.id
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            this.group = p.data.Data;
          } else {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 1800
            });
          }
        });
    },
    getTeamPage(obj) {
      var _this = this;

      if (this.pageindex == 1) {
        this.data = [];
      }
      this.$axios
        .get("team.page.list", {
          params: {
            type: this.type,
            id: this.userInfo.id,
            pageindex: this.pageindex,
            pagesize: this.pagesize
          }
        })
        .then(p => {

          if (p.data.Code == 100) {

            var dataCount =p.data.Data.pageData.Count;

            if (p.data.Data) {
              if (this.data.length<= dataCount && p.data.Data.pageData.length > 0) {
                this.bottomLine = false;
              } else {
                this.bottomLine = true;
              }

              if (this.data.length<= dataCount && p.data.Data.pageData.Data.length > 0) {
                this.data = this.data.concat(p.data.Data.pageData.Data);
                this.team_performance = p.data.Data.team_performance;

                this.pageindex++;
                this.loading = false; //可以加载
              } else {
                this.loading = false; //不可以加载
                Toast({
                  message: "没有数据啦",
                  duration: 1500
                });
              }
            }
          } else {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 1800
            });
          }
        });
    },
    // getTeam(type) {
    //   this.type = type;
    //   var _this = this;
    //   _this.pageindex = 1;
    //   this.$axios
    //     .get("team.page.list", {
    //       params: {
    //         type: type,
    //         id: _this.userInfo.id,
    //         pageindex: _this.pageindex,
    //         pagesize: _this.pagesize
    //       }
    //     })
    //     .then(p => {
    //       if (p.data.Code == 100) {
    //         this.team_performance = p.data.Data.team_performance;
    //         this.data = p.data.Data.pageData.Data;
    //       }
    //     });
    // },
    levelName(e) {
      switch (e) {
          case "1":
            //_this.level = "联创";
            return "联创";
          case 2:
            //_this.level = "合伙人";
            return "合伙人";
          case "3":
            //_this.level = "董事";
            return "董事";
          case "4":
            //_this.level = "总代";
            return "总代";
          case "5":
            //_this.level = "VIP";
            return "VIP";
          case "6":
            //_this.level = "零售";
            return "零售";
        }
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.getTeamStatistics();
    //this.getTeam(1);
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";

.recommendBox {
  font-size: 0.608rem;
  width: 12.695rem;
  margin: 0 auto 0.5rem;
  display: flex;
  justify-content: space-between;
}
.indirect {
  width: 40%;
  height: 1.304rem;
  text-align: center;
  line-height: 1.304rem;
  position: relative;
  top: -0.05rem;
  background-color: #0081ff;
  color: white;
  border-radius: 5px;
}
.iconSvg {
  font-size: 1rem;
}
#myTeam {
  padding-top: 1rem;
}
.box {
  width: 12.695rem;
  height: 1.304rem;
  margin: 0 auto 0.5rem;
  color: #0081ff;
  display: flex;
  border: solid 0.05rem #0081ff;
  font-size: 0.608rem;
  border-radius: 0.2rem;
  .directly,
  .undirectly {
    width: 100%;
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
  background-color: #0081ff;
  color: white;
}

.showMsg {
  width: 15.217rem;
  height: 6.956rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.2rem;
  font-size: 0.608rem;
  padding: 0.5rem;
  padding-top: 1rem;
  color: #9d9d9d;
  position: relative;

  .circle {
    display: flex;
    justify-content: space-between;

    .circleList {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: 0.1rem solid #0081ff;
      display: flex;
      flex-direction: column;
      align-items: center;
      span:nth-child(1) {
        color: #0081ff;
        font-size: 1.5rem;
        margin-top: 0.3rem;
        position: relative;
        top: -0.2rem;
      }
      span:nth-child(2) {
        color: #0081ff;
        font-size: 0.869rem;
        font-weight: bold;
        position: relative;
        top: -0.4rem;
      }
      span:nth-child(3) {
        font-size: 0.521rem;
        position: relative;
        top: -0.4rem;
      }
    }
  }

  p {
    position: absolute;
    bottom: 0.5rem;
    > span {
      color: #0081ff;
    }
  }
}
.per {
  padding: 0 0.5rem;
  margin-top: 1rem;
  height: 1.304rem;
  border-left: 0.5rem solid #0081ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .perLeft {
    font-size: 0.695rem;
  }
  .perRight {
    width: 3.478rem;
    height: 1rem;
    text-align: center;
    font-size: 0.608rem;
    color: #0081ff;
    border: solid 0.05rem #0081ff;
    border-radius: 0.1rem;
  }
}

.teamList {
  height: 3.478rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 0.608rem;
  margin-top: 0.5rem;
  .teamLisLeft {
    display: flex;
    align-items: center;
    height: 100%;
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
      // background-image: url('../../images/swiper.jpg');
      background-size: 100% 100%;
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
    .cTop span:nth-child(2) {
      display: inline-block;
      width: 2.2608rem;
      height: 0.869rem;
      font-size: 0.521rem;
      color: #0081ff;
      border: solid 0.05rem #0081ff;
      border-radius: 0.1rem;
      text-align: center;
    }
    .cBottom {
      font-size: 0.521rem;
      color: #9d9d9d;
    }
  }

  .teamLisRight {
    display: flex;
    align-items: center;
    padding-right: 0.5rem;
    text-align: right;
    .d {
      font-size: 0.782rem;
      color: #0081ff;
      font-weight: bold;
    }
    .e {
      font-size: 0.521rem;
      color: #9d9d9d;
    }
  }
}

.aggregate {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  border-top: 1px solid rgb(243, 243, 243);
  > span {
    height: 1.7391304rem;
    line-height: 1.7391304rem;
  }
  > span:nth-child(1) {
    color: #9d9d9d;
    font-size: 0.695652rem;
  }
  > span:nth-child(2) {
    color: #0081ff;
    font-size: 0.7826086rem;
    font-weight: bold;
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
