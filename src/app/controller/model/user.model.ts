import {UserSpecialtyDetail} from './user-specialty-detail.model';
import {UserArticleDetail} from './user-article-detail.model';

export class User {
    id : number
    prefix : string
    firstName : string
    lastName: string
    middleName: string
    email: string
    degree: string
    adress: string
    country: string
    region: string
    city: string
    postalCode: string
    phone: string
    fax: string
    registrationDate : Date
    institution: string
    departement: string
    instAdress: string
    instPhone: string
    availability : string
    userSpecialtyDetails = new Array <UserSpecialtyDetail>()
    userArticleDetails = new Array <UserArticleDetail>()

  constructor() {
  }
}
