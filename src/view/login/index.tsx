import * as React from 'react';
// eslint-disable-next-line: no-any
const qrCode = require('qrcode-npm');
// import uuid from 'uuid'

interface Props {
  session: string;
};
const LoginView = (props: Props) => {
  const qr = qrCode.qrcode(7, 'M');
  qr.addData(props.session);
  qr.make();
  const qrImage: string = qr.createImgTag(4);
  return (
    <div dangerouslySetInnerHTML={ { __html: qrImage } } />
  );
};

export default LoginView;
