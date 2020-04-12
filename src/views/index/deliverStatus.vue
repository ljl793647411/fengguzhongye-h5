<template>
  <div>
    <div>
      <div class="dropShipping">
        <div>
          <span>订单</span>
          <span>32465465456</span>
        </div>
        <div>
          <span class="iconfont icon-xuanzeqixiayige"></span>
        </div>
      </div>
      <div class="bg-white">

          <div class="waybillTitle">运单</div>
        <div class="waybill">
          <p>
            发货方式:
            <span>快递</span>
          </p>
          <p>
            发货方式:
            <span>快递</span>
          </p>
          <p>
            发货方式:
            <span>快递</span>
          </p>
          <p>
            发货方式:
            <span>快递</span>
          </p>
        </div>

        <div class="detail">
            <div>
                <img src="../../images/activity.png" alt="">
            </div>
            <div>
                <p>产品名称:<span>男士彩妆套装</span></p>
                <p>产品型号:<span>产品尺寸</span></p>
            </div>

        </div>

        <div>
          <div style="font-size: 0.695652rem;color: #111111;">
            物流跟踪
            <!--物流跟踪-->
          </div>
          <div>
            <div class="track-rcol">
              <div class="track-list">
                <ul>
                  <div v-for="(item,index) in logisticsList" :key="index">
                    <li class="first" v-if="index===0">
                      <div class="nodeTime">{{item.messageDay}}</div>
                      <i class="node-icon"></i>
                      <div style="width:20%;">{{item.messageDate}}</div>
                      <div style="width:75%;">{{item.message}}</div>
                    </li>
                    <li v-if="index > 0 && index !== logisticsList.length-1">
                      <i class="node-icon"></i>
                      <div style="width:20%;">{{item.messageDate}}</div>
                      <div style="width:75%;">{{item.message}}</div>
                    </li>
                    <li v-if="index === logisticsList.length-1" class="finall">
                      <i class="div-spilander"></i>
                      <i class="node-icon"></i>
                      <div style="width:20%;">{{item.messageDate}}</div>
                      <div style="width:75%;">{{item.message}}</div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Logistics",
  data() {
    return {
      logisticsList: [
        {
          message:
            "1包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "18:07:15",
          messageDay: "2016-03-10"
        },
        {
          message:
            "2包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "18:07:15",
          messageDay: "2016-03-10"
        },
        {
          message:
            "3包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "18:07:15",
          messageDay: "2016-03-10"
        },
        {
          message:
            "4包裹已签收，感谢您使用顺丰快递服务，期待下次继续为您服务！",
          messageDate: "18:07:15",
          messageDay: "2016-03-10"
        }
      ]
    };
  },
  methods: {},
  /**
   * 加载时执行
   */
  mounted: function() {}
};
</script>
<style lang="scss" scoped>
.dropShipping {
  width: 100%;
  height: 1.956521rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.521739rem;
  margin: 0 0 0.3rem;
  padding: 0.434783rem 0.652174rem;
  color: #888888;
  > div:nth-child(1) {
    width: 80%;
    span:nth-child(1) {
      color: #fa9d26;
      font-size: 0.608696rem;
    }
  }
  > div:nth-child(2) {
    width: 20%;
    text-align: right;
  }
}

.bg-white {
  background-color: white;
  margin: 0.5rem 0;
  padding: 0.5rem;


  .waybillTitle{
      width: 3.304347rem;
      height: 1.086956rem;
      line-height: 1.086956rem;
      font-size: 0.608695rem;
      background-color: #D29B48;
      color: white;
      text-align: center;
      position: relative;
      left: -0.5rem;
      margin-bottom: 0.5rem;
  }
    .detail{
        height: 4.347826rem;
        display: flex;
        align-items: center;
        border-bottom: 0.05rem solid #888888;
        img{
            width: 3.478261rem;
            height: 3.478261rem;
        }
        >div:nth-child(2){
            font-size: 0.608695rem;
            align-items: flex-start;
        }
    }

  .waybill {
    font-size: 0.608696rem;
    height: 4.347826rem;
    border-bottom: 0.05rem solid #888888;
    p {
      height: 25%;
    }
    span {
      font-size: 0.521739rem;
      color: #888888;
      margin-left: 0.5rem;
    }
  }
}
ul {
  padding-left: 1rem;
  margin-top: 1rem;
}
ul li {
  list-style: none;
  font-size: 0.5rem;
}

.nodeTime {
  font-size: 0.5rem;
  color: #888888;
  position: absolute;
  left: -1rem;
  top: -1rem;
}

.track-list li {
  position: relative;
  padding: 0px 0 1.5rem 25px;
  line-height: 1rem;
  border-left: 1px solid #d9d9d9;
  color: #999;
  display: flex;
}
.track-list li.first {
  color: #fa9d26;
  padding-top: 0;
  width: 100%;
  text-align: left;
  border-left: 1px solid #d9d9d9;
}
.track-list li .node-icon {
  position: absolute;
  left: -6px;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  top: 4px;
  background-color: #999999;
}
.track-list li.first .node-icon {
  background-color: #fa9d26;
}

.track-list li.finall {
  position: relative;
  padding: 0px 0 1.5rem 25px;
  line-height: 18px;
  border-left: 1px solid white;
  color: #999;
}
.track-list li.finall .div-spilander {
  width: 1px;
  position: absolute;
  left: -1.5px;
  height: 0.5rem;
  background-color: #d9d9d9;
}
</style>
