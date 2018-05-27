
[TOC]

# 微信小程序开发1-项目结构及文件

标签（空格分隔）： 微信开发

---

## 1.项目结构
>main目录
+ main.json 
+ main.wxml
+ main.wxss
+ main.js
>在一个目录中所有格式的文件只有一个，**文件名与目录名**必须相同

## 2.加载顺序和方式
`app.json`文件中定义了pages数组，会将数组中的第一个目录作为首页渲染
## 3.钩子函数
>.js文件中定义钩子函数
```javascript
//整个小程序只有一个app实例，是全部页面共享的，属于单页应用
//app.js的全局钩子函数：
let n = 0;
//注：只在初始化的时候，调用一次，而不会在每次路由跳转的时候，每次执行此函数
App({
    onLaunch(){//小程序启动之后，触发的函数
        console.log(n++);//只会打印一次0
    },
    onShow(){
        console.log('App,onShow')
    },
    onHide() {
        console.log('App,onHide')
    },
    onError() {
        console.log('App,onError')
    }
})
/*
    打印顺序：
        0
        App,onShow
*/


//===============================================================
//单页的组件，的钩子函数
Page({
    data:{
        mes:'initData'//初始状态
    },
    //事件
    testEvent(){
        //wxml中，在元素身上绑定的事件
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //onLoad钩子函数最先被执行，options是在页面跳转的时候，传递过来的参数
    console.log('onLoad-----------')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady-----------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow----------')
  }
})
//在首页 console 可以看出顺序是 App Launch-->App Show-->onload-->onShow-->onReady。
```
>钩子函数的参数options：
[钩子函数的参数说明][1]
path、query、scene是一定会存在的属性
其他属性可能存在，可能不存在
[场景值说明信息][2]
可通过场景值，判断进入小程序的来源如：扫描小程序码进入，从小程序进入小程序

----
## 4.全局钩子实例
>在任意的组件js文件中，可以利用getApp()来获取全局的小程序实例，主要用途是读取全局的分配属性
```javascript
//index.js
var appInstance = getApp();
console.log(appInstance.globalData);
```
**带解决的问题3-修改全局的globalData的方法**

**注意事项：**
- 1.App()必须在app.js中注册，且不能注册多个
- 2.不要再app根实例上，调用getApp()方法，直接使用this就能拿到app实例
- 3.不要再onLaunch的时候调用getCurrentPages(),此时page还没有生成
- 4.通过getApp()获取实例之后，不要私自调用生命周期函数

## 5.app.json全局配置
### 5.1app.json全局配置文件
[全局app.json的配置][4]
```javascript
{
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": {
    "navigationBarTitleText": "Demo"//顶部的title文字内容
  },
  "tabBar": {
    //数量限制：2~5个，按照数组的顺序来从左至右展示
    "position":"top",//position为top的时，不显示icon
    "list": [{//list必传，否则会报错
      "pagePath": "pages/index/index",
      "text": "首页",
      "selectIconPath":"../../on-select-img.png"//选中时的icon的图标路径，通常带有颜色
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志",
      "iconPath":"../../un-select-img.svg"//默认展示时的icon路径(未被选中时的icon通常置灰)
      //只能加载png、jpg、gif的文件 大小限制为40kb
    }]
  },
  "networkTimeout": {//设置请求的网络超时时间
    "request": 10000,//wx.request的超时时间
    "downloadFile": 10000//wx.downloadFile的超时时间
  },
  "debug": true
}
```
![tabBar底部导航栏的展示信息配置项][5]

### 5.2局部配置文件
>page下的index.json文件
该文件里面的内容是全局的window属性的配置信息
```javascript
//app.json
{
    "window":{
        "backgroundTextStyle":"light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle":"black"
    }
}
//index.json
{
    "navigationBarTitleText": "WeChat",
}
/*
    配置的信息相当于：
        "window":{
            "navigationBarTitleText": "WeChat",
        }
    且局部的权重高于全局app.json
*/
```

## 6.单组件的生命周期钩子函数
- onLoad: 页面加载
 + 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
- onShow: 页面显示
 + 每次打开页面都会调用一次。
 + **注：onShow是在小程序启动，或者从后台进入前台展示时，会执行的函数，如：按home键回到桌面，再从桌面回到小程序，就会触发此钩子函数**
- onReady: 页面初次渲染完成
 + 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。详见生命周期
