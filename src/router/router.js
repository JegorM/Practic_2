import StudentInfo from '../components/StudentInfo.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Students from '../components/Students.vue'

const routes = [
  {
    path: '/',
    component: Students
  },
  {
    path: '/student-info/:id',
    component: StudentInfo,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
