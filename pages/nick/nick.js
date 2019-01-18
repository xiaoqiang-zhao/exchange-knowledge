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
            wx.getStorage({
                key: 'token',
                success(res) {
                    wx.request({
                        method: 'GET',
                        url: 'https://www.liuliuke.com/huanhuan/upnickpic',
                        data: {
                            token: res.data,
                            nick: userInfo.nickName,
                            pic: userInfo.avatarUrl,
                            gender: userInfo.gender
                        }
                    });
                }
            });

            // 存储信息
            wx.setStorage({
                key: 'realname',
                data: userInfo.nickName
            });
            wx.setStorage({
                key: 'headerImgSrc',
                data: userInfo.avatarUrl
            });

            wx.setStorage({
                key: 'gender',
                data: userInfo.gender
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
