/**
 * @file 滑动卡片
 * @author 小强赵
 */

let animation;
import businessUtil from '../../utils/business';
import commonUtil from '../../utils/common';
Page({
    data: {
        slideList: [
            // 示例卡片
            // {
            //     id: 'aa11',
            //     text: '卡片一',
            //     // 为动画预留
            //     animationData: {}
            // }
        ],
        slideStardEvent: {},
        // 是否完成了必要的输入
        isFinishedInput: true,
        inputStep: null
    },
    onLoad() {
        commonUtil.getStorageData('location', 'token').then(res => {
            this.loadList({
                token: res.token,
                longitude: res.location.longitude,
                latitude: res.location.latitude
            });
        });

        // 判断是否完成了信息填写
        businessUtil.getCurrentInputStep().then(res => {
            if (!res.isEnd) {
                wx.hideTabBar();
                this.setData({
                    isFinishedInput: false,
                    inputStep: res
                });
            }
        });
    },

    loadList(data) {
        const me = this;
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/getNearUserList',
            data,
            success(res) {
                me.setData({
                    slideList: res.data.data.cardList
                });
            }
        });
    },

    /**
     * 滑动开始
     *
     * @param {Object} e 事件对象
     */
    touchstart(e) {
        this.setData({
            slideStardEvent: e
        });
        animation = wx.createAnimation({
            duration: 4,
            timingFunction: 'ease',
            delay: 0
        });
    },

    /**
     * 滑动中，通过计算滑动距离来设置卡片位置达到动画效果
     *
     * @param {Object} e 事件对象
     */
    touchmove(e) {
        const translate = this.getTranslate(e);

        // 左右滑动时给点倾斜角度
        animation.rotate(translate.x * 0.09).translate(translate.x, translate.y).step();

        this.setData({
            [`slideList[${this.data.slideList.length - 1}].animationData`]: animation.export()
        });
    },

    /**
     * 滑动结束
     *
     * @param {Object} e 事件对象
     * @param {Object} trans 【可选参数】位置偏移对象,
     *                 trans.type 0 滑动幅度很小
     *                 trans.type 1 左滑
     *                 trans.type 2 右滑
     */
    touchend(e, trans) {
        const me = this;
        const translate = trans || this.getTranslate(e);
        let rotate;
        if (!translate.type) {
            translate.y = 0;
            rotate = 0;
        }
        else {
            rotate = translate.x * 0.09;
            translate.x = 400;

            setTimeout(() => {
                // 移除数据
                this.data.slideList.pop();
                this.setData({
                    slideList: this.data.slideList
                });
            }, 280);
        }
        translate.x = [0, -400, 400][translate.type];
        animation.rotate(rotate).translate(translate.x, translate.y).step({
            duration: 300
        });

        this.setData({
            [`slideList[${this.data.slideList.length - 1}].animationData`]: animation.export()
        });
        
        if (!this.data.isFinishedInput) {
            wx.showModal({
                title: '需要您输入一些信息',
                content: '方便与TA人匹配',
                showCancel: false,
                confirmText: '去输入',
                success() {
                    wx.redirectTo({
                        url: me.data.inputStep.path
                    });
                }
            });
        }
    },

    /**
     * 封装滑动事件产生的偏移数据
     *
     * @param {Object} e 事件对象
     * @return {Object} 偏移数据
     */
    getTranslate(e) {
        let translateX = e.changedTouches[0].clientX - this.data.slideStardEvent.changedTouches[0].clientX;
        let translateY = e.changedTouches[0].clientY - this.data.slideStardEvent.changedTouches[0].clientY;

        let type = 0;
        // 左滑小于零，右滑大于零
        if (translateX < -30) {
            type = 1;
        }
        else if (translateX > 30) {
            type = 2;
        }
        else {
            type = 0;
        }

        return {
            x: translateX,
            y: translateY,
            type
        };
    },

    /**
     * 左滑
     */
    slideLeft() {
        this.touchend(null, {
            type: 1,
            x: -100,
            y: 0
        });
    },

    /**
     * 右滑
     */
    slideRight() {
        this.touchend(null, {
            type: 2,
            x: 100,
            y: 0
        });
    }
});
