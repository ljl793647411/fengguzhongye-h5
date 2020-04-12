<template>
  <div>
    <!-- <head-top goBack="true"></head-top> -->
    <div class="headTop">
      <span class="head_goback iconfont iconiconfontjiantou1" @click="gourl()"></span>
    </div>
    <div class="newPlaceholder"></div>
    <div class="setting">
      <div class="headImg flexBetween">
        <span>头像</span>
        <div class="flexCenter">
          <input
            style="position:absolute;width:80px;height:40px;opacity:0;z-index: 10"
            @change="changeavatar($event.target)"
            accept="image/*"
            type="file"
            name="name"
            value
          />
          <img :src="userInfo.avatar" alt />
          <span class="iconfont iconxiayige"></span>
        </div>
      </div>
      <div class="accountInfo">
        <div @click="changeNickname" class="flexBetween">
          <span>姓名</span>

          <div>
            <span v-if="userInfo.agentname">{{userInfo.agentname}}</span>
            <span v-else>请输入姓名</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween">
          <span>手机</span>
          <div>
            <span>{{userInfo.telphone}}</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <!-- <div class="flexBetween">
          <span>账号绑定</span>
          <span class="iconfont iconxiayige"></span>
        </div>-->
      </div>
      <div class="realInfo">
        <div class="flexBetween">
          <span>授权码</span>
          <div>
            <span>{{userInfo.serialnum}}</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween" v-show="userInfo.levelid!=5">
          <span>授权证书</span>
          <div>
            <span @click="goPage('/authorization?id='+userInfo.id)">查看</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween">
          <span>等级</span>
          <div>
            <span>{{userInfo.level_name}}</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween">
          <span>微信号</span>
          <div>
            <span>{{userInfo.wxnum}}</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween">
          <span>微信二维码</span>
          <div>
            <input
              style="position:absolute;width:80px;height:40px;opacity:0;z-index: 10"
              @change="uploadimg($event.target)"
              accept="image/*"
              type="file"
              name="name"
              value
            />
            <img
              v-if="userInfo.wx_code"
              :src="userInfo.wx_code"
              alt
              style="width:40px;height:40px;vertical-align: middle"
            />
            <span v-else style="font-size:0.521rem;">添加二维码</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
        <div class="flexBetween">
          <span>绑定微信登录</span>
          <div @click="BindingOpneId()">
            <span>点击绑定</span>
            <span class="iconfont iconxiayige"></span>
          </div>
        </div>
      </div>
      <div @click="goPage('/addressIndex')" class="addressManage flexBetween">
        <span>收货地址管理</span>
        <span style="color: #888" class="iconfont iconxiayige"></span>
      </div>
      <div @click="goPage('/changePassword')" class="changePassword flexBetween">
        <span>修改密码</span>
        <span style="color: #888" class="iconfont iconxiayige"></span>
      </div>
      <div class="layout" @click="layout">退出登录</div>
    </div>

    <div v-if="msgbox" class="modal flexCenter" style="z-index: 20;">
      <div class="msgbox">
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message">请输入姓名</div>
          <div class="mint-msgbox-input">
            <input style="height: 1.54rem" v-model="NickName" placeholder="请输入姓名" type="text" />
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="changeNickname">取消</button>
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirm">确定</button>
        </div>
      </div>
    </div>
    <mt-datetime-picker
      :startDate="startDate"
      @confirm="getDate"
      ref="picker"
      type="date"
      v-model="pickerValue"
    ></mt-datetime-picker>
  </div>
</template>

<script>
import headTop from "src/components/header/newHead";
import { getStore, removeStore, setStore } from "../../../config/mUtils";
import { DatetimePicker, MessageBox, Toast } from "mint-ui";

