import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AppBar, Slide, Toolbar, useScrollTrigger} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "./BaseComponent";

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
    const {classes: {appBar, link, toolbar, toolbarTitle}} = props;
    return <>
        <CssBaseline/>
        <HideOnScroll>
            <AppBar color="default" elevation={0} className={appBar}>
                <Toolbar className={toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={toolbarTitle}>
                        Company name
                    </Typography>
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
                    <Button href="#" color="primary" variant="outlined" className={link}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
        <Toolbar id="back-to-top-anchor"/>
    </>;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);