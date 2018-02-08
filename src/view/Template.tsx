import * as React from 'react';
import { LoginView } from './Login';
import { HomeView } from './Home';
import { isConnectedUser } from 'lib/UQ-Dashboard-Application-Types';
import { MainApp } from 'nodes/main';

type Props = MainApp & { logout: () => void };
export const TemplateView: React.StatelessComponent<Props> = props => {
  let Page;
  if (isConnectedUser(props.user)) {
    Page = <HomeView user={ props.user } logout={ props.logout } />;
  } else {
    Page = <LoginView user={ props.user } orchestratorConfig={props.config.orchestratorConfig} />;
  }
  return (
    <div>
      { Page }
    </div>
  );
};