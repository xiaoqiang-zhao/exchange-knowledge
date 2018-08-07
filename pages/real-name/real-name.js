/**
 * @file 实名认证
 * @author 小强赵
 */

let realname = '';
let idcard = '';

Page({
    data: {
        disabled: true,
        realname: '',
        idcard: '',
        isShow: false
    },
    onLoad() {
        // debugger
        // getApp().globalData.code
    },
    nameInput(e) {
        realname = e.detail.value;
        this.validate();
    },
    idcardInput(e) {
        idcard = e.detail.value;
        this.validate();
    },
    validate() {
        let disabled;
        if (idcard.length === 18 && realname.length > 1) {
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
        const me = this;
        wx.getStorage({
            key: 'token',
            success(res) {
                me.request(res.data);
            }
        });

    },
    request(token) {
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/realname',
            data: {
                token,
                realname,
                idcard
            },
            success(res) {
                wx.setStorage({
                    key: 'realName',
                    data: realname
                });
                wx.navigateTo({
                    url: '/pages/personal-info/personal-info'
                });
                // let isShow;
                // if (res.data.data.code === 0) {
                //     wx.setStorage({
                //         key: 'realName',
                //         data: realname
                //     });
                //     isShow = true;
                //     wx.navigateTo({
                //         url: '/pages/personal-info/personal-info'
                //     });
                // }
                // else {
                //     isShow = false;
                // }
                // me.setData({
                //     isShow
                // });
            }
        });
    }
});
