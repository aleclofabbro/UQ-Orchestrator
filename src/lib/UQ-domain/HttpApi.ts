import * as Api from './Api';
export type Url = string;
export type Method = string;
export type HttpApi = {
  url: Url;
};
export type HttpGetApi<R> = (request: R) => HttpApi & {
  method: 'GET';
}
export type HttpPostApi<R, D> = (request: R) => HttpApi & {
  method: 'POST';
  data?: D;
}

export namespace Imprinter {
  export const GetNodeInfo: HttpGetApi<Api.Imprinter.GetNodeInfo['Request']> = () => ({
    method: 'GET',
    url: `api/v1/nodeinfo`
  });
}
