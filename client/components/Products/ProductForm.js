// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Button, Textfield, FABButton, Icon} from 'react-mdl';
import {MDLSelectField} from 'react-mdl-select';
import AddProductMutation from './AddProductMutation';
import CategoriesSelect from './CategoriesSelect';
import styles from './style/ProductForm.scss';
import axios from 'axios';


export default class AddProduct extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };
    state: {
        name: '',
        price: 0,
    };

    addProduct = (e) => {
        let file = document.getElementById('file').files[0];
        let fd = new FormData();
        fd.append('file', file);
        axios.post('http://localhost:8000/upload', fd)
            .then()
            .catch();
        console.log(fd)
        //fd.append;
        /*        let value = Object.assign(this.state, {
                    created_at: '2018-02-12',
                    updated_at: '2018-02-12',
                });
                AddProductMutation.commit(
                    this.props.relay.environment,
                    value,
                    this.props.viewer.id,
                );*/
    };
    onInputChange = (e) => {
        document.getElementById('form-preview').src = e.target.value;
    };
    onSelectChange = (e)=>{

    }
    chooseFile = () => {
        document.getElementById('file').click();
    };

    render() {
        return (
            <Cell col={12}>
                <Textfield
                    onChange={(e) => {
                        this.setState({name: e.target.value});
                    }}
                    floatingLabel
                    label="Product name..."
                />
                <Textfield
                    onChange={(e) => {
                        this.setState({price: +e.target.value})
                    }}
                    floatingLabel
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input is not a number!"
                    label="Price..."
                />
                <CategoriesSelect onChange={this.onSelectChange.bind(this)} relay={this.props.relay} viewer={this.props.viewer}/>
                <Textfield
                    onChange={() => {
                    }}
                    floatingLabel
                    label="Short description..."
                    rows={3}
                />
                <Textfield
                    onChange={() => {
                    }}
                    floatingLabel
                    label="Complete description..."
                    rows={6}
                />

                <input id={'file'} name={'file-upload'} onChange={this.onInputChange.bind(this)} type="file"
                       className={styles.fileInput}/>
                <img id={'form-preview'} alt="Image preview"/>
                <FABButton onClick={this.chooseFile.bind(this)} ripple className={styles.file}>
                    <Icon name="add"/>
                </FABButton>

                <Button type={'button'} raised accent onClick={this.addProduct.bind(this)}>Create</Button>
            </Cell>


        );
    }
}
