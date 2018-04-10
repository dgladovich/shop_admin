// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import { Grid, Cell, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import AddCategoryMutation from './AddCategoryMutation';


export default class AddFeature extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  };


  addCategory = () => {
    AddCategoryMutation.commit(
      this.props.relay.environment,
      inputData[value],
      this.props.viewer.id,
    );
  }

  render() {
    return (
      <Page heading='Add a Category'>
        <Grid>
          <Cell col={3} style={{ textAlign: 'center' }}>
            <Button raised accent onClick={this.addCategory.bind(this)}>Add</Button>
          </Cell>
        </Grid>
      </Page>
    );
  }
}
