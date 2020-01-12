import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Products from "../components/Products";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../components/BaseComponent";
import Container from "@material-ui/core/Container";
import {Route, Switch} from "react-router-dom";
import BackToTop from "../components/BackToTop";

function MainPage(props) {
    const {classes} = props;

    return <React.Fragment>
        <Header classes={classes}/>
        {renderBody(props)}
        <Footer classes={classes}/>
    </React.Fragment>;
}

function renderBody(props) {

    const {classes} = props;

    return <>
        <Container>
            <Switch>
                <Route path={"/"}>
                    <Products classes={classes}/>
                </Route>
                <Route exact path={"/admin"}>
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