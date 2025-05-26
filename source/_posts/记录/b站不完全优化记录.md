---
title: b站不完全优化记录
categories: 记录
abbrlink: 4eda77e6
date: 2023-02-08 19:41:07
---

“**b站也许会*变质*，但不会倒闭**” ——这是现在b站最真实的写照，而原话是其CEO陈睿的：**B站可能会倒闭，但绝不会变质**，现在看来挺讽刺的。

话不多说，直接进入主题

b站优化四大方向：**前提是你使用PC**



### 屏蔽pcdn

pcdn = p2p+cdn，我不排斥p2p，但我排斥未经我的同意就直接使用我家的带宽作为pcdn，别扯什么用户协议，cn互联网：你只有你的账号的使用权没有所有权！

屏蔽绝大多数的pcdn、mcdn，但仍然有部分很冷门的资源使用pcdn，无法更换源；

安装脚本自动换源：[Make BiliBili Grate Again](https://greasyfork.org/zh-CN/scripts/415714-make-bilibili-grate-again)

路由器可以刷个固件，安装AdguardHome，写入拦截：||szbdyd.com、||mcdn.bilivideo.cn（貌似手机是走这个mcdn）

顺便把路由器的upnp端口转发关了，反正我也不用BT

参考教程：https://www.v2ex.com/t/830394 34L

​                  https://www.v2ex.com/t/774680 pcdn科普，33L

---

### 更改解码方式

最开始用的云之幻大佬的UWP、然后是逍遥橙子大佬的，然后b站换了API，大佬们也懒得适配了，第三方UWP算是凉了，我也被迫转到web端，才有了这些事情。

后台就挂了：安卓模拟器、Python（跑程序）、Webstorm；用着Firefox看视频，然后就很卡顿，视频播放不流畅，然后我去`任务管理器`查看，发现是Firefox占用过多的CPU和RAM，接着去`about:processes`排查是哪一个标签页占用过多资源，最终锁定在b站的播放页，检索得知是解码格式的问题。不得不说在各大浏览器都不支持HEVC（H.265）的时候，b站非常先进的使用了“默认”——HEVC编码，换成AV1解码后成功解决，AV1也是新出的，我的r4800u似乎不能硬解，索性直接用老的AVC（H.264）

如果设备支持AV1硬解，还得去MS商店下载`AV1 Video Extension`这个解码器，按照MS的尿性，这么重要的东西应该是会内置的，可惜并没有。

---

### 脚本净化

[***bilibili evolved***](https://github.com/the1812/Bilibili-Evolved) 含超链接

以下为我使用的插件

> | 8字              | 6字          | 5字        | 4字      |
> | ---------------- | :----------- | ---------- | -------- |
> | 禁用评论区搜索词 | 展开动态内容 | 新版本提示 | 简化首页 |
> | 禁用特殊弹幕样式 | 删除直播水印 | 自动更新器 | 删除广告 |
> | 禁止跳转动态详情 | 直播侧栏隐藏 | 新版本提示 | 夜间模式 |
> | 隐藏视频标题层   | 隐藏直播推荐 | 简化直播间 | 自动收起 |
> | 跳过充电鸣谢     | 删除视频弹窗 | 简化评论区 | 双击全屏 |
> | 隐藏视频推荐     | 隐藏番剧点评 | 自定义顶栏 | 记忆倍速 |
> |                  | 隐藏顶部横幅 |            |          |
> |                  | 启用弹幕空降 |            |          |
> |                  | 隐藏番剧承包 |            |          |
>
> 记忆倍速：需要手动设置为1.5x
>
> **存在的bug**：使用自定义顶栏后，似乎无法使用*隐藏视频推荐*
>
> 需要使用自定义规则屏蔽：www.bilibili.com##.recommend-list-v1   
>
> 这个写法为ublock origin的写法，别的广告拦截插件不一定有效

---

### 界面精简、去除亢余元素

**注意**：要装**自定义顶栏**才可以无脑抄下面的规则，要不然自行调整，均是基于ublock origin的写法

自行调整：F12选取元素+正则表达式+广告拦截插件：如ublock origin

```javascript
！不得不说b站早期开发是真的混乱，无语。
! 2023-02-08 https://www.bilibili.com         主页 www.bilibili.com 
www.bilibili.com##.bili-feed4 /**屏蔽主页元素*/
www.bilibili.com##.adblock-tips /**屏蔽广告拦截插件提示：检测到您的页面展示可能受到浏览器插件影响，建议您将当前页面加入插件白名单，以保障您的浏览体验～*/
！左上角顶栏元素
www.bilibili.com##div.custom-navbar-item:nth-of-type(3) /**顶栏首页*/
www.bilibili.com##div.custom-navbar-item:nth-of-type(5) /**顶栏排行*/
www.bilibili.com##div.custom-navbar-item:nth-of-type(9) /**顶栏直播*/
www.bilibili.com##div.custom-navbar-item:nth-of-type(12) /**顶栏漫画*/
www.bilibili.com##div.custom-navbar-item:nth-of-type(10) /**顶栏会员购*/

！右上角顶栏元素
www.bilibili.com##div.custom-navbar-item:nth-of-type(17) /**顶栏消息*/
www.bilibili.com##div.custom-navbar-item:nth-of-type(18) /**顶栏动态*/
www.bilibili.com##div.custom-navbar-item:nth-of-type(19) /**顶栏订阅*/
www.bilibili.com##div.custom-navbar-item:nth-of-type(23) /**顶栏投稿*/

！搜索栏
www.bilibili.com##.launch-bar-suggest-list  /**屏蔽上方的搜索历史和搜索联想*/

! 2023-02-08 https://search.bilibili.com             搜索页 search.bilibili.com
search.bilibili.com##.bili-footer    /**屏蔽页脚*/
search.bilibili.com##.search-all-list.i_wrapper.activity-game-list /**屏蔽课程推广*/
search.bilibili.com##.search-panel-popover  /**屏蔽下方的、大的搜索历史和搜索联想*/
search.bilibili.com##.p_absolute.flex_col_end.side-buttons /**屏蔽右边浮动条*/
search.bilibili.com##li.vui_tabs--nav-item:nth-of-type(2) /**屏蔽搜索筛选中的视频*/
search.bilibili.com##li.vui_tabs--nav-item:nth-of-type(4) /**屏蔽搜索筛选中的影视*/
search.bilibili.com##li.vui_tabs--nav-item:nth-of-type(5) /**屏蔽搜索筛选中的直播*/
search.bilibili.com##button.mr_sm.vui_button--tab.vui_button:nth-of-type(2) /**屏蔽搜索筛选中的最多点击*/
search.bilibili.com##button.mr_sm.vui_button--tab.vui_button:nth-of-type(4) /**屏蔽搜索筛选中的最多弹幕*/
！左上角顶栏元素
search.bilibili.com##div.custom-navbar-item:nth-of-type(3) /**顶栏首页*/
search.bilibili.com##div.custom-navbar-item:nth-of-type(5) /**顶栏排行*/
search.bilibili.com##div.custom-navbar-item:nth-of-type(9) /**顶栏直播*/
search.bilibili.com##div.custom-navbar-item:nth-of-type(12) /**顶栏漫画*/
search.bilibili.com##div.custom-navbar-item:nth-of-type(10) /**顶栏会员购*/

！右上角顶栏元素
search.bilibili.com##div.custom-navbar-item:nth-of-type(17) /**顶栏消息*/
search.bilibili.com##div.custom-navbar-item:nth-of-type(18) /**顶栏动态*/
search.bilibili.com##div.custom-navbar-item:nth-of-type(19) /**顶栏订阅*/
search.bilibili.com##div.custom-navbar-item:nth-of-type(23) /**顶栏投稿*/

！搜索栏
search.bilibili.com##.launch-bar-suggest-list  /**屏蔽搜索历史和搜索联想*/

! 2023-02-08 https://www.bilibili.com 视频播放页？刚开始没发现视频播放页的域名就是主站域名，懒得改了
||mcdn.bilivideo.cn            
!上一行屏蔽mcdn
www.bilibili.com##.video-tag-container  /**屏蔽视频下的标签*/
www.bilibili.com##.s_tag-v1         /**屏蔽视频下的标签*/
www.bilibili.com##.share-wrap        /**屏蔽视频下的活动*/
www.bilibili.com##.act-end.activity-m-v1  /**屏蔽视频下的活动*/
www.bilibili.com##.van-popover__reference.video-share /**屏蔽视频下的分享按钮*/
www.bilibili.com##.reply-notice        /**屏蔽视频下的活动*/
www.bilibili.com##.recommend-list-v1   /**屏蔽右下角视频推荐*/
www.bilibili.com##.recommend-list-container /**屏蔽右下角视频推荐*/
www.bilibili.com##.part-undefined.pop-live-small-mode /**屏蔽右下角直播推荐*/
www.bilibili.com##.honor-rank.item.honor    /**屏蔽视频标题下的全站排名*/
www.bilibili.com##.honor-weekly.item.honor  /**屏蔽视频标题下的每期必看*/
www.bilibili.com##.help.item            /**屏蔽视频右下角的客服按钮*/
www.bilibili.com##.on.mini.item          /**屏蔽视频右下角的小窗播放器按钮*/
www.bilibili.com##.charge-btn-loaded.btn-transition.new-charge-btn.default-btn /**屏蔽充电图标*/
www.bilibili.com##.charge-btn-loaded.new-charge-btn.default-btn /**屏蔽新版充电图标*/
www.bilibili.com##div.old-charge-btn.default-btn:nth-of-type(1)  /**屏蔽充电图标*/
www.bilibili.com##.bui-collapse-wrap       /**屏蔽弹幕列表*/
www.bilibili.com##.bpx-player-video-info    /**屏蔽同时观看人数*/
www.bilibili.com##.bpx-player-sending-bar   /**屏蔽播放栏下的控制条*/



! 2023-02-08 https://space.bilibili.com 空间
space.bilibili.com##.col-2       /**屏蔽空间的描述、充电标识、公告、直播间、uid*/
space.bilibili.com##.i-pin-v.section /**屏蔽代表作*/
space.bilibili.com##li.be-tab-item:nth-of-type(2) /**屏蔽最多播放筛选条件*/
space.bilibili.com##div.n-bf.n-data:nth-of-type(2) /**屏蔽获赞数*/
space.bilibili.com##div.n-bf.n-data:nth-of-type(3) /**屏蔽播放*/
space.bilibili.com###navigator > .wrapper > .clearfix.n-inner > .n-tab-links > .active.router-link-active.router-link-exact-active.n-cinema.n-subs.n-bangumi.n-btn/**屏蔽订阅*/
！左上角顶栏元素
space.bilibili.com##div.custom-navbar-item:nth-of-type(3) /**顶栏首页*/
space.bilibili.com##div.custom-navbar-item:nth-of-type(5) /**顶栏排行*/
space.bilibili.com##div.custom-navbar-item:nth-of-type(9) /**顶栏直播*/
space.bilibili.com##div.custom-navbar-item:nth-of-type(12) /**顶栏漫画*/
space.bilibili.com##div.custom-navbar-item:nth-of-type(10) /**顶栏会员购*/

！右上角顶栏元素
space.bilibili.com##div.custom-navbar-item:nth-of-type(17) /**顶栏消息*/
space.bilibili.com##div.custom-navbar-item:nth-of-type(18) /**顶栏动态*/
space.bilibili.com##div.custom-navbar-item:nth-of-type(19) /**顶栏订阅*/
space.bilibili.com##div.custom-navbar-item:nth-of-type(23) /**顶栏投稿*/

！搜索栏
space.bilibili.com##.launch-bar-suggest-list  /**屏蔽搜索历史和搜索联想*/
```



