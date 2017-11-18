import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./app/store";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "./app/index.css";

// Other imports
import $ from "jquery";
import AppClient from "./app/components/AppClient";
window.Popper = require('popper.js');
window.jQuery = window.$ = $;
require('bootstrap');
require('jquery.cookie');
$.cookie.json = true;


const store = configureStore();

ReactDOM.render(
    <AppClient store={store}/>,
    document.getElementById('root')
);
