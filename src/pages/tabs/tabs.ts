import { Component,ViewChild, ComponentFactoryResolver, DoCheck, OnInit } from '@angular/core';
import { IonicPage, App,Keyboard,NavController, NavParams, HideWhen, Button, Platform } from 'ionic-angular';
import { DisplayEventsPage } from '../display-events/display-events';
import { DisplayEventsNewPage } from '../display-events-new/display-events-new';
import {EventHomePage} from '../event-home/event-home';
import { EventHomeNewPage } from '../event-home-new/event-home-new';
import { EventHomeMenuPage } from '../event-home-menu/event-home-menu';
import { SettingsPage } from '../settings/settings';
import { PlayersDashboardPage } from '../players-dashboard/players-dashboard';
import { ChatDashboardPage } from '../chat-dashboard/chat-dashboard';
import { Storage } from '@ionic/storage';
import { MessageLogDashboardPage } from '../message-log-dashboard/message-log-dashboard';
import { AlertDashboardPage } from '../alert-dashboard/alert-dashboard';
import {Tabs} from "ionic-angular";
import { SetToGoPage } from '../set-to-go/set-to-go';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit{
  tab1Root = EventHomeMenuPage;
  tab2Root = DisplayEventsNewPage;
  tab3Root = PlayersDashboardPage;
  tab4Root = ChatDashboardPage;
  tab5Root = SettingsPage;
  tab6Root=MessageLogDashboardPage
  tab7Root=AlertDashboardPage
  // tab8Root=PlayersDashboardPage;
  FunctionAccess:any;
  interval:any;
  PlayerMenu:any;
  activatedTab:any =0;
  // class:string = 'custom-player';

  @ViewChild(Tabs) tabs: Tabs;
  player: string;
  isAdmin: boolean = false;
  isPlayer: boolean = true;
  refresh: boolean;
  data: string;
  isAndroid: boolean = false;

  // @ViewChild(Nav) nav:Nav;
  constructor(public navParam:NavParams,public app:App,public keyboard:Keyboard,public navCtrl:NavController,private storage: Storage,public platform: Platform) {
  
    this.isAndroid = platform.is('android');
    this.PlayerMenu=navParam.get('Player_menu')

    this.activatedTab=navParam.get('activatedTab');
    // this.refresh = navParam.get('Refresh');
    console.log("Activated tab",this.activatedTab);
    console.log('this.PlayerMenu',this.PlayerMenu)
    // console.log("this.refresh",this.refresh);
    if(this.PlayerMenu=='yes'){
      $('.tabs-md .tab-button:nth-child(4)').css('display','inherit')
      console.log('inherit')
    }
    else if(this.PlayerMenu=='no'){
      this.interval=setInterval(()=>{
        $('.tabs-md .tab-button:nth-child(4)').css('display','none')
        clearInterval(this.interval)
        console.log('none')
      },10)
      
      
    }
    console.log('The keyboard is open:', this.keyboard.isOpen());
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
     
      console.log("Function access level ",this.FunctionAccess)

      
      // this.interval=setInterval(()=>{
      //   if(this.FunctionAccess.bottom_player_menu=='yes'){
      //     $('.tabs-md .tab-button:nth-child(3)').css('display','inherit')
      //     clearInterval(this.interval)
      //    }
      //    else if(this.FunctionAccess.bottom_player_menu=='no'){
      //     $('.tabs-md .tab-button:nth-child(3)').css('display','none')
      //     clearInterval(this.interval)
      //    }
      // },10)

      if(this.FunctionAccess.user_adminLevel == 1 || this.FunctionAccess.user_adminLevel == 2 ){
        this.isAdmin = true;
        // this.isPlayer =false;
        // this.tabs.getByIndex(3).show = false;
        // this.tabs.getByIndex(2).show = true
        console.log("i'm Admin from tab.ts 88");
        // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','inline-block');
        // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','none');
      }else if(this.FunctionAccess.user_adminLevel == 4){
        this.isAdmin =  false;
        this.data = 'custom-students1'
        // this.tabs.getByIndex(2).show = false;
        // this.tabs.getByIndex(3).show = true;
        // this.isPlayer = true;
        // $('.tabs-md .tab-button:nth-child(2) .tab-button-icon').css('display','inline-block');
        // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
        console.log("i'm Player from tab.ts 91");
      }else{
        this.isAdmin =  false;
        this.data = 'custom-students1'
        // this.tabs.getByIndex(2).show = false;
        // this.tabs.getByIndex(3).show = true;
        // this.isPlayer = true;
        // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','inline-block');
        // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
        console.log("i'm NOthing from tab.ts 91");
      }
      
    });

    // this.storage.get('Refresh').then((val)=>{
    //   this.refresh = val;

    //   if(this.refresh == true){
    //     console.log("reloading");
    //     // this.navCtrl.setRoot(this.navCtrl.getActive().component())
    //     this.storage.set('Refresh',false);
    //     setTimeout(()=>{
    //       window.location.reload();
    //     },200)
    //   }else{
    //     console.log("not reloading");
    //     // this.storage.set('Refresh',true);
    //   }
    // })


    
    

    setTimeout(()=>{
      if(this.FunctionAccess.user_adminLevel == 1 || this.FunctionAccess.user_adminLevel == 2 ){
        this.isAdmin = true;
        // this.isPlayer =false;
        // this.tabs.getByIndex(3).show = false;
        // this.tabs.getByIndex(2).show = true
        console.log("i'm Admin from tab.ts 88");
        // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','inline-block');
        // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','none');
      }else if(this.FunctionAccess.user_adminLevel == 4){
        this.isAdmin =  false;
        // this.tabs.getByIndex(2).show = false;
        // this.tabs.getByIndex(3).show = true;
        // this.isPlayer = true;
        // $('.tabs-md .tab-button:nth-child(2) .tab-button-icon').css('display','inline-block');
        // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
        console.log("i'm Player from tab.ts 91");
      }else{
        this.isAdmin =  false;
        // this.tabs.getByIndex(2).show = false;
        // this.tabs.getByIndex(3).show = true;
        // this.isPlayer = true;
        // $('.tabs-md .tab-button:nth-child(4) .tab-button-icon').css('display','inline-block');
        // $('.tabs-md .tab-button:nth-child(3) .tab-button-icon').css('display','none');
        console.log("i'm NOthing from tab.ts 91");
      }
    },100)
    
   console.log("Refresh data 123",this.refresh);
    }


   ionViewWillEnter(){
      if(this.FunctionAccess?.user_adminLevel == 1 || this.FunctionAccess?.user_adminLevel == 2 ){
        this.isAdmin = true;
        this.isPlayer =false;
        console.log("i'm Admin from tab.ts 88");
      }else if(this.FunctionAccess?.user_adminLevel == 4){
        this.isAdmin =  false;
        this.isPlayer = true;
        console.log("i'm Player from tab.ts 91");
      }else{
        this.isAdmin =  false;
        this.isPlayer = true;
        console.log("i'm NOthing from tab.ts 91");
      }   
    }


    ngOnInit(){
      this.storage.get('Refresh').then(val=>{
        var refresh = val;
        this.refresh = refresh
  
        if(!this.refresh){
         this.refresh = true;
         console.log("here 165");
         this.storage.set('Refresh',this.refresh);
          this.function()
        }else if(!val){
          console.log("Nothing")
        }
      });
    }

    function(){
      setTimeout(()=>{
        console.log("Loading");
        // window.location.reload();
        this.navCtrl.setRoot(this.navCtrl.getActiveChildNav().component)
        // window.location.reload();
      },300)
      
    }
    // ngAfterViewInit() {
    //   setTimeout(() => {
    //   console.log("this.paymentTabs 84",this.paymentTabs);
    //   // console.log("Selected Tab 85",this.paymentTabs.selectedIndex);
    //   // this.paymentTabs.select(0);
    //   }, 500);
      
    //   if(this.paymentTabs.selectedIndex == 2){
    //     console.log("selected tab is 0");
    //   }

    //   // this.player = false;
    //   this.admin = true;


    // }
      

    keyboardCheck() {
      console.log('The keyboard is open:', this.keyboard.isOpen());
    }


  ionViewDidLoad() {
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
    });
    console.log('ionViewDidLoad TabsPage');
     
    // if(this.FunctionAccess.user_adminLevel == 1 || this.FunctionAccess.user_adminLevel == 2 ){
    //   this.isAdmin = true;
    //   // this.paymentTabs.select(3)
    //   console.log("i'm Admin from tab.ts 88");
    // }else if(this.FunctionAccess.user_adminLevel == 4){
    //   this.isAdmin = false;
    //   console.log("i'm Player from tab.ts 91");
    // }else{
    //   this.isAdmin = false;
    //   console.log("i'm Nothing from tab.ts 91");
    // }
    this.storage.get('Refresh').then(val=>{
      var refresh = val;
      this.refresh = refresh

      // if(val){
      //  this.refresh = false;
      //  console.log("here 165");
      //  this.storage.set('Refresh',this.refresh);
      //   this.function()
      // }else if(!val){
      //   console.log("Nothing")
      // }
    });
  }
  getTabId($ev){

    console.log("tab id =-=--=-=-=>121",$ev.id);
    if($ev.id=='t0-4'){
      $('.tabbar').addClass('hideTaskbar')
    }
    else{
      $('.tabbar').removeClass('hideTaskbar')
    }
    

    $ev.setRoot($ev.root)

    console.log("root 136",$ev.root);
    // if($('.tabs-md .tab-button[aria-selected=true]:nth-child(3) .tab-button-icon')){
    //   console.log("jehljkfhaljhajklsdjkasjkdaks=-=-=-=-=-91")
    // }

      
    
  }
  events(){
    console.log('Events')
  }
    
  
  ionViewDidEnter() {
    // let tab=this.navCtrl.getActive()//Returns the currently selected tab
    // this.storage.get('Refresh').then(val=>{
    //   var refresh = val;
    //   this.refresh = refresh

    //   if(val){
    //    this.refresh = false;
    //    console.log("here 165");
    //    this.storage.set('Refresh',this.refresh);
    //     this.function()
    //   }else if(!val){
    //     console.log("Nothing")
    //   }
    // });
    // console.log("hi",this.refresh)

if(this.PlayerMenu){
  this.function()
}else if(!this.PlayerMenu){
  console.log("Nothing")
}
    
   }

   
  

}
