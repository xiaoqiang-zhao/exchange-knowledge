/**
 * @file 登录页面
 * @author 小强赵
 */

Page({
    data: {},
    onLoad() {
        const me = this;
        wx.getStorage({
            key: 'mobile',
            success(res) {
                // console.log('code:', res.data);
                // 跳转到下一页
                me.navigateTo();
            }
        });
    },

    /**
     * 获取手机号
     *
     * @param {Object} e 事件参数
     */
    getCellPhoneNumber(e) {
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

                me.decodeCellPhoneNumber(data);
            }
        });
    },

    /**
     * 需要借助服务器解码加密后的手机号
     *
     * @param {Object} data 参数
     */
    decodeCellPhoneNumber(data) {
        const me = this;
        wx.request({
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: 'https://www.liuliuke.com/huanhuan/authMobile',
            data,
            success(res) {
                wx.setStorage({
                    key: 'mobile',
                    data: res.data.mobile
                });
                // console.log('decodeCellPhoneNumber:', res);
                me.navigateTo();
            }
        });
    },
    navigateTo() {
        wx.navigateTo({
            url: '/pages/real-name/real-name'
        });
    }
});
