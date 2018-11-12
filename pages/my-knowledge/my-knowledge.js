/**
 * @file 我的知识
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

let title = '';
let content = '';
let type = '';

Page({
    data: {
        disabled: true,
        career: '',
        wxaccount: '',
        content: '',
        count: 0,
        submitBtn: ''
    },
    onLoad(option) {
        // 从本地获取
        commonUtil.getStorageData('title', 'content').then(res => {
            title = res.title || '';
            content = res.content || '';
            this.setData({
                title,
                content,
                count: content.length,
                submitBtn: +option.type === 1 ? '保存' : '完成'
            });
            this.validate();
            type = +option.type;
        });
    },
    titleInput(e) {
        title = e.detail.value;
        this.validate();
    },
    contentInput(e) {
        content = e.detail.value;
        this.setData({
            count: e.detail.value.length,
            content: e.detail.value
        });
        this.validate();
    },
    validate() {
        let disabled;
        if (title.length > 1) {
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
        var me = this;
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/submitknow',
            data: {
                token,
                content: content || '我对这个知识有一些经验，期待与你分享感受，互相交换，一起学习进步。',
                title
            },
            success(res) {
                if (type === 1) {
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
                    data: title
                });
                wx.setStorage({
                    key: 'content',
                    data: content
                });
            }
        });
    }
});