- onHide: 页面隐藏
 + 当navigateTo或底部tab切换时调用。
 + **当小程序从前台进入后台，如：按手机的home键，跳转到手机桌面，此时小程序会被隐藏，那么hide函数就会触发**
- onUnload: 页面卸载
 + 当redirectTo或navigateBack的时候调用。

>钩子函数的调用顺序：
    onLoad首先被调用
    onShow其次
    onReady最后被调用








## 待解决的问题
- 1
问题描述：
- [ ]    在app.json中加入tabBar选项（带有list数组）的导航栏之后
- [ ]    通过点击tabBar展示在页脚中的导航，可以进行跳转，但是通过在页面中添加事件的方式，触发wx.navigateTo({url:'../index/index'})的跳转的事件，无法跳转
- [ ]   会在点击的时候，报：Invoke event (事件名) in pages: (当前页面的路由)
例子：Invoke event toindexs in page: pages/main/main
- [ ] 不在app.json中添加tabBar的时候，是正常的!

- [x] 问题解决：
>navigateTo, redirectTo 只能打开非 tabBar 页面。(在tabBar中定义了页面tab，就不能通过navigateTo, redirectTo来打开)
>switchTab 只能打开 tabBar 页面。
>reLaunch 可以打开任意页面。**(如果想要实现跳转，则使用reLaunch就能实现跳转)**
>页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
>调用页面路由带的参数可以在目标页面的onLoad中获取。


- 2
问题描述：
如何动态修改页面的title文字内容
- [ ]  在app.json文件中，有一个window属性，里面有个`navigationBarTitleText`属性，属性值作为当前项目的title
- [ ] 在路由跳转的时候，希望动态修改当前页面的title，现在的结果是写死的

- 3
问题描述
通过getApp()方法在任意组件的js文件中都能够获取app注册的APP实例
在单文件内，通过`this.setData({mes:'afterChange'})`的方式可以修改单文件内的组件的状态
如何修改全局的app内globalData的属性值？

- 4
问题描述：
不支持Promise和import、async\await等语法


  [1]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/app.html
  [2]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/scene.html
  [3]: #item3
  [4]: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html
  [5]: https://mp.weixin.qq.com/debug/wxadoc/dev/image/tabbar.png?t=2018315
  
  
  
# 微信小程序开发2-语法

标签（空格分隔）： 微信开发

---

## 1.wxml行内语法
### 1.绑定文本
```javascript
<view>{{message}}</view>

data:{
    message:'aaa'
}

```
### 2.循环
```javascript
//不加wx:key="index" 报警告
<view wx:for="{{arr}}" wx:key="index" wx:for-index="index" wx:for-item="item">{{item}}</view>

data:{
    arr:[1,2,3,4,5]
}
```

### 3.条件渲染
```javascript
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>


```

### 4.模板渲染
```javascript
<template name="staffName">

  <view>
    FirstName: {{firstName}}, LastName: {{lastName}}
  </view>
</template>

<template is="staffName" data="{{...staffA}}"></template>
<template is="staffName" data="{{...staffB}}"></template>
<template is="staffName" data="{{...staffC}}"></template>


data:{
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'}
}
```
>总结：无论是内容，还是指令，在使用的时候，都是用{{}}来进行包裹的

---
## 2.自定义组件
### 1.使用自定义组件的顺序
1.定义components文件夹，在其中添加custom目录
2.在custom目录中添加对应格式的文件，如：一键添加Component
3.在custom.json文件添加以下内容：
```javascript
{
    "component":true//用来告诉编译器，这个文件组内的文件是一个自定义的组件
}
```
4.编写组件内容wxml和wxss样式，**注：在wxss和wxml中不能使用id选择器**
5. Component的js文件中，定义的执行函数不再是`Page({})`而是`Component({})`
```javascript
Component({
    properties:{//从父组件内传递过来的参数
        innerText:{
            type:String,
            value:'default value',
            observer:(newVal,oldVal)=>{
                
            }
        }
    },
    data:{
        common:'组件内的数据'
    },
    methods:{//组件内可以使用的方法
        customFn(){
            //自定义方法
        }
    }
})
```
6.使用自定义组件
在使用的page或者其他的component中使用的时候，要在`page.json`中添加：
```javascript
{
    "usintComponents":{
        "custom-component":"../../components/custom/custom"//组件的相对路径
    }
}
```
7.传递给子组件参数
```javascript
//父组件
<custom-component custom="{{motto}}">

data:{
    motto:'hellow world'
}

//子组件
<view>{{custom}}</view>

properties:{
    custom:String
}
```

