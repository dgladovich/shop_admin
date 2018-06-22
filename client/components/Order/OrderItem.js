// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemAction, ListItemContent, Icon} from 'react-mdl';

export default class OrderItem extends React.Component {

    render() {
        return (
            <ListItem twoLine>
                <ListItemContent
                    subtitle="Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.">
                    Bryan
                    Cranston
                </ListItemContent>
            </ListItem>
        );
    }
}
