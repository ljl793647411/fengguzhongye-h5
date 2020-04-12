<template>
  <div class="box">
    <div class="starGrade">
      <img src="../../images/activity.png" alt="">
      <span>描述相符</span>
      <star v-on:starMarkChange="starMarkChange"></star>
      <span>{{mark}}</span>
    </div>
    <div class="list">
      <span>评价</span>
      <button
        class="btn"
        v-for="(item,index) in btnList"
        :key="index"
        @click="btnActive(index)"
        :class="{active:tabIndex==index}"
      >{{item.name}}</button>
    </div>
    <div class="content">
      <textarea
        name=""
        id=""
        cols="50"
        rows="10"
        placeholder="宝贝满足您的期待吗？说说您的使用心得，分享给想买的他们吧"
        v-model="notedata"
      ></textarea>
      <!-- <input accept="image/*" type="file" name="name" value /> -->
      <div>
        <img :src="voucher" style="width: 20%;" alt="">
        <input
          style="position:absolute;width:70px;height:70px;opacity:0;z-index: 10"
          @change="uploadimg($event.target)"
          accept="image/*"
          type="file"
          name="name"
          value=""
        >
        <span style="font-size: 50px;">+</span>
      </div>
    </div>
    <div style="height:1.5rem;"></div>
    <div class="footer" @click="goPage('/issueEvaluate?abc=2')">发布</div>
  </div>
</template>

<script>
import { getStore, setStore } from "../../config/mUtils";
import { InfiniteScroll, Toast, Lazyload } from "mint-ui";
import star from "src/components/common/star";

export default {
  data() {
    return {
      userinfo: {},
      voucher: "",
      info: {},
      order_id: 0,
      btnList: [
        {
          id: "0",
          name: "好评"
        },
        {
          id: "1",
          name: "中评"
        },
        {
          id: "2",
          name: "差评"
        }
      ],
      tabIndex: 0,
      mark: "非常好",
      notedata: "",
      abcd: 5,
      time: ""
    };
  },
  components: {
    star
  },
  computed: {},
  methods: {
    starMarkChange(val) {
      if (val == 1) {
        this.mark = "差";
      } else if (val == 2) {
        this.mark = "一般";
      } else if (val == 3) {
        this.mark = "一般";
      } else if (val == 4) {
        this.mark = "一般";
      } else {
        this.mark = "非常好";
      }
      // console.log(val);
      this.abcd = val;
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
    toBFun: function() {
      this.$router.push({ name: "B", params: { name: "xy", age: 22 } });
    },
    getorderlist() {
      this.$axios
        .get("app.get.remark", {
          params: {
            order_id:this.ordernum
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            if(p.data.Data.Data){
            // console.log(p.data.Data.Data[0]);
            this.proinfo = p.data.Data.Data;
            Toast({
                message: "这个订单您已经评价过了",
                duration: 1500
              });
            }
          }else{

              Toast({
                message: "欢迎您来评价商品",
                duration: 1500
              });
            }
        });
    },
    goPage(url) {        
      //内容
      this.info.remark = this.notedata;
      this.info.proid=this.info.proid;
      this.info.order_id=this.ordernum;
      //用户
      this.info.remark_uid = this.info.agentid;
      // console.log(this.notedata);
      //好评
      this.info.remark_type = this.tabIndex;
      //图片
      this.info.remark_img = this.voucher;
      //星级
      this.info.remark_star = this.abcd;
      this.$axios.post("app.add.order.remark", this.info).then(p => {
        if (p.data.Code == "100") {
          Toast({
            message: "评论成功~",
            iconClass: "iconfont icon-dui",
            duration: 1000
          });

          //this.maskShow = false;
          this.$router.push({
            path: url+"&id="+this.info.proid
          });
        } else {
          Toast({
            message: "评论失败，很抱歉亲~",
            iconClass: "iconfont icon-cuo",
            duration: 1000
          });
        }
      });
    },
    confirmreceive(id) {
          this.$axios.post("app.remarkok.order", { id: id }).then(p => {
            if (p.data.Code == "100") {
              Toast({
                message: "感谢您来评价",
                iconClass: "iconfont icon-dui",
                duration: 1500
              });
              //this.tab(this.tabIndex);
            } else {
              Toast({
                message: "评价出错了~",
                iconClass: "iconfont icon-cuo",
                duration: 1500
              });
            }
          });
    },
    btnActive(index) {
      this.tabIndex = index;
    }
  },
  created() {
    this.userInfos = getStore("userInfo");
    this.ordernum = this.$route.query.ordernum;
    //产品id
    this.info.proid = this.$route.query.orderid;
    //代理id
    this.info.agentid=this.userInfos.id;
    //订单修改id
    this.info.did=this.$route.query.did;
    // this.confirmreceive(this.info.did);
    this.userinfo = getStore("userInfo");
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.box {
  background-color: white;
  .starGrade {
    font-size: 0.608rem;
    color: #6f6f6f;

    span {
      font-weight: bold;
    }
    img {
      width: 35px;
      height: 35px;
      vertical-align: middle;
      margin: 0.2rem 0.5rem;
    }
  }
  .list {
    padding: 0.5rem;
    font-size: 0.608rem;
    vertical-align: middle;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    > span {
      margin-right: 0.5rem;
    }
    .btn {
      background-color: #fff5f4;
      color: black;
      margin-right: 0.5rem;
    }

    .active {
      color: white;
      background-color: #0081ff;
    }
  }
  .content {
    padding: 0.5rem;

    > input {
      position: absolute;
      width: 70px;
      height: 70px;
      opacity: 0;
      z-index: 10;
    }
    > span {
      font-size: 50px;
      display: inline-block;
      width: 70px;
      height: 70px;
      text-align: center;
      line-height: 70px;
      border: 1px dashed #888888;
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
}
</style>
