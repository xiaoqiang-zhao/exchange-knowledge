/**
 * @file 实名认证
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

let realname = '';
let idcard = '';

Page({
    data: {
        disabled: true,
        realname: '',
        idcard: '',
        isShow: false
    },
    onLoad() {
        // 从本地获取
        commonUtil.getStorageData('realName', 'idcard').then(res => {
            realname = res.realName || '';
            idcard = res.idcard || '';
            this.setData({
                realname,
                idcard
            });
            this.validate();
        });
    },
    nameInput(e) {
        realname = e.detail.value;
        this.validate();
    },
    idcardInput(e) {
        idcard = e.detail.value;
        this.validate();
    },
    validate() {
        let disabled;
        if (idcard.length === 18 && realname.length > 1) {
            disabled = false;
        }
        else {
            disabled = true;
        }
        this.setData({
            disabled
        });
    },
    submit() {
        const me = this;
        wx.getStorage({
            key: 'token',
            success(res) {
                me.request(res.data);
            }
        });

    },
  request(token) {
    wx.request({
      method: 'GET',
      url: 'https://www.liuliuke.com/huanhuan/realname',
      data: {
        token,
        realname,
        idcard
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/personal-info/personal-info'
        });

        // 存储信息
        wx.setStorage({
          key: 'realName',
          data: realname
        });
        wx.setStorage({
          key: 'idcard',
          data: idcard
        });
      }
    });
  }
});
