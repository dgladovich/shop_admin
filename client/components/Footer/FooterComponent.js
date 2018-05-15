// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Footer as MDLFooter, FooterSection } from 'react-mdl';
import styles from './Footer.scss';

export default class Footer extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };

  render() {
    return (
      <MDLFooter className={styles.root} size='mini'>
        <FooterSection type='middle'>
          <span>Admin panel for shop</span>
        </FooterSection>
      </MDLFooter>
    );
  }
}