export default {
  name: "setting",
  data() {
    return {
      openId:'',
      userInfo: {},
      codeimg: "",
      birthDate: "",
      statistics: {},
      pickerValue: "",
      startDate: new Date("1920"),
      msgbox: false,
      NickName: "",
      aId: 0,
      code: "",
      openid: "",
      para: null
    };
  },
  components: {
    headTop
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
    gourl() {
      this.$router.push({ path: "/mallIndex" });
    },
    changeDate() {
      this.$refs.picker.open();
      this.pickerValue = this.birthDate;
    },
    //头像
    changeavatar(imgFile) {
      var instance = this.$axios.create({
        baseURL: "http://mq.m12315.com/"
      });
      let param = new FormData(); // 创建form对象
      param.append("file", imgFile.files[0]); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      instance.post("api/upload.file", param, config).then(p => {
        this.userInfo.avatar = p.data;
        setStore("userInfo", this.userInfo);
        this.$axios
          .post("avatar.agent", {
            id: this.userInfo.id,
            avatar: p.data
          })
          .then(p => {
            if (p.data.Code == 100) {
              Toast({
                message: "上传成功",
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
          });
      });
    },
    //绑定微信登录
    BindingOpneId() {
      if(this.openId == "" || typeof(this.openId) == "undefined"){
        Toast({
          message:"请先关注公众号!",
          iconClass: "iconfont icon-dui",
          duration: 1500
        });
        return false;
      }

      this.$axios
        .post("wx.opneid.binding", {
          openId: this.openId,
          id: this.userInfo.id
        })
        .then(o => {
          console.log(o);
          if (o.data.Code == 100) {
            Toast({
              message: o.data.Msg,
              iconClass: "iconfont icon-dui",
              duration: 1500
            });

            this.userInfo.wxnum = this.openId;

            setStore("userInfo",this.userInfo);

          } else {
            Toast({
              message: o.data.Msg,
              iconClass: "iconfont icon-cuo",
              duration: 1800
            });
          }
        });
    },
    GetQueryString(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    getDate(date) {
      // var year = new Date(date).getFullYear();
      // var month = new Date(date).getMonth() < 10 ? '0'+(new Date(date).getMonth() + 1) : new Date(date).getMonth()+1;
      // var day = new Date(date).getDate()< 10 ? '0'+new Date(date).getDate(): new Date(date).getDate();
      // this.birthDate = year + "-" + month + "-" + day;
      // this.userinfos.BirthDate = this.birthDate;
      // this.$axios
      //   .post("integral.user.birthdate.modify", this.userinfos)
      //   .then(p => {
      //     if (p.data.Code == "100") {
      //       Toast({
      //         message: p.data.result,
      //         iconClass: "iconfont icon-dui",
      //         duration: 1500
      //       });
      //     } else {
      //       Toast({
      //         message: p.data.msg,
      //         iconClass: "iconfont icon-cuo",
      //         duration: 1500
      //       });
      //     }
      //   });
    },
    changeNickname() {
      this.msgbox = !this.msgbox;
    },
    confirm() {
      if (this.NickName == "") {
        Toast({
          message: "请输入名称",
          duration: 1500
        });
        return false;
      }
      this.userInfo.agentname = this.NickName; //name修改
      // console.log(this.userInfo.agentname);
      this.$axios.post("agent.name", this.userInfo).then(p => {
        if (p.data.Code == 100) {
          this.msgbox = !this.msgbox;
          Toast({
            message: p.data.Msg,
            iconClass: "iconfont icon-dui",
            duration: 1500
          });
          setStore("userInfo", this.userInfo);
          this.NickName = "";
        } else {
          Toast({
            message: p.data.msg,
            iconClass: "iconfont icon-cuo",
            duration: 1500
          });
        }
      });
    },
    //confirm() {
    // this.userinfos.NickName = this.NickName;
    // this.$axios
    //   .post("integral.user.nickname.modify", this.userinfos)
    //   .then(p => {
    //     if (p.data.Code == "100") {
    //       this.msgbox = !this.msgbox;
    //       Toast({
    //         message: p.data.result,
    //         iconClass: "iconfont icon-dui",
    //         duration: 1500
    //       });
    //     } else {
    //       Toast({
    //         message: p.data.msg,
    //         iconClass: "iconfont icon-cuo",
    //         duration: 1500
    //       });
    //     }
    //   });
    //},

    layout() {
      this.$router.replace({
        path: "/login",
        query: {}
      });
      removeStore("userInfo");
      removeStore("openid");
    },
    goPage(path) {
      this.$router.push({
        path: path
      });
    },
    uploadimg(imgFile) {
      var instance = this.$axios.create({
        baseURL: "http://mq.m12315.com/"
      });
      let param = new FormData(); // 创建form对象
      param.append("file", imgFile.files[0]); // 通过append向form对象添加数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      instance.post("api/upload.file", param, config).then(p => {
        console.log(p.data);
        this.userInfo.wx_code = p.data;
        setStore("userInfo", this.userInfo);
        this.$axios
          .post("wx.code.agent", {
            id: this.userInfo.id,
            wx_code: p.data
          })
          .then(p => {
            if (p.data.Code == 100) {
              Toast({
                message: "上传成功",
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
              // this.getagnetinfo();
            } else {
              Toast({
                message: p.data.Msg,
                iconClass: "iconfont icon-cuo",
                duration: 1800
              });
            }
          });
      });
    },
    //刷新用户信息
    getagnetinfo() {
      this.userInfo = getStore("userInfo");
      this.$axios
        .get("agent.info", {
          params: {
            id: this.userInfo.id
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            if (p.data.Data) {
              this.userInfo = this.getStore("userInfo");
            }
          }
        });
    },
    //获取统计信息
    getParameter() {},
    //获取用户信息
    getuserinfo() {
      // this.$axios
      //   .get("integral.user.getinfo", {
      //     params: {
      //       userid: this.userInfo.Id
      //     }
      //   })
      //   .then(p => {
      //     if(p.data.result)
      //     {
      //       this.userinfos = p.data.result;
      //       this.NickName = this.userinfos.NickName;
      //       this.birthDate = this.userinfos.BirthDate;
      //     }
      //     console.log(this.userinfos)
      //   });
    }
  },
  created() {
    this.openId = this.$route.query.openId;
    this.userInfo = getStore("userInfo");
    console.log(this.userInfo);
    /*if (this.$route.query.parameter) {
      this.BindingOpneId();
    }*/
    // this.getStatistics();
    // this.getuserinfo();
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.msgbox {
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
}

.setting {
  font-size: 0.608696rem;

  > div {
    margin-bottom: 0.304348rem;
    background-color: white;
  }

  .headImg {
    padding: 0.434783rem 0.652174rem;

    > div {
      > img {
        width: 3.043478rem;
        height: 3.043478rem;
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

  .addressManage,
  .changePassword {
    padding: 0.434783rem 0.652174rem;

    > a {
      color: #888;
    }
  }

  .layout {
    padding: 0.434783rem 0.652174rem;
    text-align: center;
    color: #e51c23;
  }
}
</style>
