<template>
  <div>
    <span class="searchIcon iconfont iconfangweiguanli"></span>
    <input class="search" type="text" placeholder="请输入搜索关键字" v-model="proname" v-on:input="getkeyword">
    <div class="classify">
      <ul class="left">
        <li
          @click="tapType(index,item.id)"
          :class="{'active':tapIndex==index}"
          v-for="(item,index) in classifyArr"
          v-bind:key="item.id"
        >{{item.brandname}}</li>
      </ul>
      <div id="right" class="right">
        <div>
          <div class="list" v-for="(item,sizeindex) in listArr" :key="sizeindex">
            <div @click="godetail(item.id,item.protype)">
              <img :src="item.proimg" alt />
              <div>
                <p style="width:auto;">{{item.proname}}</p>
                <p>
                  <span>￥{{item.vipprice}}</span><s>￥{{item.marketprice}}</s>
                </p>
              </div>
            </div>
            <div @click="addshopcart(item)">+</div>
          </div>
        </div>
      </div>
    </div>
    <foot-guide></foot-guide>
    <div v-if="usershow" class="modal flexCenter" style="z-index: 20;">
      <div class="msgbox">
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-input">
            <input style="height: 1.54rem" v-model="usephone" placeholder="请输入手机号" type="text" />
          </div>
          <div class="mint-msgbox-input">
            <input style="height: 1.54rem" v-model="usepwd" placeholder="请输入密码" type="password" />
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="clear">取消</button>
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="submit">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import footGuide from "src/components/footer/footGuide";
import headTop from "src/components/header/head";
import { getStore,setStore } from "../../config/mUtils";
import { Toast } from "mint-ui";

