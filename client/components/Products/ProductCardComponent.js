import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import moment from 'moment';





const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = {expanded: false};

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}));
  };
  handleUpdateClick = () => {
    let {id} = this.props.product;
    this.props.editRoute(id);

  };

  render() {
    const {classes, product} = this.props;
    const {name, title, category, status, short_description, full_description, price, updated_at} = product;
    let timeFormat = 'ddd MMM DD YYYY HH:mm:ss';
    let updatedAtMod = updated_at.split('GMT')[0];
    let lastModified = moment(updatedAtMod, timeFormat).format('YYYY-MM-DD HH:mm:ss');
/*    let mainSrc;
    let main = product.images.edges.filter( edge => edge.node.main );
    if(main.length){
      mainSrc = main[0].node.src;
    } else {
      mainSrc = 'noimage.png';
    }*/
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon/>
            </IconButton>
          }
          title={title}
          subheader={lastModified}
        />
        <CardMedia
          className={classes.media}
          //image={mainSrc}
          title="Contemplative Reptile"
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Delete" onClick={this.props.loadMore}>
            <DeleteIcon/>
          </IconButton>
          <IconButton
            aria-label="Edit"
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleUpdateClick.bind(this)}
          >
            <SettingsIcon/>
          </IconButton>
        </CardActions>

      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
