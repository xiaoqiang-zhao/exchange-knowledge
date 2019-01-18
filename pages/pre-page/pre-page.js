/**
 * @file 预加载页，已登陆和未登录 两种状态需要进不同的页面，没找到分流的方法，暂时用一个空白页实现分流
 * @author 小强赵
 */
import stepHelp from '../../utils/step-help';
Page({
    data: {},
    onLoad() {
        stepHelp.jumpToCurrentStepPage(true);
    }
});
