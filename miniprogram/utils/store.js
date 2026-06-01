const CART_KEY = 'brew_cart';
const ORDERS_KEY = 'brew_orders';
const ADDRESSES_KEY = 'brew_addresses';

const storesData = [
  { id: 1, name: 'BREW 国贸旗舰店', address: '北京市朝阳区国贸商城B1层', distance: '368m', lat: 39.909, lng: 116.461 },
  { id: 2, name: 'BREW 三里屯店', address: '北京市朝阳区三里屯太古里南区', distance: '1.2km', lat: 39.933, lng: 116.455 },
  { id: 3, name: 'BREW 望京店', address: '北京市朝阳区望京SOHO T1', distance: '3.5km', lat: 39.997, lng: 116.480 },
  { id: 4, name: 'BREW 中关村店', address: '北京市海淀区中关村大街1号', distance: '8.7km', lat: 39.981, lng: 116.311 },
];

const defaultAddresses = [
  { id: 1, name: '张三', phone: '138****8888', address: '朝阳区建国路93号万达广场1号楼2单元301', tag: '公司', isDefault: true },
  { id: 2, name: '张三', phone: '138****8888', address: '朝阳区望京西园三区218号楼1层', tag: '家', isDefault: false },
];

const menuData = [
  {
    id: 1,
    name: '经典美式',
    price: 22,
    category: '咖啡',
    image: '',
    description: '双份浓缩萃取，纯粹咖啡风味，低卡之选'
  },
  {
    id: 2,
    name: '拿铁',
    price: 28,
    category: '咖啡',
    image: '',
    description: '醇厚浓缩与丝滑牛奶的经典搭配'
  },
  {
    id: 3,
    name: '澳白',
    price: 30,
    category: '咖啡',
    image: '',
    description: '细腻奶泡与 Ristretto 的完美平衡'
  },
  {
    id: 4,
    name: '桂花dirty',
    price: 32,
    category: '特调',
    image: '',
    description: '浓缩直落冰牛奶，桂花糖浆增添东方韵味'
  },
  {
    id: 5,
    name: '生椰拿铁',
    price: 34,
    category: '特调',
    image: '',
    description: '新鲜生椰乳搭配浓缩，热带风情'
  },
  {
    id: 6,
    name: '巴斯克芝士蛋糕',
    price: 28,
    category: '轻食',
    image: '',
    description: '西班牙风味，外焦里嫩，浓郁芝士香'
  },
  {
    id: 7,
    name: '可颂',
    price: 18,
    category: '轻食',
    image: '',
    description: '法式手工酥皮，层层起酥，黄油满溢'
  },
  {
    id: 8,
    name: '柠檬气泡水',
    price: 16,
    category: '饮品',
    image: '',
    description: '鲜榨柠檬搭配气泡水，清爽解腻'
  },
  {
    id: 9,
    name: '伯爵红茶',
    price: 20,
    category: '饮品',
    image: '',
    description: '斯里兰卡茶底，佛手柑香气优雅回甘'
  }
];

const categories = ['咖啡', '特调', '轻食', '饮品'];

function getMenu() {
  return menuData;
}

function getCategories() {
  return categories;
}

function getMenuByCategory(category) {
  return menuData.filter(item => item.category === category);
}

function getProductById(id) {
  return menuData.find(item => item.id === id);
}

function getCart() {
  try {
    const data = wx.getStorageSync(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  wx.setStorageSync(CART_KEY, JSON.stringify(cart));
}

function addToCart(product, specs) {
  const cart = getCart();
  const key = `${product.id}_${specs.size}_${specs.temp}_${specs.sugar}`;
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key,
      productId: product.id,
      name: product.name,
      price: product.price + (specs.size === '大杯' ? 4 : 0),
      specs,
      quantity: 1
    });
  }
  saveCart(cart);
  return cart;
}

function updateCartItemQuantity(key, quantity) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter(item => item.key !== key);
  } else {
    const item = cart.find(item => item.key === key);
    if (item) item.quantity = quantity;
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(key) {
  let cart = getCart();
  cart = cart.filter(item => item.key !== key);
  saveCart(cart);
  return cart;
}

function clearCart() {
  saveCart([]);
  return [];
}

function getCartTotal() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { count, total };
}

function getOrders() {
  try {
    const data = wx.getStorageSync(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function createOrder() {
  const cart = getCart();
  if (cart.length === 0) return null;
  const orders = getOrders();
  const { total } = getCartTotal();
  const order = {
    id: 'ORD' + Date.now().toString().slice(-8),
    time: formatTime(new Date()),
    items: cart.map(item => ({ ...item })),
    total,
    status: '制作中'
  };
  orders.unshift(order);
  wx.setStorageSync(ORDERS_KEY, JSON.stringify(orders));
  clearCart();
  return order;
}

function formatTime(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}`;
}

function getStores() {
  return storesData;
}

function getStoreById(id) {
  return storesData.find(s => s.id === id);
}

function getNearestStore() {
  return storesData[0];
}

function getAddresses() {
  try {
    const data = wx.getStorageSync(ADDRESSES_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {}
  wx.setStorageSync(ADDRESSES_KEY, JSON.stringify(defaultAddresses));
  return defaultAddresses;
}

function addAddress(addr) {
  const addresses = getAddresses();
  addr.id = Date.now();
  addr.isDefault = addresses.length === 0;
  addresses.push(addr);
  wx.setStorageSync(ADDRESSES_KEY, JSON.stringify(addresses));
  return addresses;
}

function setDefaultAddress(id) {
  const addresses = getAddresses();
  addresses.forEach(a => { a.isDefault = a.id === id; });
  wx.setStorageSync(ADDRESSES_KEY, JSON.stringify(addresses));
  return addresses;
}

module.exports = {
  getMenu,
  getCategories,
  getMenuByCategory,
  getProductById,
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getCartTotal,
  getOrders,
  createOrder,
  getStores,
  getStoreById,
  getNearestStore,
  getAddresses,
  addAddress,
  setDefaultAddress
};
