module.exports = {
    device: {
        get: {
            url: '/device/{{did}}'
        },
        post: {
            method: 'post',
            url: '/device/{{did}}'
        },
        exec: {
            method: 'post',
            url: '/device/{{did}}/{{action}}'
        }
    },
    data: {
        get: {
            url: '/data/{{key}}'
        },
        post: {
            method: 'post',
            url: '/data'
        }
    }
}