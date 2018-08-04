/**
 * @file 我的
 * @author 小强赵
 */

Page({
    data: {
        str: ''
    },
    onLoad() {
        wx.getStorage({
            key: 'code',
            success(res) {
                // console.log('code:', res.data);
                // 跳转到下一页
            }
        });
    },
    getPhoneNumber(e) {
        const me = this;
        wx.getStorage({
            key: 'code',
            success(res) {
                // 换真数据
                // 用微信登录返回的加密数据换取解密后的数据
                const data = {
                    code: res.data,
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData
                };

                me.dd(data);
            }
        });
    },
    dd(data) {
        const me = this;
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/authMobile',
            data,
            success(res) {
                console.log(res);
                me.setData({
                    str: res.data.msg.mobile
                });
            }
        });
    },
    navigateTo() {
        wx.navigateTo({
            url: '/pages/your-profile/your-profile'
        });
    }
});
