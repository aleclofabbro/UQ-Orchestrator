import { HttpPostConfig, HttpGetConfig } from '../../../io/ajax';
import { Endpoint } from 'src/lib/UQ-Types-Data/index';
import epUrl from '../../../utils/endpointUrl';

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
