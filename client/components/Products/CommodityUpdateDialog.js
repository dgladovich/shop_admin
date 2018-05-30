import React from 'react';
import {
    Grid,
    Cell,
    Card,
    CardTitle,
    CardText,
    CardActions,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from 'react-mdl';
import UpdateProductForm from './UpdateProductForm';

export default class CommodityUpdateDialog extends React.Component {
    closeEditor = ()=>{
        this.props.onCloseEditor();
    };
    render() {
        return (
            <Dialog open={this.props.isOpen}>
                <DialogTitle>Update commodity</DialogTitle>
                <DialogContent>
                    <UpdateProductForm relay={this.props.relay} viewer={this.props.viewer}/>
                </DialogContent>
                <DialogActions>
                    <Button type='button'>Agree</Button>
                    <Button type='button' onClick={this.closeEditor.bind(this)}>Disagree</Button>
                </DialogActions>
            </Dialog>
        );
    }
}