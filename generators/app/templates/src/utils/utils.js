// 通用插件方法

import router from '../router';
import Vue from 'vue';

export default {
    // 页面跳转
    $go: function(page, query) {
        let parentPath = /\/(.+)\//g.exec(router.currentRoute.path);
        page = parentPath ? parentPath[0] + page : ""
        let route = { path: page };
        if (query) {
            route.query = query;
        }
        router.push(route);
    },

    // 无记录页面跳转
    $goRep: function(page) {
        router.replace(page);
    },

}
