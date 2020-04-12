<template>
  <div id="performanceBill">
    <div class="teamList">
      <div class="teamLisLeft">
        <div class="b" :style="{backgroundImage: 'url(' + data.avatar||'https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg'+ ')'}"></div>
        <div class="c">
          <div class="cTop">
            <span>{{data.agentname}}</span>
            <span>{{data.levelname}}</span>
          </div>
          <div class="cBottom">授权码：{{data.serialnum}}</div>
        </div>
      </div>
      <div class="teamLisRight">
        <div>
          <div class="d">
            团队进货：
            <span>{{data.team_count}}</span>
          </div>
          <div class="e">
            我的进货量:
            <span>{{data.personal_count}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="billInformation">
      <div>
        <p>
          <span>账单信息</span>
          <span>【{{title}}】</span>
        </p>
      </div>
      <div>
        <p>
          <span>应收金额：</span>
          <span style="color:red;">￥{{data.money}}</span>
        </p>
        <p>
          <span>结算时间：</span>
          <span>{{data.pay_date||'--'}}</span>
        </p>
        <p>
          <span>支付状态：</span>
          <span>{{data.pay_state <=0?'待支付':'已支付'}}</span>
        </p>
      </div>
    </div>

    <div class="source">
      <p>业绩来源</p>
    </div>

    <div class="bonus">
      <div>团队总奖金</div>
      <div>
        <p>{{data.team_count}}</p>
        <p>总进货量</p>
      </div>
      <div>
        <p>{{data.pd_num}}</p>
        <p>积差奖</p>
      </div>
      <div>
        <p>￥{{data.team_money}}</p>
        <p>总奖金</p>
      </div>
    </div>
    <div class="bonus">
      <div>下线应收奖金</div>
      <div>
        <p>{{data.subordinate_count}}</p>
        <p>下级进货量</p>
      </div>
      <div>
        <p>{{data.subordinate_pd_num}}</p>
        <p>积差奖</p>
      </div>
      <div>
        <p>￥{{data.subordinate_money}}</p>
        <p>总奖金</p>
      </div>
      <span @click="isNext" class="iconpos iconfont" :class="ishow?'iconxiangxiajiantou':'iconxiangshangjiantou'"></span>
    </div>

    <div class="bonus xiaji" v-if="ishow" v-for="(item,index) in data.children" :key="index">
      <div>
        <p>
          <span style="color:black;">{{item.agentname}}</span>
          <button>{{item.levelname}}</button>
        </p>
        <p>授权码：{{item.serialnum}}</p>
      </div>
      <div>
        <p>{{item.team_count}}</p>
        <p>进货量</p>
      </div>
      <div>
        <p>{{item.pd_num}}</p>
        <p>积差奖</p>
      </div>
      <div>
        <p>￥{{item.team_money}}</p>
        <p>总奖金</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        agent_id: 0,
        type: 0,
        selectDate: '',
        ishow: false,
        title: ''
      };
    },
    components: {},
    methods: {
      isNext() {
        this.ishow = !this.ishow;
      },
      getTitle() {
        var type = parseInt(this.type)
        switch (type) {
          case 1:
            this.title = this.selectDate.substring(0, 7) + '团队销量奖月度'
            break;
          case 2:
            this.title = this.selectDate.substring(0, 7) + '团队销量奖季度'
            break;
          case 3:
            this.title = this.selectDate.substring(0, 7) + '平台销量奖月度'
            break;
          case 4:
            this.title = this.selectDate.substring(0, 7) + '平台销量奖季度'
            break;
        }
      },
      getBill() {
        this.getTitle();

        this.$axios
          //performance.bill
          .get("app.achievementInfo.list", {
            params: {
              agentid: this.agent_id,
              type: this.type,
              selectDate: this.selectDate,
            }
          })
          .then(p => {
            if (p.data.Code == 100) {
              this.data = p.data.Data.Data[0];
              // console.log(p.data.Data);
            }
          });
      }
    },
    created() {
      // this.userInfo = getStore("userInfo");
      this.agent_id = this.$route.query.id;
      this.type = this.$route.query.type;
      this.selectDate = this.$route.query.selectDate;
      this.getBill();
    }
  };
</script>

<style lang="scss" scoped>
  #performanceBill {
    font-size: 0.608rem;
    padding-top: 0.5rem;

    .billInformation {
      background-color: white;

      >div:nth-child(1) {
        height: 2rem;
        display: flex;
        align-items: center;

        >p {
          height: 1rem;
          line-height: 1rem;
          border-left: 5px solid red;

          padding-left: 0.5rem;
        }

        >p span:nth-child(2) {
          color: red;
        }
      }

      >div:nth-child(2) {
        border-top: 1px solid #eeeeee;
        padding: 0.5rem 1rem;
        color: #888888;
      }
    }

    .source {
      padding: 0.2rem 0;
      height: 2rem;
      display: flex;
      align-items: center;
      background: white;
      margin: 0.5rem 0;

      >p {
        height: 1rem;
        line-height: 1rem;
        border-left: 5px solid red;
        padding-left: 0.5rem;
      }
    }

    .bonus {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      background-color: white;
      padding: 0.5rem;
      position: relative;
      margin-top: 0.5rem;

      >div {
        >p {
          color: #888888;
        }

        >p:nth-child(2) {
          font-size: 0.521rem;
        }
      }

      >div:nth-child(1) {
        font-weight: bold;
      }

      >div:nth-child(4) {
        margin-right: 0.8rem;

        p:nth-child(1) {
          color: red;
        }
      }

      .iconpos {
        position: absolute;
        right: 0.5rem;
      }
    }

    .xiaji {
      margin-top: 0;
      border-top: 1px solid #eeeeee;

      button {
        background-color: white;
        padding: 2px;
        border: 1px solid red;
        color: red;
        border-radius: 3px;
      }
    }
  }

  .teamList {
    height: 3.478rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 0.608rem;
    margin-bottom: 0.5rem;

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
        color: #9d9d9d;

        >span {
          color: #0081ff;
        }
      }

      .e {
        font-size: 0.521rem;
        color: #9d9d9d;

        >span {
          color: #0081ff;
        }
      }
    }
  }
</style>
