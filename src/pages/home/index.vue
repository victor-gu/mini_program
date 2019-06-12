<template>
  <div>
    <ul>
      <li v-for="item in stations" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { getStations, login } from '@/api/home';
export default {
  data () {
    return {
      stations: []
    }
  },
  created () {
    let _this = this;
    // 获取站点
    getStations(0, 10).then((response) => {
      this.stations = response.content;
    }).catch((error) => {
      console.log(error);
    });
    // 登陆
    wx.login({
      success (res) {
        if (res.code) {
          login(res.code).then((response) => {
            // vuex存储sessionKey
            _this.$store.dispatch('SessionKey', response['session_key']);
            wx.checkSession({
              success () {
                console.log('session_key 未过期，并且在本生命周期一直有效');
              },
              fail () {
                console.log('session_key 已经失效，需要重新执行登录流程');
                wx.login();
              }
            });
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
div{
  ul{
    li{
      font-size: 30rpx;
      margin: 20rpx;
    }
  }
}
</style>

