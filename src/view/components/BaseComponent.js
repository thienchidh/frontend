import * as React from "react";
import autoBind from "auto-bind";
import {actionBeginFetchData, actionErrorFetchData, actionSuccessFetchData} from "../../redux/actions/actionFetchData";

class BaseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        autoBind(this);
    }

    componentDidMount() {
        this.onFetchDataBegin();
        this.onFetchData({})
            .then(
                (jsonResult) => this.onFetchDataSuccess(jsonResult)
            )
            .catch(
                (error) => this.onFetchDataError(error)
            );
    }

    onFetchDataBegin() {
        throw new Error("not implemented!");
    }

    async onFetchData(optional) {
        throw new Error("not implemented!");
    }

    onFetchDataSuccess(jsonResult) {
        throw new Error("not implemented!");
    }

    onFetchDataError(error) {
        throw new Error("not implemented!");
    }
}

export const mapStateToProps = state => ({
    ...state
});

export const mapDispatchToProps = dispatch => ({
    ...dispatch,
    beginFetchData: () => dispatch(actionBeginFetchData()),
    successFetchData: (e) => dispatch(actionSuccessFetchData(e)),
    errorFetchData: (e) => dispatch(actionErrorFetchData(e)),
});

export default BaseComponent;