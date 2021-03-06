// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import {Grid, Cell, Button, Textfield} from 'react-mdl';
import Page from '../Page/PageComponent';
import AddCategoryMutation from './AddCategoryMutation';


export default class AddFeature extends React.Component {
    constructor() {
        super();
        this.state = {
            categoryTitle: '',
            categoryViewTitle: '',
            categoryDescription: ''
        }
    }

    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired
    };


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

    render() {
        return (
            <Page heading='Add a Category'>
                <Grid>
                    <Cell col={6}>
                        <Textfield
                            onChange={this.onChangeTitleInput.bind(this)}
                            label="Title"
                        />
                    </Cell>
                    <Cell col={6}>
                        <Textfield
                            onChange={this.onChangeViewTitleInput.bind(this)}
                            label="View title"
                        />
                    </Cell>
                    <Cell col={12}>
                        <Textfield
                            onChange={this.onChangeDescriptionTextArea.bind(this)}
                            label="Description"
                            rows={3}
                        />
                    </Cell>
                </Grid>
                <Grid>
                    <Cell col={3} style={{textAlign: 'center'}}>
                        <Button raised accent onClick={this.addCategory.bind(this)}>Add</Button>
                    </Cell>
                </Grid>
                <Grid>
                    <h2>Category list</h2>
                    <Cell col={12}>
                        {this.props.viewer.categories.edges.map(category => {
                            return <Cell key={category.node.id} col={3}>
                                <h4>{category.node.view_title}</h4>
                                <span><b>Description: </b></span><span>{category.node.description}</span>
                            </Cell>
                        })}
                    </Cell>
                </Grid>
            </Page>
        );
    }
}
