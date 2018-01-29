import axios from 'axios';
import qs from 'qs';

//  自定义FetchError类
class FetchError extends Error {
    constructor(error) {
        super();
        if (typeof error === 'string') {
            this.message = error;
        } else {
            this.message = error.message;
            this.code = error.code;
        }
    }
}

export function jsonParser(res) {
    let response;
    try {
        response = JSON.parse(res);
    } catch (err) {
        response = res;
        console.log(err);
    }
    return response;
}
let hasErrTip = false;
/**
 * ajax请求
 * @param {String}      url                  请求地址
 * @param {String}      [type='get']         请求类型 'get' | 'post'
 * @param {Object}      data                 请求参数
 * @param {String}      method               'json' // json传参  'bin' // 二进制传参
 * @param {Boolean}     dontWarn             是否不提示错误信息
 * @param {Boolean}     disableLint          禁用错误校验
 */
export function Ajax({
    url = '',
    method = 'bin',
    data = {},
    type = 'get',
    // dontWarn = false,
    noHint = false,
}) {
    let ajaxUrl = url;
    // mock数据  不需要可以注销掉
    // if (data.serviceName && ENV_CONFIG.env === 'dev') {
    //     ajaxUrl = data.serviceName;
    // }
    if (!window.navigator.onLine) {
        if (!hasErrTip) {
            hasErrTip = true;
            // KKL.message.error({
            //     content: '无法连接网络，请检查后重试',
            //     sure() {
            //         hasErrTip = false;
            //     }
            // });
        }
        throw new FetchError({ message: '网络异常', code: -1 });
    }
    const methodMap = {
        json: 'application/json',
        bin: 'multipart/form-data',
    };
    const contentType = methodMap[method] || 'application/x-www-form-urlencoded';
    // 处理token等信息
    const headers = {
        'Content-Type': contentType,
    };
    // 阳：公共基础url
    let configUrl = '/api/';
    // if (ENV_CONFIG.env === 'dev') {
    //     // 针对mock数据特殊处理
    //     configUrl = `${location.protocol}//${location.hostname}:3004/`;
    // }
    console.log('configUrl', configUrl);
    console.log('ajaxUrl', ajaxUrl);
    const options = {
        url: `${configUrl}${ajaxUrl}`,
        method: type,
        headers,
        credentials: 'include',
        withCredentials: true,
    };

    if (String.prototype.toLowerCase.call(type) === 'get') {
        options.params = data;
    } else if (method === 'json') {
        options.data = JSON.stringify(data);
    } else {
        // options.data = qs.stringify(data);
        options.data = JSON.stringify(data);
        console.log(options.data);
    }

    const $ajax = axios(options);
    // const envConfig = ENV_CONFIG;
    // console.log(envConfig);
    // console.log(qs);
    return $ajax
        .then(res => res.data)
        // .then(res => {
        //     // token失效
        //     if (res.code === '1001010' || res.code === '1002001') {
        //         let currentUrl = encodeURIComponent(location.href);
        //         // location.href = `${location.protocol}${ENV_CONFIG.siteMap.auth}/auth/login_page.do?returnUrl=${currentUrl}`;
        //         return;
        //     }
        //     // console.log(res);
        //     if (res.success) {
        //         let keys = Object.keys(res.data);
        //         let keyArr = ['resultObject', 'resultList'];
        //         let index;
        //         let isExist = keys.some((key, i) => {
        //             let ind = keyArr.indexOf(key);
        //             let isHave = ind > -1;
        //             if (isHave) {
        //                 index = i;
        //             }
        //             return isHave;
        //         });
        //         if (keys.length <= 2 && isExist) {
        //             res.data = res.data[keys[index]];
        //         }
        //         return res.data;
        //     }
        //     throw new FetchError(res);
        // })
        // .catch(error => {
        //     console.warn(error);
        //     let status = error.request && error.request.status;
        //     let message = error.message || '系统异常';
        //     if (status && status !== 200) {
        //         message = '系统繁忙，请稍候再试';
        //     }
        //     if (String(error.code) === '3302000') {
        //         message = '您的访问次数超过了题库君的承受能力，建议您明天再来～～我会加强锻炼的～';
        //     }
        //     error.message = message;
        //     if (!noHint) {
        //         // KKL.message.toast(message);
        //     }
        //     error.code = error.code || error.request && error.request.status;
        //     throw new FetchError(error);
        // });
}


const ajax = Ajax;

Ajax.get = function(url, data) {
    return ajax({
        url,
        data,
        type: 'get',
    });
};

Ajax.post = function(url, data) {
    return ajax({
        url,
        data,
        type: 'post',
    });
};
