/**
 * @file 我的
 * @author 小强赵
 */

Page({
    data: {
        str: ''
    },
    onLoad() {},
    getPhoneNumber(e) {
        console.log(e.detail.errMsg);
        console.log(e.detail.iv);
        console.log(e.detail.encryptedData);
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
                console.log(data);
                wx.request({
                    method: 'POST',
                    url: 'https://www.liuliuke.com/huanhuan/authMobile',
                    data,
                    success(res) {
                        console.log(res);
                    }
                });
            },
            fail(res) {
                console.log(res);
            }
        });
        // this.setData({
        //     str: 'iv:' + e.detail.iv
        // });
    }
});
