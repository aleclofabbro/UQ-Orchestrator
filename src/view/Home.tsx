import {  ConnectedUser } from 'lib/UQ-Dashboard-Application-Types';
import * as React from 'react';
type Props = {
  user: ConnectedUser;
  logout: () => void
};
export const HomeView: React.StatelessComponent<Props> = props => {
  return (
    <div>
      <span>Hello {props.user.name} [{props.user.sessionId}]</span>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
};
