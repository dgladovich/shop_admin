// @flow
import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import Navbar from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterContainer';
import styles from './App.scss';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.greeting}/>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer viewer={this.props.viewer} />
      </div>
    );
  }
}
