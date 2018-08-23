/**
 * @file 预加载页，已登陆和未登录 两种状态需要进不同的页面，没找到分流的方法，暂时用一个空白页实现分流
 * @author 小强赵
 */

Page({
    data: {},
    onLoad() {
        // debugger
        // getApp().globalData.code
        wx.getStorage({
            key: 'mobile',
            // 已验证手机 -> 搜附近的人
            success() {
                // console.log(res.data);
                wx.redirectTo({
                    url: '/pages/search-nearby/search-nearby'
                });
            },
            // 未验证手机 -> 登录注册
            fail() {
                wx.redirectTo({
                    url: '/pages/login/login'
                });
            }
        });
    }
});
