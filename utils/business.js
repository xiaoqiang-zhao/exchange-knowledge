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
                name: '登录授权手机号',
                keys: ['mobile'],
                path: '/pages/login/login'

            },
            {
                name: '实名认证',
                keys: ['realName', 'idcard'],
                path: '/pages/real-name/real-name'
            },
            {
                name: '个人信息',
                keys: ['headerImgSrc', 'career', 'wxaccount'],
                path: '/pages/personal-info/personal-info'
            },
            {
                name: '我的知识',
                keys: ['title', 'content'],
                path: '/pages/my-knowledge/my-knowledge'
            },
            {
                name: '授权地理位置 / 查找附近的人',
                // 为了维持逻辑统一，最后一项恒定设为找不到
                keys: ['location-abandon'],
                path: '/pages/search-nearby/search-nearby',
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
    }
};
