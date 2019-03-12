import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		client_ready: false, //
		before_login: null, //跳转登录前的地址
		timeDiff: 0, //与服务器时间的差值
		create_data: null, //提交实名认证完成接口信息
		refId: null, //跳转用业务信息
		yyEncryptedData: null, //个人数据信息加密
		numCard: null //卡号信息
	},
	mutations: {
		//公用设置全局变量的方法
		setData(state, ob) {
			if (typeof(ob) == 'object') {
				for (let i in ob) {
					state[i] = ob[i]
				}
			}
		}
	},
	getters: {
		//公用获取全局变量方法
		getData: (state) => (key) => {
			return state[key]
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
