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
    specSugar: '正常',
    // 门店 & 模式
    currentStore: null,
    stores: [],
    orderMode: 'pickup',
    showStorePopup: false,
    // Banner
    banners: [
      { id: 1, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop&auto=format&q=80', title: '晨间仪式感' },
      { id: 2, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop&auto=format&q=80', title: '手冲的艺术' },
      { id: 3, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=400&fit=crop&auto=format&q=80', title: '每一杯都是灵感' },
      { id: 4, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=400&fit=crop&auto=format&q=80', title: '精品咖啡豆' },
    ],
    currentBanner: 0,
    // 搜索
    searchKeyword: '',
    searchResults: []
  },

  sectionOffsets: [],
  isClickScroll: false,

  onLoad() {
    const categories = store.getCategories();
    const groupedProducts = categories.map(cat => ({
      category: cat,
      items: store.getMenuByCategory(cat)
    }));
    const stores = store.getStores();
    const currentStore = store.getNearestStore();
    this.setData({ categories, groupedProducts, stores, currentStore });
    this.requestLocation();
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
    wx.hideKeyboard();
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

  onSearchInput(e) {
    const keyword = e.detail.value.trim();
    if (!keyword) {
      this.setData({ searchKeyword: '', searchResults: [] });
      return;
    }
    const kw = keyword.toLowerCase();
    const allProducts = store.getMenu();
    const results = allProducts.filter(p => p.name.toLowerCase().includes(kw));
    this.setData({ searchKeyword: keyword, searchResults: results });
  },

  onSearchClear() {
    this.setData({ searchKeyword: '', searchResults: [] });
  },

  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  },

  // 门店与模式
  requestLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: () => {
        this.setData({ currentStore: store.getNearestStore() });
      },
      fail: () => {}
    });
  },

  onStoreTap() {
    this.setData({ showStorePopup: true });
  },

  onStorePopupClose() {
    this.setData({ showStorePopup: false });
  },

  onStoreSelect(e) {
    const id = e.currentTarget.dataset.id;
    const selected = store.getStoreById(id);
    this.setData({ currentStore: selected, showStorePopup: false });
  },

  onModeTap(e) {
    const mode = e.currentTarget.dataset.mode;
    if (mode === 'delivery') {
      wx.navigateTo({ url: '/pages/address/address' });
    }
    this.setData({ orderMode: mode });
  },

  onBannerChange(e) {
    this.setData({ currentBanner: e.detail.current });
  }
});
