// app.js
App({
    onLaunch() {
        wx.getStorage({
            key: 'mobile',
            // 已验证手机 -> 搜附近的人
            success() {
                // console.log(res.data);
                // 没找到怎么不闪一下的情况下 根据逻辑进入不同页面的方法
                // wx.navigateTo({
                //     url: '/pages/search-nearby/search-nearby'
                // });
            },
            // 未验证手机 -> 登录注册
            fail() {
                xwLogin();
            }
        });

        // 微信登录
        function xwLogin() {
            wx.login({
                success(res) {
                    if (res.code) {
                        thirdLogin(res.code);
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
        }

        /**
         * 第三方登录(我们自己的服务器登录)
         * @param {string} code code码
         */
        function thirdLogin(code) {
            wx.request({
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                url: 'https://www.liuliuke.com/huanhuan/login',
                data: {
                    code: code
                },
                success(res) {
                    let token = res.data.data.token;
                    wx.setStorage({
                        key: 'token',
                        data: token
                    });
                }
            });
        }
    }
});
