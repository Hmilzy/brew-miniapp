Page({
  data: {
    currentTab: 'home'
  },

  goToOrder() {
    wx.navigateTo({ url: '/pages/index/index' });
  },

  onDeliveryTap() {
    wx.showToast({ title: '外送功能即将上线', icon: 'none' });
  },

  onActivityTap(e) {
    const type = e.currentTarget.dataset.type;
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  onTabTap(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === 'home') return;
    if (tab === 'merch') {
      wx.navigateTo({ url: '/pages/merch/merch' });
      return;
    }
    if (tab === 'points') {
      wx.navigateTo({ url: '/pages/points/points' });
      return;
    }
    if (tab === 'profile') {
      wx.navigateTo({ url: '/pages/profile/profile' });
      return;
    }
    wx.showToast({ title: '功能开发中', icon: 'none' });
  }
});
