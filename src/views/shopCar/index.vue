<template>
  <div>
    <head-top v-if="hide=='yes'" goBack="true"></head-top>
    <div v-if="hide=='yes'" class="newPlaceholder"></div>
    <none-list v-if="hasItem" text="购物车空空如也,快来挑选好货呗~" icon="icontianchongxing-">
      <button slot="btn" @click="goPage('/classifyIndex')" class="btn btn-primary">挑选商品</button>
    </none-list>
    <div>
      <div v-for="(item,index) in shopcartlist" v-bind:key="item.id">
        <div class="main flex">
          <div class="flexCenter">
            <img :src="item.proimg" alt />
          </div>
          <div class="flexGrow">
            <div>{{item.proname}}</div>
            <div class="a1">
              <div style="color:#0081ff;">
                ￥{{item.vipprice}}
                <s style="color:#666466;margin-left:0.2rem;">￥{{item.marketprice}}</s>
              </div>
              <div>
                <div class="flexCenter" style="touch-action: none;">
                  <span @click="minus(item.id,index)">-</span>
                  <input
                    style="width: 45px;text-align:center;background-color: #F3F3F3;height:1.086956rem;"
                    type="num"
                    @change="search($event,index)"
                    v-model="item.pronum"
                  />
                  <span @click="add(item.id,index)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="placeholder-footer"></div>
      <div class="closeBox">
        <div v-if="!hasItem">总金额：{{sumprice}}</div>
        <button v-if="!hasItem" @click="gosettlement" class="closeBtn">结算</button>
      </div>

      <foot-guide v-if="hide!='yes'"></foot-guide>
    </div>
  </div>
</template>

<script>
import footGuide from "src/components/footer/footGuide";
import headTop from "src/components/header/newHead";
import noneList from "./noneData";
import loading from "../../components/common/loading";
import { Toast } from "mint-ui";
import { getStore } from "../../config/mUtils";
import { MessageBox } from "mint-ui";