export default {
  name: "classify-index",
  data() {
    return {
      headTitle: "礼品分类",
      classifyArr: [],
      usephone:"",
      usepwd:"",
       info: {
        refereeid: 0,
        superior: 0,
        levelid: 0,
        avatar: "",
        telphone: "",
        agentname: "",
        idnum: "",
        wxnum: ""
      },
      usershow:false,
      tapIndex: 0,
      listArr: [],
      floorArr: [],
      userInfo: {},
      tid: 0,
      proname: "",
      shopcartinfo: {}
    };
  },
  components: {
    headTop,
    footGuide
  },
  methods: {
    getkeyword()
    {
      this.getList();
    },
    getListType() {
      //获取分类
      this.$axios.get("pc.search.select").then(p => {
        this.classifyArr = p.data.Data;
        this.tid = this.classifyArr[0].id;
        this.getList();
      });
    },
    getList() {
      //获取分类列表
      this.$axios
        .get("app.product.show", {
          params: {
            agentid: this.userInfo.id,
            leveid: this.userInfo.levelid,
            brandid: this.tid,
            proptype:2,
            proname:this.proname
          }
        })
        .then(p => {
          this.listArr = p.data.Data;
        });
    },
    addshopcart(item) {
       if(!getStore("userInfo"))
      {
       
         this.usershow = !this.usershow;
      }
      else
      {
        this.shopcartinfo = {};
      this.shopcartinfo.proid = item.id;
      this.shopcartinfo.brandid = item.brandid;
      this.shopcartinfo.pronum = 1;
      this.shopcartinfo.agentid = this.userInfo.id;
      this.$axios.post("app.add.agent.shopcart", this.shopcartinfo).then(p => {
        if (p.data.Code == "100") {
          Toast({
            message: "添加成功，在购物车等亲~",
            iconClass: "iconfont icon-dui",
            duration: 1000
          });
          this.maskShow = false;
        } else {
          Toast({
            message: "添加失败，很抱歉亲~",
            iconClass: "iconfont icon-cuo",
            duration: 1000
          });
        }
      });
      }
      
    },
    tapType(index, tid) {
      this.tapIndex = index;
      this.tid = tid;
      this.getList();
    },
    goGiftDetail(id) {
      this.$router.push({
        path: "/giftDetail"
      });
    },
    godetail(id,protype) {
      this.$router.push({ path: "/giftDetail", query: { id: id,protype:protype } });
    },
     //注册用户
    submit() {
     
        if (this.usephone == "") {
          Toast({
            message: "请输入手机号码"
          });
          return;
        }
       if (!/^1[3456789]\d{9}$/.test(this.usephone)) {
          Toast({
            message: "手机号码格式有误"
          });
          return ;
        }
       if(this.usepwd=="")
       {
         Toast({
            message: "请输入密码"
          });
          return ;
       }
      this.info.superior = 0;
      this.info.refereeid = 0;
      this.info.telphone = this.usephone;
      this.info.loginpwd = this.usepwd;
      
      this.$axios.post("wx.agent.login.sales", this.info).then(o => {
        if (o.data.Code == 100) {
          alert(1)

           setStore("userInfo", o.data.Data);
          //this.userinfo = o.data.Data;
         
          this.usershow=!this.usershow;
          console.log()
        }
        else{
           Toast({
            message: "手机号已存在"
          });
          return ;
        }
      });
    },
      clear() {
      this.usershow = !this.usershow;
    },
  },
  created() {
    if( getStore("userInfo")!=null)
    {
    this.userInfo = getStore("userInfo");
    }
    this.getListType();
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
ul,
li {
  list-style: none;
}
.searchIcon{
  font-size: 1rem;
  color: #0081ff;
  position: absolute;
  top: 0.4rem;
  left: 0.15rem;
}
.search {
  width: 15.652173rem;
  height: 1.304347rem;
  margin: 0.3rem auto;
  margin-left: 0.15rem;
  border-radius: 0.1rem;
  background-color: white;
  padding: 0.05rem;
  padding-left: 0.8rem;
}

.classify {
  display: flex;
  position: absolute;
  width: 100%;
  height: calc(100% - 2.5rem);

  .left {
    width: 4.05rem;
    border-right: 0.04rem solid #e7eaed;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background: white;
    padding-bottom: 0.8rem;

    li {
      height: 0.869565rem;
      line-height: 0.869565rem;
      margin: 0.5rem 0;
      font-size: 0.6rem;
      font-weight: bold;
      text-align: center;
      width: auto;
      list-style-type: disc;
      border-left: white solid 0.15rem;
    }

    .active {
      color: #0081ff;
      border-left: #0081ff solid 0.15rem;
    }
  }

  .right {
    flex: 1;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background: white;
    padding-bottom: 0.8rem;

    .list {
      width: 100%;
      height: 4.565217rem;
      border-bottom: 0.05rem solid #e7eaed;
      position: relative;
      > div:nth-child(1) {
        height: 100%;
        display: flex;
        align-items: center;

        img {
          width: 2.347826rem;
          height: 2.347826rem;
          margin: 0 0.5rem;
        }

        > div {
          height: 2.347826rem;
          font-size: 0.6rem;
          p {
            width: 100%;
            height: 50%;
            line-height: 100%;
          }
          > p:nth-child(2) {
            padding-top: 0.65rem;
            span {
              color: #0081ff;
              font-weight: bold;

            }
          }
        }
      }
      > div:nth-child(2) {
        width: 1.086956rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        text-align: center;
        color: white;
        border-radius: 0.1rem;
        background-color: #0081ff;
        position: absolute;
        right: 0.3rem;
        bottom: 0.5rem;
      }
    }

    .item-title {
      padding: 0.5rem 0;

      span:nth-child(1) {
        width: 0.85rem;
        height: 0.04rem;
        background: #e2e3e4;
      }

      span:nth-child(2) {
        font-size: 0.6rem;
        margin: 0 0.8rem;
      }

      span:nth-child(3) {
        width: 0.85rem;
        height: 0.04rem;
        background: #e2e3e4;
      }
    }

    .item-img {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      > div {
        width: 33%;

        .GiftName-con {
          width: 2.56rem;
          height: 2.56rem;
          margin: 0.43rem 0.43rem 0.2rem;
          img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 0.15rem;
          }
        }

        .GiftName {
          text-align: center;
          font-size: 0.51rem;
          color: #666666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
  }
}

</style>
