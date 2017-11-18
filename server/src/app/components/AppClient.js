import React, {PureComponent} from "react";
import {BrowserRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {Provider} from "react-redux";

import routes from "../routes";


export default class AppClient extends PureComponent {
    render() {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter>
                    {renderRoutes(routes)}
                </BrowserRouter>
            </Provider>
        )
    }
}
