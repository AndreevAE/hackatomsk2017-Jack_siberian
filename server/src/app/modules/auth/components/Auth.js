import React, {Component} from "react";
import {Formik} from "formik";


export default class App extends Component {
    render() {
        const {history} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="card auth-form">
                            <div className="card-body">
                                <h3 className="card-title">Привет, бро!</h3>

                                <Formik
                                    initialValues={{
                                        username: ''
                                    }}
                                    onSubmit={(values, {setSubmitting, setValues}) => {
                                        alert(`Привет, ${values.username}! Ты крут!`);
                                        history.push('/games');
                                    }}
                                    render={({values, errors, touched, handleChange, handleSubmit, isSubmitting}) =>

                                        <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        placeholder="Твой ник"
                                                        name="username"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.username}/>
                                                </div>
                                                <button type="submit"
                                                        className="btn btn-lg btn-success btn-block">
                                                Начать играть</button>
                                        </form>}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
