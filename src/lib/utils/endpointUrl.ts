import { Endpoint } from './../UQ-domain/Data';
export default ({ip, protocol, port}: Endpoint) => `${protocol}://${ip}:${port}`;