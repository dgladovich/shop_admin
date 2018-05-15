// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {ListItemContent, ListItemAction, ListItem, Icon} from 'react-mdl';

export default class UserComponent extends React.Component {

    render() {
        return (
            <ListItem threeLine>
                <ListItemContent avatar="person" subtitle={this.props.node.email}>{this.props.node.name}</ListItemContent>
            </ListItem>
        );
    }
}
