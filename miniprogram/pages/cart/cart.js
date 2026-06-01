const store = require('../../utils/store');

Page({
  data: {
    cartItems: [],
    total: 0
  },

  onShow() {
    this.refreshData();
  },

  refreshData() {
    const cartItems = store.getCart();
    const { total } = store.getCartTotal();
    this.setData({ cartItems, total });
  },

  onIncrease(e) {
    const key = e.currentTarget.dataset.key;
    const item = this.data.cartItems.find(i => i.key === key);
    store.updateCartItemQuantity(key, item.quantity + 1);
    this.refreshData();
  },

  onDecrease(e) {
    const key = e.currentTarget.dataset.key;
    const item = this.data.cartItems.find(i => i.key === key);
    store.updateCartItemQuantity(key, item.quantity - 1);
    this.refreshData();
  },

  onDelete(e) {
    const key = e.currentTarget.dataset.key;
    store.removeFromCart(key);
    this.refreshData();
  },

  onClear() {
    wx.showModal({
      title: '提示',
      content: '确定清空购物车？',
      success: (res) => {
        if (res.confirm) {
          store.clearCart();
          this.refreshData();
        }
      }
    });
  },

  onSubmitOrder() {
    if (this.data.cartItems.length === 0) {
      wx.showToast({ title: '购物车为空', icon: 'none' });
      return;
    }
    const order = store.createOrder();
    if (order) {
      wx.showToast({ title: '下单成功', icon: 'success' });
      this.refreshData();
      setTimeout(() => {
        wx.switchTab({ url: '/pages/orders/orders' });
      }, 1500);
    }
  }
});
