<template>
  <div
    v-infinite-scroll="getNewList"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <head-top goBack="true"></head-top>
    <div class="newPlaceholder"></div>
    <!-- 
    <div class="box" v-for="(item,index) in list" :key="index">
      <p>{{item.create_date}}</p>
      <p @click="updateNews(item.id,item.agent_id)">{{item.send_msg}}</p>
    </div>-->
    <div class="top-tab flexAround">
      <span
        v-for="(item,index) in tabList"
        :key="index"
        @click="tab(index)"
        :class="{active:tabIndex==index}"
      >{{item.name}}</span>
    </div>
    <div class="box" v-for="(item,index) in list" :key="index">
      <p>{{item.create_date}}</p>
      <p @click="updateNews(item.id,item.agent_id)">{{item.send_msg}}</p>
    </div>
  </div>
</template>
<script>
import headTop from "src/components/header/newHead";
import { InfiniteScroll } from "mint-ui";

export default {
  data() {
    return {
      loading: false,
      list: [],
      info: {
        agent_id: 0,
        pageindex: 1,
        pagesize: 10,
        is_read: 0
      },
      tabList: [
        {
          id: "0",
          name: "未读"
        },
        {
          id: "1",
          name: "已读"
        }
      ],
      tabIndex: 0,
    };
  },
  components: {
    headTop
  },
  methods: {
    loadMore() {
      /*alert(2);
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last);
          }
          this.loading = false;
        }, 1000);*/
    },
    getNewList() {
      this.$axios
        .get("app.get.agent.news", {
          params: {
            agent_id: this.info.agent_id,
            pageindex: this.info.pageindex,
            pagesize: this.info.pagesize,
            is_read: this.is_read //0.未读  1.已读
          }
        })
        .then(o => {
          if (o.data.Code == 100) {
            this.list = this.list.concat(o.data.Data.Data);
            if (this.list == "") {
              this.list.splice(0, this.list.length);
            }
            this.info.pageindex++;
            
          }
        });
    },
    updateNews(id, agent_id) {
      this.$axios
        .post("app.update.agent.news", {
          id: id,
          agent_id: agent_id
        })
        .then(o => {
          if (o.data.Code == 100) {
            this.info.agent_id = this.$route.query.agentid;
            this.getNewList();
          }
        });
    },
    tab(index) {
      this.tabIndex = index;
      this.is_read = this.tabList[index].id;
      this.list.splice(0, this.list.length);
      this.info.pageindex = 1;
      this.getNewList();
    },
  },
  created() {
    this.info.agent_id = this.$route.query.agentid;
    //this.getNewList();
  },

  mounted() {}
};
</script>
<style lang="scss" scoped>
.box {
  width: 80%;
  margin: 0.5rem auto 0;
  background-color: white;
  font-size: 0.68rem;
  padding: 0.5rem;

  > p:nth-child(2) {
    text-indent: 1.36rem;
  }
}

.top-tab {
  background: white;
  border-bottom: 0.5px solid #e7eaed;
  span {
    font-size: 0.51rem;
    color: #666666;
    line-height: 1.96rem;
    height: 1.96rem;
    // width: 25%;
    text-align: center;
  }
}
.active {
  border-bottom: 2px solid #0081ff;
  color: #0081ff !important;
}
</style>
