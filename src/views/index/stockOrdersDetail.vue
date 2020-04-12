<template>
  <div id="myTeam">
    <div class="teamList">
      <div class="teamLisLeft">
        <svg class="a icon iconSvg" aria-hidden="true">
          <use xlink:href="#iconxunzhang-" />
        </svg>
        <!-- <span v-else class="a">{{index+1}}</span> -->
        <div class="b"> <img
            :src=orderdetail.fromagentavatar
            style="width:40px;height:40px;"
            alt
          /></div>
        <div class="c">
          <div class="cTop">
            <span>{{orderdetail.fromagentname}}</span>
            <span>{{orderdetail.fromagentlevelname}}</span>
          </div>
          <div class="cBottom">
            <span>授权码：{{orderdetail.fromagentserialnum}}</span>

            <span>
              库存：
              <span>{{orderdetail.fromagentinventory?orderdetail.fromagentinventory:0}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="itemList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <a>
        <div class="head flexBetween">
          <span>单号：{{orderdetail.ordernum}}</span>
           <span v-if="orderdetail.f_logistics==5">已关闭</span>
          <span v-if="orderdetail.f_examine==1&&orderdetail.f_logistics!=5">待审核</span>
           <span v-else-if="orderdetail.f_examine==2&&orderdetail.f_logistics!=5">审核通过</span>
            <span v-else-if="orderdetail.f_examine==3&&orderdetail.f_logistics!=5">审核不通过</span>
        </div>
        <div class="abc flex"  v-for="(gift,g_index) in orderdetail.prolist" :key="g_index">
          <div class="flexCenter">
            <img :src="gift.proimg" alt />
          </div>

          <div class="intur">
            <div class="inturLeft">{{gift.proname}}</div>
            <div class="inturRight" style="padding-left: 130px;">
              <div>￥{{gift.proprice}}</div>
              <div>x{{gift.pronum}}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div>
            <span>
              总金额：
              <span>￥{{orderdetail.totalmoney}}</span>
            </span>
          </div>
        </div>
      </a>
    </div>
    <div class="voucher">
      <p>支付凭证</p>
      <img :src="orderdetail.voucher" alt />
    </div>

    <div class="remark">
      <p>充货备注：</p>
      <textarea name id cols="30" readonly v-model="orderdetail.remark" rows="10" ></textarea>
    </div>
    <div class="tabList">
      <table>
        <tr>
          <td>订单编号:</td>
          <td>
            <span>{{orderdetail.ordernum}}</span>
            <span class="copy">复制</span>
          </td>
        </tr>
        <tr>
          <td>交易方式:</td>
          <td>线下支付</td>
        </tr>
        <tr>
          <td>创建时间:</td>
          <td>{{orderdetail.create_date}}</td>
        </tr>
        <tr>
          <td>付款时间:</td>
          <td>{{orderdetail.create_date}}</td>
        </tr>
        <tr>
          <td>审核时间:</td>
          <td>{{orderdetail.create_date}}</td>
        </tr>
      </table>
    </div>

    <div style="height:1.869565rem;"></div>
    <div class="footFlex" v-if="agentype==1">
        <div @click="cancel" style="width: 100%;" v-if="orderdetail.f_examine==1&&orderdetail.f_logistics!=5">关闭订单</div>
    </div>
    <div class="footFlex" v-if="orderdetail.f_examine==1&&agentype==2">
        <div @click="submitexmain(3)">不通过</div>
        <div @click="submitexmain(2)">通过</div>
    </div>
  </div>
</template>

<script>
  import {Toast, MessageBox, Picker,Popup } from "mint-ui";
  import {getStore} from "../../config/mUtils";
  import headTop from "src/components/header/newHead";
export default {
  data() {
    return {
      audit: true,
      userinfo:{},
      orderdetail:{},
      agentype:1
    };
  },
  components: {},
  methods: {
  getorderdetail(id) {
        this.$axios
          .get("app.get.order.detail", {
            params: {
              id: id
            }
          })
          .then(p => {
            this.orderdetail = p.data.Data;
          });
      }, 
      cancel(){
            MessageBox.confirm("确定取消该订单吗？").then((res) => {
          if (res == 'confirm') {
            this.$axios.post('app.cancel.order', {id: this.$route.query.id}).then((p) => {
              if (p.data.Code == 100) {
                Toast({
                  message: '取消成功',
                  iconClass: 'iconfont icon-dui',
                  duration: 1500
                });
                this.getorderdetail(this.$route.query.id);
              } else {
                Toast({
                  message: '取消失败',
                  iconClass: 'iconfont icon-cuo',
                  duration: 1500
                });
              }
            })
          }
        });
      },
      submitexmain(f_examine){
        var msg="";
        if(f_examine==2){
          msg="亲，确定审核通过吗？";
        }else if(f_examine==3){
           msg="亲，确定审核不通过吗？"
        }
          MessageBox.confirm(msg).then((res) => {
          if (res == 'confirm') {
            this.$axios.post('app.examine.cloudorder', {id: this.$route.query.id,f_examine:f_examine}).then((p) => {
             
              if (p.data.Code == 100) {
                Toast({
                  message: '审核成功',
                  iconClass: 'iconfont icon-dui',
                  duration: 1500
                });
                this.getorderdetail(this.$route.query.id);
              } 
              else if(p.data.Code == 114){
                Toast({
                  message: '库存不足',
                  iconClass: 'iconfont icon-cuo',
                  duration: 1500
                });
              }
              else {
                Toast({
                  message: '操作失败',
                  iconClass: 'iconfont icon-cuo',
                  duration: 1500
                });
              }
            })
          }
        });
      }
  },
  created() {
     this.userinfo = getStore("userInfo");
     this.agentype=this.$route.query.agentype;
      this.getorderdetail(this.$route.query.id);
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";


.iconSvg {
  font-size: 1rem;
}
.main {
  padding: 0.5rem;
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
      text-align: right;
    }
    > div {
      span {
        display: inline-block;
      }
    }
  }
}

.teamList {
  height: 3.478rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 0.608rem;
  .teamLisLeft {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
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
    }
    .c {
      flex-grow: 1;
    }
    .cTop span:nth-child(2) {
      display: inline-block;
      width: 2.2608rem;
      height: 0.869rem;
      font-size: 0.521rem;
      color: red;
      border: solid 0.05rem red;
      border-radius: 0.1rem;
      text-align: center;
    }
    .cBottom {
      font-size: 0.521rem;
      display: flex;
      justify-content: space-between;
      color: #888888;
      > span:nth-child(2) {
        margin-right: 0.5rem;
        position: relative;
        top: -0.25rem;
        > span {
          color: red;
          font-weight: bold;
          font-size: 0.782608rem;
        }
      }
    }
  }
}
.voucher {
  width: 100%;
  background-color: white;
  padding: 0.5rem;
  font-size: 0.695652rem;
  margin: 0.5rem 0;
  > img {
    width: 100%;
    margin-top: 0.5rem;
  }
}
.remark {
  height: 4.782608rem;
  background-color: white;
  padding: 0.434783rem 0.652174rem;
  margin: 0.434783rem 0;
  p {
    font-size: 0.695652rem;
    margin-bottom: 0.5rem;
  }
  textarea {
    width: 100%;
    height: 3rem;
    color: #888888;
  }
}
.tabList {
  width: 100%;
  background-color: white;
  margin: 0.3rem 0;
  font-size: 0.608696rem;
  padding: 0.434783rem 0.652174rem;
  color: #888888;

  > table {
    width: 100%;

    .copy {
      display: inline-block;
      width: 2.434782rem;
      height: 1.086956rem;
      line-height: 1.086956rem;
      border: 0.05rem solid #888888;
      text-align: center;
      border-radius: 0.2rem;
    }
    > tr:nth-child(1) td {
      height: 1.086956rem;
    }
    > tr td:nth-child(1) {
      width: 30%;
      text-align: left;
    }
    > tr td:nth-child(2) {
      width: 70%;
      text-align: right;
    }
  }
}
.itemList {
  /*padding-top: 2.1rem;*/
  margin: 0.5rem 0;
  > a {
    display: block;
    color: black;
    background-color: white;
    margin-bottom: 0.5rem;

    .head {
      padding: 0.26087rem 0.652174rem;

      > span:nth-child(1) {
        font-size: 0.521739rem;
        color: #888888;
      }

      > span:nth-child(2) {
        font-size: 0.608696rem;
        color: #d29b48;
      }
    }

    .abc {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 0.26087rem 0.652174rem;
      font-size: 0.608695rem;
      > div:nth-child(1) {
        width: 2.608696rem;
        height: 2.608696rem;
        overflow: hidden;

        > img {
          width: 100%;
        }
      }

      > div:nth-child(2) {
        padding-left: 0.652174rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div:nth-child(1) {
          width: 80%;
        }

        > div:nth-child(2) {
          text-align: right;
          > div:nth-child(1) {
            color: #e51c23;
          }
        }
      }
    }

    .footer {
      padding: 0 0.652174rem;
      width: 100%;
      > div {
        text-align: right;
        > span {
          font-size: 0.521739rem;
          color: #888888;
          > span {
            color: #e51c23;
          }
        }
      }
    }
  }
}
.footFlex{
    width: 100%;
    height: 1.869565rem;
    text-align: center;
    line-height: 1.869565rem;
    color: white;
    display: flex;
    position: fixed;
    bottom: 0;
    font-size: 0.608695rem;
    div{
        width: 50%;
        height: 100%;
    }
    >div:nth-child(1){
        background-color: #FF9800;
    }
    >div:nth-child(2){
        background-color: #E9423A;
    }
}
</style>



