import BaseComponent, {mapDispatchToProps, mapStateToProps} from "./BaseComponent";
import {connect} from "react-redux";
import React from "react";
import * as datasource from "../../api/datasource";
import Product from "./Product";

class Products extends BaseComponent {
    onFetchDataBegin() {
        this.props.beginFetchData();
    }

    async onFetchData(optional) {
        return await datasource.fetchProducts({});
    }

    onFetchDataSuccess(jsonResult) {
        this.props.successFetchData(jsonResult);
    }

    onFetchDataError(error) {
        this.props.errorFetchData(error);
    }

    render() {
        const {fetchDataReducers} = this.props;
        const {error, isLoading, jsonResult} = fetchDataReducers;
        if (isLoading) {
            return this.renderWhenLoading();
        }
        if (error != null) {
            return this.renderWhenError();
        }

        if (jsonResult != null) {
            return this.renderWhenSuccess(jsonResult);
        }

        return null;
    }

    renderWhenSuccess(jsonResult) {
        return jsonResult.map((data, index) => {
            return <Product key={index} data={data}/>
        });
    }

    renderWhenLoading() {
        //TODO
        return <div style={{height: "1000px"}}/>;
    }

    renderWhenError() {
        //TODO
        return null;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(Products);