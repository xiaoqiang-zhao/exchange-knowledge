/**
 * @file 个人信息
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

let career = '';
let wxaccount = '';
let realname = '';
let type='';

Page({
    data: {
        disabled: true,
        career: '',
        realname: '',
        wxaccount: '',
        headerImgSrc: '',
        submitBtn: '',
        focus: false
    },
    onLoad(option) {
     
      // 从本地获取
      commonUtil.getStorageData('realname', 'career', 'wxaccount', 'headerImgSrc').then(res => {
          career = res.career || '';
          wxaccount = res.wxaccount || '';
          realname = res.realname || '';
              this.setData({
                  career,
                  wxaccount,
                  realname,
                  headerImgSrc: res.headerImgSrc || '',
                  submitBtn: +option.type === 1 ? '保存' : '下一步'
              });
          this.validate();
          type = +option.type;
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
    nameInput(e) {
      realname = e.detail.value;
      this.validate();
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
            wxaccount.length > 0
            && career.length > 0
            && realname.length > 0
            && this.data.headerImgSrc.length > 0) {
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
        let formData = {
          wxaccount,
          career,
          realname
        }
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
            filePath: me.data.headerImgSrc,
            name: 'headerImgSrc',
            header: {
                'content-type': 'multipart/form-data'
            },
            // HTTP 请求中其他额外的 form data
            formData: {
                token,
                wxaccount,
                career,
                realname
            },
            success(res) {
                me.navigateTo();
                if (typeof res.data === 'string') {
                    res.data = JSON.parse(res.data);
                }

                // 存储信息
                wx.setStorage({
                  key: 'realname',
                  data: realname
                });
                wx.setStorage({
                  key: 'headerImgSrc',
                  data: me.data.headerImgSrc
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
        if (type === 1) {
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
