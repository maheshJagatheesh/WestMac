import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Storage } from '@ionic/storage';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the AdditionalPassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-additional-passenger',
  templateUrl: 'additional-passenger.html',
})
export class AdditionalPassengerPage {
  passengerLists: any = [];
  searchData:any[] = [];
  searchHide:any;
  searchShow:any = 'none';
  transportId: any;
  Person_id: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public global: GlobalProvider,
    private loadingCtrl: LoadingController,
    public gFn: GlobalFunctionsProvider,
    public storage: Storage,
    public http: HttpClient,public global_api: GlobalApiProvider) {
      this.transportId = navParams.get('transportId');

      this.storage.get('loggedInUserData').then((val) => {
        this.Person_id = val.PERSON_ID;
      })

      this.getAdditionalPassengerList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditionalPassengerPage');
  }

  getAdditionalPassengerList(){
    let loginData = new HttpParams()
        .set('transportId',this.transportId)
        .set('searchVal','');
        let loading = this.loadingCtrl.create();
        loading.present();
        this.http.post<any>(this.global.APIURL + "transports/getAdditionalPassengerList", loginData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
          loading.dismiss();
          if(response.SUCCESS){
            let passengerList = response.ADDITIONALPASSENGER;
            for(var key in passengerList){
              this.passengerLists.push(passengerList[key]);
            }
          }
    
        }, error => {
          loading.dismiss();
        });
  }

  goBack() {
    this.navCtrl.pop();
  }

  clearsearch(){
    if($("#search").val() == "Search"){
      $("#search").val('');
    }
  }

  /*For search start*/
  search(event){
    this.searchData.length = 0;
    let searchVal:any = $("#search").val();

    let loginData = new HttpParams()
        .set('transportId',this.transportId)
        .set('searchVal',searchVal);
        this.http.post<any>(this.global.APIURL + "transports/getAdditionalPassengerList", loginData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
          if(response.SUCCESS){
            let passengerList = response.ADDITIONALPASSENGER;
            for(var key in passengerList){
            this.searchData.push(passengerList[key]);
            }
            this.searchHide = 'none';
          this.searchShow = '';
          }
        }, error => {
        });
  }
   /*search End*/

   saveAdditionalPassenger(){
     let additionalPassengerId = [];
    $('.well.select-card.savedAddPassenger.active').each( function(){
      if($(this).attr('data-id')){
        additionalPassengerId.push($(this).attr('data-id'));
      }
    });
    console.log(additionalPassengerId);
    if(additionalPassengerId.length > 0) {
      let loader = this.loadingCtrl.create({});
      loader.present();
      let loginData = new HttpParams()
          .set('transportId', this.transportId)
          .set('personIds', JSON.stringify(additionalPassengerId))
          .set('updatedBy', this.Person_id);

      this.http.post<any>(this.global.APIURL + "transports/saveAdditionalPassenger", loginData,{headers:this.global_api.getHeader()})
      .subscribe(response => {
          loader.dismiss();
          if(response.SUCCESS){
            this.navCtrl.push('RollcallsPage');
          }
        }, error => {
          loader.dismiss();
        });
    }else{
      this.gFn.presentToast('Please select a passenger');
    }
   }

   selectadditionalPassenger(addPassenger){
    addPassenger.active = !addPassenger.active;
  }
}
