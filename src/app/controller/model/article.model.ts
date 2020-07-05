import {UserArticleDetail} from './user-article-detail.model';
import {FileInfo} from './file.model';
import {ArticleFunds} from './article-funds.model';
import {ArticleTags} from './article-tags.model';


export class Article {
  reference : string
  title : string
  type : string
  abstractt : string
  funding : boolean
  status : string
  decision : string
  submitDate : Date
  articleFunds = new Array<ArticleFunds>()
  fileInfos = new Array <FileInfo>()
  userArticleDetails = new Array <UserArticleDetail>()
  articleTags = new Array <ArticleTags>()

  constructor() {
  }
}
