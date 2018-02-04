import { Endpoint } from 'lib/UQ-Data-Types';
export default ({ip, protocol, port}: Endpoint) => `${protocol}://${ip}:${port}`;