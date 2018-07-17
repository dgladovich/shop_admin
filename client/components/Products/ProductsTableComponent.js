import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import FilterListIcon from '@material-ui/icons/FilterList';

import Toolbar from '@material-ui/core/Toolbar';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import SettingIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import ProductCardContainer from "./ProductCardContainer";
import PaginationComponent from './PaginationComponent';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const {numSelected, classes, editorRoute} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        Commodities
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Create">
                    <IconButton aria-label="Create" onClick={editorRoute}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Refresh">
                    <IconButton aria-label="Refresh">
                        <RefreshIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});


class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const {classes, count, page, rowsPerPage, theme} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
    TablePaginationActions,
);

let counter = 0;

function createData(name, calories, fat) {
    counter += 1;
    return {id: counter, name, calories, fat};
}

const styles = theme => ({
    root: {
        background: 'none',
        boxShadow: 'none'
    }
    /*  table: {
        minWidth: 500,
      },
      tableWrapper: {
        overflowX: 'auto',
      },*/
});

class CustomPaginationActionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            data: [
                createData('Cupcake', 305, 3.7),
                createData('Donut', 452, 25.0),
                createData('Eclair', 262, 16.0),
                createData('Frozen yoghurt', 159, 6.0),
                createData('Gingerbread', 356, 16.0),
                createData('Honeycomb', 408, 3.2),
                createData('Ice cream sandwich', 237, 9.0),
                createData('Jelly Bean', 375, 0.0),
                createData('KitKat', 518, 26.0),
                createData('Lollipop', 392, 0.2),
                createData('Marshmallow', 318, 0),
                createData('Nougat', 360, 19.0),
                createData('Oreo', 437, 18.0),
            ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
        };
    }
    componentWillReceiveProps(newProps, props){
        console.log(newProps, props)
    }

    routeToCreate() {
        this.props.router.push('/products/create')
    }

    routeToEditor(productId) {
        this.props.router.push(`/products/${productId}`)
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    loadMore() {
        const lastItem = this.props.viewer.products.pageInfo.endCursor;
        const refetchVariables = {
            count: 20,
            cursor: lastItem
        };
        this.props.relay.refetch((prevVars) => {
            console.log(prevVars)
               return  refetchVariables
            }
        );
    }

    render() {
        const {classes} = this.props;
        console.log(this.props)

        const {data, rowsPerPage, page, selected} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} editorRoute={this.routeToCreate.bind(this)}/>
                <Grid container spacing={8}>
                    {
                        this.props.viewer.products.edges.map((edge) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={edge.node.__dataID__}>
                                    <ProductCardContainer loadMore={this.loadMore.bind(this)}
                                                          editRoute={this.routeToEditor.bind(this)}
                                                          product={edge.node}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
