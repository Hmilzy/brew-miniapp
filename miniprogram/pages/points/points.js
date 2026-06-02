const store = require('../../utils/store');

Page({
  data: {
    points: 0,
    categories: [],
    currentCategory: '',
    goodsList: [],
    showModal: false,
    modalState: 'confirm',
    selectedGoods: null,
    exchangeBalance: 0,
    showHistory: false,
    historyList: [],
    scrollTarget: ''
  },

  onLoad(options) {
    this.setData({
      categories: store.getPointsCategories()
    });
    this.setData({ currentCategory: this.data.categories[0] });
    this.refreshData();
    if (options && options.showHistory === 'true') {
      this.setData({
        showHistory: true,
        historyList: store.getExchangeHistory()
      });
      setTimeout(() => {
        this.setData({ scrollTarget: 'history-section' });
      }, 100);
    }
  },

  onShow() {
    this.refreshData();
  },

  refreshData() {
    this.setData({
      points: store.getPoints(),
      goodsList: store.getPointsGoodsByCategory(this.data.currentCategory)
    });
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.cat;
    this.setData({
      currentCategory: category,
      goodsList: store.getPointsGoodsByCategory(category)
    });
  },

  onGoodsTap(e) {
    const id = e.currentTarget.dataset.id;
    const goods = store.getPointsGoods().find(g => g.id === id);
    if (goods) {
      this.setData({ showModal: true, modalState: 'confirm', selectedGoods: goods });
    }
  },

  onConfirmExchange() {
    const result = store.exchangeGoods(this.data.selectedGoods.id);
    if (result.success) {
      this.setData({ modalState: 'success', exchangeBalance: result.balance });
      setTimeout(() => {
        this.setData({ showModal: false });
        this.refreshData();
      }, 1500);
    } else {
      wx.showToast({ title: result.msg, icon: 'none' });
    }
  },

  onCancelExchange() {
    this.setData({ showModal: false, selectedGoods: null, modalState: 'confirm' });
  },

  onToggleHistory() {
    const show = !this.data.showHistory;
    this.setData({
      showHistory: show,
      historyList: show ? store.getExchangeHistory() : []
    });
  }
});
