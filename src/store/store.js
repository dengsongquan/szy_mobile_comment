import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        currentUserEid : '',
        seeResult : false, //下载评价结果显示控制
        isSeeMessageCenter : false, //消息中心显示显示控制
        userName :  "",
    },

    mutations:{
        showDepId(state){
            return state.currentUserEid
        },
    }
})

export { store }
