const store = require('../../utils/store');

Page({
  data: {
    points: 0,
    orderCount: 0
  },

  onShow() {
    this.setData({
      points: store.getPoints(),
      orderCount: store.getOrders().length
    });
  },

  goToOrders() {
    wx.navigateTo({ url: '/pages/orders/orders' });
  },

  goToAddress() {
    wx.navigateTo({ url: '/pages/address/address' });
  },

  goToPoints() {
    wx.navigateTo({ url: '/pages/points/points' });
  },

  goToExchange() {
    wx.navigateTo({ url: '/pages/points/points?showHistory=true' });
  },

  onCouponTap() {
    wx.showToast({ title: '优惠券功能即将上线', icon: 'none' });
  }
});
