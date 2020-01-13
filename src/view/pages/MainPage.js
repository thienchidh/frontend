import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Products from "../components/Products";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../components/BaseComponent";
import Container from "@material-ui/core/Container";
import {Route, Switch} from "react-router-dom";
import BackToTop from "../components/BackToTop";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import SignUpPage from "./SignUpPage";
import ForgotPassword from "./ForgotPassword";
import Checkout from "./Checkout";
import Dashboard from "./DashBoard";

function MainPage(props) {
    const {classes} = props;
    return <Switch>
        <Route exact path={"/dashboard"}>
            <Dashboard classes={classes}/>
        </Route>
        <Route>
            <React.Fragment>
                <Header classes={classes}/>
                {renderBody(props)}
                <Footer classes={classes}/>
            </React.Fragment>
        </Route>
    </Switch>;
}

function renderBody(props) {

    const {classes} = props;

    return <>
        <Container>
            <Switch>
                <Route exact path={"/login"}>
                    <LoginPage classes={classes}/>
                </Route>
                <Route exact path={"/admin"}>
                    <AdminPage classes={classes}/>
                </Route>
                <Route exact path={"/sign-up"}>
                    <SignUpPage classes={classes}/>
                </Route>
                <Route exact path={"/forgot-password"}>
                    <ForgotPassword classes={classes}/>
                </Route>
                <Route exact path={"/checkout"}>
                    <Checkout classes={classes}/>
                </Route>
                <Route path={"/"}>
                    <Products classes={classes}/>
                </Route>
            </Switch>
        </Container>
        <BackToTop/>
    </>
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);