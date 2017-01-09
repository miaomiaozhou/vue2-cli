/**
 * Created by zhoudan on 17/1/1.
 */
import {get} from './request.js';


//测试mock请求
export function testMockRequest(body) {
    return get({
        url: '/router1/user',
        params: body
    })
        .then(data=> {
            if (data) {
                return data;
            }
        })
}