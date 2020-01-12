import * as React from "react";
import {object} from "prop-types";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "./BaseComponent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class Product extends React.Component {
    render() {
        const {classes, data: {name, price, imageLink, other}} = this.props;

        return <Grid item xs={12} sm={6} md={4}>
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
                    <Button size="small" color="primary">
                        View
                    </Button>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    }
}

Product.propTypes = {
    data: object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);