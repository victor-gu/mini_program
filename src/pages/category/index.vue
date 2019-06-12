<template>
  <div>
    <i-button @click="scan" type="primary">扫一扫</i-button>
    <i-button @click="invoice" type="primary">选择发票</i-button>
    <i-button @click="pay" type="primary">支付</i-button>
    <i-button type="primary" open-type="getUserInfo" @getuserinfo="getDetailsUser">查看用户信息</i-button>
    <i-button type="primary" open-type="getPhoneNumber" @getphonenumber="getDetailsPhone">获取手机号码</i-button>
    <i-button @click="authorization" type="primary">管理授权信息</i-button>
    <div class="msg">
      {{ msg }}
    </div>
    ------------------------------------<br/>
    <i-button @click="getSystemInfo" type="info">查看设备信息</i-button>
    <i-button @click="choosePosition" type="info">选择位置</i-button>
    <i-button @click="getPosition" type="info">当前位置</i-button>
    <i-button @click="share" @ type="info">分享(右上)</i-button>
    <i-button @click="getInfo" @ type="info">获取当前帐号信息</i-button>
    <i-button @click="chooseAddress" @ type="info">选择通信地址</i-button>
    <i-button @click="chooseInvoice" @ type="info">已有发票</i-button>
    <i-button @click="getWeRunData" @ type="info">获取用户步数</i-button>
    <i-button @click="addPhoneContact" @ type="info">添加通讯录联系人</i-button>
    <i-button @click="getBatteryInfo" @ type="info">获取电量信息</i-button>
    <i-button @click="makePhoneCall" @ type="info">拨打电话</i-button>
    <i-button @click="vibrate" @ type="info">震动</i-button>
  </div>
</template>

<script>
import WXBizDataCrypt from '@/utils/WXBizDataCrypt';
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    // 扫一扫
    scan () {
      wx.scanCode({
        success: res => {
          console.log(res);
        },
        fail: res => {},
        complete: res => {}
      });
    },
    // 选择发票
    invoice () {
      wx.chooseInvoiceTitle({
        success (res) {
          console.log(res);
        },
        fail: res => {
          console.log(res);
        }
      });
    },
    // 支付
    pay () {
      wx.requestPayment({
        timeStamp: '1559784266',
        nonceStr: 'or1DrlrJNF8pu4UQYYFVY3YCA4V3auIc',
        package: 'prepay_id=wx20190606091858516934',
        signType: 'MD5',
        paySign: '978BFD625242045E1262522894A39E9A',
        success: res => {
          console.log(res);
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    // 打开用户授权信息
    authorization () {
      wx.openSetting({
        success: res => {
          console.log(res);
        }
      });
    },
    // 获取用户信息
    getDetailsUser (e) {
      this.msg = '用户信息：' + e.mp.detail.rawData;
    },
    // 获取手机号码
    getDetailsPhone (e) {
      if (e.mp.detail.encryptedData) {
        var pc = new WXBizDataCrypt('wx702838c17be8e79f', this.$store.getters.sessionKey);
        var data = pc.decryptData(e.mp.detail.encryptedData, e.mp.detail.iv);
        this.msg = '手机号码：' + data.phoneNumber;
      }
    },
    // 获取系统信息
    getSystemInfo () {
      let _this = this;
      wx.getSystemInfo({
        success (res) {
          _this.msg = JSON.stringify(res);
        }
      })
    },
    // 打开内置地图选择地理位置
    choosePosition () {
      let _this = this;
      wx.chooseLocation({
        success: res => {
          _this.msg = JSON.stringify(res);
        }
      })
    },
    // 获取当期位置
    getPosition () {
      let _this = this;
      wx.getLocation({
        success: res => {
          _this.msg = JSON.stringify(res);
        }
      });
    },
    // 分享
    share () {
      wx.showShareMenu({
        withShareTicket: true
      });
    },
    // 获取当前账号信息
    getInfo () {
      this.msg = JSON.stringify(wx.getAccountInfoSync());
    },
    // 选择通信地址
    chooseAddress () {
      let _this = this;
      wx.chooseAddress({
        success: res => {
          _this.msg = JSON.stringify(res);
        }
      });
    },
    // 选择已有的发票
    chooseInvoice () {
      wx.chooseInvoice({
        success: res => {
          console.log(res);
        },
        fail: res => {
          console.log(res);
        }
      });
    },
    // 获取用户步数
    getWeRunData () {
      wx.getWeRunData({
        success: res => {
          console.log(res);
        }
      });
    },
    // 添加通讯录联系人
    addPhoneContact () {
      wx.addPhoneContact({
        success: res => {
          console.log(res);
        }
      });
    },
    // 获取电量信息
    getBatteryInfo () {
      let _this = this;
      wx.getBatteryInfo({
        success: res => {
          _this.msg = JSON.stringify(res);
        }
      });
    },
    // 拨打电话
    makePhoneCall () {
      wx.makePhoneCall({
        phoneNumber: '15881451854',
        success: res => {
          console.log(res);
        }
      });
    },
    // 震动
    vibrate () {
      wx.vibrateLong();
      // wx.getUserInfo({
      //   success: res => {
      //     var pc = new WXBizDataCrypt('wx702838c17be8e79f', this.$store.getters.sessionKey);
      //     var data = pc.decryptData(res.encryptedData, res.iv);
      //     console.log(data);
      //   }
      // });
    }
  }
}
</script>

<style scoped>
.msg{
  word-break: break-all;
}
</style>
