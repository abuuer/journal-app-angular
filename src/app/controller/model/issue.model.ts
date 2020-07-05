import {Article} from './article.model';
import {Volume} from './volume.model';
import {FileInfo} from './file.model';
import {Published} from './published.model';

export class Issue {
  number : number
  publishDate : Date
  status : string
  startMonth : string
  endMonth : string
  issn : string
  volume = new Volume()
  articles = new Array<Article>()
  publisheds = new Array<Published>()
  fileInfos = new Array <FileInfo>()
}
