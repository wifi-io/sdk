wifi.io sdk ![npm](https://badge.fury.io/js/wifi.png)
---

the sdk and package manager of wifi.io based on Node.js

![banner](http://ww3.sinaimg.cn/large/61ff0de3gw1e7xn2w65nvj20m8063q49.jpg)

### How to install 

````
$ npm install wifi
````

### Sample code

require wifi.io

````javascript
var Wifi = require('wifi');

// init instance
var wifi = new Wifi({
    username: 'xxx',
    password: 'xxx'
});
````

users api
````javascript
// signin
wifi.user.login(function(err,result){
    // console.log result token
    // token will be stored in wifi instance
    console.log(result);
});

// signout
wifi.user.logout(function(err,result){
    // console.log result token
    console.log(result) 
});

// get_devices
// http://wifi.io/developer/api_if.php?id=50e67bc57f8b9aaf18000000
wifi.user.devices({
    status: 0 , // 根据设备在线状态查询，-1:不在线，0:全部，1:在线，默认为全部,
    page: 1, // 分页页码，默认为1
    pagesize: 10 // 分页大小，默认每页10条，如果pagesize为0，则返回全量数据
},function(err,result){
    // console.log result token
    console.log(result) 
});
````

device api
````javascript
wifi.device.command({
    did: 123, // device id 目标设备的设备id
    method: 'reboot', // 要执行的方法名称
    params: {} // 需要传递的参数
},function(err,result){
    console.log(result);
});
````

data apis
````javascript
wifi.data.get({
    tags: '123', // device id 目标设备的设备id
    starttime: 0,
    endtime: 100,
    filter: '(3,9]',
    simplify: false,
    page: 1,
    pagesize: 10,
    method: 'reboot', // 要执行的方法名称
    params: {} // 需要传递的参数
},function(err,result){
    console.log(result);
});

wifi.data.getByKey({
    key: '123', // 要查询的数据的key
},function(err,result){
    console.log(result);
});

wifi.data.insert({
    tags: '123', // 数据的标签，用于标识数据的用途，便于查询
    value: 123 , // 数据内容（数值型）
},function(err,result){
    console.log(result);
});
````

### Local scanner supported

````javascript
// init local instance
var local = new Wifi().scan();

// send command
local.device.command({
    method: 'reboot', // 要执行的方法名称
    params: {} // 需要传递的参数
},function(err,result){
    console.log(result);
});
````

### Pull Request Welcome !

- fork this repo
- feel free to add your feature
- make sure your feature are fully tested!
- send me a PR, and enjoy !

### Run unit-test (Mocha)

````
$ git clone https://github.com/turingou/beer.git
$ cd beer
$ npm install // will install mocha localy
$ npm test
````