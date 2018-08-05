/**
 * @file 个人信息
 * @author 小强赵
 */

let career = '';
let wxaccount = '';

Page({
    data: {
        disabled: true,
        career: '',
        wxaccount: ''
    },
    onLoad() {
        // debugger
        // getApp().globalData.code
    },
    careerInput(e) {
        career = e.detail.value;
        this.validate();
    },
    wxaccountInput(e) {
        wxaccount = e.detail.value;
        this.validate();
    },
    validate() {
        let disabled;
        if (wxaccount.length === 18 && career.length > 1) {
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
        wx.request({
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: 'https://www.liuliuke.com/huanhuan/realname',
            data: {
                token: getApp().globalData.code,
                name,
                idcard
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
