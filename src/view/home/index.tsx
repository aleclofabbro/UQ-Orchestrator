import {  ConnectedUser } from 'lib/UQ-Types-Application';
import * as React from 'react';
type Props = {
  user: ConnectedUser;
  logout: () => void
};
const LoginView: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <span>Hello {props.user.name} [{props.user.sessionId}]</span>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
};

export default LoginView;
