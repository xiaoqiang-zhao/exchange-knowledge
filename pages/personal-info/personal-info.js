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
        // headerImgSrc: 'https://mmbiz.qpic.cn/mmbiz_png/wDK6CibcOhhMfM2uRLLRDHh52vA6hGkxByib4ucNMjcNmdbiavTznr0r5VY76Y8AdH69uuE5ktRZMCP6XlnwSVSXw/0?wx_fmt=png'
    },
    onLoad() {
        // debugger
        // getApp().globalData.code
        console.log('headerImgSrc:', this.data.headerImgSrc !== '');
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
                    headerImgSrc: res.tempFilePaths[0]
                });
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
        if (wxaccount.length > 1 && career.length > 1) {
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
        wx.request({
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: 'https://www.liuliuke.com/huanhuan/realname',
            data: {
                token,
                career,
                wxaccount
            },
            success(res) {
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
