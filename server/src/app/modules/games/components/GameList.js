import React, {Component} from "react";
import {Link} from "react-router-dom";
import $ from "jquery";
import AuthAPI from "../../../utils/AuthAPI";
import openSocket from "socket.io-client";
import logo from "../../../assets/imgs/logo.png";
import {Formik} from "formik";


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

                    console.log('game-list', data.data);
                    break;

                case 'new-game':
                    this.props.history.push(`/games/${data.data.id}`);
                    break;

                case 'join':
                    console.log(data.data)
                    this.props.history.push(`/games/${data.data.id}`);
                    break;

                case 'msg':
                    alert(data.text)
                    break;
            }
        });
    }

    componentWillUnmount() {
        const socket = this.state.socket;
        socket.disconnect();
    }

    createNewGame(bet, num_players) {
        const {socket} = this.state;

        socket.emit('games', {
            action: 'create',
            token: $.cookie('token'),
            bet,
            num_players
        });
    }

    join(id) {
        const {socket} = this.state;

        socket.emit('games', {
            action: 'join',
            token: $.cookie('token'),
            game_id: id
        });
    }

    render() {
        const {games} = this.state;

        return (
            <div>
                <div className="nav-list">
                    <img src={logo} className="logo-img" alt=""/>
                    <span className="logo-text">Durak</span>
                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <p>
                                <a data-toggle="collapse"
                                   href="#collapseExample" aria-expanded="false"
                                   aria-controls="collapseExample"
                                   className="btn btn-info float-right">Создать
                                    игру</a>
                                <div className="clearfix"/>
                            </p>

                            <div className="collapse" id="collapseExample">
                                <div className="card card-body">
                                    <Formik
                                        initialValues={{
                                            bet: '',
                                            num_players: ''
                                        }}
                                        onSubmit={(values) => {
                                            this.createNewGame(values.bet, values.num_players);
                                        }}
                                        render={({values, errors, touched, handleChange, handleSubmit, isSubmitting}) =>
                                            <form onSubmit={handleSubmit}>
                                                <div className="input-group"
                                                     style={{marginBottom: '5px'}}>
                                                    <span
                                                        className="input-group-addon">$</span>
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder="Ставка"
                                                           name="bet"
                                                           onChange={handleChange}
                                                           value={values.bet}/>
                                                </div>
                                                <div className="input-group"
                                                     style={{marginBottom: '5px'}}>
                                                    <input
                                                        className="form-control"
                                                        placeholder="Кол-во игроков"
                                                        name="num_players"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.num_players}/>
                                                </div>
                                                <div className="input-group">
                                                    <button type="submit"
                                                            className="btn btn-success">
                                                        Создать
                                                    </button>

                                                </div>
                                            </form>}/>

                                </div>
                                <br/>
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-1">
                            {games.map((game) =>
                                <div>
                                    <div key={game.id} className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3 className="card-title">
                                                        <Link
                                                            to={`/games/${game.id}`}>Game
                                                            #{game.id}</Link>
                                                    </h3>
                                                    Players: {game.players.map(player => (
                                                    <span
                                                        key={player.name}>{player.name}</span>
                                                ))}

                                                </div>
                                                <div className="col-md-4">
                                                    <button
                                                        onClick={this.join.bind(this, game.id)}
                                                        className="btn btn-danger btn-lg float-right">
                                                        JOIN
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            )}
                        </div>
                        <div className="col-md-4">
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
