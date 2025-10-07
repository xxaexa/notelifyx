const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'notes', component: () => import('src/pages/note/NotesPage.vue') },
      { path: 'notes/add', component: () => import('src/pages/note/CreatePage.vue') },
    ],
    meta: { requiresAuth: true },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/login',
    component: () => import('src/pages/auth/LoginPage.vue'),
  },
  {
    path: '/register',
    component: () => import('src/pages/auth/RegisterPage.vue'),
  },
]

export default routes
