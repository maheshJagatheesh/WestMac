import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
  PhotoApiUrl: string;
  personDetail: any;
  personId:number = 27443; //default value
  clientId:number = 46; //default value
  clubDivisionId:number = 1456; //default value
  surveyId:number = 1; //default value
  eventId:number = 20; //default value
  FunctionAccess: any;
  surveyQuestionList: any = [];
  surveyAnswerList:any = [];
  alreadySaved:boolean = true;


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,
    public global: GlobalProvider, private events: Events, public http: HttpClient, public storage: Storage,
    public modalCtrl: ModalController, public gFn: GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
    this.gFn.hideMenuIcon();
    this.PhotoApiUrl = this.global.PROFILEIMAGEURL;

    var surveyId = navParams.get("surveyId");
    if(surveyId){
      this.surveyId = parseInt(surveyId);
    }

    var eventId = navParams.get("eventId");
    if(eventId){
      this.eventId = parseInt(eventId);
    }

    var clientId = navParams.get("clientId");
    if(clientId){
      this.clientId = parseInt(clientId);
    }

    var clubDivisionId = navParams.get("clubDivisionId");
    if(clubDivisionId){
      this.clubDivisionId = parseInt(clubDivisionId);
    }

    var personId = navParams.get("personId");
    if(personId){
      this.personId = parseInt(personId);
    }
  }

  ionViewDidLoad() {
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
    });
    this.storage.get('loggedInUserData').then((val) => {
      this.personDetail = val;
      let loader = this.loadingCtrl.create({});
      loader.present();
      loader.dismiss();
    })
    this.getsurveyquestion();
    this.gFn.hideFormAccessoryBar(false);
  }

  ionViewWillLeave(){
    this.gFn.showMenuIcon();
  }

  eventDetails: any = [];
  surveyData: any = [];
  saveSurveyQuestionDetails: any = [[], [], []];
  questionType: any = "";
  surveyForm: any = {};
  tempArray: any = [];

  getsurveyquestion() {
    let loginData4 = new HttpParams()
      .set('surveyId', this.surveyId.toString())
      .set('eventId', this.eventId.toString())
      .set('personId', this.personId.toString())
      .set('clientId', this.clientId.toString())
      .set('clubDivisionId', this.clubDivisionId.toString());
    this.http.post(this.global.APIURL + "players/getSurveyQuestion", loginData4,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        this.eventDetails = data.EVENTINFO;
        this.surveyData = data.SURVEYQUESTION;
        var alreadySaved = false;
        for (var key in this.surveyData) {
          this.questionType = this.surveyData[key].QUESTIONTYPE;
          this.surveyQuestionList.push(this.surveyData[key]);
          this.saveSurveyQuestionDetails[0].push(this.surveyData[key].SURVEYQUESTIONID);
          this.saveSurveyQuestionDetails[1].push(this.surveyData[key].SCALEFROM);
          this.saveSurveyQuestionDetails[2].push(this.surveyData[key].ANSWERVALUE);
          if(this.surveyData[key].ANSWERVALUE != ""){
            alreadySaved = true;
          }
        }
        this.alreadySaved = alreadySaved;
        if(alreadySaved){
          jQuery(".already-filled-text").show();
        }
      }, error => {
      });
  }

  
  surveyAns: any = [];


  rangeChange(index, surveyAns) {
    this.surveyAnswerList[index] = surveyAns;
  }

  selectBox(index, surveyAns) {
    this.surveyAnswerList[index] = surveyAns;
  }

  textChange(index, surveyAns) {
    this.surveyAnswerList[index] = surveyAns;
  }

  yesNoType(index, surveyAns) {
    if(surveyAns){
      this.surveyAnswerList[index] = 1;
    }else{
      this.surveyAnswerList[index] = 0;
    }
    
    console.log(this.surveyAnswerList[index]);
  }



  surveyTextForm: any = {};
  surveyArray: any = [];
  surveyArray1: any = [];

  rangeArray: any = [];

  save() {
    let loader = this.loadingCtrl.create({});
    loader.present();
    var answerValues = [];
    var surveyQuesIds = [];

    for (var key in this.surveyData) {
      surveyQuesIds.push(this.surveyData[key].SURVEYQUESTIONID);
      if(typeof this.surveyAnswerList[key] !== "undefined"){
        answerValues.push(this.surveyAnswerList[key]);
        
        console.log(this.surveyAnswerList[key]);
      }
      else{
        switch(this.surveyData[key].QUESTIONTYPE){
          case 0:
            answerValues.push(this.surveyData[key].SCALEFROM);
            break;
          case 1:
              answerValues.push(this.surveyData[key].OPTIONLIST[0].SURVEYOPTIONID);
              break;
          case 2:
              answerValues.push("");
              break;
          case 3:
              answerValues.push("1");
              break;
        }
      }
    }

    
    let data = new HttpParams()
      .set('surveyId', this.surveyId.toString())
      .set('eventId', this.eventId.toString())
      .set('personId', this.personId.toString())
      .set('clientId', this.clientId.toString())
      .set('clubDivisionId', this.clubDivisionId.toString())
      .set('questionIds', JSON.stringify(surveyQuesIds))
      .set('answerValues', JSON.stringify(answerValues));

    this.http.post(this.global.APIURL + "players/saveSurvey", data,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        this.alreadySaved = true;
        loader.dismiss();
      }, error => {
        loader.dismiss();
      });
  }

  backArrow() {
    this.gFn.showMenuIcon();
    this.navCtrl.pop();
  }
}
