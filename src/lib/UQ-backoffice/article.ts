import ajax from '../io/ajax';
import { AxiosResponse } from 'axios';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Article as ArticleApi } from '../conduit-domain/Api';
import { Article as ArticleHttpApi } from '../conduit-domain/HttpApi';
import { Config } from './config';

export type ArticleBO = {
  articleBySlug: (slug: string) => Observable<ArticleApi.Value>;
};
export default (config: Config): ArticleBO => {
  const articleBySlug = (slug: ArticleApi.Request): Observable<ArticleApi.Value> => !slug ?
      Observable.of({
        errors: {
          body: ['Specify a slug']
        }
      }) :
      ajax<ArticleApi.Value>(
        {
          ...config.backEnd,
          method: ArticleHttpApi.method,
          url: ArticleHttpApi.url(slug),
        },
        (response: AxiosResponse) => {
          // throw(response);
          let msg = 'Unknown Error';
          msg = response && response.data && response.data.error ||
            response && response.data ||
            response && response.status ||
            'Unknown Error';
          return [{
            errors: {
              body: [`Article error: ${msg}`]
            }
          }];
        });

  return {
    articleBySlug
  };
};
