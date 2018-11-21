/**
 * @file 滑动卡片
 * @author 小强赵
 */

import stepHelp from '../../utils/step-help';
import commonUtil from '../../utils/common';

let animation;
let token;
let user;
let originMatchNum = 0;
let newMatchNum = 0;
let timer;
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
        inputStep: null,
        // 是否配对成功
        followSuccess: false,
        // 匹配的对方头像
        avatar: '',
        // 匹配的自己头像
        myavatar: '',
        // 联系对方的参数
        user: '',
        // 联系对方的名字
        name: '',
        cardTitle: '卡片加载中...',
        showTip: false

    },
    onLoad() {
        commonUtil.getStorageData('location', 'token').then(res => {
            token = res.token;
            this.loadList({
                token: res.token,
                longitude: res.location.longitude,
                latitude: res.location.latitude
            });
            commonUtil.getMatchList({
                token
            }).then(res => {
                originMatchNum = res.number;
            });
        });
    },
    onShow() {
        timer = setInterval(() => {
            commonUtil.getMatchList({
                token
            }).then(res => {
                newMatchNum = res.number;
            });

            if (newMatchNum - originMatchNum > 0) {
                wx.showTabBarRedDot({
                    index: 1
                });
            }
        }, 5000);

        // 判断是否完成了信息填写
        stepHelp.getCurrentInputStep().then(res => {
            // 若信息填写未完成
            if (!res.isEnd) {
                // 隐藏底部 Bar
                wx.hideTabBar();
            }
            else {
                wx.showTabBar();
            }

            // 设置相关数据状态
            this.setData({
                isFinishedInput: !!res.isEnd,
                inputStep: res,
                showTip: !res.isEnd
            });
        });
    },
    onHide() {
        clearInterval(timer);
    },
    // 获取附近的人
    loadList(data) {
        const me = this;
        wx.request({
            method: 'GET',
            url: 'https://www.liuliuke.com/huanhuan/getNearUserList',
            data,
            success(res) {
                if (!res.data.data) {
                    res.data = {
                        data: {
                            cardList: []
                        }
                    };
                }
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
        if (translate.x > 0) {
            // 右滑同意
            this.setData({
                [`slideList[${this.data.slideList.length - 1}].rightIconShow`]: true,
                [`slideList[${this.data.slideList.length - 1}].leftIconShow`]: false
            });
        }
        else if (translate.x < 0) {
            // 左滑不同意
            this.setData({
                [`slideList[${this.data.slideList.length - 1}].leftIconShow`]: true,
                [`slideList[${this.data.slideList.length - 1}].rightIconShow`]: false

            });
        }
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
        // 滑动幅度太小
        if (!translate.type) {
            translate.y = 0;
            rotate = 0;
        }
        // 左滑右滑
        else {
            rotate = translate.x * 0.09;
            translate.x = 400;

            setTimeout(() => {
                // 移除数据
                this.data.slideList.pop();
                this.setData({
                    slideList: this.data.slideList,
                    cardTitle: '附近没有更多人了'
                });
            }, 280);

            const url = translate.type === 1 ? 'unfollow' : 'follow';
            if (translate) {
                const otherToken = this.data.slideList[this.data.slideList.length - 1].token;
                wx.request({
                    method: 'GET',
                    url: 'https://www.liuliuke.com/huanhuan/' + url,
                    data: {
                        token,
                        user: otherToken
                    },
                    success(res) {
                        if (res.data.data.avatar) {
                            me.setData({
                                followSuccess: true,
                                avatar: res.data.data.avatar,
                                myavatar: res.data.data.myavatar,
                                user: res.data.data.user,
                                name: res.data.data.name
                            });
                            user = res.data.data.user;
                        }
                        if (translate.type === 1) {
                            wx.reportAnalytics('touche_left', {
                                slideleft: 0
                            });
                        }
                        else {
                            wx.reportAnalytics('touch_right', {
                                slideright: 0
                            });
                        }
                    }
                });
                this.hideTip(translate.type);
            }
        }
        translate.x = [0, -400, 400][translate.type];
        animation.rotate(rotate).translate(translate.x, translate.y).step({
            duration: 300
        });

        this.setData({
            [`slideList[${this.data.slideList.length - 1}].animationData`]: animation.export()
        });
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
        animation = wx.createAnimation({
            duration: 4,
            timingFunction: 'ease',
            delay: 0
        });
        this.setData({
            [`slideList[${this.data.slideList.length - 1}].leftIconShow`]: true
        });
        this.touchend(null, {
            type: 1,
            x: -100,
            y: 0
        });
        this.setData({
            [`slideList[${this.data.slideList.length - 1}].leftIconShow`]: false
        });
    },

    /**
     * 右滑
     */
    slideRight() {
        animation = wx.createAnimation({
            duration: 4,
            timingFunction: 'ease',
            delay: 0
        });
        this.setData({
            [`slideList[${this.data.slideList.length - 1}].rightIconShow`]: true
        });
        this.touchend(null, {
            type: 2,
            x: 100,
            y: 0
        });
        this.setData({
            [`slideList[${this.data.slideList.length - 1}].rightIconShow`]: false
        });
    },

    /**
     * 隐藏 tip
     * @param {number} translateType 1:左滑, 2:右划
     */
    hideTip(translateType) {
        if (this.data.showTip) {
            this.setData({
                showTip: false
            });
            if (translateType === 2) {
                wx.showToast({
                    title: '右滑愿意交流，两人都愿意即可配对聊天',
                    icon: 'none',
                    mask: true,
                    duration: 4000
                });
            }
        }
    },

    // 继续探索
    continueExplore() {
        this.setData({
            followSuccess: false
        });
    },
    // 联系配对者
    contactMatcher() {
        wx.navigateTo({
            url: '/pages/view-matched/view-matched?user=' + user + '&token=' + token
        });
    },
    // 关闭提示
    closeTip() {
        this.setData({
            showTip: false
        });
    },
    // 重新探索
    reload() {
        wx.reLaunch({
            url: ''
        });
    },
    // 去完善个人信息
    toInputPage() {
        // 会自动跳转到上次填写中断的步骤
        wx.reportAnalytics('edit_info_click', {
            editinfo: 0
        });
        stepHelp.jumpToCurrentStepPage();
    }
});
