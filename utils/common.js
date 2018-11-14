/**
 * @file 业务无关公共函数
 */

export default {

    /**
     * 获取 Storage 存储的数据，支持多个字段
     * 获取失败的字段不赋值
     *
     * @param {string} ...keys 不确定数量的键值
     * @return {Object} Promise 对象
     */
    getStorageData(...keys) {
        let count = 0;
        const result = {};

        return new Promise(resolve => {
            keys.forEach(item => {
                wx.getStorage({
                    key: item,
                    success(res) {
                        result[item] = res.data;
                    },
                    complete() {
                        count++;
                        if (count === keys.length) {
                            resolve(result);
                        }
                    }
                });
            });
        });
    },
    // 获取配对列表
    getMatchList(data) {
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'GET',
                url: 'https://www.liuliuke.com/huanhuan/matchList',
                data,
                success(res) {
                    resolve(res.data.data);
                }
            });
        });
    }
};
