import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";

let logger = createLogger({
    timestamps: true,
    duration: true
});

const myStore = createStore(
    rootReducer,
    compose(applyMiddleware(logger, thunk))
);

export default myStore;