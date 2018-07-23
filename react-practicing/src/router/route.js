import Home from '../components/Home' // 主页面
import Hello from '../components/Hello' // 欢迎页面
import Game from '../components/Tic-Tac-Toe' // 井字棋游戏
import Todo from '../components/Todo' //todo
import Game2048 from '../components/2048'

const routes  = [
    {
        path: '/',
        component: Home,
        indexRoute: { component: Hello },
        childRoutes:[
            {
                path: '/ttt',
                component: Game
            },
            {
                path: '/todo',
                component: Todo
            },
            {
                path: '/2048',
                component: Game2048
            }
        ]
    },
    
]

export default routes