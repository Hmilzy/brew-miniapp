const store = require('../../utils/store');

Page({
  data: {
    addresses: [],
    showAddForm: false,
    form: {
      name: '',
      phone: '',
      address: '',
      tag: '家'
    }
  },

  onShow() {
    this.setData({ addresses: store.getAddresses() });
  },

  onAddressTap(e) {
    const id = e.currentTarget.dataset.id;
    store.setDefaultAddress(id);
    wx.showToast({ title: '已选择', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack();
    }, 800);
  },

  onAddNew() {
    this.setData({ showAddForm: true });
  },

  onFormClose() {
    this.setData({ showAddForm: false });
  },

  onInputName(e) {
    this.setData({ 'form.name': e.detail.value });
  },

  onInputPhone(e) {
    this.setData({ 'form.phone': e.detail.value });
  },

  onInputAddress(e) {
    this.setData({ 'form.address': e.detail.value });
  },

  onTagTap(e) {
    this.setData({ 'form.tag': e.currentTarget.dataset.tag });
  },

  onSubmitAddress() {
    const { name, phone, address, tag } = this.data.form;
    if (!name || !phone || !address) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    store.addAddress({ name, phone, address, tag, isDefault: false });
    this.setData({
      showAddForm: false,
      addresses: store.getAddresses(),
      form: { name: '', phone: '', address: '', tag: '家' }
    });
    wx.showToast({ title: '添加成功', icon: 'success' });
  }
});
