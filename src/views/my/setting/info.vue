<template>
  <div>
    <head-top goBack="true"></head-top>
    <div class="newPlaceholder"></div>
    <div class="setting">
      <div class="hint">申请成为代理后，即可享受商城所有商品下单立减20优惠</div>

      <div class="headImg flexBetween">
        <span>头像</span>
        <div class="flexCenter">
          <img :src="userInfo.avatar" alt />
          <span class="iconfont iconxiayige"></span>
        </div>
      </div>
      <div class="accountInfo">
        <div @click="changeNickname" class="flexBetween">
          <span>用户名称</span>
          <input type="text" v-model="userInfo.agentname" placeholder="请输入您的姓名" />
        </div>
        <div class="flexBetween">
          <span>手机号</span>
          <input type="text" v-model="userInfo.telphone" placeholder="请输入您的手机号" />
        </div>
        <div class="flexBetween">
          <span>微信号</span>
          <input type="text" v-model="userInfo.wxnum" placeholder="请输入您的微信号" />
        </div>
        <div class="flexBetween">
          <span>身份证号</span>
          <input type="text" v-model="userInfo.idnum" placeholder="请输入您的身份证号" />
        </div>
      </div>
      <div class="realInfo">
        <div class="flexBetween" @click="showAddress">
          <span>省市区</span>
          <div>
            <span>选择地区</span>
            <input readonly v-model="info.pca" type="text" placeholder="省市区" />
          </div>
        </div>
        <div class="flexBetween">
          <span>详细地址</span>
          <input type="text" v-model="userInfo.address" placeholder="请输入详细地址" />
        </div>
      </div>
      <div class="realInfo">
        <div class="flexBetween">
          <span>代理产品</span>
          <div>
            <span>魔瞳三件套</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween">
          <span>代理级别</span>
          <div>
            <span>VIP</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer" @click="ok">提交</div>

    <div class="bg" v-if="visible"></div>
    <address-select
      :editaddress="editAddress"
      @address-confirm="getConfirm"
      @address-cancel="getCancel"
      class="address-select"
      v-if="visible"
    ></address-select>
  </div>
</template>

<script>
import headTop from "src/components/header/newHead";
import addressSelect from "src/components/common/address";
import { setStore, getStore } from "../../../config/mUtils";
import { DatetimePicker, MessageBox, Toast } from "mint-ui";

export default {
  name: "setting",
  data() {
    return {
      userInfo: {
        avatar:
          "https://shnbbucket.oss-cn-beijing.aliyuncs.com/201901071104593710c58e6a763284af7b0e7ef783e56ce74.jpeg",
        agentname: "",
        telphone: "",
        idnum: "",
        wxnum: "",
        province: "",
        city: "",
        area: "",
        address: ""
      },
      info: {
        pca: ""
      },
      visible: false,
      editAddress: "",
      birthDate: "",
      statistics: {},
      pickerValue: "",
      startDate: new Date("1920"),
      msgbox: false,
      NickName: "",
      aId: 0,
      userinfos: {
        NickName: "小李"
      }
    };
  },
  components: {
    headTop,
    addressSelect
  },
  filters: {
    formatDate: function(val) {
      if (val) {
        return val.split(" ")[0];
      }
    }
  },
  computed: {},
  methods: {
    changeDate() {
      this.$refs.picker.open();
      this.pickerValue = this.birthDate;
    },
    changeNickname() {
      this.msgbox = !this.msgbox;
    },

    showAddress() {
      this.visible = !this.visible;
      this.editAddress = this.info.pca;
      document.addEventListener("touchmove", function(event) {
        //监听滚动事件
        if (this.visible) {
          //判断是遮罩显示时执行，禁止滚屏
          event.stopPropagation();
          event.preventDefault(); //最关键的一句，禁止浏览器默认行为
        }
      });
    },
    getCancel(res) {
      this.visible = res;
    },
    getConfirm(res) {
      this.userInfo.province = res.province;
      this.userInfo.city = res.city;
      this.userInfo.area = res.area;
      this.info.pca = res.province + "-" + res.city + "-" + res.area;
      this.visible = res.visible;
    },
    clearaddress() {
      this.zhinengaddress = "";
    },
    //提交信息
    ok() {
      if (this.userInfo.agentname == "") {
        Toast({ message: "请输入姓名" });
        return false;
      }
      if (this.userInfo.telphone == "") {
        Toast({ message: "请输入手机号码" });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.userInfo.telphone)) {
        Toast({ message: "手机号码格式有误" });
        return false;
      }
      if (this.userInfo.wxnum == "") {
        Toast({ message: "请输入微信号" });
        return false;
      }
      if (this.userInfo.idnum == "") {
        Toast({ message: "请输入身份证号码" });
        return false;
      }
      if (
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.userInfo.idnum)
      ) {
        Toast({ message: "身份证号码填写有误" });
        return false;
      }
      this.$axios.post("update.info.agent", this.userInfo).then(p => {
        if (p.data.Code == 100) {
          setStore("userInfo", p.data.Data);
          console.log(getStore("userInfo"));
            Toast({
              message: p.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 1000
            });
            setTimeout(() => {
              this.goPage("/infoSucceed");
            }, 1500);
        } else {
          Toast({
            message: p.data.Msg,
            iconClass: "iconfont icon-cuo",
            duration: 1800
          });
        }
      });
    },
    goPage(path) {
      this.$router.push({
        path: path
      });
    }
  },
  created() {
    if(getStore("userInfo"))
    {
      this.userInfo = getStore("userInfo");
    }
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.address-select {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 20000;
    background: white;
}
.bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
}
.msgbox {
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
}
input {
  text-align: right;
  font-size: 0.608696rem;
}
.setting {
  font-size: 0.608696rem;

  .hint {
    padding: 0.5rem;
    background-color: #fffaf6;
    font-size: 0.608rem;
    color: #9d9d9d;
  }
  > div {
    margin-bottom: 0.304348rem;
    background-color: white;
  }

  .headImg {
    padding: 0.434783rem 0.652174rem;

    > div {
      > img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-right: 1rem;
      }
      > span {
        color: #888;
      }
    }
  }

  .accountInfo,
  .realInfo {
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
