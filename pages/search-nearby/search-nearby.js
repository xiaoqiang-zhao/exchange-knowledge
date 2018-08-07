/**
 * @file 搜索附近
 * @author 小强赵
 */

Page({
    data: {
        disabled: true,
        name: '',
        idcard: ''
    },
    onLoad() {
        this.getLocation();
    },
    getLocation() {
        wx.getLocation({
            success(res) {
                wx.setStorage({
                    key: 'location',
                    data: res
                });
                // console.log(res);
                // longitude 经度
                // latitude 维度
            }
        });
    }
});
