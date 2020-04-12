<template>
  <div>
    <div
      class="bonus"
      v-for="(item,index) in data"
      :key="index"
      @click="gopage(item.reciveagentid)"
    >
      <div>
        <p>
          <span style="color:black;">{{item.agentname}}</span>
          <button>合伙人</button>
        </p>
        <p>授权码：{{item.serialnum}}</p>
      </div>
      <div>
        <p>{{item.product_quantity}}</p>
        <p>进货量</p>
      </div>
      <div>
        <p>{{item.Interest_margin}}</p>
        <p>积差奖</p>
      </div>
      <div>
        <p>￥{{item.count_money}}</p>
        <p>总奖金</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      agent_id: 0,
      Count: 0,
      type: 0
    };
  },
  components: {},
  methods: {
    gopage(id) {
      this.$router.push({
        path: "/performanceBill",
        query: { id: id, type: this.type }
      });
    },
    getPersonageList() {
      this.$axios
        .get("personage.achievement.page.list", {
          params: {
            refereeid: this.agent_id,
            type: this.type
          }
        })
        .then(p => {
          if (p.data.Code == 100) {
            this.data = p.data.Data.Data;
            this.Count = p.data.Data.Count;
            console.log(this.data);
          }
        });
    }
  },
  created() {
    // this.userInfo = getStore("userInfo");
    this.agent_id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getPersonageList();
  }
};
</script>

<style lang="scss" scoped>
.bonus {
  font-size: 0.608rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: white;
  padding: 0.5rem;
  position: relative;
  border-top: 1px solid #eeeeee;

  button {
    background-color: white;
    padding: 2px;
    border: 1px solid red;
    color: red;
    border-radius: 3px;
  }
  //   margin-top: 0.5rem;
  > div {
    > p {
      color: #888888;
    }
    > p:nth-child(2) {
      font-size: 0.521rem;
    }
  }
  > div:nth-child(1) {
    font-weight: bold;
  }
  > div:nth-child(4) {
    margin-right: 0.8rem;

    p:nth-child(1) {
      color: red;
    }
  }
  .iconpos {
    position: absolute;
    right: 0.5rem;
  }
}
</style>