/**
 * @file 搜索附近
 * @author 小强赵
 */

let name = '';
let idcard = '';

Page({
    data: {
        disabled: true,
        name: '',
        idcard: ''
    },
    onLoad() {
        // debugger
        // getApp().globalData.code
    },
    nameInput(e) {
        name = e.detail.value;
        this.validate();
    },
    idcardInput(e) {
        idcard = e.detail.value;
        this.validate();
    },
    validate() {
        let disabled;
        if (idcard.length === 18 && name.length > 1) {
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
        //     name,
        //     idcard
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
