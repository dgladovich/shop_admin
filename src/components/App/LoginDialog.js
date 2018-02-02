import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import styled from 'styled-components';

const Title = styled(DialogTitle)`
  && {
    text-align: center;
  }
`;

const defaultState = {
  error: null,
  loading: false,
};

class LoginDialog extends React.Component {
  state = { ...defaultState };

  signInWithFacebook = event => {
    this.setState({ ...defaultState, loading: true });
  };

  render() {
    return (
      <Dialog {...this.props}>
        <Title>Sign In</Title>
        <DialogContent>
          <Button
            raised
            color="primary"
            disabled={this.state.loading}
            onClick={this.signInWithFacebook}
          >
            Sign in with Facebook
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default LoginDialog;
