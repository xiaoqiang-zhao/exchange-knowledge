# “知交”微信小程序

> 前端部分代码。

## tabBar

tabBar 用到的图片在 images 下。未完善个人信息状态下 tabBar 隐藏。

## iconfont

微信小程序不支持引入字体文件，通过下面 3 步引入字体。

- 1、从 iconfont 网站下载压缩包；
- 2、将 iconfont.css 中的代码拷贝进 app.wxss；
- 3、删除 eot 和 ttf 等引入，只留下 base64 方式，然后就可以正常使用了。

iconfont 项目地址(需登录，账号：longze)：
[wx-demo-page](http://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=764717&keyword=)
