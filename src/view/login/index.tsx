import * as React from 'react';
import { DisconnectedUser } from 'lib/UQ-Dashboard-Application-Types';
import { OrchestratorConfig, SessionId } from 'lib/UQ-Data-Types';
import { endpointUrl } from 'lib/utils/endpointUrl';
// eslint-disable-next-line: no-any
const qrCode = require('qrcode-generator');
// import uuid from 'uuid'

const makeCodeString = (
  orchestratorConfig: OrchestratorConfig,
  sessionId: SessionId
) => {
  const QRCodeConfigString = {
    peers: orchestratorConfig.peers,
    version: orchestratorConfig.version,
    insight: endpointUrl(orchestratorConfig.insight),
    broker: endpointUrl(orchestratorConfig.broker),
    registry: endpointUrl(orchestratorConfig.registry),
    imprinter: endpointUrl(orchestratorConfig.imprinter),
    legatus: endpointUrl(orchestratorConfig.legatus),
    session_id: sessionId
  };
  return JSON.stringify(QRCodeConfigString);
};

interface Props {
  user: DisconnectedUser;
  orchestratorConfig: OrchestratorConfig;
}

export const LoginView: React.StatelessComponent<Props> = props => {
  const sessionId = props.user.sessionId;
  const codeString = makeCodeString(props.orchestratorConfig, sessionId);
  let qr = qrCode(15, 'L');
  qr.addData(codeString, 'Byte');
  qr.make();
  const qrImage: string = qr.createImgTag(4);
  return (
    <div>
      <span>{ sessionId }</span>
      <div dangerouslySetInnerHTML={ { __html: qrImage } } />
    </div>
  );
};