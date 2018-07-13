// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page/PageComponent';
import {Line} from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import {IconButton} from 'react-mdl';

export default class ProductComponent extends React.Component {
    constructor(props) {
        super(props)
        let visits = this.props.viewer.visits.edges.map((visit) => {
            return _.cloneDeep(visit.node);
        });
        let vsts = _.map(visits, (visit) => {
            visit.day = moment(visit.created_at, 'dd MMM D YYYY HH:mm:ss').format('DD-MM-YYYY');
            return visit;
        });
        let ovsts = _.sortBy(vsts, 'day');
        let gvsts = _.groupBy(ovsts, 'day');
        let chartData = _.map(gvsts, (g) => {
            return g.length
        });

        this.state = {
            labels: _.keysIn(gvsts),
            chartData: chartData,
            month: moment()
        };

    }

    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };
    setNextMonth(){
        let variables = {first_0: 30};
        this.props.relay.refetch(variables);
        this.setState({
            month: this.state.month.add(1, 'months')
        })
    }
    setPreviousMonth(){
        this.setState({
            month: this.state.month.subtract(1, 'months')
        })
    }

    prepareData() {
//        console.log(this.props.viewer)
    }

    componentDidMount() {
        this.prepareData.call(this)
    }


    render() {
        return (
            <Page heading='Visits'>
                <div>
                    <IconButton onClick={this.setPreviousMonth.bind(this)} name="arrow_left" />
                    <IconButton onClick={this.setNextMonth.bind(this)} name="arrow_right" />
                    {this.state.month.format('MMMM YYYY')}

                    <Line data={{
                        labels: this.state.labels,
                        datasets: [{
                            data: this.state.chartData,
                        }],

                    }}
                          options={{
                              scales: {
                                  yAxes: [{
                                      ticks: {
                                          min: 0
                                      }
                                  }]
                              },
                              legend: {
                                  display: false
                              },
                          }}
                    />
                </div>
            </Page>
        );
    }
}
