// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';

import CustomersContainer from './CustomersContainer';
import MonthlyReviewContainer from './MonthlyReviewContainer';
import OrdersContainer from './OrdersContainer';
import ReviewesContainer from './ReviewsContainer';

export default class ProductPage extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  };

  render() {
    console.log(this.props)
    return (
      <div>
        <Grid>
          <Cell col={6}>
            <Grid>
              <Cell col={6}>
                <MonthlyReviewContainer/>
              </Cell>
              <Cell col={12}>
                <OrdersContainer/>
              </Cell>
            </Grid>
          </Cell>
          <Cell col={5}>
            <Grid>
              <Cell col={6}>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid architecto cumque mollitia
                  nemo quis. Aspernatur, pariatur quidem. Atque distinctio dolores eligendi ex in iusto nemo perferendis
                  quia similique. Illo?
                </div>
                <div>Cum doloribus eaque ut. Iste nobis obcaecati quae qui! Ab eos optio quisquam reiciendis! Culpa cum
                  dicta dolorem dolores, fuga harum iusto libero minus nesciunt optio possimus sint tempora totam.
                </div>
                <div>Aliquid blanditiis consequatur dicta et laborum praesentium quod repudiandae? At facilis id nobis
                  ratione tenetur! Amet fugiat id ipsa ipsam molestiae, molestias obcaecati porro quaerat quasi rerum sequi,
                  sit voluptas.
                </div>
                <div>Ab aliquid consequatur facilis incidunt itaque necessitatibus optio sequi velit voluptates? Asperiores
                  delectus excepturi sequi voluptatum? Aliquam animi debitis eaque ipsum quia quo repellat rerum ut. Commodi
                  dolorem necessitatibus quam.
                </div>
                <div>Commodi, dolorem est et iste nihil sint! Amet cumque debitis deleniti ea earum et expedita, hic illum
                  iusto laudantium, mollitia nobis, numquam officia pariatur rem saepe temporibus ut vero voluptatibus.
                </div>
                <div>Ad assumenda beatae debitis dolorem esse est inventore itaque laborum molestias mollitia,
                  necessitatibus nobis officiis placeat porro praesentium provident quam, quo repudiandae sit, totam. Animi
                  doloribus explicabo officia tenetur vitae.
                </div>
              </Cell>
              <Cell col={6}>
                <CustomersContainer viewer={this.props.viewer}/>
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </div>
    );
  }
}
