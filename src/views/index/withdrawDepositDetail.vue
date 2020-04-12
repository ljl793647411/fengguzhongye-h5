<template>
  <div>
    <div class="box">
      <div class="boxBottom" style="padding-top:0;">
        <div class="boxBB">
          <span style="font-size: 0.7rem;">提现到微信余额</span>
          <span style="color: #0081ff;font-size: 0.8rem;">+10</span>
        </div>
        <div class="boxBB" style="color: #888888;font-size: 0.521rem;">
          <span>2019/09/21 15:32:00</span>
          <span>10</span>
        </div>
      </div>
    </div>
    <div class="state">
      <p>
        <span class="iconfont icondui1"></span> 提现申请成功
      </p>
      <p>&emsp;&emsp;&emsp;2019/09/21 15:32:00</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  font-size: 0.608rem;
  background-color: white;
  padding: 0.5rem;
  margin-bottom: 0.3rem;
  .boxTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #eeeeee;
  }
  .boxBottom {
    padding-top: 0.5rem;
    > .boxBB {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span:nth-child(2) {
        margin-top: 0.3rem;
      }
    }
  }
}
.state {
  padding: 0.5rem;
  background-color: white;
  > p:nth-child(1) {
    color: #0081ff;
    font-size: 0.7rem;
    >span{
        vertical-align: middle;
    }
  }
  >p:nth-child(2){
      color: #888888;
      font-size: 0.521rem;
  }
}
</style>