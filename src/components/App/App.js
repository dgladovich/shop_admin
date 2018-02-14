import React from 'react';
import styled from 'styled-components';
import {MuiThemeProvider} from 'material-ui/styles';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../relay';
import theme from '../../theme';
import Toolbar from './Toolbar';
import Footer from './Footer';

const Container = styled.div`
  height: 100vh;
  background: url(https://koistya.github.io/files/background-v1-1920x1080.jpg)
    no-repeat center center fixed;
  background-size: cover;
`;

class App extends React.Component {
    state = {
        location: history.location,
        params: {},
        query: graphql`query AppQuery { user { name }}`,
        variables: {},
        component: null,
    };
    componentDidMount() {
        window.document.title = this.props.route.title;
    }

    componentDidUpdate() {
        window.document.title = this.props.route.title;
    }

    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={this.state.query}
                render={({error, props}) => {
     if (error) {
     return <div>Error!</div>;
     }
     if (!props) {
     return <div>Loading...</div>;
     }
     return <MuiThemeProvider theme={theme}>
     <Container>
     <Toolbar user={this.props.user}/>
     {this.props.route.body}
     <Footer/>
     </Container>
     </MuiThemeProvider>;
     }}
            />
        );
    }
}

export default App;
