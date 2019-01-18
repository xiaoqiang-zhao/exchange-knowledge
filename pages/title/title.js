// pages/title/title.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled: true,
        title: ''
    },

    titleInput(e) {
        this.setData({
            title: e.detail.value
        });
        this.validate();
    },

    validate() {
        let disabled;
        if (this.data.title.length > 0) {
            disabled = false;
        }
        else {
            disabled = true;
        }
        this.setData({
            disabled
        });
    },

    // 提交事件
    submit() {
        const me = this;
        if (this.data.disabled) {
            return false
        }
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
                title: me.data.title
            },
            success() {
                // 存储信息
                wx.setStorage({
                    key: 'title',
                    data: me.data.title
                });

                // 到下一步
                wx.navigateTo({
                  url: '/pages/nick/nick'
                });
            }
        });
    }
});