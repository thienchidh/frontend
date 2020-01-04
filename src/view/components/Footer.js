import BaseComponent, {mapDispatchToProps, mapStateToProps} from "./BaseComponent";
import * as React from "react";
import {connect} from "react-redux";

class Footer extends BaseComponent {

    onFetchDataBegin() {

    }

    async onFetchData(optional) {

    }

    onFetchDataSuccess(jsonResult) {
    }

    onFetchDataError(error) {

    }

    render() {
        return (
            <div>
                this is footer
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);