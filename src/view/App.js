import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Products from "./components/Products";
import {connect} from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@material-ui/core/Container";
import BackToTop from "./components/BackToTop";
import HomePage from "./components/HomePage";

class App extends React.Component {

    render() {
        return <HomePage/>;
        return (
            <React.Fragment>
                <Header/>
                {this.renderBody()}
                <Footer/>
            </React.Fragment>
        );
    }

    renderBody() {
        return (
            <>
                <Container>
                    <Switch>
                        <Route path={"/"}>
                            <Products/>
                        </Route>
                        <Route exact path={"/admin"}>
                            <HomePage/>
                        </Route>
                    </Switch>
                </Container>
                <BackToTop/>
            </>
        )
    }
}

export default connect()(App);