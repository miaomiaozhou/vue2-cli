import qs from 'querystring';


const defaultHttpContentType = 'application/json';

let defaultHeaders = {
    'Accept' : 'application/json'
};

let apiPrefix = '';

const defaultOptions = {
    credentials: 'same-origin'
};

// 处理基本的错误, 如500, 404等等
function filterStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res
    }
    else {
        let error = new Error(res.statusText);
        error.res = res;
        error.type = 'http';
        if (__debug__) {
            console.info(`Error: [http]`, res.status);
        }
        throw error;
    }
}

// 处理错误的返回信息(200)
function filterData(data) {
    if (data.code === 0) {
        if (__debug__) {
            console.info(`HTTP: success`, data);
        }
        return data.data
    }
    let error = new Error(data.msg);
    error.data = data;
    error.type = 'data';
    if (__debug__) {
        console.info(`Error:[data]`, data.code, data);
    }
    throw error;
}

// 转换成qs
function toQs(body) {
    let qsUrl = {};
    Object.keys(body).forEach(key => {
        if (body[key] != undefined) {
            qsUrl[key] = body[key];
        }
    });
    return qs.stringify(qsUrl);
}
// 解析为json格式
function parseJSON(res) {
    return res.json()
        .catch(err=> {
            if (err) {
                err.res = res;
            }
            throw err;
        });
}

export function get({url, params = {}, headers = {}, options = {}, setting = {}}) {
    if (url.indexOf('/') === 0) {
        url = apiPrefix + url;
    }
    if (params && toQs(params)) {
        url += '?' + toQs(params);
    }
    let fetchOptions = {
        headers: {
            ...defaultHeaders,
            ...headers
        },
        ...defaultOptions,
        ...options
    };

    if (__debug__) {
        console.info(`GET:`, params, fetchOptions);
    }

    let result = fetch(url, fetchOptions).then(filterStatus);
    if (!setting.originRes) {
        result = result.then(parseJSON).then(filterData);
    }
    return result;
}