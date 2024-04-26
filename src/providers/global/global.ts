import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public APIURL = 'https://api.gojaro.com/rest/jaro/';
  // public APIURL_CORE = 'https://coreapi.gojaro.com/';
  public APIURL_CORE = 'https://api.gojaro.com/rest/jaro/';
  public PROFILEIMAGEURL = 'https://database.gojaro.com/profiles/';
  public CHATGROUPLOGOURL = 'http://database.gojaro.com/logos/'; 
  //public PROFILEIMAGEURL = 'http://api.gojaro.com/profileimage/';
  public MESSAGEIMAGE = 'http://api.gojaro.com/chatUploadImage/';
  public MESSAGEFALLBACKIMAGE = 'http://mobile.gojaro.com/message_cache/';
  public GALLERYIMAGEURL = 'http://api.gojaro.com/GalleryImage/';
  public MEDICALCERTIFICATEIMAGEURL = 'http://api.gojaro.com/MedicalCertificateImages/';
  public ImagesPath= 'assets/images/';
  public App_id= 'com.gojaro.westmacapp';
  constructor(public http: HttpClient) {
    //console.log('Hello GlobalProvider Provider');
  }

}