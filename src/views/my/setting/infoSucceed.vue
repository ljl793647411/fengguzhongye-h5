<template>
  <div id="infoSucceed">
    <div class="head">
      <div class="state">
        <p>
          <span class="iconfont icondui1"></span>
          <span>信息提交成功</span>
        </p>
        <p>请联系上级代理，支付魔瞳三件套代理费</p>
      </div>
      <div class="message">
        <div>
          <img
            :src="superinfo.avatar||'https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg'"
            alt
          />
          <div>
            <p v-if="superinfo.levelid!=2">上级代理信息</p>
            <p v-if="superinfo.levelid!=2">
              <span>{{superinfo.agentname}}</span>
              <button class="btn">{{superinfo.level_name}}</button>
            </p>
            <p v-if="superinfo.levelid!=2">授权码：{{superinfo.serialnum}}</p>
            <p>电话：{{superinfo.telphone}}</p>
          </div>
        </div>
        <div>
          <img :src="wx_code" alt />
        </div>
      </div>
    </div>

    <div class="welfare">
      <span class="aItem"></span>
      <span>VIP代理福利</span>
      <span class="aItem"></span>

      <p>1、可获得爆款魔瞳三件套订购权限</p>
      <p>2、商城所有商品下单立减20优惠</p>
      <p>3、分享商品成交后可获得分销返佣权限</p>
      <p>4、可升级为更高级别代理，获取更多福利</p>
    </div>

    <div class="footer" @click="goPage('/mallIndex')">返回首页</div>
  </div>
</template>

<script>
import { setStore, getStore } from "../../../config/mUtils";
export default {
  name: "infoSucceed",
  data() {
    return {
      userInfo: { levelid: 1 },
      info: {
        pca: ""
      },
      data: [],
      wx_code: "https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg",
      birthDate: "",
      statistics: {},
      pickerValue: "",
      superinfo:{}
    };
  },
  computed: {},
  methods: {
    //提交信息
    getInfo() {
      this.$axios
        .get("agent.superior.info", { params: { id: this.userInfo.id } })
        .then(p => {
          if (p.data.Code == 100) {
            this.data = p.data.Data;
            this.data.level_name = this.levelName(this.data.levelid);
          } else {
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 1800
            });
          }
        });
    },
    //获取上级二维码
    getSuperiorCode() {   
          console.log(this.userInfo.id); 
      this.$axios
        .get("agent.infos", {
          params: {
            id: this.userInfo.id
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            if (p.data.Data) {
              this.superinfo = p.data.Data;
              this.wx_code = p.data.Data.wx_code;             
            }
          }
        });
    },
    goPage(path) {
      this.$router.push({
        path: path
      });
    },
    levelName(e) {
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


    this.getInfo();
    this.getSuperiorCode();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.head {
  background-color: white;

  .state {
    font-size: 0.608rem;
    text-align: center;
    padding: 0.5rem;
    border-bottom: 1px solid #eeeeee;
    > p:nth-child(1) {
      > span:nth-child(1) {
        color: #0081ff;
        font-size: 1.2rem;
        vertical-align: middle;
      }
      > span:nth-child(2) {
        font-size: 0.782608rem;
      }
    }
    > p:nth-child(2) {
      color: #888888;
      margin: 0.4rem 0;
    }
  }
  .message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.608rem;
    padding: 0.5rem;
    > div:nth-child(1) {
      display: flex;
      align-items: center;
      border-right: solid 1px #eeeeee;
      // width: 60%;
      > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      > div {
        margin-left: 0.5rem;
        p{
          margin: 0.3rem 0;
        }
        > p:nth-child(1) {
          font-size: 0.68rem;
        }
        > p:nth-child(2) {
          font-size: 0.521rem;
          .btn {
            padding: 0.1rem 0.4rem;
            font-size: 0.521rem;
            background-color: white;
            border: solid 1px #0081ff;
            color: #0081ff;
          }
        }
        > p:nth-child(3),
        > p:nth-child(4) {
          font-size: 0.521rem;
          color: #888888;
        }
      }
    }
    > div:nth-child(2) {
      > img {
        width: 110px;
        height: 110px;
      }
    }
  }
}
.welfare {
  background-color: white;
  padding: 0.5rem 1rem;
  font-size: 0.782608rem;
  color: #0081ff;
  text-align: center;
  margin-top: 0.5rem;
  .aItem {
    width: 2rem;
    display: inline-block;
    border-top: 0.05rem solid #0081ff;
    vertical-align: middle;
    margin: 0.5rem 0;
  }
  > p {
    text-align: left;
    font-size: 0.608rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }
}
.footer {
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #0081ff;
  font-size: 0.608rem;
  color: white;
}
</style>
