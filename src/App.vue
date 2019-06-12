<script>
/* 冷启动时调用，只调用一次 */
export default {
  created () {
    console.log('启动时场景值', wx.getLaunchOptionsSync());
    // 监听更新事件
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      })
    })
  }
}
</script>

<style>
/* 全局样式 */
.container {
  background-color: #cccccc;
}
</style>