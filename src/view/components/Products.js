import BaseComponent, {mapDispatchToProps, mapStateToProps} from "./BaseComponent";
import {connect} from "react-redux";
import React from "react";
import * as datasource from "../../api/datasource";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import BackToTop from "./BackToTop";
import Product from "./Product";
import TablePagination from "@material-ui/core/TablePagination";
import {Table, TableBody, TableFooter, TableRow} from "@material-ui/core";

class Products extends BaseComponent {

    optional = {
        page: 0,
        limit: 8,
    };
    isReached = false;

    onFetchDataBegin(isLoadMore) {
        this.props.beginFetchData(isLoadMore);
    }

    async onFetchData(optional) {
        return await datasource.fetchProducts(optional);
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
            return this.renderWhenError(error);
        }

        if (jsonResult != null) {
            return this.renderWhenSuccess(jsonResult);
        }

        return null;
    }

    shouldLoadMore() {
        if (!this.isReached) {
            const {productReducers} = this.props;
            const {deletedItems, currentPage} = productReducers;
            const {jsonResult} = this.optional;

            if (jsonResult != null) {
                const totalItemActive = jsonResult.length - Object.keys(deletedItems).length;
                if (currentPage * this.optional.limit + this.optional.limit >= totalItemActive) {
                    return true;
                }
            }
        }
        return false;
    }

    loadMore() {
        const that = this;
        this.onFetchData(this.optional)
            .then(
                (jsonResult) => {
                    const preJsonResult = that.optional.jsonResult;
                    that.optional = {
                        ...that.optional,
                        page: that.optional.page + 1,
                    };
                    if (jsonResult.length === 0) {
                        this.isReached = true
                    }
                    this.onFetchDataSuccess([...preJsonResult, ...jsonResult]);
                }
            )
            .catch(
                (error) => this.onFetchDataError(error)
            );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldLoadMore()) {
            this.loadMore()
        }
    }

    renderWhenSuccess(jsonResult) {

        const {classes, productReducers, onChangePage, onChangeItemAPage} = this.props;
        const {deletedItems, currentPage, limitItemPage} = productReducers;

        // save jsonResult
        this.optional = {
            ...this.optional,
            jsonResult: Object.assign(jsonResult),
            limit: limitItemPage
        };

        const {limit} = this.optional;

        const start = currentPage * limit;
        const slice = jsonResult.slice(start, start + limit);

        return <main>
            {/* Hero unit */}
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                        <Grid container spacing={2}>
                            {slice.map(item => <Product classes={classes} key={item.id} data={item}/>)}
                        </Grid>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                labelRowsPerPage={"Items per page:"}
                                rowsPerPageOptions={[4, 8, 16, 24, 32, 64, 128, 256]}
                                onChangeRowsPerPage={(event, choose) => {
                                    this.onFetchDataSuccess([]);
                                    onChangeItemAPage(choose.key);
                                }}
                                count={jsonResult.length - Object.keys(deletedItems).length}
                                rowsPerPage={limit}
                                page={currentPage}
                                onChangePage={(event, page) => {
                                    onChangePage(page);
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Container>

            <BackToTop/>
        </main>;
    }

    renderWhenLoading() {
        //TODO
        return <div style={{height: "10000px"}}/>;
    }

    renderWhenError({message}) {
        //TODO
        return <div style={{height: "10000px"}}>
            {message}
        </div>;
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(Products);