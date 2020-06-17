import {Issue} from './issue.model';

export class Volume {
  number : number
  year : any
  issues = new Array<Issue>()
}
