<template>
  <div>
    <div>
      <!--<p style="font-size: 0.68rem">地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>-->
      <p class="flexAround title" style="font-size: 0.68rem">
        <span @click="cancel" class="cancel">取消</span>
        <span>请选择</span>
        <span @click="confirm" class="sure">确定</span>
      </p>
      <mt-picker :slots="myAddressSlots" @change="onRankChange"></mt-picker>
    </div>
  </div>
</template>

<script>
  import {
    getStore
  } from "../../config/mUtils";
  import {
    Picker
  } from "mint-ui";
  import {
    Popup
  } from "mint-ui";
  import {
    Toast
  } from "mint-ui";
  // import myaddress from "../../images/address.json"; //引入省市区数据
  export default {
    name: "addressSelect",
    props: ["visible", "editaddress"],
    data() {
      return {
        myAddressSlots: [{
          flex: 1,
          values: ["合伙人", "董事", "总代", "VIP"],
          className: "slot1",
          textAlign: "center"
        }],
        popupVisible: false,
        rankIndex: 0,
        userInfo: {}
      };
    },
    created() {
      this.userInfo = getStore("userInfo");
      this.upload();
    },
    computed: {},
    methods: {
      onRankChange(picker, values) {
        switch (values[0]) {
          case "合伙人":
            this.rankIndex = 2;
            break;
          case "董事":
            this.rankIndex = 3;
            break;
          case "总代":
            this.rankIndex = 4;
            break;
          case "VIP":
            this.rankIndex = 5;
            break;
        }
        // this.rankIndex = this.myAddressSlots[0].values.indexOf(values[0]) + 2;
      },
      cancel() {
        this.$emit("address-cancel", false);
      },
      upload() {
        switch (this.userInfo.levelid) {
          case 3:
            this.myAddressSlots[0].values = ["合伙人"];
            break;
          case 4:
            this.myAddressSlots[0].values = ["合伙人", "董事"];
            //this.myAddressSlots[0].values = ["董事"];
            break;
          case 5:
            this.myAddressSlots[0].values = ["合伙人", "董事", "总代"];
            //this.myAddressSlots[0].values = ["总代"];
            break;
          case 6:
            this.myAddressSlots[0].values = ["合伙人", "董事", "总代","VIP"];
            //this.myAddressSlots[0].values = ["VIP"];
            break;
        }
      },
      confirm() {
        this.$emit("address-confirm", {
          visible: false
        });
        if (this.userInfo.levelid < this.rankIndex) {
          Toast({
            message: "您要升级的等级低于当前",
            iconClass: "iconfont icon-cuo",
            duration: 1800
          });
          return false;
        }
        var _this = this;
        this.$axios
          .post("upgrade.agent", {
            present_level: _this.rankIndex,
            agent_id: _this.userInfo.id
          })
          .then(p => {
            if (p.data.Code == 100) {
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
          });
      }
    },
    mounted() {}
  };
</script>

<style scoped>
  .cancel {
    color: #fb5d57;
  }

  .title {
    padding: 10px 0;
  }

  .sure {
    color: #3190e8;
  }
</style>
