import React, {Component} from "react";



class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Login via site</h3>
                            </div>
                            <div className="panel-body">
                                <form role="form">
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control"
                                                   placeholder="yourmail@example.com"
                                                   name="email" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control"
                                                   placeholder="Password"
                                                   name="password"
                                                   type="password" value=""/>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember"
                                                       type="checkbox"
                                                       value="Remember Me"/>
                                                Remember Me
                                            </label>
                                        </div>
                                        <input
                                            className="btn btn-lg btn-success btn-block"
                                            type="submit" value="Login"/>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
