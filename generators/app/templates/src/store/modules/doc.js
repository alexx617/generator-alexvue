import {
    SET_HEADER,
} from '../mutation_types';

export default {

    state: {
        header: {
            showHeader: true
        },
    },

    mutations: {
        [SET_HEADER] (state, data) {
            state.header.showHeader = data.showHeader;
        },
    },

    actions: {
        SET_HEADER ({ commit }, data) {
            if (data.showHeader === undefined) { throw new Error('头部设置格式不正确'); };
            commit(SET_HEADER, data);
        },
    }

};