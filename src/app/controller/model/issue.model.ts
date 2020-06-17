import {Article} from './article.model';
import {Volume} from './volume.model';
import {FileInfo} from './file.model';

export class Issue {
  number : number
  publishDate : Date
  status : string
  startMonth : string
  endMonth : string
  issn : string
  volume = new Volume()
  articles = new Array<Article>() 
  fileInfos = new Array <FileInfo>()
}
 