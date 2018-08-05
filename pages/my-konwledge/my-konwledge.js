/**
 * @file 我的知识
 * @author 小强赵
 */

let title = '';
let content = '';

Page({
    data: {
        disabled: true,
        career: '',
        wxaccount: '',
        content: '',
        count: 0
    },
    onLoad() {
        // debugger
        // getApp().globalData.code
    },
    titleInput(e) {
        title = e.detail.value;
        this.validate();
    },
    contentInput(e) {
        content = e.detail.value;
        this.setData({
            count: e.detail.value.length,
            content: e.detail.value
        });
        this.validate();
    },
    validate() {
        let disabled;
        if (content.length === 18 && title.length > 1) {
            disabled = false;
        }
        else {
            disabled = true;
        }
        this.setData({
            disabled
        });
    },
    submit() {
        // console.log({
        //     token: getApp().globalData.code,
        //     career,
        //     wxaccount
        // });
        const me = this;
        wx.request({
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: 'https://www.liuliuke.com/huanhuan/realname',
            data: {
                token: getApp().globalData.code,
                title,
                content
            },
            success(res) {
                wx.setStorage({
                    key: 'mobile',
                    data: res.data.mobile
                });
                me.navigateTo();
            }
        });
    }
});
