<template>
  <div class="box">
    <div class="list">
      <button
        class="btn"
        v-for="(item,index) in btnList"
        :key="index"
        @click="btnActive(index)"
        :class="{active:tabIndex==index}"
      >{{item.name}}</button>
    </div>
    <div class="item" v-for="(user,i) in proinfo " :key="i">
      <div class="itemA">
        <div>
          <div
            :style="{backgroundImage: 'url(' + (user.avatar ? user.avatar : '') + ')'}"
          >{{user.avatar ? '' : '头像'}}</div>
          <span>评论人：{{user.agentname}}</span>
        </div>
        <div>评论时间：{{user.remark_time}}</div>
      </div>
      <p style="margin:0.5rem 0;">评论内容：{{user.remark}}</p>
      <div class="itemImg" v-if="user.remark_img">
        <img :src="user.remark_img" alt width="100px" height="70px" />
      </div>
      <!-- <div class="itemB">
        <span class="iconfont iconpingjia" @click="replyShow">
          <span>{{reply?'评论':''}}</span>
        </span>
        <span class="iconfont icondianzan1" @click="praiseShow">
          <span>{{praise?'点赞':''}}</span>
        </span>
      </div>-->
      <!-- <div class="itemC" v-if="user.response">
        <textarea name id style="width:100%;padding:0.3rem" rows="5" placeholder="请输入评价"></textarea>
      </div> -->
      <div class="itemD" v-if="user.response">商家回复：{{user.response}}</div>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "../../config/mUtils";
import { InfiniteScroll, Toast, Lazyload } from "mint-ui";

export default {
  data() {
    return {
      btnList: [
        {
          id: "-1",
          name: "全部"
        },
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
        },

      ],
      agentype:0,
      tabIndex: 0,
      proinfo: [],
      reply: false,
      praise: false,
      sId: 0
    };
  },
  components: {},
  computed: {},
  methods: {
    goPage(url) {
      this.$router.push({
        path: url
      });
    },
    btnActive(index) {
      this.tabIndex = index;
      this.getorderlist();
    },
    getorderlist() {
      this.$axios
        .get("app.get.order.remark", {
          params: {
            proid: this.id,
            remark_type: this.btnList[this.tabIndex].id,
            pageindex: 1,
            agentype:this.agentype
          }
        })
        .then(p => {
          this.proinfo = p.data.Data.Data;

          if (p.data.Data) {
            if (p.data.Data.Data.length > 0) {
              this.bottomLine = false;
            } else {
              this.bottomLine = true;
            }

            if (this.pageindex <= p.data.Data.Count) {
              this.loading = false; //可以加载
              this.pageindex++;

              this.orderlist = this.orderlist.concat(p.data.Data.Data);
            } else {
              this.loading = true; //不可以加载
              Toast({
                message: "没有数据啦",
                duration: 1500
              });
            }
          }
        });
    },
    replyShow() {
      this.reply = !this.reply;
    },
    praiseShow() {
      this.praise = !this.praise;
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.agentype = this.$route.query.agentype;
    this.getorderlist();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.box {


  .list {
    padding: 0.5rem;
    font-size: 0.608rem;
    vertical-align: middle;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    background-color: white;
    .btn {
      background-color: #fff5f4;
      color: black;
      margin-right: 0.5rem;
    }

    .active {
      color: #0081ff;
      background-color: #fff5f4;
      border: solid 1px #0081ff;
    }
  }

  .item {
    font-size: 0.608rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: white;
    .itemA {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div:nth-child(1) {
        display: flex;
        align-items: center;
        > div:nth-child(1) {
          width: 1.304347rem;
          height: 1.304347rem;
          line-height: 1.304347rem;
          border-radius: 50%;
          background-color: #eeeeee;
          background-size: 100% 100%;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          margin-right: 0.5rem;
          font-size: 0.521rem;
          text-align: center;
        }
      }
    }
    .itemImg {
      .img1 {
        width: 100%;
      }
      .img2 {
        width: 48%;
        margin: 0 1%;
      }
      .img3 {
        width: 30%;
        margin: 0 1%;
      }
    }
    .itemB {
      text-align: right;
      margin: 0.5rem 0;
      > span > span {
        font-size: 0.608rem;
      }
    }
    .itemC {
      > textarea {
        background-color: #f3f3f3;
      }
    }
    .itemD {
      padding: 0.5rem;
      background-color: #f3f3f3;
    }
  }
}
</style>
