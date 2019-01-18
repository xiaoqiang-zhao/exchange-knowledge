/**
 * @file 个人头像
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

Page({
    data: {
        disabled: true,
        headerImgSrc: '',
        submitBtn: ''
    },
    onLoad(option) {

        // 从本地获取
        commonUtil.getStorageData('headerImgSrc').then(res => {
            this.setData({
                headerImgSrc: res.headerImgSrc || '',
                type: +option.type,
                submitBtn: +option.type === 1 ? '保存' : '下一步'
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
    validate() {
        let disabled;
        if (this.data.headerImgSrc.length > 0) {
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
        commonUtil.getStorageData('token', 'realname', 'career').then(res => {
            me.request(res);
        });
    },

    request(formData) {
        const me = this;
        wx.uploadFile({
            url: 'https://www.liuliuke.com/huanhuan/submitdetail',
            filePath: me.data.headerImgSrc,
            name: 'headerImgSrc',
            header: {
                'content-type': 'multipart/form-data'
            },
            // HTTP 请求中其他额外的 form data
            formData,
            success(res) {
                if (typeof res.data === 'string') {
                    res.data = JSON.parse(res.data);
                }

                // 存储信息
                wx.setStorage({
                    key: 'headerImgSrc',
                    data: me.data.headerImgSrc
                });

                me.navigateTo();
            }
        });
    },
    navigateTo() {
        if (this.data.type === 1) {
            wx.switchTab({
                url: '/pages/mine/mine'
            });
        }
        else {
            wx.navigateTo({
                url: '/pages/my-knowledge/my-knowledge'
            });
        }
    }
});
