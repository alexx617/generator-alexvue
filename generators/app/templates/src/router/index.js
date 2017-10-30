import Vue from 'vue'
import VueRouter from 'vue-router'

const home = r => require.ensure([], () => r(require('components/home')), 'home')

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'home', component: home },
	{ path: '*', redirect: '/' }
]

const router = new VueRouter({ routes });

router.afterEach(() => {
    document.body.scrollTop = 0;
});

export default router;