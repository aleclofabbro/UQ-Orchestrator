import * as React from 'react';
import { App } from 'lib/UQ-Application-Nodes';
import LoginView from '../login';
import HomeView from '../home';
import { isConnectedUser } from 'lib/UQ-Types-Application';

const TemplateView = (app: App & { logout: () => void }) => {
  let Page;
  if (isConnectedUser(app.user)) {
    Page = <HomeView user={ app.user } logout={ app.logout } />;
  } else {
    Page = <LoginView session={ app.user.sessionId } />;
  }
  return (
    <div>
      { Page }
    </div>
  );
};

export default TemplateView;
