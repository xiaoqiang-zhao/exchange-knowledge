/**
 * @file 实名认证
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

Page({
    data: {
        disabled: true,
        career: '',
        realname: '',
        submitBtn: ''
    },
    onLoad(option) {

        

        // 从本地获取
        commonUtil.getStorageData('realname', 'career').then(res => {
            // realname = res.realname || '';
            // career = res.career || '';
            this.setData({
                realname: res.realname || '',
                career: res.career || '',
                type: +option.type,
                submitBtn: +option.type === 1 ? '保存' : '下一步'
            });
            this.validate();
        });
    },
    nameInput(e) {
        // realname = e.detail.value;
        this.setData({  
            realname: e.detail.value
        });
        this.validate();
    },
    careerInput(e) {
        // career = e.detail.value;
        this.setData({
            career: e.detail.value
        });
        this.validate();
    },
    validate() {
        let disabled;
        if (this.data.career.length > 0 && this.data.realname.length > 0) {
            disabled = false;
        }
        else {
            disabled = true;
        }
        this.setData({
            disabled
        });
    },

    // 提交事件
    submit() {
        const me = this;

        wx.getStorage({
            key: 'token',
            success(res) {
                // 由于业务变更后台端接口没有单独提供 API，到下一步再提交
                me.request(res.data);

                // 存储信息
                wx.setStorage({
                    key: 'realname',
                    data: me.data.realname
                });
                wx.setStorage({
                    key: 'career',
                    data: me.data.career
                });

                me.navigateTo();
            }
        });
    },

    // 向后台发起数据提交请求
    request(token) {
        const me = this;
        wx.request({
            url: 'https://www.liuliuke.com/huanhuan/submitdetail',
            // HTTP 请求中其他额外的 form data
            data: {
                token,
                career: this.data.career,
                realname: this.data.realname
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
                    key: 'career',
                    data: career
                });
            }
        });
    },
    navigateTo() {
        // 编辑
        if (this.data.type === 1) {
            wx.switchTab({
                url: '/pages/mine/mine'
            });
        }
        // 新加
        else {
            wx.navigateTo({
                url: '/pages/personal-photo/personal-photo'
            });
        }
    }
});
