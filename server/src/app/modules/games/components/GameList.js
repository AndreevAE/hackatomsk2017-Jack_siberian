import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class NotFound extends Component {
    render() {
        let games = [
            {
                id: 1,
                freeCards: [],
                players: []
            },
            {
                id: 2,
                freeCards: [],
                players: []
            }
        ];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        {games.map((game) =>
                            <div>
                                <br/>
                                <div key={game.id} className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            <Link to={`/games/${game.id}`}>Game#{game.id}</Link>
                                        </h3>
                                        Players: ...
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
