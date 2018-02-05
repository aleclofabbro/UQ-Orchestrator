import { Endpoint } from 'lib/UQ-Data-Types';
export const endpointUrl = ({ip, protocol, port}: Endpoint) => `${protocol}://${ip}:${port}`;