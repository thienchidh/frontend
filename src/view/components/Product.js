import * as React from "react";
import {object} from "prop-types";
import {connect} from "react-redux";
import {mapStateToProps} from "./BaseComponent";


class Product extends React.Component {

    render() {
        const {data: {name, price, image_link, other}} = this.props;

        //TODO
        return <div> {name} </div>
    }
}

Product.propTypes = {
    product: object.isRequired
};

export default connect(mapStateToProps)(Product);