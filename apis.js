// api routers
module.exports = {
    user: {
        signin: {
            method: 'post',
            url: '/user/login.php'
        },
        signout: {
            method: 'post',
            url: '/user/logout.php'
        }
    },
    device: {
        list: {
            method: 'post',
            url: '/user/get_devices.php'
        },
        exec: {
            method: 'post',
            url: '/device/command.php'
        }
    },
    data: {
        find: {
            method: 'post',
            url: '/data/get_data.php'
        },
        findByKey: {
            method: 'post',
            url: '/data/get_by_key.php'
        },
        insert: {
            method: 'post',
            url: '/data/insert.php'
        }
    }
}