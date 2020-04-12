<template>
  <div>
    <div class="evaHead">
      <p>
        <span class="iconfont icondui1"></span>
        <span>{{abc==2?"发布成功":"交易成功"}}</span>
      </p>
      <p>{{"本次体验分享成功"}}</p>
      <div>
        <button class="btn" @click="goPage('/mallIndex')">返回首页</button>
        <button
          class="btn"
          @click="goPage(abc==2?'/allEvaluate':(abc==1?'/lookEvaluate':'/orderDetail'))"
        >{{
          abc==2?"查看评论":(abc==1?"立即评价":"订单详情")}}</button>
      </div>
    </div>
    <div class="a">
      <div>
        <span class="aItem"></span>
        <span>推荐产品</span>
        <span class="aItem"></span>
      </div>
    </div>
    <div class="b">
      <div class="bItem">
        <img :src="swiper_url" alt="">
        <p>去评价一下本次购物体验吧</p>
        <div>
          <span style="font-weight:bold;color:red;">￥132</span>
          <s style="color:#666466;font-weight:normal;">￥123</s>
          <span class="iconfont iconzuzhijiegou"></span>
          <span class="iconfont icontianchongxing-"></span>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "../../config/mUtils";
import { InfiniteScroll, Toast, Lazyload } from "mint-ui";
import swiper from "src/images/swiper.jpg";
export default {
  data() {
    return {
      // 动态swiper本地图片
      swiper_url: swiper,

      bannerlist: [
        {
          BannerImg: "",
          BannerName: "4",
          Id: 6,
          LoadUrl: null
        },
        {
          BannerImg: "",
          BannerName: "4",
          Id: 7,
          LoadUrl: null
        },
        {
          BannerImg: "",
          BannerName: "4",
          Id: 8,
          LoadUrl: null
        }
      ],
      datalist_zp: [],
      orderid:0,
      integral: 3000,
      giftlist: [],
      pageindex: 1,
      bottomLine: false,
      userInfo: {},
      statistics: {},
      datalist_xy: [],
      loading: false,
      cssIndex: 1,
      code: "",
      abc: 1,
      ordernum: "",
      id: 0,
      proid:0,
    };
  },
  components: {},
  computed: {},
  methods: {
    goPage(url) {
      this.$router.push({
        path: url,
         query: {
          ordernum: this.ordernum,
          id: this.id,
          orderid:this.orderid,
          agentid:this.agentid,
          proid:this.proid,
          agentype:1,
         }
      });
    },
    // 动态swiper本地图片
    swiper() {
      this.swiper_url = swiper;
    },

    goItem(index) {
      if (index == 1) {
        this.$router.push({
          path: "/inviteAgents"
        });
      } else if (index == 2) {
        this.$router.push({
          path: "/myTeam"
        });
      } else if (index == 3) {
        this.$router.push({
          path: "/orderIndex?agentype=1&tabIndex=0"
        });
      } else if (index == 4) {
        this.$router.push({
          path: "/rebate"
        });
      }
    },

    changeCss(index) {
      this.cssIndex = index;
    },
    bindbanner() {
      this.$nextTick(function() {
        new Swiper(".swiper-container", {
          pagination: ".swiper-pagination",
          loop: true,
          autoplay: 3000
        });
      });
    },

    gotourl(url) {
      if (url) {
        window.location = "http://" + url;
      }
    },

    godetail(id) {
      this.$router.push({ path: "/giftDetail", query: { id: id } });
    },
    //获取产品信息
    getProductList() {
      this.$axios
        .get("app.get.productlist", {
          params: {
            agentid: this.userInfo.id,
            levelid: this.userInfo.levelid,
            pageindex: this.pageindex,
            pagesize: 4
          }
        })
        .then(p => {
          p.data.Data.forEach(element => {
            if (element.protype == 1) {
              this.datalist_zp.push(element);
            } else {
              this.datalist_xy.push(element);
            }
          });
        });
    },
    log() {
      this.$router.push({
        path: "/recharge"
      });
    },
    getopenid() {
      this.$axios
        .get("wx.get.wxopenid", {
          params: {
            code: this.code
          }
        })
        .then(p => {
          if (p.data.Data.openid) {
            this.openid = p.data.Data.openid;
            setStore("openid", { openid: this.openid });
          } else {
            location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd382f9e5091831d3&redirect_uri=" +
              encodeURIComponent("http://mq.m12315.com/wap/#/mallIndex") +
              "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
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
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.getProductList();
    this.ordernum = this.$route.query.ordernum;
    this.id = this.$route.query.id;
    this.agentid=this.$route.query.agentid;
    this.proid=this.$route.query.proid;
    // console.log(this.ordernum);
    //   this.code = this.GetQueryString("code");
    // if (!this.code) {
    //   location.href =
    //     "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd382f9e5091831d3&redirect_uri=" +
    //     encodeURIComponent(location.href) +
    //     "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    // }else{
    //      this.getopenid();
    // }
  },
  mounted() {
    this.userInfo = getStore("userInfo");
    this.bindbanner();
    this.abc = this.$route.query.abc;
    this.orderid=this.$route.query.orderid;
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";

.evaHead {
  text-align: center;
  background-color: white;
  padding: 0.5rem;
  font-size: 0.608rem;
  > p:nth-child(1) {
    > span:nth-child(1) {
      color: red;
      font-size: 1rem;
    }
    > span:nth-child(2) {
      font-size: 0.782608rem;
    }
  }
  > p:nth-child(2) {
    color: #6f6f6f;
    margin: 0.5rem 0;
  }

  .btn {
    border-radius: 0.6rem;
    color: #e9423a;
    border: 1px solid #e9423a;
    background-color: white;
    margin: 0 0.5rem;
  }
}

.iconSvg {
  font-size: 2.3rem;
}

.changeCss {
  padding: 0.43rem 0.695652rem;

  span:nth-child(1) {
    font-size: 0.68rem;
    color: #666666;
  }
}

.a {
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.608rem;
  color: #6f6f6f;
  .aItem {
    width: 2rem;
    display: inline-block;
    border-top: 1px solid #6f6f6f;
    vertical-align: middle;
  }
}
.b {
  width: 100%;

  padding: 1%;
  padding-bottom: 2.652174rem;
  font-size: 0.3rem;

  .bItem {
    width: 49%;
    padding: 0.3rem;
    padding-bottom: 1.5rem;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 0.3rem;
    float: left;
    color: rgb(16, 16, 16);
    position: relative;
    font-size: 0.608695rem;
  }
  .bItem:nth-child(2n) {
    float: right;
  }
  .bItem img {
    width: 100%;
    height: 6.956521rem;
  }
  .bItem div {
    width: 92%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666466;
    position: absolute;
    bottom: 0.3rem;
    font-size: 0.6956521rem;
  }
}
</style>
