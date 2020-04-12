<template>
  <div class="container">
    <head-top go-back="true">
      <button @click="submitAddress" class="complete" slot="complete" :disabled="disabled">完成</button>
    </head-top>
    <div style="height: 1.75rem"></div>

    <div class="cell flexLeft" style="border-top: 1px dashed #e4e4e4;">
      <span>收货人:</span>
      <input v-model="info.receivername" type="text" placeholder="收货人" />
    </div>

    <div class="cell flexLeft">
      <span>手机号码:</span>
      <input maxlength="11" v-model="info.receiverphone" type="text" placeholder="手机号码" />
    </div>
    <div class="cell flexLeft" @click="showAddress">
      <span>省-市-区:</span>
      <input readonly v-model="info.pca" type="text" placeholder="省市区" />
    </div>
    <div class="cell flexLeft">
      <span>详细地址:</span>
      <input v-model="info.receiveraddress" type="text" />
    </div>
    <span></span>
    <div class="cell flexBetween">
      <span>设置默认地址:</span>
      <mt-switch v-model="val"></mt-switch>
    </div>

    <div style="width:100%;padding:0.2rem 0.43rem;margin-top:0.5rem;">
      <p style="font-size:0.608rem;">地址解析</p>
      <textarea style="width:100%;padding:0.2rem;" v-model="zhinengaddress" placeholder="请输入地址"></textarea>
    </div>
    <div style="text-align:right;width:100%;padding:0.2rem 0.43rem;">
      <button class="btn" @click="clearaddress">清空</button>
      <button class="btn" style="background-color:#0081ff;" @click="getaddresszhineng">智能填写</button>
    </div>
    <button @click="deleteAddress" v-if="info.handleType=='edit'" class="btn-big btn-big-error">删除地址</button>

    <button
      class="btn-big btn-big-error"
      v-if="info.handleType!='edit'"
      @click="submitAddress"
      :disabled="disabled"
    >完成</button>
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
import { getStore } from "../../../config/mUtils";
import headTop from "src/components/header/newHead";
import addressSelect from "src/components/common/address";
import { Toast, MessageBox, Switch } from "mint-ui";
import { setTimeout, clearTimeout } from "timers";

