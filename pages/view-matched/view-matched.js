// pages/view-matched/view-matched.js

let user;
let token;
let wxaccount;
let fromUrl;

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
        let data = {};

        data = {
            user: options.user,
            token: options.token
        }
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
                        info: res.data.data

                    })
                    wxaccount = res.data.data.wxaccount
                }


            }
        });
    },

    copyAccount() {
        wx.setClipboardData({
            data: wxaccount,
            success: function(res) {
                wx.showToast({
                    title: `已复制对方微信${wxaccount}`,
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    }
});
