/**
 * @file 我的
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

Page({
    data: {
        userInfo: {}
    },
    onLoad() {
        commonUtil.getStorageData(
            'headerImgSrc',
            // 实名认证
            'realName',
            'idcard',

            // 个人信息
            'career',
            'wxaccount',

            // 我的知识
            'title',
            'content'
        ).then(res => {
            this.setData({
                userInfo: res
            });
        });
    },
    navigateToRealName() {
        wx.navigateTo({
            url: '/pages/real-name/real-name'
        });
    },
    navigateToPersonalInfo() {
        wx.navigateTo({
            url: '/pages/personal-info/personal-info'
        });
    },
    navigateToMyKnowledge() {
        wx.navigateTo({
            url: '/pages/my-knoledge/my-knoledge'
        });
    }
});
