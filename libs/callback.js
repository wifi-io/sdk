// define callbacks
var errorMap = {
    '0': '接口调用正常，没有错误发生',
    '-101': 'appkey无效',
    '-102': '访问权限不足',
    '-103': '访问频率超过了限制',
    '-201': '要访问的设备没有回应',
    '-202': '要访问的设备当前不在线',
    '-203': '设备执行过程中发生了错误',
    '-301': '访问超时',
    '-302': '数据库操作失败',
    '-303': '未找到相应的数据内容',
    '-304': '服务器发生了内部错误',
    '-401': '请求的参数格式不合法'
};

exports = module.exports = function(callback) {
    return function(err, result) {
        if (err) return callback(err);
        var results = result.body;
        if (results.error < 0) return callback(new Error(errorMap(results.error)));
        return callback(results);
    }
}