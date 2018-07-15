/*// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Button, Textfield, FABButton, Icon, Tooltip} from 'react-mdl';
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
    short_decsription: '',
    full_description: '',
    category: '',
    image_src: ''
  };
  createCommodity(){
    let value = Object.assign(this.state, {
      created_at: '2018-02-12',
      updated_at: '2018-02-12',
    });
    AddProductMutation.commit(
      this.props.relay.environment,
      value,
      this.props.viewer.id,
    );
  }

  onImageUpload(response) {
    this.setState({imageSrc: response.data.imageSrc})
    this.createCommodity();
  }

  onChangeName(e) {
    this.setState({name: e.target.value});
  }

  onChangePrice(e) {
    console.log(e.target.value, +e.target.value)
    this.setState({price: +e.target.value});
  }

  onChangeShortDescription(e) {
    this.setState({short_description: e.target.value})
  }

  onChangeFullDescription(e) {
    this.setState({full_description: e.target.value})
  }

  onChangeCategory(e) {
    this.setState({
      category: e
    })
  }

  addProduct = (e) => {
    if(this.state.image_src){
      let file = document.getElementById('file').files[0];
      let fd = new FormData();
      fd.append('file', file);
      const options = {
        method: 'POST',
        data: fd,
        url: 'http://localhost:8000/upload',
      };
      axios(options)
        .then(this.onImageUpload.bind(this))
        .catch(e => {
          console.log(e)
        });
    } else {
      this.createCommodity();
    }

  };
  onInputFileChange = (e) => {
    this.setState({image_src: ''});
    document.getElementById('form-preview').src = e.target.value;
  };
  chooseFile = () => {
    document.getElementById('file').click();
  };

  render() {
    return (
      <Cell col={12}>
        <Textfield
          onChange={this.onChangeName.bind(this)}
          floatingLabel
          label="Product name..."
        />
        <Textfield
          onChange={this.onChangePrice.bind(this)}
          floatingLabel
          pattern="-?[0-9]*(\.[0-9]+)?"
          error="Input is not a number!"
          label="Price..."
        />
        <CategoriesSelect onChange={this.onChangeCategory.bind(this)} relay={this.props.relay}
                          viewer={this.props.viewer}/>
        <Textfield
          onChange={this.onChangeShortDescription.bind(this)}
          floatingLabel
          label="Short description..."
          rows={3}
        />
        <Textfield
          onChange={this.onChangeFullDescription.bind(this)}
          floatingLabel
          label="Complete description..."
          rows={6}
        />

        <input id={'file'} name={'file-upload'} onChange={this.onInputFileChange.bind(this)} type="file"
               className={styles.fileInput}/>
        <Tooltip label={'upload photo'} className={styles.file}>
          <FABButton onClick={this.chooseFile.bind(this)} ripple >
            <Icon name="add"/>
          </FABButton>
        </Tooltip>
        <Button
          type={'button'}
          raised
          accent
          className={styles.formSubmit}
          onClick={this.addProduct.bind(this)
          }>Create</Button>
      </Cell>


    );
  }
}*/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ProductDetailsFormComponent from './ProductDetailsFormComponent';
import ProductImageUploaderComponent from './ProductImageUploaderComponent';
import {lighten} from "@material-ui/core/styles/colorManipulator";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    backgroundColor: 'transparent'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const {numSelected, classes, editorRoute} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Update commodity
          </Typography>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    selected: []

  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { selected } = this.state;
    console.log(this.props)
    return (
      <div className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />

        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Details" />
            <Tab label="Images" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ProductDetailsFormComponent/>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <ProductImageUploaderComponent/>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
