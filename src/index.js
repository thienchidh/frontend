import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootReducers from "./redux/reducers/reducers";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = createStore(rootReducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
