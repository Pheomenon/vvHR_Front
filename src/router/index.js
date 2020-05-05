import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/table',
    name: '员工管理',
    meta: { title: '员工管理', icon: 'user' },
    children: [
      {
        path: 'table',
        name: '员工列表',
        component: () => import('@/views/hr/employee/list'),
        meta: { title: '员工列表', icon: 'view' }
      },
      {
        path: 'save',
        name: '新增员工',
        component: () => import('@/views/hr/employee/save'),
        meta: { title: '新增员工', icon: 'edit' }
      },
      {
        path: 'import',
        name: '批量导入员工信息',
        component: () => import('@/views/hr/employee/import'),
        meta: { title: '批量导入信息', icon: 'sub_account' }
      },
      {
        path: 'edit/:id',
        name: 'EmployeeEdit',
        component: () => import('@/views/hr/employee/save'),
        meta: { title: '编辑员工', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/invite',
    component: Layout,
    redirect: '/invite/table',
    name: '招聘管理',
    meta: { title: '招聘管理', icon: 'table' },
    children: [
      {
        path: 'table',
        name: '应聘人员信息',
        component: () => import('@/views/hr/invite/list'),
        meta: { title: '应聘人员信息', icon: 'view' }
      },
      {
        path: 'save',
        name: '新增应聘人员信息',
        component: () => import('@/views/hr/invite/save'),
        meta: { title: '新增信息', icon: 'edit' }
      },
    ]
  },

  {
    path: '/wage',
    component: Layout,
    redirect: '/wage/table',
    name: '人事支出管理',
    meta: { title: '人事支出管理', icon: 'form' },
    children: [
      {
        path: 'table',
        name: '人事支出概览',
        component: () => import('@/views/hr/wage/list'),
        meta: { title: '人事支出概览', icon: 'view' }
      },
      {
        path: 'save',
        name: '录入支出',
        component: () => import('@/views/hr/wage/save'),
        meta: { title: '录入支出', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        name: 'WageEdit',
        component: () => import('@/views/hr/wage/save'),
        meta: { title: '编辑支出', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/cj',
    component: Layout,
    redirect: '/cj/table',
    name: '奖惩管理',
    meta: { title: '奖惩管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '奖惩列表',
        component: () => import('@/views/hr/cj/list'),
        meta: { title: '奖惩列表', icon: 'view' }
      },
      {
        path: 'save',
        name: '新增奖惩',
        component: () => import('@/views/hr/cj/save'),
        meta: { title: '新增奖惩', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        name: 'CjEdit',
        component: () => import('@/views/hr/cj/save'),
        meta: { title: '编辑奖惩', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/department',
    component: Layout,
    redirect: '/department/table',
    name: '部门管理',
    meta: { title: '部门管理', icon: 'nested' },
    children: [
      {
        path: 'table',
        name: '部门查看',
        component: () => import('@/views/hr/department/list'),
        meta: { title: '部门查看', icon: 'view' }
      },
      {
        path: 'save',
        name: '新增部门',
        component: () => import('@/views/hr/department/save'),
        meta: { title: '新增部门', icon: 'edit' }
      },
      {
        path: 'edit/:id',
        name: 'DepEdit',
        component: () => import('@/views/hr/department/save'),
        meta: { title: '修改信息', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/modify',
    component: Layout,
    redirect: '/modify',
    name: '修改密码',
    meta: { title: '修改密码', icon: 'nested' },
    children: [
      {
        path: '',
        name: '修改密码',
        component: () => import('@/views/hr/modify/modify'),
        meta: { title: '修改密码', icon: 'view' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
