import articleApisFactory, { ArticleBO } from './article';
export type Config = {
  backEnd: {
    baseURL: string;
  };
};
export type BackOffice = {
  article: ArticleBO;
};
export default (config: Config): BackOffice => {
  const article = articleApisFactory(config);
  return {
    article
  };
};