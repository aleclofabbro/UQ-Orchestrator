import * as React from 'react';
// eslint-disable-next-line: no-any
const qrCode = require('qrcode-npm');
// import uuid from 'uuid'

type Props = {
  session: string;
};
const LoginView = (props: Props) => {
  const qr = qrCode.qrcode(7, 'M');
  qr.addData(props.session);
  qr.make();
  const qrImage: string = qr.createImgTag(4);
  return (
    <div className="index_wrapper">
      <div className="console_background" />
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
      <div className="row">
        <div className="medium-8 columns medium-offset-2">
          <h1 className="qrcode_title">Uniquid Console <span className="title_release">Alpha</span></h1>
          <h3 className="qrcode_tagline">
            A blockchain access management that protect<br />
            your digital connected assets inside a network<br />
            of smart devices and people
          </h3>
          <div className="qrcode_body" dangerouslySetInnerHTML={ { __html: qrImage } } />
          <p className="qrcode_instruction">Scan the QRcode above with the Uniquid app to Login</p>
          <div className="qrcode_version">v. 0.3.4</div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
