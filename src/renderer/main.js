import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueQuillEditor from 'vue-quill-editor'
import Egrid from 'egrid'

import App from './App'
import router from './router'
import store from './store'

Vue.use(VueAxios, Axios);
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(Egrid);

router.beforeEach((to, from, next) => {

	let token = localStorage.getItem('token') || '';

    //配置接口信息
	Axios.defaults.baseURL = 'https://dh.sty.sztcmdiet.com/admin/';
	//Axios.defaults.baseURL = 'http://127.0.0.1:5000/admin/';
    Axios.defaults.headers.common['red13-token'] = token;

	if (!token && to.name !== 'login') {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		})
	} else {
		next()
	}
});

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
