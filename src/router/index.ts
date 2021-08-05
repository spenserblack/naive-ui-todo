import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Todo from '../views/Todo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: String.raw`/to-do/:index(\d+)`,
    name: 'Todo',
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
