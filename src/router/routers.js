/**
 * Created by 86wh2 on 2017/7/8.
 */
// 这里控制我所有的路由
import components from './routesLazy';
let router = [
    // 默认显示路由
    {
        path: '/login',
        name: '登录',
        component: components.Login,
        hidden: true
    },
    {
        path: '/404',
        name: '404页面',
        component: components.UnFind,
        hidden: true
    },
    {
        path: '/',
        component: components.Home_view,
        name:'我的面板',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: '/PersonalInfo',
                name: '个人信息',
                component: components.PersonalInfo
            },
            {
                path: '/userManage',
                name: '用户管理',
                component: components.UserManage
            },
            {
                path: '/index',
                name: '密码修改',
                component: components.PassWord
            },

        ]

    },
    {
        path: '/',
        component: components.Home_view,
        name:'业务包',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: '/groupList',
                name: '业务包列表',
                component: components.groupList
            },
            {
                path: '/listEdit',
                name: '业务包批量管理',
                component: components.groupListEdit,
                hidden:true
            },
            {
                path: '/listAdd/:id',
                name: '业务包添加',
                component: components.groupListAdd,

            },
            {
                path: '/groupListAddStep',
                name: '添加业务包',
                component: components.groupListAddStep,
                hidden:true
            },
            {
                path: '/packDetail',
                name: '业务包详情',
                component: components.packDetail,
                hidden:true
            },
        ]

    },
    {
        path: '/',
        component: components.Home_view,
        name:'商品分类配置',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            {
                path: '/goodsList',
                name: '菜单列表',
                component: components.goodsList
            },
        ]

    },
    {
        path: '/',
        component: components.Home_view,
        name:'测试中心',
        iconCls: 'fa fa-plus-circle',//图标样式class
        leaf: true,//只有一个节点
        children: [
            {
                path: '/test',
                name: '测试页面',
                component: components.Test
            },

        ]

    },
    // 重定向路由
    {
        path: '*',
        hidden: true,
        redirect: {path: '/index'}
    }
];

export default router;