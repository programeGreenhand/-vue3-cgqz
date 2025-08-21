/*
 * @Author: li.yunhao
 * @Date: 2023-04-13 23:18:31
 * @LastEditors: Xu Ning
 * @LastEditTime: 2023-05-25 14:50:00
 * @FilePath: \evaluation-frontend\src\router\index.ts
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { userStore } from '@/stores/user'
import { Operation } from '@vicons/carbon'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
      
    },

    {
      path:'/auth',
      name:'auth',
      component:()=>import('@/views/LoginView.vue'),
      children:
      [
        {
          path: 'login',
          name: 'login',
          component: () => import('../components/core/LoginCard.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../components/core/RegisterCard.vue'),
        }
      ]
    },

    {
      path: '/ITDL',
      name: 'ITDL',
      component: () => import('../views/ITDLView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/xgjs',
      name: 'xgjs',
      component: () => import('@/components/itdl/function/xgjs.vue'),
    },
    {
      path: '/gywm',
      name: 'gywm',
      component: () => import('@/components/itdl/function/gywm.vue'),
    },
    {
      path: '/jcls',
      name: 'jcls',
      component: () => import('@/components/itdl/function/jcls.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/grzx',
      name: 'grzx',
      component: () => import('@/components/itdl/function/grzx.vue'),
      redirect:'/grzx/gerenxinxi',
      meta: { requiresAuth: true },
      children:[
        {
          path: 'gerenxinxi',
          name: 'gerenxinxi',
          component: () => import('@/components/itdl/function/gerenxinxi.vue'),
        },
        {
          path: 'usermanagement',
          name: 'usermanagement',
          component: () => import('@/components/itdl/function/usermanagement.vue'),
        }
      ]
    }
  ]
})


// ========== 新增路由守卫 ==========
// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  const authStore = userStore(); // 获取 Pinia Store 实例
  const isLoggedIn = authStore.isLoggedIn; // 检查用户是否已登录

  // 如果目标路由需要登录且用户未登录，则跳转到登录页
  if (to.meta.requiresAuth && !isLoggedIn &&to.path !== '/ITDL') {
    next({
      name: 'login', // 跳转到登录页
      query: { redirect: to.fullPath } // 记录原本要去的路径（登录后自动跳转回来）
    });
  }
  else {
    next(); // 放行
  }
});

  
  


export default router
