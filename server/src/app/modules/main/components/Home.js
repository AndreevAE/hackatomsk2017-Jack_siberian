import React, {Component} from "react";
import openSocket from "socket.io-client";


class App extends Component {
    componentDidMount() {
        const socket = openSocket('http://localhost:3000');
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
          });

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
