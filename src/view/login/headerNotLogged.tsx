import * as React from 'react';

const HeaderNotLogged = () => (
  <header className="wrapper_header">
    <div className="header_logo" />
    <div className="header_right">
      <ul>
        <li><a>Paper</a></li>
        <li><a>FAQ</a></li>
        <li><a>Contact us</a></li>
        <li><a><span className="icon-twitter" /></a></li>
        <li><a><span className="icon-medium" /></a></li>
        <li><a><span className="icon-github" /></a></li>
      </ul>
    </div>
  </header>
);

export default HeaderNotLogged;
