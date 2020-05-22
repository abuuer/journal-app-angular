import {UserArticleDetail} from './user-article-detail.true';
import {FileInfo} from './file.model';
import {ArticleFunds} from './article-funds.true';
import {ArticleTags} from './article-tags.true';


export class Article {
  doi : string
  title : string
  type : string
  abstractt : string
  funding : boolean
  articleFunds = new Array<ArticleFunds>()
  fileInfos = new Array <FileInfo>()
  userArticleDetails = new Array <UserArticleDetail>()
  articleTags = new Array <ArticleTags>()

  constructor() {
  }
}
