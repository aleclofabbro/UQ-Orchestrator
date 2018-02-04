import { HttpPostConfig, HttpGetConfig } from 'lib/io/ajax';
import { Endpoint } from 'lib/UQ-Data-Types';
import epUrl from 'lib/utils/endpointUrl';

export const mine = (ep: Endpoint): HttpGetConfig => ({
  method: 'GET',
  url: `${epUrl(ep)}/mineshot`
});

export const recharge = (ep: Endpoint, data: {
  address: string,
  amount: number
}): HttpPostConfig =>
  ({
    method: 'POST',
    url: `${epUrl(ep)}/topup`,
    data
  });
