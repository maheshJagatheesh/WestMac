import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
/**
 * Generated class for the CreateNodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-node',
  templateUrl: 'create-node.html',
})
export class CreateNodePage {
  note:any;
  PersonData:any;
  event_id:any;
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
    this.event_id=this.navParams.get('eventid');
    this.note=this.navParams.get('event_notes');
    this.event_notes=this.navParams.get('event_notes');
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
      .set('event_notes',this.note)
      
      .set('event_id',this.event_id)
      
      
      this.http.post(this.global.APIURL + "events/updateEventsNotes", Data,{headers:this.global_api.getHeader()})
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
