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
        if (this.data.career.length > 2) {
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
        if(this.data.disabled){
            return false
        }
        wx.getStorage({
            key: 'token',
            success(res) {
                wx.request({
                    method: 'GET',
                    url: 'https://www.liuliuke.com/huanhuan/submitdetail',
                    data: {
                        token: res.data,
                        career: me.data.career
                    }
                });

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