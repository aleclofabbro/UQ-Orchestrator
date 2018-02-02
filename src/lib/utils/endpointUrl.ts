import { Endpoint } from 'src/lib/UQ-Types-Data/index';
export default ({ip, protocol, port}: Endpoint) => `${protocol}://${ip}:${port}`;