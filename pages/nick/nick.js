/**
 * @file 获取用户信息
 * @author 小强赵
 */

Page({

    /**
     * 获取用户信息
     *
     * @param {Object} e 事件参数
     */
    getUserInfo(e) {
        if (e.detail.rawData) {
            const userInfo = JSON.parse(e.detail.rawData);
            // 存储信息
            wx.setStorage({
                key: 'realname',
                data: userInfo.nickName
            });
            wx.setStorage({
                key: 'headerImgSrc',
                data: userInfo.avatarUrl
            });
            this.navigateTo();
        }
    },

    navigateTo() {
        wx.navigateTo({
            url: '/pages/search-nearby/search-nearby'
        });
    }
});
