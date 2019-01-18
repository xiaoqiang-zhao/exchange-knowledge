// pages/view-matched/view-matched.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {},
        wxaccount: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const data = {
            user: options.user,
            token: options.token
        };
        this.viewUser(data);
    },
    viewUser(data) {
        const me = this;
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/getWxpage',
            data,
            success(res) {
                if (res.data.data) {
                    me.setData({
                        info: res.data.data,
                        wxaccount: res.data.data.wxaccount,
                        avatar: res.data.data.avatar
                    });
                }
            }
        });
    },

    copyAccount() {
        wx.setClipboardData({
            data: this.data.wxaccount,
            success() {
                wx.showToast({
                    title: `已复制对方微信${this.data.wxaccount}`,
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    },

    previewImage() {
        wx.previewImage({
            current: this.data.info.avatar, // 当前显示图片的http链接
            urls: [this.data.info.avatar] // 需要预览的图片http链接列表
        });
    }
});
