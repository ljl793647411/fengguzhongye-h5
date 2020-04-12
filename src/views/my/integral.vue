<template>
  <div>
    <head-top goBack="true"></head-top>
    <div class="newPlaceholder"></div>
    <div class="top-tab">
      <div class="flexAround" style="width: 140%;height: 2.09rem">
        <span v-for="(item,index) in typeArr" @click="tab(index)" :class="{active:tabIndex==index}">{{item}}</span>
      </div>
    </div>

    <div v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div   v-for="item in arr" class="integral-item">
        <div class="flexBetween">
          <span class="integral-type">{{item.Classification}}</span>
          <span class="time">{{item.ExplainSort}}</span>
          <span class="integral-num">{{item.IntegralValue}}</span>
        </div>
        <div class="time">
          {{item.CreateDate}}
        </div>
      </div>
    </div>

    <div v-if="bottomLine" class="bottom-line flexCenter">
      <span></span>
      <span>暂时没有更多数据哦</span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import noneList from '../shopCar/noneData'
  import {getStore} from '../../config/mUtils'
  import headTop from "src/components/header/newHead";
  import {InfiniteScroll, Toast} from 'mint-ui';

  export default {
    name: "integral",
    data() {
      return {
        tabIndex: 0,
        typeArr: ['全部积分', '积分领取', '兑换礼品', '注册积分', '完善积分', '推荐积分', '订单退还积分'],
        userInfo: {},
        arr: [],
        hasItem: false,
        bottomLine: true,
        pageindex:1,
        loading: false,
      }
    },
    computed: {},
    components: {
      noneList,
      headTop
    },
    methods: {
      tab(index) {
        this.tabIndex = index;
        this.arr=[];
        this.pageindex=1;
        this.getData();
      },
      getData() {
        this.$axios.get('integral.particulars', {
          params: {
            InuserId: this.userInfo.Id,
            type: this.tabIndex,
            eid: this.userInfo.EnterpriseId,
            pagesize: 10,
            pageindex: this.pageindex,
          }
        }).then((p) => {
          if (this.pageindex <= p.data.result.TotalPageCount) {
            this.loading = false;//可以加载
            this.pageindex++;
            this.arr = this.arr.concat(p.data.result.PageData);
          } else {
            this.loading = true;//不可以加载
          }
        })
      }
    },
    created() {
      this.userInfo = getStore('userInfo');
    },
    mounted() {}
  }
</script>

<style lang="scss" scoped>

  .top-tab {
    background: white;
    border-bottom: 1px dashed #E7EAED;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    span {
      font-size: 0.51rem;
      color: #666666;
      line-height: 1.96rem;
      height: 1.96rem;
    }
  }

  .active {
    border-bottom: 2px solid #3190E8;
    color: #3190E8 !important;
  }

  .integral-item {
    padding: 0.3rem 0.64rem;
    background: white;
    margin-bottom: 0.43rem;

    .integral-type {
      color: #666666;
      font-size: 0.60rem;
    }

    .integral-num {
      color: #3190E8;
      font-size: 0.68rem;
    }

    .time {
      color: #B8B8B8;
      font-size: 0.51rem;
    }
  }


  .bottom-line{
    margin-top: 1rem;
    padding-bottom: 1rem;
    span:nth-child(1),span:nth-child(3){
      width: 2.13rem;
      height: 1px;
      background: #E7EAED;
      margin: 0 0.6rem;
    }
    span:nth-child(2){
      font-size: 0.51rem;
      color: #999;
    }
  }

</style>
