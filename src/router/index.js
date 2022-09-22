import { createRouter, createWebHashHistory } from 'vue-router'
import NotesPage from '../components/notes-page.vue'
import notePage from '../components/note-page.vue'
const routes = [{
        path: '/',
        name: 'home',
        component: NotesPage
    },
    {
        path: '/note',
        name: 'note',
        component: notePage,
        props: true
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router