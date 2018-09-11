import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import BackToTop from 'vue-backtotop'
import InfiniteLoading from 'vue-infinite-loading';

Vue.component('infinite-loading', InfiniteLoading)

import Front from './view/Front.vue'

Vue.use(VueRouter)
Vue.use(BackToTop)

var router = new VueRouter({
    routes: [
        {path: '/', name: 'front', component: Front, title: 'Главная'},
    ],
    mode: 'history'
})

Vue.component('modal', function (resolve) {
    require(['./include/Modal'], resolve)
})

Vue.component('top', function (resolve) {
    require(['./include/Top'], resolve)
})

Vue.component('sidebar', function (resolve) {
    require(['./include/Sidebar'], resolve)
})

Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'KZT',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});

Vue.filter('textSz', function (value, size) {
	if (value.length > size)
		return value.substring(0,size) + '...';
	else
		return value;
});

new Vue({
	el: '#app',
	router: router,
	data: {
		token: '',
	},
	mounted() {
		//this.testFunc()
	},
	methods: {
		
	},
	beforeMount(){
		
	},
	components: { BackToTop }
})

