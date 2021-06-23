import Vue from 'vue'
import App from './App'
import {myRequest} from './util/api.js'

Vue.prototype.$myRuquest = myRequest
Vue.filter('formatDate',date=>{
	const nDate = new Date(date);
	const year = nDate.getFullYear();
	const month = nDate.getMonth().toString();
	const day = nDate.getDay();
	
	return year+'-'+month+'-'+day;
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
