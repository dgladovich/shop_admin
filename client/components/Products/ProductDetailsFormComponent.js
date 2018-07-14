import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {},
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class TextFields extends React.Component {
  state = {
    name: '',
    title: '',
    price: '',
    shortDescription: '',
    fullDescription: '',
    category: 'EUR',
    filter: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="price"
          label="Price"
          value={this.state.price}
          onChange={this.handleChange('price')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
        />
        <TextField
          id="select-category"
          select
          label="Category"
          className={classes.textField}
          value={this.state.category}
          onChange={this.handleChange('category')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select category"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="select-filter"
          select
          label="Filter"
          className={classes.textField}
          value={this.state.filter}
          onChange={this.handleChange('filter')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select select filter"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="shortDescription"
          label="Short description"
          multiline
          rows='3'
          rowsMax="4"
          value={this.state.shortDescription}
          onChange={this.handleChange('shortDescription')}
          className={classes.textField}
          margin="normal"
          fullWidth
        />
        <TextField
          id="fullDescription"
          label="Multiline"
          multiline
          rows='5'
          rowsMax="6"
          value={this.state.fullDescription}
          onChange={this.handleChange('fullDescription')}
          className={classes.textField}
          margin="normal"
          fullWidth
        />

      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
