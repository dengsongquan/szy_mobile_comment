import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "@/view/layout";
import home from "../view/home/home"
import management from "../view/home/management"
import downloadResult from "../view/home/downloadResult"
import departentIndex from "../view/home/departentIndex"
import departenName from '../view/departenResult/departenName'
import departentResult from '../view/departenResult/departentResult'
import selfDownLo from '../view/selfResult/selfDownLo'
import personResultList from "../view/selfResult/personResultList"
import departentDownLo from '../view/departenResult/departentDownLo'
import selfIndex from "../view/home/selfIndex";
import personResult from '../view/selfResult/personResult'
import departenList from '../view/selfResult/departenList'
import personList from '../view/selfResult/personList'
import vestin from '../view/self/vestin'
import selfPage from "../view/self/selfPage";
import person from "../view/self/person";
import isSatisfied from "../view/self/isSatisfied";
import adminQuestion from "../view/admin/adminQuestion";
import adminDepartment from "../view/admin/adminDepartment";
import adminTime from "../view/admin/adminTime";
import adminPerson from "../view/admin/adminPerson";
import editInfo from "../view/admin/editInfo";
import addInfo from "../view/admin/addInfo";
import newDepart from "../view/admin/newDepart";
import editDepart from "../view/admin/editDepart";
import newTime from "../view/admin/newTime";
import editTime from "../view/admin/editTime";
import partyConf from "../view/admin/partyConf";
import personalConf from "../view/admin/personalConf";
import addNewQues from "../view/admin/addNewQues";
import editQues from "../view/admin/editQues";
import toUnparticition from "../view/departenResult/toUnparticition";
import toPaticipation from "../view/departenResult/toPaticipation";
import toRateComplete from "../view/departenResult/toRateComplete";
import toAllPeople from "../view/departenResult/toAllPeople";
import toEcharts from "../view/departenResult/toEcharts";
import departentPage from "../view/departenResult/departentPage";
import teachUnit from "../view/departenResult/teachUnit";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const router = new VueRouter({
    routes : [
        {
            path:'/',
            redirect:'/page/home',
        },
        {
            path: '/page',
            component: layout,
            children : [
                { name : 'home', path : 'home', component: home },
                { name : 'departentIndex', path: '/departentIndex', component : departentIndex },
                { name : 'selfIndex', path: '/selfIndex', component : selfIndex },
                // 集体结果
                {
                    path : '/departenName',
                    component : departenName,
                    name : 'departenName' ,
                    // children: [
                    //     { name: 'departentResult', path: '/departentResult', component: departentResult },
                    // ]
                },
                { name : 'departentResult', path: '/departentResult', component : departentResult },
                //下载 结果
                { name : 'selfDownLo', path : '/selfDownLo', component : selfDownLo },
                { name : 'departentDownLo', path : '/departentDownLo', component : departentDownLo },
                //消息中心
                { name : 'personResultList', path : '/personResultList', component : personResultList , meta : { isUseCache : false, keepAlive : true } },
                { name : 'toUnparticition', path : '/toUnparticition', component : toUnparticition },
                { name : 'toPaticipation', path : '/toPaticipation', component : toPaticipation },
                { name : 'toRateComplete', path : '/toRateComplete', component : toRateComplete },
                { name : 'toAllPeople', path : '/toAllPeople', component : toAllPeople },
                { name : 'toEcharts', path : '/toEcharts', component : toEcharts },
                { name : 'departentPage', path : '/departentPage', component : departentPage },
                { name : 'teachUnit', path : '/teachUnit', component : teachUnit },
                { name : 'downloadResult', path: '/downloadResult', component : downloadResult},
                //2020-12-29新增后台管理
                { name : 'management', path: '/management', component: management },
                {
                    name : 'selfPage',
                    path: '/selfPage',
                    component: selfPage,
                    // redirect: '/vestin/1',
                    // children: [
                    //     { name :'vestin', path: '/vestin/:vestinId', component: vestin },
                    //     { name :'person', path: '/person/:personEid/:departmentId', component: person}
                    // ]
                },

                //2020-12-22新增跳转功能
                { name : 'vestin', path: '/vestin/:depId', component: vestin },
                // { name : 'vestin', path: '/vestin/:vestinId', component: vestin },

                { name :'person', path: '/person/:personEid/:departmentId', component: person},
                //2020-12-14新增 departentList路由
                {
                    path: '/departenList',
                    component: departenList,
                    name : 'departenList',
                    // redirect:  { name : 'departenList'},
                    // redirect:  { name : 'personList'},
                    // children: [
                    //     { name : 'personResult', path: '/personResult', component: personResult },
                    // ]
                },
                { name : 'personResult', path: '/personResult', component: personResult },
                { name : 'personList', path: '/personList/:depId', component: personList},
                //后台管理
                { name : 'adminQuestion', path: '/adminQuestion', component: adminQuestion },
                { name : 'adminDepartment', path: '/adminDepartment', component: adminDepartment },
                { name : 'adminTime', path: '/adminTime', component: adminTime },
                { name : 'adminPerson', path: '/adminPerson', component: adminPerson },
                { name : 'editInfo', path: '/editInfo', component: editInfo },
                //新增员工信息v
                { name : 'addInfo', path: '/addInfo', component: addInfo },
                { name : 'newDepart', path: '/newDepart', component: newDepart },
                { name : 'editDepart', path: '/editDepart', component: editDepart },
                { name : 'newTime', path: '/newTime', component: newTime },
                { name : 'editTime', path: '/editTime', component: editTime },
                { name : 'personalConf', path: '/personalConf', component: personalConf },
                { name : 'partyConf', path: '/partyConf', component: partyConf },
                { name : 'addNewQues', path: '/addNewQues', component: addNewQues },
                { name : 'editQues', path: '/editQues', component: editQues },
                { name : 'isSatisfied', path: '/isSatisfied', component: isSatisfied },
            ]
        }
    ]
})

export default router
