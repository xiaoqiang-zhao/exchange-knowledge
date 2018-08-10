/**
 * @file 我的
 * @author 小强赵
 */

Page({
    data: {
        str: ''
    },
    onLoad() {
        this.checkRealName();
    },
    // 如果未实名认证到实名认证页
    checkRealName() {
        const me = this;
        wx.getStorage({
            key: 'realName',
            success(res) {
                // console.log('realName:', res.data);
                me.checkCareer();
            },
            // 到实名认证页
            fail() {
                wx.navigateTo({
                    url: '/pages/real-name/real-name'
                });
            }
        });
    },
    checkCareer() {
        wx.getStorage({
            key: 'career',
            success(res) {
                // console.log('realName:', res.data);
                me.checkMyKonwledge();
            },
            // 到实名认证页
            fail() {
                wx.navigateTo({
                    url: '/pages/personal-info/personal-info'
                });
            }
        });
    },
    checkMyKonwledge() {
        wx.getStorage({
            key: 'title',
            success(res) {
                // console.log('realName:', res.data);
            },
            // 到实名认证页
            fail() {
                wx.navigateTo({
                    url: '/pages/my-konwledge/my-konwledge'
                });
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

                // console.log('getPhoneNumber:' + data);

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
            fail(res) {
                console.log(res);
            }
        });
        // this.setData({
        //     str: 'iv:' + e.detail.iv
        // });
    }
});
