<template>
  <div>
    <div class="box">
      <div class="top">
        <div class="person-info">
          <div style="position:absolute;right:0.5rem;top:0;"></div>
          <div class="message">
            <div class="msgLeft">
              <input
                style="position:absolute;width:70px;height:70px;opacity:0;z-index: 10"
                @change="selectImg($event.target)"
                accept="image/*"
                type="file"
                name="name"
                value
              />
              <img :src="userInfo.avatar" alt />
              <div>
                <p>账号：{{userInfo.username}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="placeholder"></div>
        <div class="four-data flexBetween">
          <div>
            <p style="color: #FF8A18">{{taskcount.daisendcount}}</p>
            <p>代理订单</p>
          </div>
          <!-- <div>
            <p style="color: #62ADE5">{{statistics.AggregateScore}}</p>
            <p>本月收益</p>
          </div>
          <div>
            <p style="color: #95C73B">{{statistics.UseIntegral}}</p>
            <p>我的云库存</p>
          </div>-->
          <div>
            <p style="color: #0081ff">{{taskcount.daiexaminecount}}</p>
            <p>待审核订单</p>
          </div>
        </div>
      </div>
      <div class="accountInfo">
        <div class="flexBetween" @click="gourl('/orderIndex?agentype=3&tabIndex=2&ordertype=2')">
          <span>丰谷种业订单</span>
          <div>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
         <div class="flexBetween" @click="gourl('/orderIndex?agentype=3&tabIndex=2&ordertype=3')">
          <span>待发货分销订单</span>
          <div>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween" @click="gourl('/stockOrders?agentype=2&tabIndex=1')">
          <span>丰谷种业审核</span>
          <div>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween" @click="gourl('/rebateManage?rebatetype=3&agentype=3&tabIndex=1&formtype=1')">
          <span>代理返利</span>
          <div>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
         <div class="flexBetween" @click="gourl('/rebateManage?rebatetype=3&agentype=3&tabIndex=1&formtype=2')">
          <span>平台返利</span>
          <div>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
         <div class="flexBetween" @click="gourl('/authManage')">
          <span>代理商授权管理</span>
          <div>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <!-- <div class="flexBetween" @click="gourl('/authHeadManage')">
          <span>代理商升级管理</span>
          <div>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "../../config/mUtils";
import { Toast, MessageBox } from "mint-ui";
import wx from "weixin-js-sdk";

export default {
  name: "my-index",
  data() {
    return {
      headTitle: "购物车",
      showLoading: true,
      hasItem: false,
      checkArr: [],
      userInfo: {},
      statistics: {
        OnIntegral: "10",
        AggregateScore: "3000",
        UseIntegral: "5000",
        ChangeTheOrder: "20"
      },
      fwCode: "20960053750005101249",
      userAgent: "",
      shareBg: false,
      userinfos: {},
      taskcount: {}
    };
  },
  components: {},
  methods: {
    shareBgShowHide() {
      this.shareBg = !this.shareBg;
    },
    goPage(url) {
      this.$router.push({
        path: url
      });
    },
    gettaskcount() {
      this.$axios
        .get("get.user.taskcount", {
          params: {
            uid: this.userInfo.id
          }
        })
        .then(p => {
          if (p.data.Data) {
            this.taskcount = p.data.Data;
          }
        });
    },
    gourl(url) {
      this.$router.push({
        path: url
      });
    },
    //上传图片
    selectImg(imgFile) {
      var instance = this.$axios.create({
        baseURL: "http://mq.m12315.com/"
      });
      let param = new FormData(); // 创建form对象
      param.append("file", imgFile.files[0]); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      instance.post("api/upload.file", param, config).then(p => {
        this.$axios
          .post("update.sysuser.avatar", {
            id: this.userInfo.id,
            avatar: p.data
          })
          .then(res => {
            if (res.data.Code == "100") {
              this.userInfo.avatar = p.data;
              setStore("userInfo", this.userInfo);
              Toast({
                message: "头像修改成功",
                iconClass: "iconfont icon-dui",
                duration: 2000
              });
            }
          });
      });
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.gettaskcount();
    console.log(this.userInfo);
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.iconSvg {
  font-size: 2rem;
}

.circle {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background-color: #0081ff;
  position: absolute;
  top: 0.45rem;
  right: -0.1rem;
}

.accountInfo {
  background-color: white;
  font-size: 0.608696rem;
  > div {
    padding: 0.434783rem 0.652174rem;
    border-bottom: 1px solid #eee;
    > span:last-child,
    > a:last-child {
      color: #888;
    }
    > div {
      > span {
        color: #888;
      }
    }
  }

  > div:last-child {
    border-bottom: none;
  }
}
.box {
  padding-bottom: 2.5rem;

  .top {
    position: relative;
    overflow: hidden;
    .person-info {
      background: #0081ff;
      padding: 2.13rem 0;

      .message {
        height: 3.043478rem;
        font-size: 0.608695rem;
        color: white;
        .msgLeft {
          height: 3.043478rem;
          display: flex;
          align-items: center;
          > img {
            width: 3.043478rem;
            height: 3.043478rem;
            border-radius: 50%;
            margin: 0 0.8rem;
          }
        }
      }
    }

    .four-data {
      height: 2.56rem;
      position: absolute;
      bottom: 0.85rem;
      width: 90%;
      margin-left: 5%;
      background: white;
      border-radius: 0.43rem;

      div {
        flex: 1;

        p:nth-child(1) {
          font-size: 0.6rem;
          text-align: center;
        }

        p:nth-child(2) {
          font-size: 0.51rem;
          text-align: center;
        }
      }
    }
  }
}

.level {
  padding: 0.1rem 0.55rem;
  background: #fa9d28;
  font-size: 0.5rem;
  border-radius: 0.17rem;
  margin-left: 0.43rem;
}

.usertype {
  padding: 0.1rem 0.55rem;
  background: rgb(106, 4, 146);
  font-size: 0.5rem;
  border-radius: 0.17rem;
  margin-left: 0.43rem;
}

.shareBg {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  text-align: right;
}
</style>


<style>
.mint-msgbox-input input {
  height: 1.54rem;
}
</style>
