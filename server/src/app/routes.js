import Home from "./modules/main/components/Home";
import AppRoot from "./components/AppRoot";
import Auth from "./modules/auth/components/Auth";
import NotFound from "./components/NotFound";
import GameList from "./modules/games/components/GameList";
import GameDetail from "./modules/games/components/GameDetail";


const routes = [
    {
        component: AppRoot,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/home',
                component: Home
            },
            {
                path: '/auth',
                component: Auth
            },
            {
                path: '/games/:id',
                component: GameDetail
            },
            {
                path: '/games',
                component: GameList
            },
            {
                path: '*',
                component: NotFound
            }
        ]
    }
];

export default routes;
