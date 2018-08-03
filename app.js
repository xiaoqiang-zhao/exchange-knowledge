//app.js
App({
    onLaunch() {
        // 微信登录
        wx.login({
            success: function(res) {
                if (res.code) {
                    // 用微信登录返回的加密数据换取解密后的数据
                    // wx.request({
                    //     method: 'POST',
                    //     url: 'https://www.liuliuke.com/huanhuan/login',
                    //     data: {
                    //         code: res.code
                    //     },
                    //     success(res) {
                    //         console.log(res);
                    //     }
                    // });

                    // wx.showToast({
                    //     title: '登录成功',
                    //     icon: 'success',
                    //     duration: 2000
                    // });
                    console.log('loginCode:' + res.code);
                    wx.setStorage({
                        key: 'code',
                        data: res.code
                    });
                } else {
                    wx.showToast({
                        title: '登录失败',
                        icon: 'success',
                        duration: 2000
                    });
                }
            }
        });
    },
    globalData: {
        userInfo: null
    }
});