<template>
  <div>
    <div class="userInfo">
      <div class="userPhoto">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="userName">
        <open-data type="userNickName"></open-data>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.userInfo{
  width: 100%;
  height: 500rpx;
  background: #1c2438;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.userInfo .userPhoto{
  width: 180rpx;
  height: 180rpx;
  border-radius: 50%;
  overflow: hidden;
}
.userInfo .userName{
  font-size: 30rpx;
  margin-top: 10rpx;
  color: #fff;
}
</style>
