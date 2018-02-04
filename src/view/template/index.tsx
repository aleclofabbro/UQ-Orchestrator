import * as React from 'react';
import { App } from 'lib/UQ-Application-Nodes';
import LoginView from '../login';
import HomeView from '../home';
import { isConnectedUser } from 'lib/UQ-Types-Application';

type Props = App & { logout: () => void };
const TemplateView: React.StatelessComponent<Props> = props => {
  let Page;
  if (isConnectedUser(props.user)) {
    Page = <HomeView user={ props.user } logout={ props.logout } />;
  } else {
    Page = <LoginView session={ props.user.sessionId } />;
  }
  return (
    <div>
      { Page }
    </div>
  );
};

export default TemplateView;
