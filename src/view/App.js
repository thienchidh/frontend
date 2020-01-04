import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Products from "./components/Products";
import {connect} from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends React.Component {

    render() {
        return (
            <>
                <Header/>
                {this.renderBody()}
                <Footer/>
            </>
        );
    }

    renderBody() {
        return (
            <Switch>
                <Route path={"/"}>
                    <Products/>
                </Route>
                <Route exact path={"/admin"}>
                    this is admin component
                </Route>
            </Switch>
        )
    }
}

export default connect()(App);