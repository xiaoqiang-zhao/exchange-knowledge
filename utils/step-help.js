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
                name: '职业填写页',
                keys: ['career'],
                path: '/pages/career/career'
            },
            {
                index: 3,
                name: '心得填写页',
                keys: ['title'],
                path: '/pages/title/title'
            },
          {
            index: 4,
            name: '昵称头像授权页',
            keys: ['realname', 'headerImgSrc'],
            path: '/pages/nick/nick'
          },
            {
                index: 5,
                name: '授权地理位置 / 查找附近的人',
                keys: ['location'],
                path: '/pages/search-nearby/search-nearby',
                // 最后一步的标识，当返回当前所在步的对象时，外部调用方法不知道是否填写完成
                isEnd: true
            }
        ];

        return new Promise((resolve, reject) => {
            wx.getStorageInfo({
                success(res) {
                    map.some(item => {
                        if (res.keys.indexOf(item.keys[0]) === -1 || item.isEnd) {
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
    }

    /**
     * 分流跳转，pre-page 的下一个页面是哪一个
     */
    // jumpForPre() {
    //     this.getCurrentInputStep().then(stepOption => {
    //         let url = stepOption.path;
    //         if (stepOption.index > 3) {
    //             url = '/pages/search-nearby/search-nearby';
    //         }

    //         wx.redirectTo({
    //             url
    //         });
    //     });
    // }
};
