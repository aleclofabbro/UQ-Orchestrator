import { Imprinter as ImprinterHttp } from './../../../lib/UQ-domain/HttpApi';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Imprinter } from '../../../lib/UQ-domain/Api';
import { ImprinterNode } from '../../../lib/UQ-domain/Data';
import ajax from '../../../lib/io/ajax';

export default (config: AxiosRequestConfig) => {
  const getNodeInfo: Imprinter.GetNodes = () => ajax<ImprinterNode[] | string>(
    {
      ...ImprinterHttp.getNodes(),
      ...config
    },
    (response: AxiosResponse) => {
      let msg = 'Unknown Error';
      msg = response && response.data && response.data.error ||
        response && response.data ||
        response && response.status ||
        'Unknown Error';
      return `Imprinter.getNodes error: ${msg}`;
    });

  return getNodeInfo;
};
