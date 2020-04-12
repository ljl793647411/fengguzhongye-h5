<template>
  <div id="agentInventory">
    <div class="teamList">
      <div class="teamLisLeft">
        <!-- <svg v-if="index<=2" class="a icon iconSvg" aria-hidden="true">
          <use :xlink:href="icon[index]" />
        </svg>
        <span v-else class="a">{{index+1}}</span> -->
        <span class="a">1</span>
        <div>
          <img class="b" :src="userinfo.avatar" style="width:40px;height:40px" />
        </div>
        <div class="c">
          <div class="cTop">
            <span>{{userinfo.agentname}}</span>
            <span>{{userinfo.levelname}}</span>
          </div>
          <div class="cBottom">
            <span>授权码：{{userinfo.serialnum}}</span>

            <span>
              库存：
              <span>{{userinfo.totalstock==null?0:userinfo.totalstock}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="main flex"
      @click="goPage('/overstock',item.id,userinfo.agentid)"
      v-for="(item,index) in datalist"
      :key="index"
    >
      <div class="flexCenter">
        <img :src="item.proimg" style="width:70px;height:60px" alt />
      </div>
      <div class="flexGrow">
        <div>{{item.proname}}</div>
        <div class="a1">
          库存：
          <span
            style="color:red;font-size:0.782608rem;font-weight: bold;"
          >{{item.stocknum==null?0:item.stocknum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audit: true,
      datalist: [],
      userinfo: {},
      icon: ["#iconxunzhang-", "#iconxunzhang-1", "#iconxunzhang-2"]
    };
  },
  components: {},
  methods: {
    goPage(url, tid, agentid) {
      this.$router.push({
        path: url,
        query: {
          agent: JSON.stringify(tid),
          tid: JSON.stringify(agentid)
        }
      });
    },
    aud(obj) {
      if (obj == 1) {
        if ((this.audit = true)) {
        } else {
          this.audit = !this.audit;
        }
      } else if (obj == 2) {
        if ((this.audit = true)) {
          this.audit = !this.audit;
        } else {
        }
      }
    },
    //个人库存
    getinventory() {
      this.userinfo = JSON.parse(this.$route.query.agent);
      this.$axios
        .get("app.get.agent.proinventory", {
          params: {
            agentid: this.userinfo.agentid
          }
        })
        .then(p => {
          this.datalist = p.data.Data;
        });
    }
  },
  created() {
    this.getinventory();
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";

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

    .a {
      color: #9d9d9d;
      display: inline-block;
      width: 1rem;
      text-align: center;
    }

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
</style>



