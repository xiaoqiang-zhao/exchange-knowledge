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
    chooseImageTap() {
        let me = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: '#f7982a',
            success(res) {
                if (!res.cancel) {
                    if (res.tapIndex === 0) {
                        me.chooseWxImage('album');
                    }
                    else if (res.tapIndex === 1) {
                        me.chooseWxImage('camera');
                    }
                }
            }
        });
    },
    chooseWxImage(type) {
        let _this = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success(res) {
                console.log(res);
                _this.setData({
                    headImg: res.tempFilePaths[0]
                });
            }
        });
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
