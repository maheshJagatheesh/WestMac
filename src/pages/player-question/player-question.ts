import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

@IonicPage()
@Component({
  selector: 'page-player-question',
  templateUrl: 'player-question.html',
})
export class PlayerQuestionPage{
  PhotoApiUrl:string;
  personDetail: any;
  personId: any;
  QuestionDetails: any = [];
  RPE_QuestionDetails: any =[];
  muscle_QuestionDetails:any=[];
  rpe_time:any='';
  All_QuestionDetails: any =[];
  OptionArray: any = [];
  saveFunction: any
  UpcomingSingleEvent:any;
  person_id: any;
  QuestionData: any = [];
  Player_detail: any;
  SkeletonSide:any='Back';
  skeletonSelected:any=[[],[],[]];
  FrontData:any=[];
  MuscleSoreData:any=[];
  MuscleSoreBackData:any=[];
  BackData:any=[];
  lastSelectedPath:any='';
  sorenessPrev:any=0;
  // sorenessNew:any='';
  sorenessPrevIndex:any=-1;
  Target:any;
  PreSelected:any='Play';
  FunctionAccess:any;
  saveQuestionDetails:any=[[],[],[]]
  muscleName:any;
  selectDeselect:any=0;
  injuredFrontPart: any = [];
  injuredBackPart: any = [];
  muscleData:any=[];
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,
    public global: GlobalProvider, private events: Events, public http: HttpClient, public storage: Storage,
    public modalCtrl: ModalController, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
      this.gFn.hideMenuIcon();
      this.PhotoApiUrl=this.global.PROFILEIMAGEURL

