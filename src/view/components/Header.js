import * as React from "react";
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CssBaseline from "@material-ui/core/CssBaseline";
import {AppBar, Slide, Toolbar, useScrollTrigger} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {mapStateToProps} from "./BaseComponent";
import * as dataSource from "../../api/datasource";
import {withRouter} from "react-router-dom";
import {actionChangeSession} from "../../redux/actions/actionSignIn";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import {actionOpenCart, actionUpdateCart} from "../../redux/actions/actionCart";
import Cart from "../pages/Cart";

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

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {cartReducers, authenticationReducers, onUpdateCart} = this.props;
        const {session} = authenticationReducers;
        const {cart} = cartReducers;

        if (session != null && cart == null) {
            dataSource.fetchCart(session.token)
                .then((cart) => {
                    onUpdateCart(cart);
                    }
                );
        }
    }

    render() {
        const {classes: {appBar, link, toolbar, toolbarTitle}, onSuccessLogout, authenticationReducers, onOpenCart} = this.props;
        const {session} = authenticationReducers;
        const {cartReducers} = this.props;
        const {cart} = cartReducers;

        const logout = e => {
            e.preventDefault();
            dataSource.logout(session.token).then(ignored => {
                onSuccessLogout();
                this.props.history.push('/');
            });
        };

        const isHaveSession = (session?.token != null);

        return <>
            <CssBaseline/>
            <HideOnScroll>
                <AppBar color="default" elevation={0} className={appBar}>
                    <Toolbar className={toolbar}>
                        <Link underline={"none"} href={"/"} variant="h6" color="inherit" noWrap
                              className={toolbarTitle}>
                            Company name
                        </Link>
                        <nav>
                            <Link variant="button" color="textPrimary" href="#" className={link}>
                                Features
                            </Link>
                            <Link variant="button" color="textPrimary" href="#" className={link}>
                                Enterprise
                            </Link>
                            <Link variant="button" color="textPrimary" href="#"
                                  className={link}> Support </Link>
                            {isHaveSession ?
                                <>
                                    <IconButton
                                        onClick={onOpenCart}
                                        color="inherit">
                                        <Badge badgeContent={cart?.products?.length} color="secondary">
                                            <ShoppingCart/>
                                        </Badge>
                                    </IconButton>
                                    <Cart/>
                                </>
                                : null}
                            {isHaveSession ?
                                <IconButton
                                    className={link}
                                    color={"secondary"}
                                    onClick={logout}
                                >
                                    <ExitToAppIcon
                                        variant="contained"
                                    />
                                </IconButton>
                                :
                                <Button href={"/login"}
                                        color={"primary"} variant="contained"
                                        className={link}>{"login"}</Button>}
                        </nav>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar id="back-to-top-anchor"/>
        </>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...dispatch,
        onSuccessLogout: () => dispatch(actionChangeSession(null)),
        onUpdateCart: (e) => dispatch(actionUpdateCart(e)),
        onOpenCart: (e) => dispatch(actionOpenCart(e)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));