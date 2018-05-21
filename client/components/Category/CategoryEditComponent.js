// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import {Grid, Cell, Button, Textfield} from 'react-mdl';
import Page from '../Page/PageComponent';
import AddCategoryMutation from './AddCategoryMutation';
import CategorySelectComponent from './CategorySelectComponent';
import styles from './styles/CategoryForm.scss';

export default class AddFeature extends React.Component {
    constructor() {
        super();
        this.state = {
            categoryTitle: '',
            categoryViewTitle: '',
            categoryDescription: ''
        }
    }

/*    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired
    };*/


    addCategory = () => {
        let category = {
            title: this.state.categoryTitle,
            view_title: this.state.categoryViewTitle,
            description: this.state.categoryDescription,
        }
        AddCategoryMutation.commit(
            this.props.relay.environment,
            category,
            this.props.viewer.id,
        );
    }

    onChangeTitleInput(e) {
        let title = e.target.value;

        this.setState({
            categoryTitle: title
        });
    }

    onChangeViewTitleInput(e) {
        let viewTitle = e.target.value;

        this.setState({
            categoryViewTitle: viewTitle
        });
    }

    onChangeDescriptionTextArea(e) {
        let description = e.target.value;

        this.setState({
            categoryDescription: description
        });
    }

    onChangeCategory(e){
    }
    render() {
        console.log('this party rock')
        return (
            <Grid>
                <Cell col={12}>
                    <h4>Create category</h4>
                </Cell>
                <Textfield
                    onChange={this.onChangeTitleInput.bind(this)}
                    label="Title"
                />
                <Textfield
                    onChange={this.onChangeViewTitleInput.bind(this)}
                    label="View title"
                />
                <Textfield
                    onChange={this.onChangeDescriptionTextArea.bind(this)}
                    label="Description"
                    rows={3}
                />
                <CategorySelectComponent onChange={this.onChangeCategory.bind(this)}/>
                <Button raised accent onClick={this.addCategory.bind(this)}>Add</Button>
            </Grid>
        );
    }
}
