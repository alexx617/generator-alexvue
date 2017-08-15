import Vue from 'vue';
import Vuex from 'vuex';
import doc from './modules/doc';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        doc
    },
    strict: process.env.NODE_ENV !== 'production'
});