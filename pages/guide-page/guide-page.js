// pages/guide-page/guide-page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 点击按钮
     */
    submit() {
        wx.navigateTo({
            url: '/pages/search-nearby/search-nearby'
        });
    }
});