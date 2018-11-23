/**
 * @file 搜索附近
 * @author 小强赵
 */

Page({
    data: {
        status: 0,
        content: '正在查找附近的人...'
    },
    onLoad() {
        this.getLocation();
    },
    getLocation() {
        const me = this;
        wx.getLocation({
            success(res) {
                me.setData({
                    content: '正在查找附近的人...',
                    status: 1
                });
                setTimeout(() => {
                    // 到首页
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }, 3000);

                wx.setStorage({
                    key: 'location',
                    data: res
                });
                // longitude 经度
                // latitude 维度
            },
            fail() {
                me.setData({
                    content: '地理位置授权遭拒绝',
                    status: 2
                });
            }
        });
    },
    openSetting() {
        wx.openSetting();
    }
});
