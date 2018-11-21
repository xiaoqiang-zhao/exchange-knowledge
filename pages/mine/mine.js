/**
 * @file 我的
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

let timer;
let token;
let newMatchNum;
let originMatchNum = 0;

Page({
    data: {
        userInfo: {},
        token
    },

    onShow() {
        timer = setInterval(() => {
            commonUtil.getMatchList({
                token: token
            }).then(res => {
                newMatchNum = res.number;
            });

            if (newMatchNum - originMatchNum > -1) {
                wx.setTabBarBadge({
                    index: 1,
                    text: `${newMatchNum - originMatchNum}`
                });
            }
        }, 5000);
        commonUtil.getStorageData(
            // 头像
            'headerImgSrc',

            // 实名认证
            'realname',
            'career',
            
            // 我的经验
            'title',
            'wxaccount',
            'token'
        ).then(res => {
            if (!res.content) {
                res.content = '我对这个知识有一些经验，期待与你分享感受，互相交换，一起学习进步。';
            }
            token = res.token;
            this.setData({
                userInfo: res
            });
        });
    },
    onHide() {
        clearInterval(timer);
    },
    navigateToRealName() {
        wx.navigateTo({
            url: '/pages/real-name/real-name?type=1'
        });
    },
    navigateToMyKnowledge() {
        wx.navigateTo({
            url: '/pages/my-knowledge/my-knowledge?type=1'
        });
    },
    navigateToPersonalPhoto() {
        wx.navigateTo({
            url: '/pages/personal-photo/personal-photo?type=1'
        });
    }
});
