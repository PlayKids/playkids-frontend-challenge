import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (view, topLevel) {
  return () =>
    import('@/views/' + view + (!topLevel ? '.vue' : ''))
}

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: 'orders'
  },
  {
    path: '/orders',
    name: 'Orders',
    component: load('Orders', true),
    redirect: { name: 'OrdersList' },
    children: [
      {
        path: 'list',
        name: 'OrdersList',
        component: load('Orders/list')
      },
      {
        path: 'new',
        name: 'OrdersNew',
        component: load('Orders/new')
      },
      {
        path: ':id',
        name: 'OrdersView',
        component: load('Orders/view')
      }
    ]
  },
  {
    path: '/billing',
    name: 'billing',
    component: load('Billing', true)
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () { return { x: 0, y: 0 } }
})

export default router
