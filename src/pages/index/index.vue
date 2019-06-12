<template>
  <div>
    <div class="userinfo">
      <open-data type="userAvatarUrl"></open-data>
      <open-data type="userNickName"></open-data>
      <!-- 需要使用 button 来授权登录 -->
      <button
        open-type="getPhoneNumber"
        @getphonenumber="bindGetPhoneNumber"
        @click="getPhoneNumber"
      >获取手机号码</button>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo">获取用户信息</button>
      <button @click="pay">Pay</button>
      <button @click="scan">Scan</button>
      <button @click="chooseInvoiceTitle">chooseInvoiceTitle</button>
    </div>

    <div class="usermotto">
      <div class="user-motto" v-for="station in stations" :key="station.id">
        <card :text="station.name"></card>
      </div>
    </div>

    <a href="/pages/counter/main" class="counter">Counter</a>
  </div>
</template>

<script>
import card from "@/components/card";
import api from "@/utils/api";
import WXBizDataCrypt from "@/utils/WXBizDataCrypt";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      motto: "Hello miniprograme",
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "http://mpvue.com/assets/logo.png"
      },
      stations: [],
      session_key: "",
      openid: ""
    };
  },
  mounted() {
    var self = this;
    wx.login({
      success(res) {
        if (res.code) {
          console.log("登录成功" + res.code);
          api
            .login(res.code)
            .then(d => {
              console.log(d.session_key);
              console.log(d.openid);
              self.session_key = d.session_key;
              self.openid = d.openid;
              wx.checkSession({
                success() {
                  console.log("session_key 未过期，并且在本生命周期一直有效");
                },
                fail() {
                  console.log("session_key 已经失效，需要重新执行登录流程");
                  wx.login(); //重新登录
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("登录失败" + res.errMsg);
        }
      }
    });
    this.getStations(0, 10);

    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo);
            }
          });
        }
      }
    });
  },
  components: {
    card
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    async getStations(page, size) {
      //const { query } = this.$route
      // const topic = await api.getStation(query.id)
      const result = await api.getStations(page, size);
      if (!result) return;
      this.stations = result.content;
    },
    // bindGetUserInfo(e) {
    //   console.log(e.detail.userInfo);
    // },
    // getPhoneNumber(e) {
    //   console.log(e.detail.userInfo);
    // },
    getUserInfo() {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo(e) {
      console.log(e.mp.detail.rawData);
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    getPhoneNumber() {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getPhoneNumber")) {
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetPhoneNumber(e) {
      console.log(e);
      var self = this;
      if (e.mp.detail.encryptedData) {
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
        var pc = new WXBizDataCrypt("wx702838c17be8e79f", self.session_key);
        var data = pc.decryptData(e.mp.detail.encryptedData, e.mp.detail.iv);
        console.log("解密后 data: ", data);
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    pay() {
      api
        .getTransactionOrder(1, this.openid)
        .then(d => {
          console.log({
            timeStamp: d.timeStamp,
            nonceStr: d.nonceStr,
            package: d.package,
            signType: d.signType,
            paySign: d.paySign
          });
          wx.requestPayment({
            timeStamp: d.timeStamp,
            nonceStr: d.nonceStr,
            package: d.package,
            signType: d.signType,
            paySign: d.paySign,
            success: res => {
              console.log(res);
            },
            fail: err => {
              console.log(err);
            },
            complete: res => {
              console.log(res);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    scan: function() {
      var that = this;
      var show;
      wx.scanCode({
        success: res => {
          console.log(res);
          wx.showToast({
            title: "成功",
            icon: "success",
            duration: 2000
          });
        },
        fail: res => {
          wx.showToast({
            title: "失败",
            icon: "success",
            duration: 2000
          });
        },
        complete: res => {}
      });
    },
    chooseInvoiceTitle: function() {
      wx.chooseInvoiceTitle({
        success(res) {
          console.log(res);
        },
        fail: res => {
          console.log(res);
        }
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 10px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
