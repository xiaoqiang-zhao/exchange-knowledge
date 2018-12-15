// pages/career/career.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled: true,
        career: ''

    },

    careerInput(e) {
        this.setData({
            career: e.detail.value
        });
        this.validate();
    },

    validate() {
        let disabled;
        if (this.data.career.length > 0) {
            disabled = false;
        }
        else {
            disabled = true;
        }
        this.setData({
            disabled
        });
    },

    // 提交事件
    submit() {
        const me = this;

        wx.getStorage({
            key: 'token',
            success(res) {
                // 由于业务变更后台端接口没有单独提供 API，到下一步再提交
                // me.request(res.data);

                wx.setStorage({
                    key: 'career',
                    data: me.data.career
                });

                me.navigateTo();
            }
        });
    },

    // 跳转
    navigateTo() {
        wx.navigateTo({
            url: '/pages/title/title'
        });
    }
});