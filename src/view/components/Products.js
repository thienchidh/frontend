import BaseComponent, {mapDispatchToProps, mapStateToProps} from "./BaseComponent";
import {connect} from "react-redux";
import React from "react";
import * as datasource from "../../api/datasource";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import BackToTop from "./BackToTop";
import Product from "./Product";
import {VirtuosoGrid} from "react-virtuoso";
import TablePagination from "@material-ui/core/TablePagination";
import {Table, TableBody, TableFooter, TableRow} from "@material-ui/core";

class Products extends BaseComponent {
    page = 0;

    onFetchDataBegin() {
        this.props.beginFetchData();
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

    renderWhenSuccess(jsonResult) {
        const {classes} = this.props;
        const itemsCount = jsonResult.length + 1;

        let grid = <VirtuosoGrid
            item={(index) => {
                if (index < itemsCount) {
                    const item = jsonResult[index];
                    return <Product classes={classes} key={item.id} data={item}/>;
                } else {
                    // render loadMore item
                    return null;
                }
            }}
            totalCount={itemsCount}
        />;

        return <main>
            {/* Hero unit */}
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                        <Grid container spacing={2}>
                            {jsonResult.map(item => <Product classes={classes} key={item.id} data={item}/>)}
                        </Grid>
                        {/*{(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}*/}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[1, 2, 3, 4, {
                                    label: 'All',
                                    value: jsonResult.length / 4 + ((jsonResult.length % 4) !== 0)
                                }]}
                                colSpan={3}
                                count={jsonResult.length}
                                // rowsPerPage={rowsPerPage}
                                page={this.page}
                                // SelectProps={{
                                //     inputProps: {'aria-label': 'rows per page'},
                                //     native: true,
                                //}}
                                // onChangePage={handleChangePage}
                                // onChangeRowsPerPage={handleChangeRowsPerPage}
                                // ActionsComponent={TablePaginationActions}
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
        return <div style={{height: "1000px"}}/>;
    }

    renderWhenError({message}) {
        //TODO
        return <div style={{height: "1000px"}}>
            {message}
        </div>;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(Products);