import Home from "./modules/main/components/Home";
import AppRoot from "./components/AppRoot";
import Auth from "./modules/main/components/Auth";


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
            // {
            //     path: '*',
            //     component: NotFound
            // }
        ]
    }
];

export default routes;
