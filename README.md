wifi.io sdk ![npm](https://badge.fury.io/js/wifi.png)
---

基于 Node.js 的命令行工具与开发者套件

![banner](http://ww3.sinaimg.cn/large/61ff0de3gw1e7xn2w65nvj20m8063q49.jpg)

### 如何安装 

````
$ npm install wifi
````

### 使用命令行工具 Wifi(1)

使用命令行工具可以快速搜索到某个模块的C代码仓库，并且通过请求wifi.io在线编译和部署接口，将这个模块的代码一键部署到本地或者远程的wifi.io开发板上，使得添加模块驱动和API服务变得非常简单易用。（此功能预计 0.0.3 版本发布...）
````
$ sudo wifi.io account abc@abc.com mypassword // 在本地设置好账户密码
$ wifi search dht11 // 搜索dht11温湿度传感器的模块驱动
$ Wifi.io 0.0.2 Sussess : dht11 https://github.com/wifi-io/dht11.git
$ wifi deploy dht11 -d 29 // 将dht11的模块代码编译并部署到id为29的开发板上
$ Wifi.io 0.0.2 Sussess : deploy success!
$ wifi run dht11 -d 29 // 在id为29的开发板上运行dht11模块
````
接下来，就可以通过程序中请求`wifi.device.exec()` 来执行查询命令，获取当前温度和湿度了。

### 在Node.js程序中使用

你可以方便得在程序中调用wifi.io的各种api，用以操作开发板行为，执行相应命令：
````javascript
var Wifi = require('wifi');

// 初始化
var wifi = new Wifi({
    username: 'xxx',
    password: 'xxx'
});

// 获取token, Token 会被保存在 wifi.token 备用
wifi.token(function(err,result){
    console.log(result.body);
});
````

### 提供的 API 列表

可以使用类似上方那样的`token`这类快捷方法，也可以使用下方的API：

与用户相关的API：
````javascript
// 登录
wifi.user.signin({
    body: {
        username: '123',
        password: '123'
    }
},function(err,result){
    console.log(result);
});

// 登出
wifi.user.signout({
    body: {
        token: 123
    }
},function(err,result){
    // console.log result token
    console.log(result) 
});
````

与设备相关的API：

````javascript
// 获取该用户下的设备
wifi.devices.list({
    body: {
        token: 123
        status: 0 , // 根据设备在线状态查询，-1:不在线，0:全部，1:在线，默认为全部,
        page: 1, // 分页页码，默认为1
        pagesize: 10 // 分页大小，默认每页10条，如果pagesize为0，则返回全量数据
    }
},function(err,result){
    console.log(result.body) 
});

// 向某个设备传输执行命令
wifi.device.exec({
    body: {
        did: 123, // device id 目标设备的设备id
        method: 'dht11.read', // 要执行的方法名称,在这个例子里读取温湿度传感器数据
        params: {} // 需要传递的参数
    }
},function(err,result){
    console.log(result.body);
});
````

与数据相关的API：

````javascript
wifi.data.find({
    body: {
        tags: '123', // device id 目标设备的设备id
        starttime: 0,
        endtime: 100,
        filter: '(3,9]',
        simplify: false,
        page: 1,
        pagesize: 10,
        method: 'reboot', // 要执行的方法名称
        params: {} // 需要传递的参数
    }
},function(err,result){
    console.log(result);
});

wifi.data.findByKey({
    body: {
        key: '123', // 要查询的数据的key
    }
},function(err,result){
    console.log(result);
});

wifi.data.insert({
    body: {
        tags: '123', // 数据的标签，用于标识数据的用途，便于查询
        value: 123 , // 数据内容（数值型）
    }
},function(err,result){
    console.log(result);
});
````

### 详细API方法
查看这个文件: `index.js`

### 单元测试
````
$ git clone https://github.com/turingou/beer.git
$ cd beer
$ npm install // will install mocha localy
$ npm test
````