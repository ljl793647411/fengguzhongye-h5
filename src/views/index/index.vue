

<template>

  <div>
    <nav class="swiper">
      <div class="swiper-container" v-if="bannerlist.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide food_types_container"
            @click="gotourl(item.LoadUrl)"
            v-for="(item, index) in bannerlist"
            :key="index"
          >
            <img :src="item.BannerImg" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else />
    </nav>

    <div
      class="boxList"
      v-if="userInfo.levelid==2||userInfo.levelid==3||userInfo.levelid==4||userInfo.levelid==5  "
    >
      <div class="boxItem" @click="goItem(1)">
        <svg class="icon iconSvg" aria-hidden="true">
          <use xlink:href="#icondailiyaoqing-copy" />
        </svg>
        <p>邀请代理</p>
      </div>
      <div class="boxItem" @click="goItem(2)">
        <svg class="icon iconSvg" aria-hidden="true">
          <use xlink:href="#iconwodetuandui-copy" />
        </svg>
        <p>我的团队</p>
      </div>
      <div class="boxItem" @click="goItem(3)">
        <svg class="icon iconSvg" aria-hidden="true">
          <use xlink:href="#icondingdanguanli-copy" />
        </svg>
        <p>订单管理</p>
      </div>
      <div class="boxItem" @click="goItem(4)">
        <svg class="icon iconSvg" aria-hidden="true">
          <use xlink:href="#iconfanliguanli-copy" />
        </svg>
        <p>返利管理</p>
      </div>
    </div>

    <div class="activeBox" v-if="userInfo.levelid==6">
      <div>
        <img src="../../images/MM.gif" alt />
      </div>

      <div class="dong">申请成为代理后即可享受商城下单立减20优惠</div>
    </div>

    <!-- <div class="a" v-if="userInfo.levelid==6|| userInfo.levelid==0">
      <div @click="log">
        <span class="aItem"></span>
        <span style="font-weight:bold;">代理快速申请通道</span>
        <span class="aItem"></span>
        <p
          style="font-size:0.5rem;color:#9D9D9D;text-align:left;"
        >申请成为代理后，即可享受商城所有商品下单立减20优惠</p>

        <img
          class="aImg"
          src="http://118.31.244.60:8033/2019111413181804331990d290e43436daa9d1bae20d465b7.jpg"
          alt
        />
      </div>
    </div>-->

    <div class="b">
      <div class="bItem" v-for="(item,sizeindex) in datalist_xy" :key="sizeindex">
        <img :src="item.proimg" alt @click="godetail(item.id)" />
        <p @click="godetail(item.id)">{{item.proname}} {{item.spec}}</p>

        <div>
          <span style="font-weight:bold;color:red;">
            ￥{{item.vipprice}}
            <s style="color:#666466;font-weight:normal;">￥{{item.marketprice}}</s>
          </span>

          <!-- <span class="iconfont iconzuzhijiegou"></span> -->
          <span class="iconfont icontianchongxing-" @click="godshopCar()"></span>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>

    <!-- <div style="width:100%;font-size:0;">
      <img
        :src="item"
        v-for="(item,key) in detailsImg"
        :key="key"
        alt
        style="width:100%;display:block;"
        data-preview-src
        data-preview-group="1"
      />
    </div> -->

    <foot-guide></foot-guide>
    <a
      class="service"
      href="http://p.qiao.baidu.com/cps/chat?siteId=13867631&userId=7911627&cp=http%3A%2F%2Flh.m12315.com%2Fwap&cr=&cw="
    >
      <span class="iconfont iconzaixiankefu"></span>在线客服
    </a>

    <!-- <div class="mui-content">
      <div class="mui-content-padded">
        <p>这是图片放大预览示例，点击如下图片体验全屏预览功能</p>
        <p>
          <img
            src="http://demo.somethingwhat.com/images/flower1.jpg"
            data-preview-src
            data-preview-group="1"
          />
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
// import "src/mui/mui.min.css";
import mui from "src/mui/mui.min.js";
import "src/mui/mui.zoom.js";
import "src/mui/mui.previewimage.js";

import footGuide from "src/components/footer/footGuide";
import "src/plugins/swiper.min.js";
import "src/style/swiper.min.css";
import { getStore, setStore } from "../../config/mUtils";
import { InfiniteScroll, Toast, Lazyload, Popup } from "mint-ui";

