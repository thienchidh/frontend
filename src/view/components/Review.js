import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "./BaseComponent";

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    {name: 'Card type', detail: 'Visa'},
    {name: 'Card holder', detail: 'Mr John Smith'},
    {name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
    {name: 'Expiry date', detail: '04/2024'},
];

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

function Review(props) {

    const classes = useStyles();
    const {cartReducers, authenticationReducers, onUpdateCart} = props;
    const {cart} = cartReducers;
    const products = cart.products || [];

    function computeTotalPrice() {
        let total = 0;
        products.forEach(value => {
            total += value.price
        });
        return total;
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product, index) => (
                    <ListItem className={classes.listItem} key={index}>
                        <ListItemText primary={product.name} secondary={product.other}/>
                        <Typography variant="body2">{product.price + '₫'}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        {computeTotalPrice()}{'₫'}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map(payment => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Review);
