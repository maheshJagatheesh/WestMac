import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the EventAttendanceNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-attendance-note',
  templateUrl: 'event-attendance-note.html',
})
export class EventAttendanceNotePage {

  note:any;
  eventId:any;
  personId:any;
  event_notes:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ViewCtrl: ViewController,
    public global: GlobalProvider,public http: HttpClient,private storage: Storage,private plt: Platform, public toastController:ToastController,public global_api:GlobalApiProvider) {
      plt.ready().then(()=>{
        plt.registerBackButtonAction(()=>{
          this.close();
        });
      });
  }

  ionViewDidLoad() {
    this.eventId=this.navParams.get('eventId');
    this.personId=this.navParams.get('personId');
    this.note=this.navParams.get('note');
    this.event_notes=this.navParams.get('note');
  }

  send(remove = false){
    if (!this.note.replace(/\s/g, '').length) {
      this.presentToastWithOptions('Empty Text Not Allowed');
    }
    else{
      if(remove){
        this.note = '';
      }
      let Data = new HttpParams()
      .set('note',this.note)
      .set('eventId',this.eventId)
      .set('personId',this.personId);      
      
      this.http.post(this.global.APIURL + "players/saveAttendanceNote", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS==true){
            let msg = remove ? 'Note Removed':'Note Updated';
            this.presentToastWithOptions(msg);
            this.ViewCtrl.dismiss(this.note);
          }
          else{
            this.navCtrl.pop();
            alert("Note cannot be submitted")
          }
        }, error => {
          
        });

    }
  }

  close(){
    this.ViewCtrl.dismiss();
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
