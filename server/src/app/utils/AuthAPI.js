import $ from "jquery";


export default class AuthAPI {
    isAuth() {
        return !!$.cookie('token')
    }

    parseJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64))
    }

    register(username) {
        return fetch('/api/auth/', {
            method: 'put',
            params: {
                username
            }
        }).then(function (response) {
            return response.json();
        })
    }
}