    var Player_detail = navParams.get('Player_detail');
    this.Player_detail=Object.keys(Player_detail).reduce((c, k) => (c[k.toLowerCase()] =Player_detail[k], c), {})
    // console.log(this.Player_detail)
    // this.saveFunction = {
    //   RPE: 0, muscle: 0, SleepQuality: 0, SleepTime: 0, xtra_hrs: 0, OwnPerformance: 0, MentalPreparedness: 0,
    //   Nutrition: 0, Stresslevel: 0, illness: 0, illness_detail: 0, Hydration: 0, Fatigue: 0,Soreness:0
    // }
  }

  ionViewDidLoad() {
    this.storage.get('FunctionAccess').then((val) => {
      this.FunctionAccess = val;
    })
    this.storage.get('UpcomingSingleEvent').then((val)=>{
      this.UpcomingSingleEvent=JSON.parse(val)
      // console.log(val)
    })
    this.storage.get('loggedInUserData').then((val) => {
      this.personDetail=val;
      // console.log(this.personDetail)
      // this.personId = val.PERSON_ID;
      let loader = this.loadingCtrl.create({});
      loader.present();
      this.personDetail=val;
      this.QuestionsDetails(this.personDetail.PERSON_ID).then((x)=>{
        // loader.dismiss();
      })
      this.getBodyPartsDetails()
      loader.dismiss();
    })
    
  }

  backArrow() {
    this.gFn.showMenuIcon();
    this.navCtrl.pop();
  }
  
  // AlocateValues(val){
    
  //   this.saveFunction = {
  //     RPE:val.RPE, muscle: 0, SleepQuality:val.SLEEP_QUALITY, SleepTime: val.SLEEP, 
  //     xtra_hrs: 0, OwnPerformance: val.PERFORMED_MATCH, 
  //     MentalPreparedness: val.MENTAL_PREP, Nutrition: val.NUTRITION, Stresslevel: 0, 
  //     illness: 0, illness_detail: 0, 
  //     Hydration: val.HYDRATION, Fatigue:val.FATIGUE,Soreness:0
  //   }
  // }
  ReadSavedData(soreness,id){
    
      // console.log(id)
      // if(this.PreSelected=='Play'){
      //   if(soreness==0){
      //     $(id).addClass('light-0')
      //   }
      //   else if(soreness==1){
      //     $(id).addClass('light-meduim-1')
      //   }
      //   else if(soreness==2){
      //     $(id).addClass('medium-2')
      //   }
      //   else if(soreness==3){
      //     $(id).addClass('dark-meduim-3')
      //   }
      //   else if(soreness==4){
      //     $(id).addClass('dark-4')
      //   }
      // }
    
  }
  QuestionsDetails(person_id) {
    this.person_id = person_id;
    let selectedTeam = this.personDetail.SELECTEDTEAM;
    if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
      selectedTeam = this.UpcomingSingleEvent.teamid;
    }else if(this.UpcomingSingleEvent.event_type_id == 1){
      if(this.UpcomingSingleEvent.homeclubid == this.personDetail.CLUB_ID){
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      }else{
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }
    return new Promise((resolve) => {
      let loginData4 = new HttpParams()
        .set('person_id', this.Player_detail.person_id)
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('event_type_id', this.UpcomingSingleEvent.event_type_id)
        .set('check', '0')
        .set('IsParent', this.personDetail.ISPARENT)
        .set('selectedTeam', selectedTeam)
        .set('season_id', this.personDetail.SEASON_ID)
        .set('client_id', this.UpcomingSingleEvent.client_id);
        

      this.http.post(this.global.APIURL + "welfares/getWelfareInfoData", loginData4,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          console.log(data);
          var WelfareInfo=data.GETWELFAREINFODATA
          // console.log(WelfareInfo)
          for(var key in WelfareInfo){
            if(WelfareInfo[key].question_id==1){
              if(WelfareInfo[key].question_option_list!=''){
                this.RPE_QuestionDetails.push(WelfareInfo[key])
                this.saveQuestionDetails[0].push(WelfareInfo[key].question_id)
                if(WelfareInfo[key].selected_option=='' || WelfareInfo[key].selected_option==null){
                  WelfareInfo[key].selected_option='';
                }
                this.saveQuestionDetails[1].push(WelfareInfo[key].selected_option)
                this.saveQuestionDetails[2].push(WelfareInfo[key].question_ans)
                console.log("1234",this.saveQuestionDetails[1]);
              }
              this.rpe_time=WelfareInfo[key].rpe_time;
            }
            else if(WelfareInfo[key].question_id==25){
              if(WelfareInfo[key].question_option_list!=''){
                this.muscle_QuestionDetails.push(WelfareInfo[key])
                console.log('muscle_QuestionDetails',this.muscle_QuestionDetails)
              }
              
            }
            else{
              if(this.saveQuestionDetails[0].length==0){
                this.saveQuestionDetails[0].push(1)
                this.saveQuestionDetails[1].push(1)
                this.saveQuestionDetails[2].push('');
              }
              if((WelfareInfo[key].question_type != 1) || ((WelfareInfo[key].question_type == 1 || WelfareInfo[key].question_type == 4) && WelfareInfo[key].question_option_list!='')){
                this.All_QuestionDetails.push(WelfareInfo[key])
                console.log(WelfareInfo[key])
                console.log(this.All_QuestionDetails)
                this.saveQuestionDetails[0].push(WelfareInfo[key].question_id)
                if(WelfareInfo[key].selected_option=='' || WelfareInfo[key].selected_option==null){
                  WelfareInfo[key].selected_option='';
                }
                this.saveQuestionDetails[1].push(WelfareInfo[key].selected_option);
                if(WelfareInfo[key].question_type !=1){
                  if(WelfareInfo[key].question_type == 2 && (WelfareInfo[key].question_ans=='' || WelfareInfo[key].question_ans==null)){
                    WelfareInfo[key].question_ans = 0;
                  }
                }
                this.saveQuestionDetails[2].push(WelfareInfo[key].question_ans);
              }
              console.log(this.saveQuestionDetails)
              
            }
          }
          
          resolve(true);
          
          
        }, error => {
        });
    });
  }
  getBodyPartsDetails(){
    let musclessData = new HttpParams()
        .set('person_id',  this.Player_detail.person_id)
        .set('event_id', this.UpcomingSingleEvent.event_id)
        .set('gender', '')
        .set('side', '');
        
        this.http.post(this.global.APIURL + "welfares/getMusclesWithSoreness", musclessData,{headers:this.global_api.getHeader()})
          .subscribe((data: any) => {
            var data1=data.GETMUSCLESWITHSORENESS
            if(data1.length>0){
              for(var key in data1){
                    if(data1[key].side==1 && data1[key].gender==this.Player_detail.gender){
                  this.FrontData.push(data1[key])
                      this.muscleData['muscleid'] = data1[key].muscle_id;
                      this.muscleData['soreness'] = data1[key].soreness;
                      console.log('Front Muscle id: ' + this.muscleData['muscleid'] + ', Soreness is: ' + this.muscleData['soreness']);
                      this.MuscleSoreData.push({ 'Muscle': this.muscleData['muscleid'], 'Soreness': this.muscleData['soreness'] })

                }
                else if(data1[key].side==2 && data1[key].gender==this.Player_detail.gender){
                  this.BackData.push(data1[key])
                  this.muscleData['muscleid'] = data1[key].muscle_id;
                      this.muscleData['soreness'] = data1[key].soreness;
                      console.log('Back Muscle id: ' + this.muscleData['muscleid'] + ', Soreness is: ' + this.muscleData['soreness']);
                      this.MuscleSoreBackData.push({ 'Muscle': this.muscleData['muscleid'], 'Soreness': this.muscleData['soreness'] })

                }
              }
            }
            console.log(this.FrontData)
            console.log(this.BackData)
            console.log(this.MuscleSoreData)

            console.log(this.MuscleSoreBackData)
            this.calInjuredPart()
            
          })

  }

  calInjuredPart(){
    let front_part = [];
    let back_part = [];
    this.FrontData.forEach(part => {
      if(part.soreness >= 1){
        this.injuredFrontPart.push(part)
      }
    });

    this.BackData.forEach(part =>{
      if(part.soreness >= 1){
        this.injuredBackPart.push(part)
      }
    })
    // console.log("total front part 236",this.injuredFrontPart ,"Back Part",this.injuredBackPart);
    // this.muscle_QuestionDetails={
    //   'front_part':this.injuredFrontPart,
    //   'back_part':this.injuredBackPart
    // }
    this.muscle_QuestionDetails[0].front_part ='Front : '+this.injuredFrontPart.length +' selected';
    this.muscle_QuestionDetails[0].back_part = 'Back  : '+ this.injuredBackPart.length +' selected';

    console.log("new Muscle_Question 251",this.muscle_QuestionDetails[0]);
  }

  ReadPrevData(){
    if(this.skeletonSelected[0].length-1==this.skeletonSelected[1].length){
      this.skeletonSelected[1].push(this.sorenessPrev)
      this.sorenessPrev=0
    }
    if(this.sorenessPrevIndex!=-1){
      this.skeletonSelected[1][this.sorenessPrevIndex]=this.sorenessPrev
      this.sorenessPrevIndex=-1;
    }
  }

  
  skeletonColorChange(){
    this.PreSelected='Pause'
    var pathData=this.Target.split(',')
    for(var key in pathData){
      var id=pathData[key]
      if(this.sorenessPrev==0){
        $(id).removeClass('grey-default')
        $(id).removeClass('dark-4')
        $(id).removeClass('dark-meduim-3')
        $(id).removeClass('medium-2')
        $(id).removeClass('light-meduim-1')
        $(id).addClass('light-0')
      }
      else if(this.sorenessPrev==1){
        $(id).removeClass('grey-default')
        $(id).removeClass('dark-4')
        $(id).removeClass('dark-meduim-3')
        $(id).removeClass('medium-2')
        $(id).removeClass('light-0')
        $(id).addClass('light-meduim-1')
      }
      else if(this.sorenessPrev==2){
        $(id).removeClass('grey-default')
        $(id).removeClass('dark-4')
        $(id).removeClass('dark-meduim-3')
        $(id).removeClass('light-0')
        $(id).removeClass('light-meduim-1')
        $(id).addClass('medium-2')
      }
      else if(this.sorenessPrev==3){
        $(id).removeClass('grey-default')
        $(id).removeClass('dark-4')
        $(id).removeClass('medium-2')
        $(id).removeClass('light-0')
        $(id).removeClass('light-meduim-1')
        $(id).addClass('dark-meduim-3')
      }
      else if(this.sorenessPrev==4){
        $(id).removeClass('grey-default')
        $(id).removeClass('dark-meduim-3')
        $(id).removeClass('medium-2')
        $(id).removeClass('light-0')
        $(id).removeClass('light-meduim-1')
        $(id).addClass('dark-4')
      }
    }
   
  }
  skeletonSelectedData(paramData,event,SelectDeselect){
    console.log("317",paramData)
    console.log(event)
    console.log(SelectDeselect)
    // console.log("soreness value ",this.sorenessPrev,"Last Selected path ",this.lastSelectedPath);
    if(this.sorenessPrev==0 && this.lastSelectedPath){
      // console.log('Test')
      var pathData=this.lastSelectedPath.split(',')
      console.log(" path Day", pathData);
      for(var key in pathData){
        var id=pathData[key]
        $(id).removeClass('light-0')
        $(id).addClass('grey-default')
      }

      
    }
    if(SelectDeselect==0){
      // console.log('Test2')
      this.selectDeselect=1
      // console.log(this.selectDeselect)
  }
    this.Target=event;
    this.lastSelectedPath=event;
    // console.log(this.Target)
    this.muscleName=paramData.tissue_name;
    var data=paramData.muscle_id;
    if(this.skeletonSelected[0].length-1==this.skeletonSelected[1].length){
      this.skeletonSelected[1].push(this.sorenessPrev)
      this.sorenessPrev=0
    }
    if(this.sorenessPrevIndex!=-1){
      this.skeletonSelected[1][this.sorenessPrevIndex]=this.sorenessPrev
      this.sorenessPrevIndex=-1;
      
      if(SelectDeselect==1){
        var pathData=this.Target.split(',')
        for(var key in pathData){
          var id=pathData[key]
          $(id).removeClass('dark-meduim-3')
          $(id).removeClass('medium-2')
          $(id).removeClass('light-meduim-1')
          $(id).removeClass('dark-4')
          $(id).removeClass('light-0')
          $(id).addClass('grey-default')
        }
        this.selectDeselect=0
        // console.log(this.selectDeselect)
      }
    }
    var getDataindex;
    if(!this.skeletonSelected[0].includes(data)){
      this.sorenessPrev=paramData.soreness
      this.skeletonSelected[0].push(data)
      getDataindex=this.skeletonSelected[0].indexOf(data)
    }
    else{
      if(this.saveQuestionDetails[0].length==0){
        this.saveQuestionDetails[0].push(1)
        this.saveQuestionDetails[1].push(1)
        this.saveQuestionDetails[2].push('');
      }
      getDataindex=this.skeletonSelected[0].indexOf(data)
      this.sorenessPrev=this.skeletonSelected[1][getDataindex]
      this.sorenessPrevIndex=getDataindex;
      // this.sorenessNew=this.sorenessPrev
    }
    if(this.selectDeselect==1){
      this.skeletonColorChange();
    }
    
    
  }

  save() {
    if(this.skeletonSelected[0].length-1==this.skeletonSelected[1].length){
      this.skeletonSelected[1].push(this.sorenessPrev)
      this.sorenessPrev=0
    }
    if(this.sorenessPrevIndex!=-1){
      this.skeletonSelected[1][this.sorenessPrevIndex]=this.sorenessPrev
      this.sorenessPrevIndex=-1;
    }

    // console.log(this.saveQuestionDetails[0]);
    // console.log(this.saveQuestionDetails[1]);

    console.log(this.skeletonSelected[0]);

    console.log(this.skeletonSelected[1]);
    let selectedTeam = this.personDetail.SELECTEDTEAM;
    if(this.UpcomingSingleEvent.event_type_id == 2 && this.UpcomingSingleEvent.teamid){
      selectedTeam = this.UpcomingSingleEvent.teamid;
    }else if(this.UpcomingSingleEvent.event_type_id == 1){
      if(this.UpcomingSingleEvent.homeclubid == this.personDetail.CLUB_ID){
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      }else{
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }
    let loginData = new HttpParams()
      .set('event_id', this.UpcomingSingleEvent.event_id)
      .set('person_id', this.Player_detail.person_id)
      .set('client_id', this.UpcomingSingleEvent.client_id)
      .set('selectedTeam', selectedTeam)
      .set('rpe_time', this.rpe_time)
      .set('question_ids', JSON.stringify(this.saveQuestionDetails[0]))
      .set('question_ans_opts', JSON.stringify(this.saveQuestionDetails[1]))
      .set('question_ans_vals', JSON.stringify(this.saveQuestionDetails[2]))
      .set('muscle_id', JSON.stringify(this.skeletonSelected[0]))
      .set('sorenesses', JSON.stringify(this.skeletonSelected[1]));
      

    //console.log(loginData)
    this.http.post(this.global.APIURL + "welfares/saveWalfareInfoData", loginData,{headers:this.global_api.getHeader()})
      .subscribe((data: any) => {
        
        if (this.FunctionAccess && this.FunctionAccess.event_Welfare == 'self') {
          this.gFn.showMenuIcon();
    this.navCtrl.pop();
        }
        else {
          this.gotoPage();
        }
      }, error => {
        //console.log(error);
      });
  }
  modal(id_value) {
    let RPE = this.modalCtrl.create('RatedPerceivedPage', { id: id_value });
    RPE.present();
  }
  gotoPage() {
    this.navCtrl.push('EventWelfarePage');
  }

  flip_skeleton(event){
    if(this.SkeletonSide=='Back'){
      this.SkeletonSide='Front'
      $(event.target).closest('.Muscle_Soreness').find('.Front').show()
      $(event.target).closest('.Muscle_Soreness').find('.Back').hide()

    }
    else{
      this.SkeletonSide='Back'
      $(event.target).closest('.Muscle_Soreness').find('.Front').hide()
      $(event.target).closest('.Muscle_Soreness').find('.Back').show()
    }
  }

  btnChange(thisOptionId, selectedOptionId,questionId,question_option,i) {
    console.log("thisOptionId :----->",thisOptionId);
    console.log("selectedOptionId :- ",selectedOptionId);
    console.log("questionId :- ",questionId)
    console.log("question_option :- ",selectedOptionId)
    // document.getElementById(i).setAttribute("value",question_option);
    // this.answer = question_option;
    // document.getElementById(i).innerText = question_option
    // if(selectedOptionId == ''){
    //   console.log("in '' of selectedOptionId");
    //   document.getElementById(i).innerText = question_option    
    // }
    // else{
    //   console.log("error of btn");
    // }
   
    var thisOption = '#Image_'+questionId+'_'+thisOptionId;
    var selectedOption = '#Image_'+questionId+'_'+selectedOptionId;
    var className = 'Image_'+questionId;
    $('.'+className).each(function(i, obj){
      $(obj).removeClass('ImageActive');
      $(''+selectedOption).attr('style','');
    });
    $(thisOption).addClass('ImageActive');
  }
}
