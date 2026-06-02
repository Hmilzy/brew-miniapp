const store = require('../../utils/store');

Page({
  data: {
    categories: [],
    currentCategory: '杯子',
    products: [],
    showDetail: false,
    currentProduct: null,
    selectedSpec: '',
    cartCount: 0
  },

  onLoad() {
    const categories = store.getMerchCategories();
    const products = store.getMerchByCategory('杯子');
    this.setData({ categories, products });
  },

  onShow() {
    this.refreshCart();
  },

  refreshCart() {
    const { count } = store.getCartTotal();
    this.setData({ cartCount: count });
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    const products = store.getMerchByCategory(category);
    this.setData({ currentCategory: category, products });
  },

  onProductTap(e) {
    const id = e.currentTarget.dataset.id;
    const product = store.getMerchById(id);
    this.setData({
      showDetail: true,
      currentProduct: product,
      selectedSpec: product.specs.options[0]
    });
  },

  onCloseDetail() {
    this.setData({ showDetail: false });
  },

  onMaskTap() {
    this.setData({ showDetail: false });
  },

  onSpecTap(e) {
    this.setData({ selectedSpec: e.currentTarget.dataset.value });
  },

  onAddToCart() {
    const { currentProduct, selectedSpec } = this.data;
    store.addMerchToCart(currentProduct, selectedSpec);
    this.refreshCart();
    this.setData({ showDetail: false });
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  },

  goBack() {
    wx.navigateBack();
  }
});
