// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Button, Textfield, ListItem, ListItemContent, ListItemAction, Icon} from 'react-mdl';


export default class AddFeature extends React.Component {

    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired
    };


    render() {
        return (
            <ListItem threeLine>
                <ListItemContent avatar="person" subtitle={this.props.description}>{this.props.title}</ListItemContent>
                <ListItemAction>
                    <a href="#"><Icon name="star" /></a>
                </ListItemAction>
            </ListItem>
        );
    }
}
