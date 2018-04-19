import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: require('@/components/DashboardPage'),
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: require('@/components/WelcomePage')
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: require('@/components/Goods/GoodsPage')
                },
                {
                    path: 'goods/add',
                    name: 'goods_add',
                    component: require('@/components/Goods/GoodsAddPage')
                },
                {
                    path: 'goods/sku',
                    name: 'skumanage',
                    component: require('@/components/Goods/SkuPage')
                },
                {
                    path: 'goods/edit',
                    name: 'goods_edit',
                    component: require('@/components/Goods/GoodsEditPage')
                },
                {
                    path: 'category',
                    name: 'category',
                    component: require('@/components/Category/CategoryPage')
                },
                {
                    path: 'category/add',
                    name: 'category_add',
                    component: require('@/components/Category/CategoryAddPage')
                },
                {
                    path: 'brand',
                    name: 'brand',
                    component: require('@/components/Brand/BrandPage')
                },
                {
                    path: 'brand/add',
                    name: 'brand_add',
                    component: require('@/components/Brand/BrandAddPage')
                },
                {
                    path: 'order',
                    name: 'order',
                    component: require('@/components/Order/OrderPage')
                },
                {
                    path: 'order/order_detail',
                    name: 'order_detail',
                    component: require('@/components/Order/OrderDetailPage')
                },
                {
                    path: 'order/detail',
                    name: 'order_detail',
                    component: require('@/components/Order/OrderDetailPage')
                },
                {
                    path: 'operate/topic',
                    name: 'topic',
                    component: require('@/components/Topic/TopicPage')
                },
                {
                    path: 'operate/coupon',
                    name: 'coupon',
                    component: require('@/components/Topic/CouponPage')
                },
                {
                    path: 'operate/coupon/add',
                    name: 'coupon_add',
                    component: require('@/components/Topic/CouponAddPage')
                },
                {
                    path: 'operate/qrcode',
                    name: 'qrcode',
                    component: require('@/components/Topic/QRcodePage')
                },
              {
                path: 'operate/topic/add',
                name: 'topic_add',
                component: require('@/components/Topic/TopicAddPage')
              },
              {
                path: 'user',
                name: 'user',
                component: require('@/components/User/UserPage')
              },
              {
                path: 'user/add',
                name: 'user_add',
                component: require('@/components/User/UserAddPage')
              },
              {
                path: 'user/detail',
                name: 'detail',
                component: require('@/components/User/UserDetailPage')
              },
              {
                path: '/count',
                name: 'count',
                component: require('@/components/CountPage')
              },
              {
                path: 'user/markete',
                name: 'markete',
                component: require('@/components/User/MarketePage')
              },
              {
                path: 'user/store',
                name: 'store',
                component: require('@/components/User/StorePage')
              },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/components/LoginPage')
        },
        {
            path: '*',
            redirect: '/dashboard'
        }
    ]
})
