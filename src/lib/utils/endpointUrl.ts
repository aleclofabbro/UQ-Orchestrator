import { Endpoint } from 'lib/UQ-Types-Data';
export default ({ip, protocol, port}: Endpoint) => `${protocol}://${ip}:${port}`;