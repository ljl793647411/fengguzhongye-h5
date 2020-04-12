<template>
  <div id="authManage">
    <div class="box">
      <div class="wait" @click="aud(1)" :class="{'active':audit}">待审核</div>
      <div class="through" @click="aud(2)" :class="{'active':!audit}">已审核</div>
    </div>
    <div
      class="waitItem"
      v-for="(item,index) in data"
      :key="index"
      v-infinite-scroll="recommendAgent"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div
        class="waitItemLeft"
        :style="{backgroundImage: 'url(' + item.avatar||'https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg'+ ')'}"
      ></div>
      <div class="waitItemRight">
        <div class="rightList">
          <div>
            <span>授权名称:{{item.agentname}}</span>
          </div>
          <div class="suc" v-if="item.verifystate==1" @click="verifystateAgent(index,2)">申请通过</div>
          <div class="suc" v-else>授权申请</div>
        </div>
        <div class="rightList">
          <div>
            <span>手机:{{item.telphone}}</span>
          </div>
        </div>
        <div class="rightList">
          <div>
            <span>级别:{{levelMsg(item.levelid)}}</span>
          </div>
          <div class="err" v-if="item.verifystate==1" @click="verifystateAgent(index,3)">申请驳回</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getStore } from "../../config/mUtils";
import { Toast,InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {
      data: [],
      userInfo: {},
      audit: true,
      audBool: 0,
      baseImg: require("../../images/activity.png")
    };
  },
  components: {},
  methods: {
    recommendAgent(obj) {
      var _this = this;
      this.$axios
        .get("recommend.agent", {
          params: {
            verifystate: obj,
            superior: _this.userInfo.id
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            this.data = p.data.Data;
          }
          console.log(p);
        });
    },
    aud(obj) {
      this.audBool = obj;
      if (obj == 1) {
        if ((this.audit = true)) {
        } else {
          this.audit = !this.audit;
        }
      } else if (obj == 2) {
        if ((this.audit = true)) {
          this.audit = !this.audit;
        } else {
        }
      }
      this.recommendAgent(obj);
    },
    //审核
    verifystateAgent(i, v) {
      var _this = this;
      var aId = this.data[i].id;
      this.$axios
        .post("verifystate.agent", {
          verifystate: v,
          id: aId
        })
        .then(p => {
          if (p.data.Code == 100) {
            if (p.data.Data > 0) {
              Toast({
                message: p.data.Msg,
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
            } else {
              Toast({
                message: p.data.Msg,
                iconClass: "iconfont icon-cuo",
                duration: 1800
              });
            }
          }
          this.recommendAgent(1);
        });
    },
    levelMsg(e) {
      switch (e) {
          case "1":
            _this.level = "联创";
            return;
          case "2":
            _this.level = "合伙人";
            return;
          case "3":
            _this.level = "董事";
            return;
          case "4":
            _this.level = "总代";
            return;
          case "5":
            _this.level = "VIP";
            return;
          case "6":
            _this.level = "零售";
            return;
        }
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.recommendAgent(1);
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";

.box {
  width: 100%;
  height: 1.913rem;
  line-height: 1.913rem;
  background-color: #fff;
  color: rgb(136, 136, 136);
  display: flex;
  font-size: 0.782rem;
  text-align: center;
  .wait,
  .through {
    width: 50%;
  }
}
.active {
  color: rgb(210, 155, 72);
  border-bottom: rgb(210, 155, 72) 0.1rem solid;
}

.waitItem {
  margin: 0.3rem 0;
  background-color: #fff;
  height: 5.434rem;
  display: flex;
  align-items: center;
  .waitItemLeft {
    width: 3.043rem;
    height: 3.043rem;
    border-radius: 50%;
    margin-left: 1rem;
    background-size: 100% 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
  .waitItemRight {
    width: 11.2608rem;
    height: 3.304rem;
    margin-left: 1rem;
    .rightList {
      display: flex;
      justify-content: space-between;
      font-size: 0.608rem;
      height: 33.3%;
      padding-right: 0.5rem;

      .suc,
      .err {
        font-size: 0.478rem;
        width: 2.434rem;
        height: 1rem;
        line-height: 1rem;
        border: 0.05rem solid rgba(210, 155, 72, 1);
        border-radius: 0.2rem;
        text-align: center;
      }
      .suc {
        background-color: rgba(210, 155, 72, 1);
        color: #fff;
      }
      .err {
        color: rgba(210, 155, 72, 1);
      }
    }
  }
}
</style>



