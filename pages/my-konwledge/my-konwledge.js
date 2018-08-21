/**
 * @file 我的知识
 * @author 小强赵
 */

let title = '';
let content = '';

Page({
    data: {
        disabled: true,
        career: '',
        wxaccount: '',
        content: '',
        count: 0
    },
    onLoad() {
        // debugger
        // getApp().globalData.code
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
        if (content.length > 1 && title.length > 1) {
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
            url: 'https://www.liuliuke.com/huanhuan/submitknow',
            data: {
                token,
                content,
                title
            },
            success(res) {
                wx.switchTab({
                    url: '/pages/index/index'
                });

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