export default {
  name: "addAddress",
  data() {
    return {
      userInfo: {},
      val: true,
      visible: false,
      editAddress: "",
      info: {
        receivername: "",
        receiverphone: "",
        receiveraddress: "",
        province: "",
        city: "",
        area: "",
        agentid: "",
        f_default: "0",
        zipcode: "",
        pca: ""
      },
      address_detail: null,
      userlocation: { lng: "", lat: "" },
      zhinengaddress: "",
      disabled: false
    };
  },
  computed: {},
  components: {
    headTop,
    addressSelect
  },
  methods: {
    clearResult() {
      this.resultObj = {};
    },
    submitAddress() {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1500);

      if (this.val) {
        this.info.f_default = 0;
        //默认
      } else {
        this.info.f_default = 1;
      }
      if (!this.info.receivername) {
        Toast({
          message: "收货人名称不能为空",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      } else if (!/^1\d{10}$/gi.test(this.info.receiverphone)) {
        Toast({
          message: "手机号码不正确",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      } else if (!this.info.receiveraddress) {
        Toast({
          message: "收货地址不能为空",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      } else if (!this.info.pca) {
        Toast({
          message: "请选择省市区",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      } else {
        if (this.info.handleType) {
          //编辑
          this.$axios.post("update.mc.integraladdress", this.info).then(p => {
            if (p.data.Code == "100") {
              Toast({
                message: "编辑成功",
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
              setTimeout(() => {
                this.$router.replace({
                  path: "/addressIndex",
                  query:{ids:this.$route.query.ids}
                });
              }, 1500);
            }
          });
        } else {
          //新增
          this.$axios.post("add.mc.integraladdress", this.info).then(p => {
            if (p.data.Code == "100") {
              Toast({
                message: "地址添加成功",
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
              setTimeout(() => {
                this.$router.replace({
                  path: "/addressIndex",
                  query:{ids:this.$route.query.ids}
                });
              }, 1500);
            }
          });
        }
      }
    },
    deleteAddress() {
      MessageBox.confirm("确定删除此地址?")
        .then(res => {
          if (res == "confirm") {
            this.$axios
              .post("delete.mc.integraladdress", { id: this.info.id })
              .then(p => {
                if (p.data.Code == "100") {
                  Toast({
                    message: "删除成功",
                    iconClass: "iconfont icon-dui",
                    duration: 1500
                  });
                  setTimeout(() => {
                    this.$router.replace({
                      path: "/addressIndex"
                    });
                  }, 1500);
                }
              });
          }
        })
        .catch(() => {});
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
      this.info.province = res.province;
      this.info.city = res.city;
      this.info.area = res.area;
      this.info.pca = res.province + "-" + res.city + "-" + res.area;
      this.visible = res.visible;
    },
    clearaddress() {
      this.zhinengaddress = "";
    },
    getaddresszhineng() {
      var _this = this;
      if (_this.zhinengaddress) {
        _this.$axios
          .get("get.address.jiexi?address=" + _this.zhinengaddress)
          .then(p => {
            if (p.data.Data.code == 0) {
              _this.$set(_this.info, "receivername", p.data.Data.data[0].name);
              _this.$set(
                _this.info,
                "receiverphone",
                p.data.Data.data[0].mobile
              );
              _this.$set(
                _this.info,
                "receiveraddress",
                p.data.Data.data[0].detail
              );
              _this.$set(
                _this.info,
                "pca",
                p.data.Data.data[0].province_name +
                  "-" +
                  p.data.Data.data[0].city_name +
                  "-" +
                  p.data.Data.data[0].county_name
              );
              _this.$set(
                _this.info,
                "province",
                p.data.Data.data[0].province_name
              );
              _this.$set(_this.info, "city", p.data.Data.data[0].city_name);
              _this.$set(_this.info, "area", p.data.Data.data[0].county_name);
              _this.editAddress = _this.info.pca;
            }
            console.log(p);
          });
      } else {
        Toast({
          message: "智能地址不能为空",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
      }
    }
  },
  created() {
    this.info = this.$route.params;
    this.userInfo = getStore("userInfo");
    this.info.agentid = this.userInfo.id;
    if (!this.info.handleType) {
      this.val = false;
    } else {
      if (this.info.f_default == 0) {
        this.val = true;
      } else {
        this.val = false;
      }
    }

    if (this.$route.params.province) {
      this.info.pca =
        this.$route.params.province +
        "-" +
        this.$route.params.city +
        "-" +
        this.$route.params.area;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#suggestId {
  width: calc(100% - 0.86rem);
  height: 30px;
  border: solid 1px #9d9d9d;
  position: absolute;
  top: 1.7rem;
  left: calc(100% - 392px) / 2;
  z-index: 999999;
  background-color: transparent;
  padding-left: 1rem;
}
.complete {
  background-color: white;
}
.searchIcon {
  position: absolute;
  top: 1.85rem;
  z-index: 999999;
  font-size: 1rem !important;
}
#allmap {
  width: 400px;
  height: 400px;
  font-family: "微软雅黑";
  border: 1px solid green($color: #000000);
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

.address-select {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 20000;
  background: white;
}

.btn-big {
  margin-top: 0.85rem;
}
.btn-big-error {
  background-color: #0081ff;
}
.container {
  padding: 0 0 1.5rem 0;
  background: white;

  .cell {
    padding: 5px 0.43rem;
    border-bottom: 1px dashed #e4e4e4;
    position: relative;
    span {
      color: #666666;
      padding-right: 0.43rem;
      font-size: 0.6rem;
    }

    input {
      flex: 1;
      outline: none;
      border: none;
      height: 1.54rem;
      font-size: 0.55rem;
    }

    textarea {
      flex: 1;
      height: 2.5rem;
      font-size: 0.55rem;
    }
  }
}
.footer {
  height: 1.5rem;
  width: 100%;
  background-color: #0081ff;
  text-align: center;
  line-height: 1.5rem;
  position: fixed;
  bottom: 0;
  font-size: 0.68rem;
  color: white;
}
</style>
