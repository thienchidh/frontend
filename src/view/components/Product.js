import * as React from "react";
import {object} from "prop-types";
import {connect} from "react-redux";
import {mapStateToProps} from "./BaseComponent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import autoBind from "auto-bind";
import * as dataSource from "../../api/datasource";
import {actionDeleteProduct} from "../../redux/actions/actionProducts";
import {withRouter} from "react-router-dom";
import {actionUpdateCart} from "../../redux/actions/actionCart";
import {Add, AddShoppingCart, Remove} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {TextField} from "@material-ui/core";

class Product extends React.Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this);
    }

    render() {
        const {classes, data: {id, name, price, imageLink, other}, authenticationReducers, productReducers} = this.props;
        const {session} = authenticationReducers;
        const {deletedItems} = productReducers;

        if (deletedItems[id] === true) {
            return null;
        }

        const currentChoose = 1;

        return <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={imageLink}
                    title={name}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant={"h6"} gutterBottom className={classes.title}> {name} </Typography>
                    <Typography className={classes.price}> {price}{'₫'} </Typography>
                    <Typography className={classes.description}> {other} </Typography>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={3}>
                            <IconButton color="primary">
                                <Add/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField inputProps={{min: 0, style: {textAlign: 'center'}}}
                                       value={currentChoose}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <IconButton color="primary">
                                <Remove/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            {
                                session?.user?.role === 'IS_ADMIN' ?
                                    <Button size="small" color="primary"
                                            onClick={this.onDeleteProduct}>Delete</Button> :
                                    <IconButton color="primary">
                                        <AddShoppingCart onClick={this.addToCart}/>
                                    </IconButton>
                            }
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>;
    }

    addToCart() {
        const {data, authenticationReducers, cartReducers, onUpdateCart} = this.props;
        const {session} = authenticationReducers;
        const {cart} = cartReducers;

        if (session != null) {
            const {token} = session;
            if (token != null) {
                cart.products = [...(cart.products != null ? cart.products : []), data];

                dataSource.updateCart(token, cart).then(() => {

                }).finally(() => {
                    onUpdateCart(cart)
                });
            }
        } else {
            this.props.history.push("/login");
        }
    }

    onDeleteProduct() {
        const {onDeleteItem, data: {id}, authenticationReducers} = this.props;
        const {session} = authenticationReducers;

        dataSource.deleteProductById({token: session.token, id: id})
            .then(() => {
                    onDeleteItem(id)
                }
            ).catch(ignored => {
        });
    }
}

Product.propTypes = {
    data: object.isRequired
};


const mapDispatchToProps = function (dispatch) {
    return {
        ...dispatch,
        onDeleteItem: (e) => dispatch(actionDeleteProduct(e)),
        onUpdateCart: (e) => dispatch(actionUpdateCart(e)),
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Product));