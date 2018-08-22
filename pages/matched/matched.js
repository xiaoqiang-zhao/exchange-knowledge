/**
 * @file 已配对
 * @author 小强赵
 */
import commonUtil from '../../utils/common';

Page({
    data: {
        list: [
            {
                avatar: 'https://liuliuke.com/headPics/04082018/5b65224e76085.jpg',
                career: '软件工程师',
                time: '08/02',
                nick: '杨官龙',
                title: '软件工程师'
            }
        ]
    },
    onLoad() {
        commonUtil.getStorageData('token').then(res => {
            this.loadList({
                token: res.token
            });
        });
    },

    loadList(data) {
        const me = this;
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/matchList',
            data,
            success(res) {
                me.setData({
                    list: res.data.data.userList
                });
            }
        });
    },

    setClipboard(event) {
        const data = event.currentTarget.dataset.wxaccount;
        wx.setClipboardData({
            data,
            success() {
                wx.showToast({
                    title: `已复制对方微信${data}`,
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    }
});
