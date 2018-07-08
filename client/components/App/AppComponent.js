// @flow
import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import Navbar from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterContainer';
//import styles from './App.scss';
import classNames from 'classnames';

import {Link} from 'react-router';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CollectionsIcon from '@material-ui/icons/Collections';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import MessageIcon from '@material-ui/icons/Message';
import VisitsIcon from '@material-ui/icons/Visibility';
import PeopleIcon from '@material-ui/icons/People';
import FilterIcon from '@material-ui/icons/Label';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    //height: 1000,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired
  };
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  /*  render() {
      return (
        <div className={styles.root}>

          <div className={styles.greeting}/>
          <div className={styles.content}>
            {this.props.children}
          </div>
          <Footer viewer={this.props.viewer} />
        </div>
      );
    }*/

  render() {
    const {classes, theme} = this.props;

    return (
      <div className={classes.root}>
        <Navbar/>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            <Link to='/'>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
              </ListItem>
            </Link>

            <Link to='/products'>
              <ListItem button>
                <ListItemIcon>
                  <CollectionsIcon/>
                </ListItemIcon>
                <ListItemText primary="Commodities"/>
              </ListItem>
            </Link>

            <Link to='/categories'>
              <ListItem button>
                <ListItemIcon>
                  <BookmarkIcon/>
                </ListItemIcon>
                <ListItemText primary="Categories"/>
              </ListItem>
            </Link>

            <Link to='/orders'>
              <ListItem button>
                <ListItemIcon>
                  <MoneyIcon/>
                </ListItemIcon>
                <ListItemText primary="Orders"/>
              </ListItem>
            </Link>

            <Link to='/users'>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
              </ListItem>
            </Link>


            <Link to='/visits'>
              <ListItem button>
                <ListItemIcon>
                  <VisitsIcon/>
                </ListItemIcon>
                <ListItemText primary="Visits"/>
              </ListItem>
            </Link>

            <Link to='/comments'>
              <ListItem button>
                <ListItemIcon>
                  <MessageIcon/>
                </ListItemIcon>
                <ListItemText primary="Comments"/>
              </ListItem>
            </Link>

            <Link to='/filters'>
              <ListItem button>
                <ListItemIcon>
                  <FilterIcon/>
                </ListItemIcon>
                <ListItemText primary="Filters"/>
              </ListItem>
            </Link>
            <Link to='/options'>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon/>
                </ListItemIcon>
                <ListItemText primary="Options"/>
              </ListItem>
            </Link>

            <Divider/>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);
