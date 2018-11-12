/**
 * @file 预加载页，已登陆和未登录 两种状态需要进不同的页面，没找到分流的方法，暂时用一个空白页实现分流
 * @author 小强赵
 */
import commonUtil from '../../utils/common';
let token;
Page({
    data: {},
    onLoad() {
        commonUtil.getStorageData('token').then(res => {
            token = res.token;
            // console.log(token)
        });
        wx.getStorage({
            key: 'mobile',
            // 已验证手机 -> 搜附近的人
            success() {
                wx.redirectTo({
                    url: '/pages/guide-page/guide-page'
                });
            },
            // 未验证手机 -> 登录注册
            fail() {
                wx.redirectTo({
                    url: '/pages/login/login'
                });
            }
        });


        // 第一次登录显示引导页
        function getFirstLogin(token) {
            wx.request({
                method: 'GET',
                url: 'https://www.liuliuke.com/huanhuan/checkfirst',
                data: {
                    token: token
                },
                success(res) {
                    firstLogin = res.data.data.firstLogin;
                    if (firstLogin) {
                        wx.redirectTo({
                            url: '/pages/guide-page/guide-page'
                        });
                    } else {
                        wx.redirectTo({
                            url: '/pages/search-nearby/search-nearby'
                        });
                    }
                }
            });
        }
    }
});