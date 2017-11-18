import React, {Component} from "react";
import {Link} from "react-router-dom";
import $ from "jquery";
import AuthAPI from "../../../utils/AuthAPI";
import openSocket from "socket.io-client";
import logo from "../../../assets/imgs/logo.png";


const authApi = new AuthAPI();


export default class GameList extends Component {
    constructor(props) {
        super(props);
        const socket = openSocket('http://localhost:3000');

        this.state = {
            socket,
            games: [],
            user: authApi.getUser()
        };

        if (!authApi.isAuth()) {
            this.props.history.push('/auth');
        }
    }

    componentDidMount() {
        const {user, socket} = this.state;

        socket.emit('games', {
            action: 'get-list',
            token: $.cookie('token')
        });

        socket.on(`user-${user.username}`, (data) => {
            switch (data.type) {
                case 'game-list':
                    this.setState({
                        games: data.data
                    });
                    break;

                case 'new-game':
                    alert('Created');
                    this.props.history.push(`/games/${data.data.id}`);
                    break;
            }
        });


        socket.on('games', (data) => {
            if (data.error) {
                console.log(data.error);
            }

            console.log('games', data);
        });
    }

    componentWillUnmount() {
        const socket = this.state.socket;
        socket.disconnect();
    }

    createNewGame() {
        const {socket} = this.state;

        socket.emit('games', {
            action: 'create',
            token: $.cookie('token')
        });
    }

    render() {
        const {games} = this.state;

        return (
            <div>
                <nav className="navbar navbar-light">

                    <a className="navbar-brand" href="#">
                        <img src={logo} width="50"
                             height="50" className="d-inline-block align-top logo-img"
                             alt=""/>
                        <span className="logo-text">Durak.ru</span>
                    </a>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-1">
                            <br/>
                            <a href="#" onClick={this.createNewGame.bind(this)}
                               className="btn btn-info">Создать игру</a>
                            {games.map((game) =>
                                <div>
                                    <br/>
                                    <div key={game.id} className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                <Link
                                                    to={`/games/${game.id}`}>Game
                                                    #{game.id}</Link>
                                            </h3>
                                            Players: {game.players.map(player => (
                                            <span
                                                key={player.id}>{player.username}</span>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-4">
                            <br/>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        ТОП-10
                                    </h3>
                                    test1<br/>
                                    test1<br/>
                                    test1<br/>
                                    test1<br/>
                                    test1
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
