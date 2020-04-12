<template>
  <div id="myTeam">
    <div class="per">
      <div class="perLeft">充值方向</div>
      <div class="perRight" @click="show">
        直属上级
        <div v-if="isShow" class="superior">直属上级</div>
      </div>
    </div>
    <div class="info">
      <div
        class="b"
        :style="{backgroundImage: 'url(' + (agentinfo.avatar ? agentinfo.avatar : '') + ')'}"
      >{{agentinfo.avatar ? '' : '头像'}}</div>
      
      <div>
        <p>
          {{agentinfo.agentname}}
          <span>{{agentinfo.levelname}}</span>
        </p>
        <p>联系电话：{{agentinfo.telphone}}</p>
      </div>
    </div>

    <div class="main flex" v-for="(item,index) in prolist" v-bind:key="item.id">
      <div class="flexCenter">
        <img :src="item.proimg" alt />
      </div>
      <div class="flexGrow">
        <div>{{item.proname}}</div>
        <div class="a1">
          <div style="color:red;">￥{{item.proprice}}</div>
          <!--<div>库存：{{item.stocknum}}</div>-->
          <div>
            <div class="flexCenter" v-if="item.protype==1" style="touch-action: none;">
              <span @click="minus(index)">-</span>
              <input
                style="width: 45px;text-align:center;"
                type="num"
                @input="search($event,index)"
                v-model="item.pronum"
              />
              <span @click="add(index)">+</span>
            </div>
            <div v-else>
              <span style="background-color: gainsboro;width: 45px;">{{item.pronum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="totalMoney">
      总金额：&emsp;
      <span>￥{{totalmoney}}</span>
    </div>

    <div class="voucher">
      <p>上传支付凭证</p>
      <div>
        <img :src="voucher" style="width: 20%;" alt />
        <input
          style="position:absolute;width:70px;height:70px;opacity:0;z-index: 10"
          @change="uploadimg($event.target)"
          accept="image/*"
          type="file"
          name="name"
          value
        />
        <span style="font-size: 50px;">+</span>
      </div>
    </div>

    <div class="remark">
      <p>充货备注：</p>
      <textarea name id cols="30" v-model="remark" rows="10" placeholder="请输入订单备注信息"></textarea>
    </div>

    <div style="height: 1.913043rem;"></div>
    <div class="recharge" @click="submit">提交</div>
  </div>
</template>

<script>
import { Toast, MessageBox, Picker, Popup } from "mint-ui";
import { setStore, getStore } from "../../config/mUtils";
import headTop from "src/components/header/newHead";
export default {
  data() {
    return {
      audit: true,
      isShow: false,
      bools:false,
      userinfo: {},
      agentinfo: {},
      prolist: [],
      prolist_data: [],
      voucher: "",
      totalmoney: 0,
      remark: "",
      orderinfo: {},
      pronum:0
    };
  },
  components: {},
  methods: {
    search(event, index) {
      this.totalAmountCalculation(this, index);
    },
    goRecharge() {
      this.$router.push({
        path: "/stockOrders"
      });
    },
    totalAmountCalculation(_this, index) {
      if (_this.prolist[index].select_sample != 0) {
        var samplenum = _this.getbeishu(_this.prolist[index].pronum);
        _this.prolist_data.forEach(element => {
          if (
            element.protype == 2 &&
            element.id == _this.prolist[index].select_sample
          ) {
            let sample_index = -1;
            for (let index = 0; index < _this.prolist.length; index++) {
              if (_this.prolist[index].proid == element.id) {
                sample_index = index;
                _this.prolist[index].pronum = samplenum;
              }
            }
            if (samplenum == 0 && sample_index != -1) {
              _this.prolist.splice(sample_index, 1);
            } else if (sample_index == -1 && samplenum > 0) {
              _this.prolist.push({
                proid: element.id,
                proname: element.proname,
                proprice: element.proprice,
                proimg: element.proimg,
                pronum: samplenum,
                stocknum: element.stocknum,
                protype: element.protype,
                select_sample: element.select_sample
              });
            }
          }
        });
      }
      _this.totalmoney = 0;
      _this.prolist.forEach(element => {
        _this.totalmoney = _this.totalmoney + element.pronum * element.proprice;
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
        this.voucher = p.data;
      });
    },
    minus(index) {
      if (this.prolist[index].pronum != 0) {
        this.prolist[index].pronum--;

        this.totalAmountCalculation(this, index);
      } else {
        Toast({
          message: "受不了了，宝贝不能再减少了哦",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
      }
    },
    getbeishu(pronum) {
      let beishu = 0;
      for (let index = 1; index <= pronum; index++) {
        if (index % 5 == 0) {
          beishu++;
        }
      }
      return beishu;
    },
    add(index) {
      this.prolist[index].pronum++;
      this.totalAmountCalculation(this, index);
    },
    show() {
      this.isShow = !this.isShow;
    },
    getList() {
      //获取分类列表
      this.$axios
        .get("app.product.show", {
          params: {
            agentid: getStore("userInfo").id,
            leveid: getStore("userInfo").levelid,
            protype:1
          }
        })
        .then(p => {
          this.prolist_data = p.data.Data;
          p.data.Data.forEach(element => {
            if (element.protype == 1) {
              this.prolist.push({
                proid: element.id,
                proname: element.proname,
                proprice: element.proprice,
                proimg: element.proimg,
                pronum:  this.pronum,
                stocknum: element.stocknum,
                protype: element.protype,
                select_sample: element.select_sample
              });
            }
          });
        });
    },
    getagentinfo() {
      this.$axios
        .get("get.agent.info", {
          params: {
            id: getStore("userInfo").superior
          }
        })
        .then(p => {
          this.agentinfo = p.data.Data;
        });
    },
    submit() {
      this.orderinfo.fromagentid = this.userinfo.id;
      this.orderinfo.toagentid = this.agentinfo.id;
      this.orderinfo.remark = this.remark;
      this.orderinfo.create_userid = this.userinfo.create_userid;
      this.orderinfo.voucher = this.voucher;
      this.orderinfo.agnet_levelid = this.userinfo.levelid;
      var _this = this;
      this.orderinfo.prolist = [];
      this.prolist.forEach(element => {
        if (element.pronum > 0) {
          _this.orderinfo.prolist.push({
            id: element.id,
            proid: element.proid,
            proname: element.proname,
            pronum: element.pronum,
            proprice: element.proprice,
            proimg: element.proimg
          });
        }
      });

      if (this.orderinfo.prolist.length == 0) {
        Toast({
          message: "请选择产品",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      }
      if (!this.voucher) {
        Toast({
          message: "请上传打款凭证",
          iconClass: "iconfont icon-cuo",
          duration: 1000
        });
        return;
      }
      this.$axios.post("app.post.order.add", this.orderinfo).then(p => {
        this.maskShow = false;
        if (p.data.Code == 100) {
          MessageBox.alert("订单提交成功!").then(action => {
            this.$router.push({ path: "/inventory" });
          });
        } else if (p.data.Code == 114) {
          Toast({
            message: p.data.Data,
            iconClass: "iconfont icon-cuo",
            duration: 3000
          });
        } else if (p.data.Code == 115) {
          Toast({
            message: p.data.Data,
            iconClass: "iconfont icon-cuo",
            duration: 3000
          });
        } else {
          Toast({
            message: "下单失败，很抱歉亲~",
            iconClass: "iconfont icon-cuo",
            duration: 1000
          });
        }
      });
    },
    //刷新用户信息
    getagnetinfos() {
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
              this.userInfo = p.data.Data;
              setStore("userInfo", this.userInfo);
            }
          }
        });
    },
      //默认购买数量
    getlevelpronum(leveid)
    {
     let bools=this.$route.query.isbuy;
       //获取分类列表
        if(leveid==2 )
        {
          if(bools=='true')
          {
            this.pronum= 100;
          }
          else
          {
           this.pronum= 800;
          }
        }
        else if(leveid==3)
        {
          if(bools=='true')
          {
             this.pronum= 20;
          }
          else
          {
          this.pronum= 100;
          }
        }
        else if(leveid==4)
        {
          this.pronum= 20;
        }
         else if(leveid==5)
        {
          if(bools=='true')
          {
          this.pronum= 2;
          }else
          {
          this.pronum= 1;
          }
        }
        else
        {
          this.pronum= 1;
        }
         this.$axios
        .get("app.product.show", {
          params: {
            agentid: getStore("userInfo").id,
            leveid: getStore("userInfo").levelid,
            protype:1
          }
        })
        .then(p => {
          this.prolist_data = p.data.Data;
          p.data.Data.forEach(element => {
            if (element.protype == 1) {
               this.totalmoney = this.totalmoney + this.pronum * element.proprice;
            }
          });
        });
    },
  },
  created() {
    this.userinfo = getStore("userInfo");
    this.getagnetinfos();
    this.getagentinfo();
    this.getList();
    this.getlevelpronum(this.userinfo.levelid);
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.b {
  width: 1.739rem;
  height: 1.739rem;
  border-radius: 50%;
  text-align: center;
  line-height: 1.739rem;
  background-color: #cccccc;
  background-size: 100% 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  font-size: 0.608rem;
  margin: 0 0.5rem;
}

.per {
  padding: 0 0.5rem;
  height: 1.304rem;
  border-left: 0.5rem solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 0.05rem solid #eeeeee;
  .perLeft {
    font-size: 0.695rem;
  }
  .perRight {
    width: 4.434782rem;
    height: 1rem;
    text-align: center;
    font-size: 0.608rem;
    color: #bbbbbb;
    border: solid 0.05rem #bbbbbb;
    border-radius: 0.1rem;

    .superior {
      background-color: #5baeec;
      color: white;
      z-index: 99999999;
    }
  }
}
.info {
  display: flex;
  align-items: center;
  background-color: white;
  height: 2.608695rem;
  img {
    width: 1.73913rem;
    height: 1.73913rem;
    border-radius: 50%;
    margin: 0 0.5rem;
  }
  > div {
    > p:nth-child(1) {
      font-size: 0.608rem;

      > span {
        display: inline-block;
        width: 2.260869rem;
        height: 0.869565rem;
        line-height: 0.869565rem;
        border: solid 0.05rem red;
        border-radius: 0.1rem;
        text-align: center;
        color: red;
        font-size: 0.521739rem;
      }
    }
    > p:nth-child(2) {
      font-size: 0.521739rem;
    }
  }
}
.totalMoney {
  width: 100%;
  height: 1.73913rem;
  line-height: 1.73913rem;
  background-color: white;
  margin: 0.5rem 0;
  text-align: right;
  font-size: 0.608695rem;
  > span {
    margin-right: 0.5rem;
    color: #e51c23;
  }
}
.voucher {
  width: 100%;
  // height: 4.782608rem;
  background-color: white;
  padding: 0.5rem;
  font-size: 0.695652rem;
  margin: 0.5rem 0;
  > img {
    width: 2.173913rem;
    height: 2.173913rem;
    margin-top: 0.5rem;
  }
}
.remark {
  width: 100%;
  // height: 4.782608rem;
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

.recharge {
  width: 100%;
  height: 1.913043rem;
  line-height: 1.913043rem;
  background-color: red;
  text-align: center;
  color: white;
  position: fixed;
  bottom: 0;
  font-size: 0.782608rem;
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
      span:nth-child(1),
      span:nth-child(3) {
        width: 1.086956rem;
        height: 1.086956rem;
        line-height: 1.086956rem;
        color: white;
        font-size: 0.8rem;
        background-color: red;
        border-radius: 0.1rem;
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
    }
  }
}
</style>