// import swiper from "src/images/swiper.jpg";
import banner1 from "src/images/banner1.jpg";
import banner2 from "src/images/banner2.jpg";
import banner3 from "src/images/banner3.jpg";
import banner4 from "src/images/banner6.jpg";
import banner5 from "src/images/banner5.jpg";

import detailsImg6 from "src/images/ys6.jpg";
import detailsImg7 from "src/images/ys7.jpg";
import detailsImg8 from "src/images/ys8.jpg";
import detailsImg9 from "src/images/ys9.jpg";
import detailsImg10 from "src/images/ys10.jpg";
import detailsImg11 from "src/images/ys11.jpg";
import detailsImg12 from "src/images/ys12.jpg";
import detailsImg13 from "src/images/ys13.jpg";
import detailsImg14 from "src/images/ys14.jpg";
import detailsImg15 from "src/images/ys15.jpg";
import detailsImg16 from "src/images/ys16.jpg";
import detailsImg17 from "src/images/ys17.jpg";

export default {
  data() {
    return {
      // 动态swiper本地图片
      // swiper_url: swiper,
      detailsImg: [
        detailsImg6,
        detailsImg7,
        detailsImg8,
        detailsImg9,
        detailsImg10,
        detailsImg11,
        detailsImg12,
        detailsImg13,
        detailsImg14,
        detailsImg15,
        detailsImg16,
        detailsImg17
      ],

      bannerlist: [
        {
          BannerImg: banner1,
          BannerName: "4",
          Id: 6,
          LoadUrl: null
        },
        {
          BannerImg: banner2,
          BannerName: "4",
          Id: 7,
          LoadUrl: null
        },
        {
          BannerImg: banner3,
          BannerName: "4",
          Id: 8,
          LoadUrl: null
        },
        {
          BannerImg: banner5,
          BannerName: "4",
          Id: 0,
          LoadUrl: null
        },
           {
          BannerImg: banner4,
          BannerName: "4",
          Id: 9,
          LoadUrl: null
        },
      ],
      datalist_zp: [],
      integral: 3000,
      giftlist: [],
      pageindex: 1,
      bottomLine: false,
      userInfo: {
        address: null,
        agentname: null,
        area: null,
        avatar: "https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg",
        city: null,
        create_date: "2019-08-30 12:00:26",
        create_userid: 0,
        f_del: 0,
        f_disable: 0,
        id: 0,
        idnum: null,
        level_name: "消费者",
        levelid: 0,
        nickname: null,
        openId: "",
        performance: 0,
        province: null,
        referee_name: null,
        referee_type: 0,
        refereeid: 0,
        remark: null,
        serialnum: "",
        superior: 0,
        superior_name: null,
        team_size: 0,
        telphone: "",
        update_date: "",
        update_userid: 0,
        usertype: 1,
        verifystate: 2,
        wx_code: null,
        wxnum: null
      },
      agent_info: {
        refereeid: 0,
        superior: 0,
        levelid: 0,
        avatar: "https://www.m12315.com/Content/CodeSearchImg/icon_tx_u653.svg",
        telphone: "",
        agentname: "",
        idnum: "",
        wxnum: ""
      },
      statistics: {},
      datalist_xy: [],
      loading: false,
      cssIndex: 1,
      code: ""
    };
  },

  components: {
    footGuide,
    Popup
  },
  computed: {},
  methods: {
    // 动态swiper本地图片
    swiper() {
      this.swiper_url = swiper;
    },

    goItem(index) {
      if (index == 1) {
        this.$router.push({
          path: "/inviteAgents",
          query: {
            agentid: this.userInfo.id,
            openId: this.openId
          }
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
    godshopCar() {
      this.$router.push({ path: "/shopCarIndex", query: {} });
    },
    //获取产品信息
    getProductList() {
      this.$axios
        .get("app.get.productlist", {
          params: {
            agentid: this.userInfo.id,
            levelid: this.userInfo.levelid,
            pageindex: this.pageindex,
            pagesize: 100
          }
        })
        .then(p => {
          p.data.Data.forEach(element => {
            this.datalist_xy.push(element);
          });
        });
    },
    log() {
      this.$axios("bool.agent.estimate", {
        params: {
          id: this.userInfo.id
        }
      }).then(p => {
        //判断是否已经提交升级
        if (p.data.Code == 100) {
          if (p.data.Data) {
            this.$router.push({
              path: "/info"
            });
          } else {
            this.$router.push({
              path: "/infoSucceed"
            });
          }
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
    //获取微信用户信息 注册用户
    wxWarranty() {
      if (!getStore("userInfo")) {
        // this.code = this.GetQueryString("code");
        // if (!this.code) {
        //   location.href =
        //     "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        //     this.$global.appid +
        //     "&redirect_uri=" +
        //     encodeURIComponent(location.href) +
        //     "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
        // } else {
        //   this.$axios
        //     .get("wx.get.wxopenid", {
        //       params: {
        //         code: this.code
        //       }
        //     })
        //     .then(p => {
        //       if (p.data.Data.openid) {
        //         this.agent_info.openId = p.data.Data.openid;
        //         this.agent_info.superior = 0;
        //         this.agent_info.refereeid = 0;
        //         //通过openid 注册用户
        //         this.$axios
        //           .post("wx.agent.login.sales", this.agent_info)
        //           .then(o => {
        //             if (o.data.Code == 100) {
        //               this.userinfo = o.data.Data;
        //               console.log(this.userinfo);
        //               setStore("userInfo", o.data.Data);
        //               this.getProductList();
        //             }
        //           });
        //       }
        //     });
        // }
        this.getProductList();
      } else {
        this.userInfo = getStore("userInfo");
        this.getProductList();
      }
    },
    testadd()
    {
      this.$axios
      .post("app.test.searcg",{
        name:"张三",
        age:1
      })
      .then(p)
      {
        console.log(p);
      }

    },
    testadd2()
    {
      this.$axios
      .post("app.test.insert",{
        name:"张三",
        age:1
      })
      .then(p)
      {
        console.log(p);
      }

    },
  },
  created() {
    this.wxWarranty();
    //this.testadd();
  },
  mounted() {
    this.bindbanner();
    mui.previewImage();
  }
};
</script>


<style lang="scss" scoped>
@import "src/style/mixin";
p {
  font-size: 0.5rem !important;
}
.service {
  position: fixed;
  left: 0.5rem;
  bottom: 3rem;
  font-size: 0.5rem;
  background-color: rgba(136, 136, 136, 0.4);
  width: 3.5rem;
  height: 1.2rem;
  line-height: 1.2rem;
  border-radius: 0.6rem;
  text-align: center;
  color: white;
  font-weight: bold;
  vertical-align: middle;
}
@keyframes dong {
  0% {
    transform: translate(100%, 0px);
  }
  100% {
    transform: translate(-110%, 0);
  }
}

.activeBox {
  width: 100%;
  height: 1.304347rem;
  overflow: hidden;
  background-color: pink;
  font-size: 0.521739rem;
  color: #6f6f6f;
  display: flex;
  align-items: center;
  > div:nth-child(1) {
    background-color: pink;
    text-align: center;
    z-index: 99999;
  }
  img {
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.5rem;
  }
  > div:nth-child(2) {
    animation: dong 5s infinite linear;
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

.swiper-slide {
  width: 100%;
  height: 186px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
    height: 100%;
    // animation: show-car 0.5s;
    transition: left 0.6s, top 0.6s;
    transition-delay: 1s;
  }
}

.boxList {
  display: flex;
  justify-content: center;
  font-size: 0.521739rem;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  height: 5rem;
  background-color: #fff;
  padding-top: 0.5rem;
}
.boxItem {
  width: 25%;
  span {
    font-size: 2rem;
  }
  p {
    margin-top: 0.5rem;
    font-size: 0.608695rem;
  }
}
.a {
  width: 100%;
  background-color: #fff;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  padding: 1rem;
  color: orange;
  .aItem {
    width: 4rem;
    display: inline-block;
    border-top: 0.05rem solid orange;
    vertical-align: middle;
  }
  .aImg {
    width: 100%;
    margin-top: 0.5rem;
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
    font-size: 0.5rem;
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

.box {
  display: flex;
  justify-content: center;
  margin-top: -0.652174rem;

  .innerBox {
    background-color: white;
    width: 13.565217rem;
    height: 2.608696rem;
    border-radius: 0.217391rem;
    z-index: 2;

    .icon-jifen {
      width: 0.913043rem;
      height: 1.130435rem;
    }

    .integral {
      font-size: 0.521739rem;
    }

    .num {
      font-size: 0.869565rem;
    }

    .icon-lipin {
      width: 1.086957rem;
      height: 1.173913rem;
    }

    .record {
      font-size: 0.782609rem;
    }

    .fen {
      color: #eee;
      margin: 0 0.652174rem;
    }
  }
}

.itemList {
  padding: 0.73913rem 0 2.652174rem;

  ul {
    padding: 0 0.695652rem;
    column-count: 2;
    list-style: none;
    column-gap: 0.85rem;
    column-rule: 1px dashed #e7eaed;
    li {
      padding-top: 0.434783rem;
      background-color: white;
      border-bottom: 0.85rem solid #f5f5f5;
      break-inside: avoid; //避免文本块分解成单独的列
      img {
        width: 100%;
        animation: show-car 0.5s;
        transition: left 0.6s, top 0.6s;
        transition-delay: 1s;
      }

      .gift-info {
        padding: 0 0.434783rem 0.434783rem;

        div:nth-child(1) {
          margin-bottom: 0.217391rem;
          font-size: 0.608696rem;
          font-weight: 700;
          color: #101010;
        }

        div:nth-child(2) {
          span:nth-child(1) {
            font-size: 0.782609rem;
            font-weight: 700;
            color: #fb5d57;
            span {
              font-size: 0.521739rem;
              color: #999;
              font-weight: 400;
              padding-left: 0.217391rem;
            }
          }
          span:nth-child(2) {
            font-size: 0.51rem;
            color: #999;
          }
        }
      }
    }
  }
}

.NewItemList {
  padding: 0.73913rem 0 2.652174rem;
  ul {
    list-style: none;
    li {
      background: white;
      padding: 0.43rem 0.43rem 0.43rem 0;
      margin-bottom: 0.43rem;
      display: flex;
      align-items: center;

      .img-con {
        width: 4.26rem;
        height: 4.26rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.21rem;
        img {
          max-width: 4.05rem;
          max-height: 4.26rem;
          animation: show-car 0.5s;
          transition: left 0.6s, top 0.6s;
          transition-delay: 1s;
          border-radius: 0.17rem;
        }
      }
      .gift-info {
        flex: 1;
        padding-left: 0.43rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 2.56rem;

        div:nth-child(1) {
          font-size: 0.6rem;
          font-weight: 700;
          color: #101010;
        }

        div:nth-child(2) {
          span:nth-child(1) {
            font-size: 0.782609rem;
            font-weight: 700;
            color: #fb5d57;
            span {
              font-size: 0.521739rem;
              color: #999;
              font-weight: 400;
              padding-left: 0.217391rem;
            }
          }
          span:nth-child(2) {
            font-size: 0.51rem;
            color: #999;
          }
        }
      }
    }
  }
}

.bottom-line {
  margin-top: 0.65rem;

  span:nth-child(1),
  span:nth-child(3) {
    width: 2.13rem;
    height: 1px;
    background: #e7eaed;
    margin: 0 0.6rem;
  }

  span:nth-child(2) {
    font-size: 0.51rem;
    color: #999;
  }
}

.cssActive {
  color: #fb5d57 !important;
}

@keyframes show-car {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>


<style type="text/css">
.mui-preview-image.mui-fullscreen {
  position: fixed;
  z-index: 20;
  background-color: #000;
}

.mui-preview-header,
.mui-preview-footer {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 10;
}

.mui-preview-header {
  height: 44px;
  top: 0;
}

.mui-preview-footer {
  height: 50px;
  bottom: 0px;
}

.mui-preview-header .mui-preview-indicator {
  display: block;
  line-height: 25px;
  color: #fff;
  text-align: center;
  margin: 15px auto 4;
  width: 70px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  font-size: 16px;
}

.mui-preview-image {
  display: none;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.mui-preview-image.mui-preview-in {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

.mui-preview-image.mui-preview-out {
  background: none;
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

.mui-preview-image.mui-preview-out .mui-preview-header,
.mui-preview-image.mui-preview-out .mui-preview-footer {
  display: none;
}

.mui-zoom-scroller {
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  -webkit-backface-visibility: hidden;
}

.mui-zoom {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.mui-slider .mui-slider-group .mui-slider-item img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
  width: 100%;
}

.mui-android-4-1
  .mui-slider.mui-preview-image
  .mui-slider-group
  .mui-slider-item {
  display: inline-table;
}

.mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
  display: table-cell;
  vertical-align: middle;
}

.mui-preview-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
}

.mui-preview-loading.mui-active {
  display: block;
}

.mui-preview-loading .mui-spinner-white {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  height: 50px;
  width: 50px;
}

.mui-preview-image img.mui-transitioning {
  -webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

p img {
  max-width: 100%;
  height: auto;
}
</style>