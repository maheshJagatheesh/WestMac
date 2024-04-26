import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@IonicPage()
@Component({
  selector: 'page-severity-details-modal',
  templateUrl: 'severity-details-modal.html',
})
export class SeverityDetailsModalPage {
  severityDetails:any=[]
  DisplayDetails:any=[]
  AttendyDetails:any={}
  MedicineNames:any;
  MedicineInformation:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public global: GlobalProvider,private iab: InAppBrowser,) {
    var AttendyDetailsDup=navParams.get('playerAilments')
    this.AttendyDetails=Object.keys(AttendyDetailsDup).reduce((c, k) => (c[k.toLowerCase()] =AttendyDetailsDup[k], c), {})
    console.log('AttendyDetails',this.AttendyDetails)
    this.severityDetails=this.AttendyDetails.playerailments.split('|')
    console.log('severityDetails',this.severityDetails)
    for(var key in this.severityDetails){
      var splitedDetails=this.severityDetails[key].split(':')
      var medicalProblem=splitedDetails[0]
      var details=splitedDetails[1]
      var severity=splitedDetails[2]
      if(medicalProblem || details || severity){
        var JsonDetails={
          medicalProblem:medicalProblem,
          details:details,
          severity:severity
        }
        this.DisplayDetails.push(JsonDetails)
      }
    }

    console.log('this.DisplayDetails',this.DisplayDetails)


    storage.get('medicineInfo').then((val)=>{
      this.MedicineNames=JSON.parse(val)
      this.MedicineNames=Object.keys(this.MedicineNames).reduce((c, k) => (c[k.toLowerCase()] = this.MedicineNames[k], c), {})
      for(var key1 in this.MedicineNames){
        // console.log(key1,this.AttendyDetails[key1])
        var data1={
          MedicineName:this.MedicineNames[key1],
          MedicineFlag:this.AttendyDetails[key1]
        }
        this.MedicineInformation.push(data1)
      }
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SeverityDetailsModalPage');
  }

  openAttachement(url){
    const browserRef = this.iab.create(url, '_blank', 'clearcache=yes,clearsesioncache=yes');

  }
  backArrow(){
    this.navCtrl.pop()
  }

}