### 2.Component中的slot插槽，在component组件中定义插槽
默认一个组件内只有一个插槽，当有多个插槽的时候，需要在js中定义：
```javascript
//Component定义------------------------------
Component({
    options:{
        multipleSlots:true//启用多slot支持
    }
})
<view>
    <slot name="slot1"></slot>
</view>

//Page引用-------------------------------------
<custom-component>
    <view slot="slot1">
        这个slot会被当道slot1对应的位置
    </view>
</custom-component>
```
### 3.Component组件的js详解
```javascript
Component({
  behaviors: [],
  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function(newVal, oldVal){} // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
    myProperty2: String // 简化的定义方式
  },
  data: {}, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function(){
    
  },
  created(){
    //组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
  },
  attached: function () {
    //组件生命周期函数，在组件实例进入页面节点树时执行
  },
  ready: function () {
    //组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
  },

  methods: {
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    _myPrivateMethod: function(){
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function(newVal, oldVal) {

    }
  }
})
```
**注，组件命名规则**
> 父组件.wxml 引用，且传递属性给子组件时 < custom-component current-val="{{parentVal}}" /> 
> 子组件.wxml 引用，< view id="{{currentVal}}"> < /view>
> 子组件.js 中 properties的属性名使用小驼峰 currentVal

---

### 4.Component与父组件之间的事件
>子组件更改父组件的数据，需要用自定义事件
```javascript
//父组件
/*
    监听子组件的事件，执行的函数在父组件内定义
*/
<view>{{parentData}}</view>
<custom-component bindchildCommitEvent="parentEventExecute" bind>

data:{
    parentData:'这是父组件的数据'
},
parentEventExecute(e){//子组件触发父组件的事件，在父组件内执行，修改父组件自己的属性
    this.setData({
        parentData:e.detail
    })
    //注，从子组件内传递过来的是事件对象，e.detail是子组件真正传递的数据
}

//----------------------------------------------------
//子组件
<button bindtap="childEventExecute">修改父组件内的数据</button>

properties:{
    
}

```



---
## 待解决的问题
- 1
    template的用法
- 2
问题描述：
1. 用include引用一个组件的时候,子组件内触发的事件，实际是父组件的事件。
```javascript
<!--index.wxml-->
<view class="container">
  <include src="../../components/dialog/dialog" dialog="{{'传给dialog的数据'}}" bindDialogEvent="parentEvent"/>
</view>
//index.js
Page({
    onTap(){
        console.log('dialog-commit-event')
    }
})

<!--dialog.wxml-->
<view>
    <text>这是dialog的内容</text>
    <button size="mini" bindtap="onTap">点击</button>  
</view>
//dialog.js
Component({
    methods:{
        onTap(){
            console.log('parent-event')
        }
    }
})

//输出结果：
    parent-event
```
- 3
问题描述：循环标签添加事件的传参问题
```javascript
<view wx:for="arr" bindtap="clickMe(item)"></view>

clickMe(val){
    console.log(val)
}
//点击事件触发的时候，无法拿到对应数据，并且会报警告：
"pages/index/index" does not have a method "clickMe(item)" to handle event "tap".
```

# 微信小程序3-组件
## 1.image组件
>图片组件有mode属性，可以设置图片的展示模式
该属性有剪裁和缩放的区分

- 剪裁是会对原图片进行裁切
- 缩放是根据固定比例，进行拉伸或缩放
|mode|说明|
|:-:|:-:|
|widthFix|宽度不变，高度自动变化，保持原图宽高比不变|
```javascript
<image src="..." mode="widthFix"></image>
```
|属性|类型|默认值|说明|
|:--:|:--:|:--:|:--:|
|lazy-load|Boolean|false|图片懒加载。只针对page与scroll-view下的image有效|
## 2.scroll-view
>滚动组件容器

## 3.音乐播放暂停的问题
> innerAudioContext.paused 获取当前音乐播放的状态
- true 表示暂停中
- false 表示正在播放中

在播放期间，控制播放和暂停，播放时获取到的状态是暂停即true
```js
const innerAudioContext = wx.createInnerAudioContext();
let isPlaying = !innerAudioContext.paused; // 是否正在播放
if (isPlaying) {
  innerAudioContext.pause();
} else {
  innerAudioContext.play();
};
```
解决办法：
    给innerAudioContext添加onPlay和onPause事件。加上这两个事件之后，能够准确记录当前播放的状态

