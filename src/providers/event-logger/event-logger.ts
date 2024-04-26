
import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventLoggerProvider {

  constructor( public http: HttpClient) {
    
  }
  DashboardPlayerReason(name:string,value:any){
    
    FirebaseAnalytics.logEvent(name, { pram:value })
    
  }
  EventPlayerReason(name:string,value:any){
    FirebaseAnalytics.logEvent(name, { pram:value })
    
  }
  CoachArrowAttd_Mark(name:string,value:any){
    FirebaseAnalytics.logEvent(name, { pram:value })
    
  }
  CoachRadioButtonAttd_Mark(name:string,value:any){
    
    FirebaseAnalytics.logEvent(name, { pram:value })
  }
  NextPreviousIcons(name:string,value:any){
    FirebaseAnalytics.logEvent(name, { pram:value })
    
  }
  EventBottomIcons(name:string,value:any){
    FirebaseAnalytics.logEvent(name, { pram:value })
    
  }

}
