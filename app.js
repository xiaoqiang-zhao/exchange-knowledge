//app.js
App({
    onLaunch() {
        // wx.getStorage({
        //     key: 'code',
        //     // 已经获取过登录码
        //     success() {
        //         // console.log(res.data);
        //     },
        //     // 未获取登录码
        //     fail() {
        //     }
        // });

        // 微信登录
        wx.login({
            success: function(res) {
                if (res.code) {
                    wx.setStorage({
                        key: 'code',
                        data: res.code
                    });
                }
                else {
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
