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

class Product extends React.Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this);
    }

    render() {
        const {classes, data: {id, name, price, imageLink, other}, authenticationReducers, productReducers} = this.props;
        const {session} = authenticationReducers;
        const {deletedItems} = productReducers;

        if (deletedItems.includes(id)) {
            return null;
        }

        return <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={imageLink}
                    title={name}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3">
                        {price}
                    </Typography>
                    <Typography>
                        {other}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        session?.user?.role === 'IS_ADMIN' ?
                            <Button size="small" color="primary" onClick={this.onDeleteProduct}>Delete</Button> :
                            <Button size="small" color="primary" onClick={this.addToCart}>Add to cart</Button>
                    }
                </CardActions>
            </Card>
        </Grid>
    }

    addToCart() {
        const {data: {id, name, price, imageLink, other}} = this.props;

        console.log(id)
        // TODO
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);