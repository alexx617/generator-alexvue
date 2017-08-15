// 接口请求
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import utils from 'utils/utils';

const log = console.log;

let baseURL = '';
let api = '';
process.env.NODE_ENV !== 'development' ? baseURL = process.env.BASE_API : api = '/api';


export default function (opt) {
    let ContentType = 'application/json;charset=UTF-8';
    if (opt.ContentType) {
        ContentType = 'application/x-www-form-urlencoded';
    }
    var dataList = {
        method: opt.method,
        url: `${api}` + opt.url,
        timeout: 10000,
        baseURL: baseURL,
        headers: {
            'Content-Type': ContentType,
            'token': sessionStorage.token || ''
        }
    }
    if (opt.method == 'post') {
        opt.ContentType ? dataList.data = qs.stringify(opt.data) : dataList.data = opt.data;
    }else{
        dataList.params = opt.data;
    }
    return new Promise((resolve, reject) => {
        axios(dataList)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}

// 发送请求前处理数据
axios.interceptors.request.use(config => {
    // iView.LoadingBar.start()
    return config;
}, error => {
    // iView.LoadingBar.error();
    return Promise.reject(error);
});

// 返回响应请求后处理数据
axios.interceptors.response.use(res => {
    // iView.LoadingBar.finish();
    return res;
}, error => {
    // iView.LoadingBar.error();
    let errorCode = error.response.status;
    if (errorCode === 401) {
        utils.$go('/login/main');
    } else if ([404, 405, 500, 504].includes(errorCode)) {
        var msg = {
            data:{
                message:' 网络错误,请稍后重试!'
            }
        }
    }
    return msg ? Promise.reject(msg) : Promise.reject(error.response)
});
