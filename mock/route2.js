/**
 * Created by zhoudan on 16/12/29.
 */
module.exports = {
    $router: 'route2',
    '/test2': function (req, res, next) {
        res.json({
            tee: '2'
        })
    },
    '/test3': {
        test: '222'
    },
    '/test4': {
        '$post': {
            test: 1
        }
    }
};