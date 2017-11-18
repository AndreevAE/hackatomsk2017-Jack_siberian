import React, {Component} from "react";
import openSocket from "socket.io-client";


class App extends Component {
    constructor(props) {
        super(props);
        const socket = openSocket('http://localhost:3000');
        this.state = {socket};
    }

    componentDidMount() {
        const socket = this.state.socket;

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });

        socket.emit('games', {action: 'create'});

        socket.on('player', function (data) {
            console.log('games', data);
        });
    }

    componentWillUnmount() {
        const socket = this.state.socket;
        socket.disconnect();
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src="" className="App-logo" alt="logo"/>
                    <h1 className="App-title">TEST1</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        );
    }
}

export default App;
