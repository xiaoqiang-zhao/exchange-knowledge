/**
 * @file 业务相关公共函数
 */

export default {

    /**
     * 获取当前用户输入到哪一项(已完成项的下一项，如果全部完成就返回最后一项)
     *
     * @return {Object} Promise 对象
     */
    getCurrentInputStep() {
        const map = [
            {
                index: 1,
                name: '登录-授权手机号',
                keys: ['mobile'],
                path: '/pages/login/login'
            },
            {
                index: 2,
                name: '开启“知交”引导页',
                keys: ['guide'],
                path: '/pages/guide-page/guide-page'
            },
            {
                index: 3,
                name: '授权地理位置 / 查找附近的人',
                keys: ['location'],
                path: '/pages/search-nearby/search-nearby'
            },
            // =================  上面三步是必须通过的，否则不能到后面的页面，代码逻辑强制  =================== //
            {
                index: 4,
                name: '个人信息',
                keys: ['realName', 'headerImgSrc', 'career', 'wxaccount'],
                path: '/pages/personal-info/personal-info'
            },
            {
                index: 5,
                name: '我的知识',
                keys: ['title', 'content'],
                path: '/pages/my-knowledge/my-knowledge',
                // 最后一步的标识，当返回当前所在步的对象时，外部调用方法不知道是否填写完成
                isEnd: true
            }
        ];

        return new Promise((resolve, reject) => {
            wx.getStorageInfo({
                success(res) {
                    map.some(item => {
                        if (res.keys.indexOf(item.keys[0]) === -1) {
                            resolve(item);
                            return true;
                        }
                    });
                },
                fail() {
                    reject('error in utile.js getCurrentInputStep');
                }
            });
        });
    },

    /**
     * 跳到当前步 (交互是一步步引导的，用户信息也是如此，只有完成了当前步才能到下一步)
     * @param {string} isRedirectTo 是否为替换型跳转，默认 false
     */
    jumpToCurrentStepPage(isRedirectTo) {
        this.getCurrentInputStep().then(stepOption => {
            if (isRedirectTo) {
                wx.redirectTo({
                    url: stepOption.path
                });
            }
            else {
                wx.navigateTo({
                    url: stepOption.path
                });
            }
        });
    },

    /**
     * 分流跳转，
     */
    jumpForPre() {
        this.getCurrentInputStep().then(stepOption => {
            if (stepOption.index < 4) {
                wx.redirectTo({
                    url: stepOption.path
                });
            }
            else {
                wx.switchTab({
                    url: '/pages/index/index'
                });
            }
        });
    }
};
