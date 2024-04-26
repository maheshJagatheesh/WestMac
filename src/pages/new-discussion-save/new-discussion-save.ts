import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Keyboard} from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { GlobalProvider } from '../../providers/global/global';
import { HttpClient, HttpParams } from'@angular/common/http';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the NewDiscussionSavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-discussion-save',
  templateUrl: 'new-discussion-save.html',
})
export class NewDiscussionSavePage {
  newDiscussionDetails = [];
  gruopsIds = [];
  personIds = [];
  personId: any;
  chatsLogos: any[] = [];
  logo_clientId: any = [];
  logo_clubId: any = [];
  groupName: any = '';
  selectedTeam: any;
  team_id: any;
  firstName:any;
  lastName:any[];
  clientId:any;
  logoPhoto: any = '';
  logoPhoto1: any = '';
  discussionIcon: any = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    public global: GlobalProvider, 
    public gFn: GlobalFunctionsProvider, 
    public keyboard: Keyboard,
    public global_api:GlobalApiProvider
    ) {
    this.newDiscussionDetails = this.navParams.get('newDiscussionDetails');
    this.gruopsIds = this.navParams.get('gruopsIds');
    this.personIds = this.navParams.get('personIds');

    this.storage.get('loggedInUserData').then((val) => {
      console.log(val);
      this.personId = val.PERSON_ID;
      this.selectedTeam = val.SELECTEDTEAM;
      this.team_id = val.SELECTEDTEAM;
      this.firstName = val.FIRST_NAME;
      this.lastName = val.LAST_NAME;
      this.clientId = val.CLIENT_ID;

      let chatLogo = new HttpParams()
         .set('personId', this.personId);
        let loading = loadingCtrl.create();
        loading.present();
        this.http.post<any>(this.global.APIURL+'messages/getClientLogos', chatLogo,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          loading.dismiss();
          if(response.SUCCESS){
            let getChatsLogo = response.CLIENTLOGOS;
            for(var key in getChatsLogo){
              this.chatsLogos.push(getChatsLogo[key]);
              }
            }
          });
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  deletedPersonName(personId,ev){
    this.newDiscussionDetails = this.newDiscussionDetails.filter((i: any) => i.id !== personId);
    $('.select-card[id=' + personId + ']').removeClass("divDisable");
    $('.select-card[id=' + personId + ']').find(".card-img span").removeClass("active");

    this.gruopsIds = this.gruopsIds.filter((i: any) => i !== personId);
    this.personIds = this.personIds.filter((i: any) => i !== personId);
  }

  createChatGroup(DiscussionDetails,groupName,gruopsIds,personIds,photo){
    console.log(photo);

   if(groupName != '' && photo != '' && (gruopsIds.length > 0 || personIds.length > 0)){
      let chatLogo = new HttpParams()
          .set('groupIds', JSON.stringify(gruopsIds))
          .set('personIds', JSON.stringify(personIds))
          .set('groupName', groupName)
          .set('groupType', '3')
          .set('discussionIcon', photo)
          .set('createdBy', this.personId);
          let loading = this.loadingCtrl.create();
          loading.present();
        this.http.post<any>(this.global.APIURL + 'messages/saveChatGroupDetails', chatLogo,{headers:this.global_api.getHeader()})
        .subscribe(response => {
            loading.dismiss();
            if(response.SUCCESS){
              const chatInfo = {
                from : 1,
                to : 10,
                person_id : this.personId,
                selectedTeam : this.selectedTeam,
                groupid : response.GROUPID,
                teamid : this.team_id,
                grouptype : 3,
                flag : 1,
                userPhoto: photo,
                groupName : groupName,
                accFirstName : this.firstName,
                accLastName : this.lastName,
                clientId :this.clientId
              };
              this.navCtrl.push('GroupChatViewPage',{data: chatInfo})
          }
          });
    }else{
      if(groupName == ''){
        this.gFn.presentToast('Please enter discussion name.');
      }else if(photo == ''){
        this.gFn.presentToast('Please select any discussion icon.');
      }else if(gruopsIds.length == 0 || personIds.length == 0){
        this.gFn.presentToast('Please select any group or person.');
      }
    }
  }

  saveLogoDetails(ev){
   this.discussionIcon = $(ev.target).attr('id');
   //$(ev.target).addClass("active");
   
   if($(ev.target).hasClass('background_color_hover') == true){
    $(".background_color_hover").removeClass("active");
    $(ev.target).addClass("active");
  }else{
    $(".background_color_hover").removeClass("active");
    $(ev.target).parents(".background_color_hover").addClass("active");
  }

   /* this.logo_clientId = datalogo.CLIENTID;
    this.logo_clubId = datalogo.CLUBID;
    this.logoPhoto = datalogo.SPORTBANNER;
    this.logoPhoto1 = datalogo.BANNERIMAGE; */
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewDiscussionSavePage');
  }

  mBottom: string = "";
  keyboardCheck() {
    if (this.mBottom == "") {
      this.mBottom = $(".scroll-content").css("margin-bottom");
    }
    if (this.keyboard.isOpen()) {
      $(".scroll-content").css("margin-bottom", "0");
      this.gFn.hideMenuIcon();
    }
    else {
      $(".scroll-content").css("margin-bottom", '56px');
      this.gFn.showMenuIcon();
    }
  }
  
  inputFocus() {
    this.keyboardCheck()
  }

  inputBlur() {
    this.keyboardCheck()
  }

}