export default {
  name: "shopCar-index",
  data() {
    return {
      headTitle: "购物车",
      IsBuy: false,
      sumprice: 0,
      showLoading: true,
      hasItem: false,
      isAll: false,
      shopcartlist: [],
      totalintegralvalue: 0,
      selectednum: 0,
      cartids: [],
      userinfo:{},
      cartidsstr: "",
      hide: "no"
    };
  },
  components: {
    noneList,
    footGuide,
    headTop,
    loading
  },
  methods: {
    goPage(path) {
      this.$router.push({
        path: path
      });
    },
    search(event, index) {
      var _this = this;
      var ss = this.shopcartlist[index].pronum;
      var id = this.shopcartlist[index].id;
      MessageBox.confirm("是否确定更改数量?")
        .then(action => {
          _this.$axios
            .post("app.updatenum.agent.shopcart", { id: id, pronum: ss })
            .then(p => {
              if (p.data.Code == "100") {
                Toast({
                  message: "修改成功",
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              } else {
                Toast({
                  message: "很抱歉亲~，网络出现错误",
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              }
            });
        })
        .catch(() => {});
    },

    getshopcartlist() {
      this.$axios
        .get("app.get.agent.shopcartlist", {
          params: {
            agentid: this.userinfo.id
          }
        })
        .then(p => {
          this.showLoading = false;
          this.shopcartlist = p.data.Data;
          this.sumprice = 0;
          this.shopcartlist.forEach(p => {
            // if (this.IsBuy) {
            //   this.sumprice += (p.vipprice - 20) * p.pronum;
            // } else {
              this.sumprice += p.vipprice * p.pronum;
            // }
          });
          if (this.shopcartlist.length > 0) {
            this.hasItem = false;
          } else {
            this.hasItem = true;
          }
        });
    }, //获取购物车列表
    minus(id, index) {
      if (this.shopcartlist[index].pronum - 1 > 0) {
        this.showLoading = true;
        this.$axios
          .post("app.update.agent.shopcart", {
            id: id,
            pronum: 1,
            dealtype: "Minus"
          })
          .then(p => {
            if (p.data.Code == "100") {
              this.showLoading = false;
              this.shopcartlist[index].pronum =
                Number(this.shopcartlist[index].pronum) - 1;
              this.getshopcartlist();
            } else {
              Toast({
                message: "很抱歉亲~，网络出现错误",
                iconClass: "iconfont icon-cuo",
                duration: 1000
              });
            }
          });
      } else {
        MessageBox.confirm("已达到最小数量,是否自动移除该项?")
          .then(action => {
            this.showLoading = true;
            this.$axios.post("app.del.agent.shopcart", { id: id }).then(p => {
              if (p.data.Code == "100") {
                this.showLoading = false;
                this.shopcartlist.splice(index, 1);
                if (this.shopcartlist.length > 0) {
                  this.hasItem = false;
                  this.getshopcartlist();
                } else {
                  this.hasItem = true;
                }
              } else {
                Toast({
                  message: "很抱歉亲~，网络出现错误",
                  iconClass: "iconfont icon-cuo",
                  duration: 1000
                });
              }
            });
          })
          .catch(() => {});
      }
    }, //加
    add(id, index) {
      this.showLoading = true;
      this.$axios
        .post("app.update.agent.shopcart", {
          id: id,
          pronum: 1,
          dealtype: "Add"
        })
        .then(p => {
          if (p.data.Code == "100") {
            this.showLoading = false;
            this.shopcartlist[index].pronum =
              Number(this.shopcartlist[index].pronum) + 1;
            this.getshopcartlist();
          } else {
            Toast({
              message: "很抱歉亲~，网络出现错误",
              iconClass: "iconfont icon-cuo",
              duration: 1000
            });
          }
        });
    }, //减
    gosettlement() {
      this.shopcartlist.forEach(element => {
        this.cartids.push(element.id); //添加已勾选的礼品ID
      });
      this.cartidsstr = this.cartids.join(",");
      if (this.shopcartlist.length > 0) {
        this.$router.push({
          path: "/exchange",
          query: { type: 2, cartids: this.cartidsstr }
        });
      } else {
        Toast({
          message: "您还没有选择宝贝哦~",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
      }
    },
    //判断当前用户是否购买眼霜
    Iscount() {
      this.$axios
        .get("app.get.iscount", {
          params: {
            agentid: this.userinfo.id
          }
        })
        .then(p => {
          this.IsBuy = p.data.Data;
        });
    }
  },
  created() {
    if( getStore("userInfo")!=null)
    {
    this.userinfo = getStore("userInfo");
    }
    //this.Iscount();
    this.getshopcartlist();
    this.hide = this.$route.query.hide;
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.placeholder-footer {
  width: 100%;
  height: 4.5rem;
}

.empty {
  .iconfont {
    font-size: 2.13rem;
    color: #bfbfbf;
  }
}

.main {
  padding: 0.652174rem;
  background-color: white;
  margin: 0.434783rem 0;
  > div:nth-child(1) {
    width: 3.478261rem;
    height: 3.478261rem;
    overflow: hidden;
    margin-right: 0.652174rem;
    img {
      width: 3.47826rem;
      height: 3.47826rem;
    }
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 3.478261rem;
    font-size: 0.608695rem;

    .a1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    > div {
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        width: 1.086956rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        color: white;
        font-size: 0.8rem;
        background-color: #0081ff;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        text-align: center;
      }

      span:nth-child(2) {
        width: 1.391304rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        color: rgba(16, 16, 16, 0.4);
        font-size: 0.77rem;
        padding: 0 0.217391rem;
        background-color: #f3f3f3;
        border-radius: 0.1rem;
        text-align: center;
      }

      span:nth-child(3) {
        width: 1.086956rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        color: white;
        font-size: 0.9rem;
        background-color: #0081ff;
        border-top-right-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
        text-align: center;
      }
    }
  }
}

.btn-primary {
  width: 6.260869rem;
  height: 1.173913rem;
  line-height: 1.173913rem;
  border-radius: 0.1rem;
  color: white;
  text-align: center;
  background-color: #0081ff !important;
  padding: 0;
}
.closeBox {
  width: 100%;
  position: fixed;
  bottom: 2.2rem;
  font-size: 0.782608rem;

  > div {
    width: 100%;
    height: 1.92rem;
    line-height: 1.92rem;
    font-size: 0.782608rem;
    text-align: right;
    padding-right: 0.5rem;
    margin-bottom: 0.5rem;
    color:#888888;
  }
  .closeBtn {
    width: 100%;
    height: 1.92rem;
    font-size: 0.782608rem;
    background: #0081ff;
    color: white;
  }
}

.goods-item {
  padding: 0.3rem 0.6rem;
  background: white;
  margin-bottom: 0.3rem;

  .item-con {
    flex: 1;
  }

  .item-first {
    img {
      width: 3.41rem;
      border-radius: 0.17rem;
      margin-right: 0.85rem;
    }

    .product-name {
      font-size: 0.6rem;
    }

    .brand-name {
      font-size: 0.51rem;
      color: #888888;
    }
  }

  .item-second {
    span {
      color: rgba(136, 136, 136, 1);
      font-size: 0.51rem;
    }
  }

  .item-third {
    div:nth-child(1) {
      span:nth-child(1) {
        color: rgba(251, 93, 87, 1);
        font-size: 0.77rem;
      }

      span:nth-child(2) {
        color: rgba(16, 16, 16, 0.4);
        font-size: 0.51rem;
      }
    }

    div:nth-child(2) {
      span:nth-child(1) {
        color: #ddd;
        font-size: 0.8rem;
      }

      span:nth-child(2) {
        color: rgba(16, 16, 16, 0.4);
        font-size: 0.77rem;
      }

      span:nth-child(3) {
        color: #3190e8;
        font-size: 0.9rem;
      }
    }
  }
}

.calc-con {
  width: 100%;
  height: 1.92rem;
  position: fixed;
  bottom: 2.2rem;
  background: white;

  .getAll {
    color: rgb(16, 16, 16);
    font-size: 0.6rem;
    text-align: center;
  }

  .calc-money {
    span {
      color: rgb(16, 16, 16);
      font-size: 0.51rem;
      text-align: center;
    }

    span:nth-child(2) {
      color: #e51c23;
      font-size: 0.68rem;
      text-align: center;
    }

    span:nth-child(3) {
      color: #101010;
      font-size: 0.51rem;
      text-align: center;
    }
  }

  .calc-over {
    width: 5.12rem;
    height: 100%;
    background-color: rgba(251, 93, 87, 1);
    color: white;
    font-size: 0.6rem;
    text-align: center;
  }
}

.hide {
  bottom: 0;
}
</style>
