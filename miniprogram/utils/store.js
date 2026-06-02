const CART_KEY = 'brew_cart';
const ORDERS_KEY = 'brew_orders';
const ADDRESSES_KEY = 'brew_addresses';
const POINTS_KEY = 'brew_points';
const EXCHANGE_HISTORY_KEY = 'brew_exchange_history';

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

const merchCategories = ['杯子', '器具', '礼盒'];

const merchData = [
  {
    id: 101,
    name: 'BREW 经典随行杯',
    price: 128,
    category: '杯子',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    tag: '新品',
    description: '304不锈钢内胆，保温12小时，哑光黑涂层',
    specs: { type: 'color', options: ['磨砂黑', '月光白', '石墨灰'] }
  },
  {
    id: 102,
    name: '联名马克杯 · 城市系列',
    price: 89,
    category: '杯子',
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&q=80',
    tag: '限量',
    description: '景德镇手工陶瓷，400ml容量，城市手绘插画',
    specs: { type: 'color', options: ['北京', '上海', '成都'] }
  },
  {
    id: 103,
    name: 'BREW 双层玻璃杯',
    price: 68,
    category: '杯子',
    image: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=400&q=80',
    tag: '',
    description: '高硼硅双层隔热，350ml，极简设计',
    specs: { type: 'capacity', options: ['350ml', '500ml'] }
  },
  {
    id: 104,
    name: 'BREW 手冲壶',
    price: 268,
    category: '器具',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    tag: '新品',
    description: '细口鹤嘴壶，精准控水，哑光质感',
    specs: { type: 'color', options: ['哑光黑', '拉丝银'] }
  },
  {
    id: 105,
    name: '手摇磨豆机',
    price: 198,
    category: '器具',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    tag: '',
    description: 'CNC不锈钢刀盘，15档可调，便携设计',
    specs: { type: 'color', options: ['黑色', '银色'] }
  },
  {
    id: 106,
    name: 'V60 滤杯套装',
    price: 158,
    category: '器具',
    image: 'https://images.unsplash.com/photo-1572286258217-40142c1c2554?w=400&q=80',
    tag: '',
    description: '树脂滤杯+分享壶+滤纸100张',
    specs: { type: 'color', options: ['透明', '黑色'] }
  },
  {
    id: 107,
    name: 'BREW 入门礼盒',
    price: 328,
    category: '礼盒',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&q=80',
    tag: '限量',
    description: '随行杯+挂耳咖啡5包+品牌帆布袋',
    specs: { type: 'color', options: ['经典黑', '燕麦白'] }
  },
  {
    id: 108,
    name: '手冲入坑礼盒',
    price: 498,
    category: '礼盒',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
    tag: '新品',
    description: '手冲壶+滤杯+磨豆机+精品豆200g',
    specs: { type: 'color', options: ['黑金', '银白'] }
  },
  {
    id: 109,
    name: '节日限定礼盒',
    price: 388,
    category: '礼盒',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
    tag: '限量',
    description: '马克杯+手冲壶+咖啡豆+贺卡',
    specs: { type: 'color', options: ['圣诞红', '新年金'] }
  }
];

function getMerchCategories() {
  return merchCategories;
}

function getMerch() {
  return merchData;
}

function getMerchByCategory(category) {
  return merchData.filter(item => item.category === category);
}

function getMerchById(id) {
  return merchData.find(item => item.id === id);
}

function addMerchToCart(product, spec) {
  const cart = getCart();
  const key = `merch_${product.id}_${spec}`;
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key,
      productId: product.id,
      name: product.name,
      price: product.price,
      specs: { spec },
      quantity: 1,
      type: 'merch'
    });
  }
  saveCart(cart);
  return cart;
}

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
  const drinkItems = cart.filter(item => item.type !== 'merch');
  const merchItems = cart.filter(item => item.type === 'merch');
  const created = [];

  if (drinkItems.length > 0) {
    const total = drinkItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
      id: 'ORD' + Date.now().toString().slice(-8),
      time: formatTime(new Date()),
      items: drinkItems.map(item => ({ ...item })),
      total,
      status: '制作中'
    };
    orders.unshift(order);
    created.push(order);
  }

  if (merchItems.length > 0) {
    const total = merchItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = {
      id: 'ORD' + (Date.now() + 1).toString().slice(-8),
      time: formatTime(new Date()),
      items: merchItems.map(item => ({ ...item })),
      total,
      status: '待发货'
    };
    orders.unshift(order);
    created.push(order);
  }

  wx.setStorageSync(ORDERS_KEY, JSON.stringify(orders));
  clearCart();
  return created;
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

