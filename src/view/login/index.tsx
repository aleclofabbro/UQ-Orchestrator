import * as React from 'react';
import { DisconnectedUser } from 'lib/UQ-Dashboard-Application-Types';
// eslint-disable-next-line: no-any
const qrCode = require('qrcode-npm');
// import uuid from 'uuid'

interface Props {
  user: DisconnectedUser;
}
export const LoginView: React.StatelessComponent<Props> = props => {
  const qr = qrCode.qrcode(7, 'M');
  const sessionId = props.user.sessionId;
  qr.addData(sessionId);
  qr.make();
  const qrImage: string = qr.createImgTag(4);
  return (
    <div>
      <span>{ sessionId }</span>
      <div dangerouslySetInnerHTML={ { __html: qrImage } } />
    </div>
  );
};