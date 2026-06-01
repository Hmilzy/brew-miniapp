const store = require('../../utils/store');

Page({
  data: {
    orders: []
  },

  onShow() {
    this.setData({ orders: store.getOrders() });
  }
});
