// 执行各个功能点测试
var Wifi = require('../index'),
    should = require("should");

var wifi = new Wifi({
    username: 'test',
    password: '123'
});

describe('User', function() {
    describe('#signin', function() {
        it('登录成功', function(done) {
            wifi.user.login(function(err,result) {
                var err = result.error,
                    token = result.token;
                err.should.equal(0);
                token.should.be.a('string');
                done();
            });
        });
    });
    describe('#signout', function() {
        it('无效的token需要被忽略', function(done) {
            wifi.user.logout(function(err,result) {
                var err = result.error;
                err.should.be.a('number');
                err.should.equal(-101);
                done();
            });
        });
    });
    describe('#get_devices', function() {
        it('账户应该可以拿到正确的devices返回', function(done) {
            wifi.user.devices({
                status: 0,
                page: 1,
                pagesize: 10
            },function(err, result) {
                var err = result.error;
                err.should.be.a('number');
                err.should.equal(-101);
                done();
            });
        });
    });
});