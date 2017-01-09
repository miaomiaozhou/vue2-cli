/**
 * Created by zhoudan on 16/12/29.
 */
module.exports = {
    $router: 'router1',
    '/user': {
        '$get': function (req, res, next) {
            res.json({
                code: 0,
                msg: 'ok',
                data: '我是mock的数据'
            });
        },
        '$post': function (req, res, next) {
            res.json({
                test: 'ok'
            });

        }
    },
    '/userName': {
        name: 'test'
    },
    '/text': 'test'
};