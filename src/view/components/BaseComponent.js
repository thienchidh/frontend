import * as React from "react";
import autoBind from "auto-bind";
import {actionBeginFetchData, actionErrorFetchData, actionSuccessFetchData} from "../../redux/actions/actionFetchData";
import {actionChangeItemPage, actionChangePage} from "../../redux/actions/actionProducts";

class BaseComponent extends React.Component {
    optional = {page: 0, limit: 30};

    constructor(props, context) {
        super(props, context);
        autoBind(this);
    }

    componentDidMount() {
        this.onFetchDataBegin();
        this.onFetchData(this.optional)
            .then(
                (jsonResult) => this.onFetchDataSuccess(jsonResult)
            )
            .catch(
                (error) => this.onFetchDataError(error)
            );
    }

    onFetchDataBegin(isLoadMore) {
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
    beginFetchData: (e) => dispatch(actionBeginFetchData(e)),
    successFetchData: (e) => dispatch(actionSuccessFetchData(e)),
    errorFetchData: (e) => dispatch(actionErrorFetchData(e)),
    onChangePage: page => dispatch(actionChangePage(page)), // for Load more
    onChangeItemAPage: e => dispatch(actionChangeItemPage(e)), // for Load more
});

export default BaseComponent;