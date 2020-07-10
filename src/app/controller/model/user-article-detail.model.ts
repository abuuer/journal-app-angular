import {User} from './user.model';
import {Article} from './article.model';

export class UserArticleDetail {

  user = new User()
  article = new Article()
  function : string
  reviewerDecision : string
  additionalNotes : string
  mainAuthorCheck : number

  constructor() {
  }
}
