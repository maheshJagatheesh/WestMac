import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Events ,ViewController} from 'ionic-angular';

/**
 * Generated class for the EventGroupMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-group-message',
  templateUrl: 'event-group-message.html',
  // template:'<div class="background group-msg" (clickOutside)="close($event)"></div>'
})
export class EventGroupMessagePage {
  DupeventAttendLen:any
  State:any;
  // onClickedOutside(e: Events) {
    
  // }


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,public viewCtrl:ViewController) {
      this.DupeventAttendLen=this.navParams.get('Array')
      // console.log(this.DupeventAttendLen)
  }
  // close(){
  //   // this.navCtrl.pop();
  //   this.viewCtrl.dismiss()
  // }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad EventGroupMessagePage');
  }
  yes(){
    this.navCtrl.pop();
    let GroupMessageModal2 = this.modalCtrl.create('EventGroupMessageTextPage',{state:this.State});
          
          GroupMessageModal2.present();
  }
  selectState(SelectedState,event){
    console.log(event.target)
    $(event.target).closest('.list-group').find('.circle-group').removeClass('active')
    // $(event.target).find('.circle-group').addClass('active')
   
    // $(event.target).closest('.modal-body').find('.NoResponse').removeClass('active')
    // $(event.target).closest('.modal-body').find('.NotGoing').removeClass('active')
    // $(event.target).closest('.modal-body').find('.MayBe').removeClass('active')
    this.State=SelectedState;
    console.log(this.State)
    $(event.target).closest('.list-group-item').find('.circle-group').addClass('active')
  }
  backArrow(){
    this.navCtrl.pop();
  }

}
