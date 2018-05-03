import Vue from 'vue'
import Router from 'vue-router'

//首页不做懒加载，但是还没确定首页是哪个

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: resolve => require(['@/views/Login'], resolve)
		}, {
			path: '/home',
			name: 'home',
			component: resolve => require(['@/views/Home'], resolve)
		}
	]
})
