import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-medicine-info',
  templateUrl: 'medicine-info.html',
})
export class MedicineInfoPage {
  MedicineFlag:any;
  MedicineNames:any;
  MedicineInformation:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,) {
    this.MedicineFlag=this.navParams.get('values')
    this.MedicineFlag=Object.keys(this.MedicineFlag).reduce((c, k) => (c[k.toLowerCase()] = this.MedicineFlag[k], c), {})
    console.log('1',this.MedicineFlag)
    storage.get('medicineInfo').then((val)=>{
      this.MedicineNames=JSON.parse(val)
      this.MedicineNames=Object.keys(this.MedicineNames).reduce((c, k) => (c[k.toLowerCase()] = this.MedicineNames[k], c), {})
      // console.log('2',this.MedicineNames)
      for(var key in this.MedicineFlag){
        // console.log('this.MedicineFlag',this.MedicineFlag[key])
        for(var key1 in this.MedicineNames){
          // console.log('this.MedicineNames',this.MedicineNames[key1])
          if(key==key1){
            var data1={
              MedicineName:this.MedicineNames[key1],
              MedicineFlag:this.MedicineFlag[key]
            }
            this.MedicineInformation.push(data1)
            break;
          }
        }
      }
      console.log(this.MedicineInformation)
      
    })
    
    
    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicineInfoPage');
  }
  backArrow(){
    this.navCtrl.pop();
  }

}
