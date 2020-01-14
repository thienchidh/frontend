import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AppBar, Slide, Toolbar, useScrollTrigger} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {mapStateToProps} from "./BaseComponent";
import * as dataSource from "../../api/datasource";
import {withRouter} from "react-router-dom";
import {actionChangeSession} from "../../redux/actions/actionSignIn";

function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Header(props) {
    const {classes: {appBar, link, toolbar, toolbarTitle}, onSuccessLogout, authenticationReducers} = props;
    const {session} = authenticationReducers;

    function logout(e) {
        e.preventDefault();

        dataSource.logout(session.token).then(ignored => {
            onSuccessLogout();
            props.history.push('/');
        });
    }

    const isHaveSession = (session?.token != null);

    return <>
        <CssBaseline/>
        <HideOnScroll>
            <AppBar color="default" elevation={0} className={appBar}>
                <Toolbar className={toolbar}>
                    <Link underline={"none"} href={"/"} variant="h6" color="inherit" noWrap className={toolbarTitle}>
                        Company name
                    </Link>
                    <nav>
                        <Link variant="button" color="textPrimary" href="#" className={link}>
                            Features
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={link}>
                            Enterprise
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={link}>
                            Support
                        </Link>
                    </nav>
                    <Button href={`/${isHaveSession ? "logout" : "login"}`}
                            color={isHaveSession ? "secondary" : "primary"} variant="contained"
                            className={link}
                            onClick={isHaveSession ? logout : null}
                    >
                        {isHaveSession ? `logout(${session.user.lastName})` : "login"}
                    </Button>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
        <Toolbar id="back-to-top-anchor"/>
    </>;
}

function mapDispatchToProps(dispatch) {
    return {
        ...dispatch,
        onSuccessLogout: () => dispatch(actionChangeSession(null)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));