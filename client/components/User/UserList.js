// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page/PageComponent';

import {List} from 'react-mdl';
import UserItem from './UserItem';

export default class UserComponent extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        return (
            <List>
                {this.props.viewer.users.edges.map((edge)=>{
                    return <UserItem key={edge.node.id} node={edge.node}/>
                })}
            </List>
        );
    }
}