const pointsGoodsData = [
  { id: 'p1', name: '满30减5元券', category: '优惠券', points: 80, stock: 50, description: '单笔订单满30元可用，有效期7天' },
  { id: 'p2', name: '满50减10元券', category: '优惠券', points: 150, stock: 30, description: '单笔订单满50元可用，有效期7天' },
  { id: 'p3', name: '免配送费券×3', category: '优惠券', points: 60, stock: 99, description: '外送订单免配送费，3张装' },
  { id: 'p4', name: '经典美式兑换券', category: '免费饮品', points: 200, stock: 20, description: '可兑换一杯中杯经典美式（冷/热）' },
  { id: 'p5', name: '拿铁兑换券', category: '免费饮品', points: 280, stock: 15, description: '可兑换一杯中杯拿铁（冷/热）' },
  { id: 'p6', name: '任意饮品兑换券', category: '免费饮品', points: 350, stock: 10, description: '可兑换菜单内任意一杯中杯饮品' },
  { id: 'p7', name: 'BREW 帆布袋', category: '周边小礼', points: 300, stock: 8, description: '纯棉帆布，极简BREW logo印花' },
  { id: 'p8', name: 'BREW 杯垫套装', category: '周边小礼', points: 120, stock: 25, description: '硅藻土吸水杯垫×2，灰/白配色' },
  { id: 'p9', name: 'BREW 贴纸包', category: '周边小礼', points: 50, stock: 99, description: '品牌贴纸10张装，防水材质' },
];

const pointsCategories = ['优惠券', '免费饮品', '周边小礼'];

function getPoints() {
  try {
    const data = wx.getStorageSync(POINTS_KEY);
    return data !== '' && data !== undefined ? Number(data) : 500;
  } catch (e) {
    return 500;
  }
}

function setPoints(val) {
  wx.setStorageSync(POINTS_KEY, val);
}

function getPointsGoods() {
  return pointsGoodsData;
}

function getPointsCategories() {
  return pointsCategories;
}

function getPointsGoodsByCategory(category) {
  return pointsGoodsData.filter(item => item.category === category);
}

function getExchangeHistory() {
  try {
    const data = wx.getStorageSync(EXCHANGE_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function exchangeGoods(goodsId) {
  const goods = pointsGoodsData.find(g => g.id === goodsId);
  if (!goods) return { success: false, msg: '商品不存在' };
  if (goods.stock <= 0) return { success: false, msg: '库存不足' };
  const points = getPoints();
  if (points < goods.points) return { success: false, msg: '积分不足' };
  setPoints(points - goods.points);
  goods.stock -= 1;
  const history = getExchangeHistory();
  history.unshift({
    id: 'EX' + Date.now().toString().slice(-8),
    goodsId: goods.id,
    name: goods.name,
    points: goods.points,
    time: formatTime(new Date())
  });
  wx.setStorageSync(EXCHANGE_HISTORY_KEY, JSON.stringify(history));
  return { success: true, msg: '兑换成功', balance: points - goods.points };
}

module.exports = {
  getMenu,
  getCategories,
  getMenuByCategory,
  getProductById,
  getMerchCategories,
  getMerch,
  getMerchByCategory,
  getMerchById,
  addMerchToCart,
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
  setDefaultAddress,
  getPoints,
  setPoints,
  getPointsGoods,
  getPointsCategories,
  getPointsGoodsByCategory,
  getExchangeHistory,
  exchangeGoods
};
