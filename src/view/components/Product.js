import * as React from "react";
import {object} from "prop-types";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import autoBind from "auto-bind";
import * as dataSource from "../../api/datasource";
import {
    actionAddProduct,
    actionDeleteProduct,
    actionTypeProduct,
    actionUpdateQuantity
} from "../../redux/actions/actionProducts";
import {withRouter} from "react-router-dom";
import {actionUpdateCart} from "../../redux/actions/actionCart";
import {Add, AddShoppingCart, Check, Delete, Remove} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {TextField} from "@material-ui/core";

class Product extends React.Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this);
    }

    render() {
        const {noContent} = this.props;
        if (noContent) {
            return this.renderItemEmpty();
        }

        const {classes, data: {id, name, price, imageLink, other}, authenticationReducers, productReducers} = this.props;
        const {session} = authenticationReducers;

        const {deletedItems, quantityItems} = productReducers;
        if (deletedItems[id] === true) {
            return null;
        }

        const currentChoose = quantityItems[id] || 0;

        return <Grid item xs={12} sm={3} md={3}>
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
                        <Grid item xs={12} sm={3} md={3}>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    this.updateQuantity(-1)
                                }}>
                                <Remove/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <TextField color={"secondary"}
                                       onChange={({target}) => {
                                           this.updateQuantity(-currentChoose + parseInt(target.value));
                                       }}
                                       inputProps={{min: 0, style: {textAlign: 'center'}}}
                                       value={currentChoose}/>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    this.updateQuantity(+1)
                                }}>
                                <Add/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            {
                                session?.user?.role === 'IS_ADMIN' ?
                                    <IconButton color="primary"
                                                onClick={this.onDeleteProduct}>
                                        <Delete/>
                                    </IconButton> :
                                    <IconButton
                                        color="primary"
                                        onClick={this.addToCart}
                                    >
                                        <AddShoppingCart/>
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
                const {data: {id}, productReducers} = this.props;
                const {quantityItems} = productReducers;
                let quantity = quantityItems[id] || 0;

                if (quantity === 0) {
                    this.updateQuantity(+1);
                    quantity = 1;
                }

                const list = new Array(quantity);
                for (let i = 0; i < quantity; ++i) {
                    list[i] = data;
                }

                cart.products = [...(cart.products != null ? cart.products : []), ...list];

                dataSource.updateCart(token, cart)
                    .then(ignored => {
                    })
                    .finally(() => {
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

    updateQuantity(number) {
        const {onUpdateQuantity} = this.props;
        const {data: {id}, productReducers} = this.props;
        const {quantityItems} = productReducers;

        quantityItems[id] = Math.min(10000, Math.max(0, (quantityItems[id] || 0) + number));
        onUpdateQuantity(quantityItems)
    }

    renderItemEmpty() {
        const {classes, newProduct} = this.props;

        return [1].map((value, index) =>
            <Grid key={index} item xs={12} sm={3} md={3}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <TextField
                            name="imageLink"
                            helperText={"Link of image"}
                            value={newProduct.imageLink}
                            fullWidth={true}
                            onChange={this.onChangeTextField}
                        />
                        <TextField
                            helperText="Name of product"
                            name="name"
                            value={newProduct.name}
                            onChange={this.onChangeTextField}
                            fullWidth={true}/>
                        <TextField
                            helperText="Price of product"
                            name="price"
                            value={newProduct.price}
                            fullWidth={true}
                            onChange={this.onChangeTextField}/>
                        <TextField
                            helperText="Description of product"
                            name="other"
                            value={newProduct.other}
                            fullWidth={true}
                            onChange={this.onChangeTextField}/>
                        <Grid container justify={"center"}>
                            <Grid item>
                                <IconButton onClick={this.addProductItem}>
                                    <Check/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>);
    }

    addProductItem() {
        //TODO
        const {newProduct, authenticationReducers, actionAddProduct} = this.props;
        const {session} = authenticationReducers;

        if (session == null) {
            this.props.history.push('/login');
        }

        actionAddProduct();
        dataSource.addProduct(session.token, newProduct)
            .then(ignored => {
            });
    }

    onChangeTextField({target}) {
        const {onTypeProduct} = this.props;
        onTypeProduct(target);
    }
}

Product.propTypes = {
    data: object.isRequired
};

const mapStateToProps = state => ({
    ...state,
    newProduct: state.productReducers.newProduct,
});

const mapDispatchToProps = function (dispatch) {
    return {
        ...dispatch,
        onDeleteItem: (e) => dispatch(actionDeleteProduct(e)),
        onUpdateCart: (e) => dispatch(actionUpdateCart(e)),
        onUpdateQuantity: (e) => dispatch(actionUpdateQuantity(e)),
        onTypeProduct: (e) => dispatch(actionTypeProduct(e)),
        actionAddProduct: (e) => dispatch(actionAddProduct(e))
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Product));