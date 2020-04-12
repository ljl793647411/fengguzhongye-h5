<template>
  <div>
    <head-top goBack="true"></head-top>
    <div class="newPlaceholder"></div>
    <div class="big-container">
      <none-list v-if="hasItem" text="没有收货地址寄不了快递的哦" icon>
        <button slot="btn" @click="goPage('/addAddress','add')" class="btn btn-primary">新增地址</button>
      </none-list>

      <div class="container">
        <div v-for="item in addressArr" class="address-item flexLeft" v-bind:key="item.id">
          <span class="icon">{{item.receivername | firstChar}}</span>
          <div class="info" @click="choice(item)">
            <p class="flexLeft">
              <span class="name">{{item.receivername}}</span>
              <span class="phone">{{item.receiverphone}}</span>
            </p>
            <p class="flexLeft">
              <span class="active" v-if="item.f_default==0">默认</span>
              <span class="details">
                {{item.province}}
                {{item.city}}
                {{item.area}}
                {{item.receiveraddress}}
              </span>
            </p>
          </div>
          <span @click="goPage('/addAddress','edit',item)" class="edit">编辑</span>
        </div>
      </div>

      <div style="height: 1.5rem"></div>
      <button
        v-if="!hasItem"
        @click="goPage('/addAddress','add')"
        class="btn-big btn-big-primary"
      >新增地址</button>
    </div>
  </div>
</template>

<script>
import noneList from "../../shopCar/noneData";
import { getStore } from "../../../config/mUtils";
import headTop from "src/components/header/newHead";
import { Toast, MessageBox, Picker, Popup } from "mint-ui";

export default {
  name: "addressIndex",
  components: {
    noneList,
    headTop
  },
  data() {
    return {
      hasItem: false,
      userInfo: {},
      addressArr: [],
      ids:0,
    };
  },
  computed: {},
  methods: {
    choice(obj)
    {
      if(this.ids==2)
      {
        this.$axios.post("update.mc.integraladdress", {id:obj.id,type:1,agentid:this.userInfo.id}).then(p => {
            if (p.data.Code == "100") {
              Toast({
                message: "选择成功",
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
            }
          });
      }
    },
    goPage(path, type, obj) {
      if (type == "add") {
        this.$router.push({
          path: path,
          query:{ids:this.ids}
        });
      } else {
        obj.handleType = "edit";
        this.$router.push({
          name: path,
          params: obj,
          query:{ids:this.ids}
        });
        document.title = "修改地址";
      }
    },
    getAddress() {
      this.$axios
        .get("get.mc.integraladdress.integraladdress?IAid=" + this.userInfo.id)
        .then(p => {
          this.addressArr = p.data.Data;
          if (p.data.Data.length > 0) {
            this.hasItem = false;
          } else {
            this.hasItem = true;
          }
        });
    }
  },
  filters: {
    firstChar(value) {
      return value.charAt(0);
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.ids=this.$route.query.ids;
    this.getAddress();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.btn-big {
  position: fixed;
  bottom: 0.2rem;
  left: 5%;
}
.btn-primary {
  background-color: #0081ff;
}
.btn-big-primary {
  background-color: #0081ff;
}
.big-container {
  background: white;
}
.address-item {
  padding: 0.55rem 0.21rem;
  border-bottom: 1px dashed #e4e4e4;
  .icon {
    width: 1.71rem;
    height: 1.71rem;
    text-align: center;
    line-height: 1.71rem;
    color: white;
    background: #d6d6d6;
    border-radius: 100%;
  }
  .info {
    flex: 1;
    padding: 0 0.43rem;
    p {
      height: auto;
    }
    p:nth-child(1) {
      .name {
        font-size: 0.6rem;
        color: #666;
      }
      .phone {
        font-size: 0.51rem;
        color: #b8b8b8;
        padding-left: 0.43rem;
      }
    }
    p:nth-child(2) {
      .active {
        font-size: 0.51rem;
        color: #fb5d57;
        padding-right: 0.43rem;
      }
      .details {
        font-size: 0.55rem;
        color: #666;
      }
    }
  }
  .edit {
    font-size: 0.55rem;
    color: #b8b8b8;
    padding: 0 0.6rem;
    // border-left: 0.04rem solid #b8b8b8;
  }
}
</style>
