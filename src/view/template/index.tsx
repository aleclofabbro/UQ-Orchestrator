import * as React from 'react';
import { App } from 'lib/UQ-Application-Nodes';
import LoginView from '../login';
import HomeView from '../home';

const TemplateView = (app: App & {logout: () => void}) => {
  let Page;
  if (!app.userSession.user){
    Page = <LoginView session={app.sessionId} />
  } else {
    Page = <HomeView user={ app.userSession.user } logout={ app.logout } />
  }
  return (
    <div>
      { Page }
    </div>
  );
};

export default TemplateView;
