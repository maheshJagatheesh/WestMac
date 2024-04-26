import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-player-medical-records',
  templateUrl: 'player-medical-records.html',
})

export class PlayerMedicalRecordsPage {
  private playerDetails: any[] = [];
  private medicalCondition: string = 'No medical conditions recorded';
  MedicineDetails:any;
  MedicineInformation:any=[];
  MedicineNames:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public plt: Platform, private http: HttpClient, private loadingCtrl: LoadingController, private global: GlobalProvider, public gFn:GlobalFunctionsProvider, private iab: InAppBrowser) {
    this.playerDetails = navParams.get('playerDetails');
    console.log('param',this.playerDetails)
    plt.ready().then(()=>{
      plt.registerBackButtonAction(()=>{
        this.goBack();
      });
    });
    if(this.playerDetails[0]['medical_history'])
      {
        this.MedicineDetails=Object.keys(this.playerDetails[0]['medical_history']).reduce((c, k) => (c[k.toLowerCase()] = (this.playerDetails[0]['medical_history'])[k], c), {})
        storage.get('medicineInfo').then((val)=>{
          this.MedicineNames=JSON.parse(val)
          this.MedicineNames=Object.keys(this.MedicineNames).reduce((c, k) => (c[k.toLowerCase()] = this.MedicineNames[k], c), {})
          for(var key1 in this.MedicineNames){
            console.log(key1,this.MedicineDetails[key1])
            var data1={
              MedicineName:this.MedicineNames[key1],
              MedicineFlag:this.MedicineDetails[key1]
            }
            this.MedicineInformation.push(data1)
          }
        })
      }    
    // console.log('param2',this.MedicineDetails['permission_antihistamines'])
    
  }
  
  ionViewDidLoad() {
    this.gFn.hideMenuIcon()
    var reportArray = [];
    var medical_history = this.playerDetails[0]['medical_history'];
    
    for (var historyKey in medical_history){
      if (!medical_history.hasOwnProperty(historyKey)) continue;
      if(medical_history[historyKey] === true && medical_history.hasOwnProperty(historyKey+'_DETAIL')) {
        var report = this.toCamelCase(historyKey) + ": ";
        if(medical_history[historyKey+'_DETAIL'] && medical_history[historyKey+'_DETAIL'].length > 0){
          report += medical_history[historyKey+'_DETAIL'];
        }
        else{
          report += "Details not available";
        }
        reportArray.push(report);
      }
    }
    if(reportArray.length > 0){
      this.medicalCondition = reportArray.join(', ');
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  openAttachement(url){
    const browserRef = this.iab.create(url, '_blank', 'clearcache=yes,clearsesioncache=yes');

  }

  toCamelCase(str){
    return str.split('_').map(function(word,index){
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }
  ionViewDidLeave(){
    this.gFn.showMenuIcon()
  }
}
