<template>
  <div id="share">
    <div class="top">
      <img src="../../images/activity.png" alt />
      <p>丰谷种业分享</p>
    </div>
    <div class="main">
      <img src="../../images/activity.png" alt />
    </div>

    <div class="footer">
      <div>
        <p>久葆肌品牌靓睛睛眼霜久葆肌品牌靓睛睛眼霜</p>
        <p>好物分享，好友购买后即可获得现金奖励</p>
        <p>首次购买后永久绑定返佣关系</p>
      </div>
      <img src="../../images/activity.png" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#share {
  padding: 0 0.5rem;
  font-size: 0.608rem;
  padding-top: 0.5rem;
  .top {
    text-align: center;
    margin-bottom: 0.5rem;
    > img {
      width: 4rem;
    }
    > p {
      font-size: 0.68rem;
    }
  }
  .main {
    > img {
      width: 100%;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    > div {
      > p:nth-child(1) {
        font-size: 0.608rem;
      }
      > p:nth-child(2) {
        font-size: 0.521rem;
        color: #e9423a;
      }
      > p:nth-child(3) {
        font-size: 0.521rem;
        color: #9d9d9d;
      }
    }
    > img {
      width: 3rem;
      height: 3rem;
    }
  }
}
</style>