import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AppBar, Slide, Toolbar, useScrollTrigger} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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

class Header extends React.Component {
    render() {
        return (
            <>
                <CssBaseline/>
                <HideOnScroll {...this.props}>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6">Scroll to Hide App Bar</Typography>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar id="back-to-top-anchor"/>
            </>
        );
    }
}

export default Header;