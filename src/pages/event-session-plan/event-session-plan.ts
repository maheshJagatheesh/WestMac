import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpParams} from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { GlobalApiProvider } from '../../providers/global-api/global-api';
@IonicPage()
@Component({
  selector: 'page-event-session-plan',
  templateUrl: 'event-session-plan.html',
})
export class EventSessionPlanPage {
  PlanDetail:any;
  UpcomingSingleEvent:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
    public global: GlobalProvider,public http: HttpClient,public global_api:GlobalApiProvider) {
  }

  ionViewDidLoad() {
    
    this.storage.get('UpcomingSingleEvent').then((val)=>{
      this.UpcomingSingleEvent=JSON.parse(val)
      // this.UpcomingSingleEvent.event_id
      // console.log(JSON.parse(val))
    })
    this.getSessionPlan();
    console.log('ionViewDidLoad EventSessionPlanPage');
  }
  getSessionPlan(){
    let PlanData = new HttpParams()
    .set('event_id',this.UpcomingSingleEvent.event_id);
    
        this.http.post(this.global.APIURL+"sessions/getSessionSegmentList", PlanData,{headers:this.global_api.getHeader()})
        .subscribe((data:any) => {
          console.log(data)
          this.PlanDetail=data.GETSESSIONSEGMENTLIST;
          
        }, error => {
          console.log(error);
        });
  }
  backArrow(){
    this.navCtrl.push('EventDashboardPage');
  }

}
