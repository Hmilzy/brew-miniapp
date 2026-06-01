const store = require('../../utils/store');

Page({
  data: {
    categories: [],
    currentCategory: '咖啡',
    groupedProducts: [],
    scrollToView: '',
    cartCount: 0,
    cartTotal: 0,
    showDetail: false,
    currentProduct: null,
    specSize: '中杯',
    specTemp: '冰',
    specSugar: '正常'
  },

  sectionOffsets: [],
  isClickScroll: false,

  onLoad() {
    const categories = store.getCategories();
    const groupedProducts = categories.map(cat => ({
      category: cat,
      items: store.getMenuByCategory(cat)
    }));
    this.setData({ categories, groupedProducts });
  },

  onShow() {
    this.refreshCart();
  },

  onReady() {
    setTimeout(() => this.computeSectionOffsets(), 300);
  },

  computeSectionOffsets() {
    const query = wx.createSelectorQuery();
    query.selectAll('.category-section').boundingClientRect();
    query.select('.product-list').boundingClientRect();
    query.exec((res) => {
      if (!res[0] || !res[1]) return;
      const listTop = res[1].top;
      this.sectionOffsets = res[0].map(rect => rect.top - listTop);
    });
  },

  refreshCart() {
    const { count, total } = store.getCartTotal();
    this.setData({ cartCount: count, cartTotal: total });
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    const idx = this.data.categories.indexOf(category);
    this.isClickScroll = true;
    this.setData({
      currentCategory: category,
      scrollToView: 'section-' + idx
    });
    setTimeout(() => { this.isClickScroll = false; }, 600);
  },

  onProductScroll(e) {
    if (this.isClickScroll || !this.sectionOffsets.length) return;
    const scrollTop = e.detail.scrollTop;
    const offsets = this.sectionOffsets;
    let idx = 0;
    for (let i = offsets.length - 1; i >= 0; i--) {
      if (scrollTop >= offsets[i] - 20) {
        idx = i;
        break;
      }
    }
    const cat = this.data.categories[idx];
    if (this.data.currentCategory !== cat) {
      this.setData({ currentCategory: cat });
    }
  },

  onProductTap(e) {
    const id = e.currentTarget.dataset.id;
    this.openSpecPopup(id);
  },

  onQuickAdd(e) {
    const id = e.currentTarget.dataset.id;
    this.openSpecPopup(id);
  },

  openSpecPopup(id) {
    const product = store.getProductById(id);
    this.setData({
      showDetail: true,
      currentProduct: product,
      specSize: '中杯',
      specTemp: '冰',
      specSugar: '正常'
    });
  },

  onCloseDetail() {
    this.setData({ showDetail: false });
  },

  onMaskTap() {
    this.setData({ showDetail: false });
  },

  onSizeChange(e) {
    this.setData({ specSize: e.currentTarget.dataset.value });
  },

  onTempChange(e) {
    this.setData({ specTemp: e.currentTarget.dataset.value });
  },

  onSugarChange(e) {
    this.setData({ specSugar: e.currentTarget.dataset.value });
  },

  onAddToCart() {
    const { currentProduct, specSize, specTemp, specSugar } = this.data;
    store.addToCart(currentProduct, {
      size: specSize,
      temp: specTemp,
      sugar: specSugar
    });
    this.refreshCart();
    this.setData({ showDetail: false });
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  goToCart() {
    wx.switchTab({ url: '/pages/cart/cart' });
  }
});
