import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store';
import scrollIntoView from '@/helpers/scrollIntoView';

import Home from '@/views/home/index.vue';

import authMiddleware from '@/middleware/auth';

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            middleware: [authMiddleware]
        },
        component: Home
    },
    {
        path: '/bruteforce',
        name: 'bruteforce',
        component: () => import(/* webpackChunkName: 'bruteforce' */ '../views/bruteforce/index.vue'),
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: 'dashboard' */ '../views/dashboard/index.vue'),
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        path: '/image',
        name: 'image',
        component: () => import(/* webpackChunkName: 'image' */ '../views/image/index.vue'),
        meta: {
            layout: 'empty',
            middleware: [authMiddleware]
        }
    },
    {
        path: '/scan',
        name: 'scan',
        component: () => import(/* webpackChunkName: 'scan' */ '../views/scan/index.vue'),
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        path: '/upgrade',
        name: 'upgrade',
        component: () => import(/* webpackChunkName: 'upgrade' */ '../views/upgrade/index.vue'),
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        path: '/upgrade/buy',
        name: 'upgrade-buy',
        component: () => import(/* webpackChunkName: 'upgrade' */ '../views/upgrade/buy.vue'),
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        path: '/collection',
        name: 'collection',
        component: () => import(/* webpackChunkName: 'collection' */ '../views/collection/index.vue'),
        meta: {
            middleware: [authMiddleware]
        }
    },
    {
        path: '/:catchAll(.*)',
        name: 'error',
        component: () => import(/* webpackChunkName: 'error' */ '../views/error/index.vue'),
        meta: {
            middleware: [authMiddleware]
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

function middlewarePipeline (context, middleware, index) {
    const nextMiddleware = middleware[index]
    if(!nextMiddleware){
        return context.next
    }
    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )
        nextMiddleware({ ...context, next: nextPipeline })
    }
}


router.beforeEach((to, from, next) => {
    store.dispatch('error/removeError');

    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    });
})

router.afterEach((context, to) => {
    scrollIntoView(document.body);
});
export default router
