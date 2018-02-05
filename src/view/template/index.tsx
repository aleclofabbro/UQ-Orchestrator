import * as React from 'react';
import { Main } from 'lib/UQ-Dashboard-Application-Nodes';
import { LoginView } from '../login';
import { HomeView } from '../home';
import { isConnectedUser } from 'lib/UQ-Dashboard-Application-Types';

type Props = Main & { logout: () => void };
export const TemplateView: React.StatelessComponent<Props> = props => {
  let Page;
  if (isConnectedUser(props.user)) {
    Page = <HomeView user={ props.user } logout={ props.logout } />;
  } else {
    Page = <LoginView user={ props.user } />;
  }
  return (
    <div>
      { Page }
    </div>
  );
};