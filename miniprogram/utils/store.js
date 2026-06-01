const CART_KEY = 'brew_cart';
const ORDERS_KEY = 'brew_orders';

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
  createOrder
};
