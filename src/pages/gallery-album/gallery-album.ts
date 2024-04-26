import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpParams} from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';


@IonicPage()
@Component({
  selector: 'page-gallery-album',
  templateUrl: 'gallery-album.html',
})
export class GalleryAlbumPage {
  PersonData:any;
  AlbumList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClient,public storage: Storage,public global: GlobalProvider, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
      
  }

  ionViewDidLoad() {
    this.storage.get('loggedInUserData').then((val) => {
      this.PersonData=val;
      console.log(this.PersonData)
      this.getAlbumList().then((x)=>{

      })
    })
    console.log('ionViewDidLoad GalleryAlbumPage');
  }
  getAlbumList(){
    return new Promise((resolve) => {
      let dataList = new HttpParams()
      .set('person_id', '27443');//27443this.PersonData.PERSON_ID
      
      this.http.post(this.global.APIURL+"galleries/getAlbumGroupList", dataList,{headers:this.global_api.getHeader()})
      .subscribe((data:any) => {
        this.AlbumList=data.GETALBUMGROUPLIST
        console.log('data',this.AlbumList)
        resolve(true);
        
      }, error => {
        //console.log(error);
      });
    });
  }
  

}
