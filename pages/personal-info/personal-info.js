/**
 * @file 个人信息
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

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
        // 从本地获取
        commonUtil.getStorageData('career', 'wxaccount', 'headerImgSrc').then(res => {
            career = res.career || '';
            wxaccount = res.wxaccount || '';
            this.setData({
                career,
                wxaccount,
                headerImgSrc: res.headerImgSrc || ''
            });
            this.validate();
        });
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
            success(res) {
                me.navigateTo();

                if (typeof res.data === 'string') {
                    res.data = JSON.parse(res.data);
                }

                // 存储信息
                wx.setStorage({
                    key: 'headerImgSrc',
                    data: res.data.data.showpics.headerImgSrc
                });
                wx.setStorage({
                    key: 'wxaccount',
                    data: wxaccount
                });
                wx.setStorage({
                    key: 'career',
                    data: career
                });
            }
        });
    },
    navigateTo() {
        wx.navigateTo({
            url: '/pages/my-knowledge/my-knowledge'
        });
    }
});
