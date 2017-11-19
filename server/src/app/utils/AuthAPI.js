import $ from "jquery";


export default class AuthAPI {
    getUser() {
        if (!this.isAuth()) {
            return;
        }

        return this.parseJWT($.cookie('token'));
    }

    isAuth() {
        return !!$.cookie('token');
    }

    parseJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64))
    }

    register(username, guid, password) {
        return fetch('http://localhost:3000/api/auth', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({username, guid, password})
        }).then(response => (
            response.json()
        )).then(data => {
            $.cookie('token', data.token);
            return data;
        });
    }
}
