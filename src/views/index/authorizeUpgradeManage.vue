<template>
  <div id="authManage" v-infinite-scroll="recommendAgentPage" infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <div class="box">
      <div class="wait" @click="aud(1)" :class="{'active':audit}">待审核</div>
      <div class="through" @click="aud(2)" :class="{'active':!audit}">已审核</div>
    </div>
    <div class="waitItem" v-for="(item,index) in data" :key="index">
      <div class="waitItemLeft" :style="{backgroundImage: 'url(' + item.avatar||'https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg'+ ')'}"></div>
      <div class="waitItemRight">
        <div class="rightList">
          <div>
            <span>授权名称:{{item.agentname}}</span>
          </div>
          <div class="suc" v-if="item.verifystate==1" @click="verifystateAgent(index,2)">申请通过</div>
          <div class="suc" v-else-if="item.verifystate==2" @click="goPage('/authorization?id='+item.agent_id)">查看授权书</div>
        </div>
        <div class="rightList">
          <div>
            <span>手机:{{item.telphone}}</span>
          </div>
        </div>
        <div class="rightList">
          <div>
            <span>升级级别:{{item.present_level_name}}</span>
          </div>
        </div>
        <div class="rightList">
          <div>
            <span>当前级别:{{item.former_level_name}}</span>
          </div>
        </div>
        <div class="rightList">
          <div>
            <span>审核类型:升级</span>
          </div>
          <div class="err" v-if="item.verifystate==1" @click="verifystateAgent(index,3)">申请驳回</div>
          <div class="err" v-else-if="item.verifystate==3">申请驳回</div>
        </div>
      </div>
    </div>
    <div v-if="bottomLine" class="bottom-line flexCenter">
      <span></span>
      <span>没有更多数据哦</span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import {
    getStore
  } from "../../config/mUtils";
  import {
    Toast,
    InfiniteScroll
  } from "mint-ui";
  export default {
    data() {
      return {
        loading: false,
        data: [],
        userInfo: {},
        audit: true,
        pageindex: 1,
        verifystate: 1,
        bottomLine: false,
        pagesize: 10,
        audBool: 0,
        baseImg: require("../../images/activity.png"),
        agentid: 0
      };
    },
    components: {},
    methods: {
      goPage(url) {
        this.$router.push({
          path: url
        });
      },
      recommendAgentPage(verifystate) {
        var _this = this;
        var user_id = _this.userInfo.usertype == 2 ? _this.userInfo.id : 0;

        this.$axios
          .get("team.authorize.page.list", {
            params: {
              verifystate: _this.verifystate,
              pageindex: this.pageindex,
              pagesize: this.pagesize,
              present_superior: _this.userInfo.id,
              create_userid: this.agentid
            }
          })
          .then(p => {
            if (p.data.Data) {
              if (p.data.Data.length > 0) {
                this.bottomLine = false;
              } else {
                this.bottomLine = true;
              }

              if (this.data.length < p.data.Data.Count) {
                this.loading = false; //可以加载
                this.pageindex++;
                this.data = this.data.concat(p.data.Data.Data);
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
      recommendAgent(obj) {
        this.verifystate = obj;
        var _this = this;
        // var user_id = _this.userInfo.usertype == 2 ? _this.userInfo.id : 0;
        this.$axios
          //team.audit.page.list
          .get("team.authorize.page.list", {
            params: {
              verifystate: this.verifystate,
              pageindex: this.pageindex,
              pagesize: this.pagesize
            }
          })
          .then(p => {
            console.log(p);
            this.item_total = p.data.Data.Count;
            if (this.item_total == 0) {
              this.tableLoading = true;
            } else {
              this.tableLoading = false;
            }
            this.data_list = p.data.Data.Data;
          });
      },
      aud(obj) {
        this.audBool = obj;
        if (obj == 1) {
          this.verifystate = 1;
          this.data.splice(0, this.data.length);
          if ((this.audit = true)) {} else {
            this.audit = !this.audit;
          }
        } else if (obj == 2) {
          this.verifystate = 2;
          this.data.splice(0, this.data.length);
          if ((this.audit = true)) {
            this.audit = !this.audit;
          } else {
            this.verifystate = 2;
            this.data.splice(0, this.data.length);
          }
        }
        this.recommendAgentPage(obj);
      },
      //审核
      verifystateAgent(i, v) {
        var _this = this;
        var aId = this.data[i].id;
        //升级
        this.$axios
          .post("upgrade.verify.agent", {
            verifystate: v,
            id: aId,
            verify_agent_id: this.agentid
          })
          .then(p => {
            if (p.data.Code == 100) {
              this.audit = false;
              this.verifystate = 2;
              this.data.splice(0, this.data.length);
              this.recommendAgentPage();

            } else {
              Toast({
                message: p.data.Msg,
                duration: 1500
              });
            }
          });
      }
    },
    created() {
      this.agentid = this.$route.query.agentid;
      this.userInfo = getStore("userInfo");
      // this.recommendAgent(1);
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
    color: #E9423A;
    border-bottom: #E9423A 0.1rem solid;
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
      // height: 3.304rem;
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
          width: 3rem;
          height: 1rem;
          line-height: 1rem;
          border: 0.05rem solid #E9423A;
          border-radius: 0.2rem;
          text-align: center;
        }

        .suc {
          background-color: #E9423A;
          color: #fff;
        }

        .err {
          color: #E9423A;
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
