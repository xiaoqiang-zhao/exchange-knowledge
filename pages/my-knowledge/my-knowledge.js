/**
 * @file 我的知识
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

Page({
    data: {
        disabled: true,
        type: '',
        title: '',
        wxaccount: '',
        submitBtn: ''
    },
    onLoad(option) {
        // 从本地获取
        commonUtil.getStorageData('title', 'wxaccount', 'career').then(res => {
            this.setData({
                type: +option.type,
                title: res.career + '经验',
                wxaccount: res.wxaccount || '',
                submitBtn: +option.type === 1 ? '保存' : '完成'
            });
            this.validate();
        });
    },
    titleInput(e) {
        this.setData({
            title: e.detail.value
        });
        this.validate();
    },
    wxaccountInput(e) {
        this.setData({
            wxaccount: e.detail.value
        });
        this.validate();
    },
    validate() {
        let disabled = false;

        if (this.data.title.length === 0) {
            disabled = true;
        }
        if (this.data.wxaccount.length === 0) {
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
        var me = this;
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/submitknow',
            data: {
                token,
                title: me.data.title,
                wxaccount: me.data.wxaccount
            },
            success(res) {
                if (me.data.type === 1) {
                    wx.switchTab({
                        url: '/pages/mine/mine'
                    });
                }
                else {
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }

                wx.showTabBar();

                // 存储信息
                wx.setStorage({
                    key: 'title',
                    data: me.data.title
                });
                wx.setStorage({
                    key: 'wxaccount',
                    data: me.data.wxaccount
                });
            }
        });
    }
});
