// @flow
import React from 'react';
import PropTypes from 'prop-types';
import DeleteCategoryMutation from './DeleteCategoryMutation'
import {Grid, Cell, Button, IconButton, Textfield, ListItem, ListItemContent, ListItemAction, Icon} from 'react-mdl';


export default class AddFeature extends React.Component {

    editCategory = ()=>{};
    deleteCategory = ()=>{
        DeleteCategoryMutation.commit();
    };

    render() {
        return (
            <ListItem threeLine>
                <ListItemContent subtitle={this.props.description}>{this.props.title}</ListItemContent>
                <ListItemAction>
                    <IconButton onClick={this.deleteCategory.bind(this)} name="delete_outline" />
                    <IconButton onClick={this.editCategory.bind(this)} name="build" />
                </ListItemAction>
            </ListItem>
        );
    }
}
