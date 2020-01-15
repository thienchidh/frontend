import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {actionCloseCart, actionUpdateCart} from "../../redux/actions/actionCart";
import {ListItemAvatar, ListItemSecondaryAction} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {Check} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import * as dataSource from "../../api/datasource";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

class Cart extends React.Component {
    render() {
        const {onCloseCart, isOpen, cartReducers} = this.props;
        const {authenticationReducers} = this.props;
        const {session} = authenticationReducers;
        const {cart} = cartReducers;
        if (session == null || cart == null) {
            return null;
        }

        const products = cart.products || [];

        return (
            <Dialog fullWidth={true}
                    scroll={"body"} open={isOpen} onClose={onCloseCart}
                    TransitionComponent={Transition}>
                <List>
                    {products.map(
                        (value, index, array) => {
                            return <div key={index}>
                                {this.renderProductMini(value)}
                                <Divider/>
                            </div>;
                        }
                    )}
                    <ListItem>
                        <Grid container justify={"flex-start"}>
                            <Grid item>
                                <Typography variant={"h6"}>
                                    {'Total: '}{this.computeTotalPrice()}{'₫'}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify={"flex-end"}>
                            <Grid item>
                                <Button href={"/checkout"}
                                        color={"primary"}
                                        variant="contained">
                                    {"checkout"}
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Dialog>
        );
    }

    computeTotalPrice() {
        const {cartReducers} = this.props;
        const {cart} = cartReducers;

        let total = 0;
        const products = cart.products || [];
        products.forEach(value => {
            total += value.price
        });
        return total;
    }

    updateCart(product) {
        const {cartReducers, authenticationReducers, onUpdateCart} = this.props;
        const {session} = authenticationReducers;
        const {cart} = cartReducers;

        const idx = cart.products.indexOf(product);
        if (~idx) {
            cart.products.splice(idx, 1);

            dataSource.updateCart(session.token, cart)
                .then(ignored => {
                })
                .finally(() => {
                    onUpdateCart(cart)
                });
        }
    }

    renderProductMini(product) {
        return (
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <Check/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={product.name} secondary={product.price + '₫'}/>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => this.updateCart(product)}
                    >
                        <Delete/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        isOpen: state.cartReducers.isOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...dispatch,
        onCloseCart: (e) => dispatch(actionCloseCart(e)),
        onUpdateCart: (e) => dispatch(actionUpdateCart(e))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart));