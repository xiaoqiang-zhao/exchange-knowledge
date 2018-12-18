/**
 * @file 已配对
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

let token;

Page({
    data: {
        list: []
    },
    onLoad() {
        commonUtil.getStorageData('token').then(res => {
            token = res.token;  
            commonUtil.getMatchList({
                token
            }).then(res => {
                this.setData({
                    list: res.userList
                });
            });

            wx.hideTabBarRedDot({
                index: 1
            });
        });
    },
    onShow() {
        setInterval(() => {
            commonUtil.getMatchList({
                token
            }).then(res => {
                this.setData({
                    list: res.userList
                });
            });
        }, 5000);
    },

    goDetail(event) {
        const user = event.currentTarget.dataset.user;
        wx.navigateTo({
            url: '/pages/view-matched/view-matched?token=' + token + '&user=' + user
        });
    }

});
