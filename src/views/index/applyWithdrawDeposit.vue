<template>
  <div>
    <div class="topBox">
      <p>提现金额(元)</p>
      <div>
        <div>
          <span style="color:#0081ff;font-size:0.9rem">￥</span>
          <input style="color:#0081ff;" v-model="txprice" @change="changes()" type="text" placeholder="本次最多提现5000.00元" />
        </div>
        <span style="color:#0081ff;" @click="sum">全部</span>
      </div>
    </div>
    <p style="font-size:0.608rem;padding-left:0.5rem;color:#888888;">账户余额￥{{yeprice}}</p>

    <div class="footer">
      <div>余额提现需为￥10.00元的倍数，总部会在提现申请提交成功后24小时内将佣金转入账户绑定的微信余额。</div>
      <div @click="submit">确认提交</div>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "../../config/mUtils";
export default {
  data() {
    return {
      yeprice:0,
      txinfo:{},
      txprice:0,
      userInfo:{},
    };
  },
  components: {},
  computed: {},
  methods: {
    changes()
    {
     if(this.txprice % 10!=0)
     {
      alert("必须是10的倍数");
       this.txprice=0;
     }
    },
    //返佣申请
    submit(){
      if(this.txprice>0 )
      {
        if(this.txprice<= this.yeprice)
        {
          this.txinfo.fx_price=this.txprice
          this.txinfo.angtid=this.userInfo.id
          this.txinfo.rebatetype=1
          this.$axios.post("app.add.txrebate",this.txinfo
          )
          .then(p=>{
            console.log(p);
              if(p.data.Code==100)
              {
                alert("提交提现申请成功")
                    this.$router.push({
                      path: "/myRebate"
                    });
              }
          })
        }
      }
      else
      {
        alert("提现金额不能位0");
      }
    },
    goPage(url) {
      this.$router.push({
        path: url
      });
    },
    //全部
    sum()
    {
        if(this.yeprice>5000)
        {
          this.txprice=5000;
        }
        else
        {
          if(this.yeprice%10!=0)
          {
              this.txprice=this.yeprice-5;
          }
          else
          {
            this.txprice=this.yeprice;
          }
        }
        this.changes();
    }
  },
  created() {
    this.userInfo = getStore("userInfo");
    this.yeprice=this.$route.query.yeprice;
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.topBox {
  padding: 0.5rem;
  font-size: 0.7rem;
  background-color: white;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    input {
      font-size: 0.65rem;
      color: #cccccc;
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  > div:nth-child(1) {
    color: #0081ff;
    font-size: 0.521rem;
    padding: 0.5rem;
  }
  > div:nth-child(2) {
    padding: 0.3rem;
    text-align: center;
    background-color: #0081ff;
    color: white;
    font-size: 0.7rem;
  }
}
</style>