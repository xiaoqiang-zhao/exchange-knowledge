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
        wxaccount: '',
        headerImgSrc: ''
    },
    onLoad() {
        // debugger
        // getApp().globalData.code
        // console.log('headerImgSrc:', this.data.headerImgSrc !== '');
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
        const me = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success(res) {
                me.setData({
                    headerImgSrc: res.tempFilePaths[0]
                });
                me.validate();
            }
        });
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
        if (
            wxaccount.length > 1
            && career.length > 1
            && this.data.headerImgSrc.length > 1) {
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
        const me = this;
        wx.uploadFile({
            url: 'https://www.liuliuke.com/huanhuan/submitdetail',
            filePath: this.data.headerImgSrc,
            name: 'headerImgSrc',
            header: {
                'content-type': 'multipart/form-data'
            },
            // HTTP 请求中其他额外的 form data
            formData: {
                token,
                wxaccount,
                career
            },
            success() {
                wx.setStorage({
                    key: 'career',
                    data: career
                });
                me.navigateTo();
            }
        });
    },
    navigateTo() {
        wx.navigateTo({
            url: '/pages/my-konwledge/my-konwledge'
        });
    }
});
