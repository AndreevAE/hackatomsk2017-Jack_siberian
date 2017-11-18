import reducers from "./reducers";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";


export default function configureStore(initialState = {}) {
    let middleware = [thunk];

    return createStore(
        reducers,
        initialState,
        applyMiddleware(...middleware)
    )
}
