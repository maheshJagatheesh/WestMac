import { filter } from 'rxjs/operators';
import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  Events,
  Content,
  Keyboard,
  Platform,
  ToastController,
} from "ionic-angular";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Storage } from "@ionic/storage";

import { GlobalProvider } from "../../providers/global/global";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { GlobalFunctionsProvider } from "../../providers/global-functions/global-functions";
import { GlobalApiProvider } from "../../providers/global-api/global-api";

@IonicPage()
@Component({
  selector: "page-injury-incident-report",
  templateUrl: "injury-incident-report.html",
})
export class InjuryIncidentReportPage {
  UpcomingSingleEvent: any;
  PersonData: any;
  injured_person_id: any;
  GETINCIDENT: any = [];
  InjuryArray: {
    key: string;
    value: string[];
    selected: false;
    area_id: string[];
    area_data: string[];
    show: any;
    status:any;
    area_specify:any;
    msg_status:any;

  }[] = [];
  GETPERSONDETAILS: any;
  OccuredatClub: any = [];
  CausedbyCollision: any = [];
  RecurrentInjury: any = [];
  CollisionReason: any = "";
  RecurrentOption: any = "";
  incident_area_ids: any = [];
  incident_area_datas: any = [];
  incident: any = 0;
  incidentactivity: any = "";
  incident_time: any = "";
  incidentwitnesses: any = "";
  followuptreatment: any = "";
  relativeInformed: any = 0;
  FunctionAccess: any;
  dropdownValues: any = [];
  @ViewChild(Content) content: Content;
  incident_id: any;
  seasonId: any;
  injurySaveButton: boolean;
  eventId: any;
  InjurySelectedValues: any = [];
  InjuryCauseArray: any = [];
  updatedData: any;
  incident_otherarea_ids: any = [];
  incident_otherarea_text: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public modalCtrl: ModalController,
    private http: HttpClient,
    private storage: Storage,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public events: Events,
    public keyboard: Keyboard,
    public statusBar: StatusBar,
    public gFn: GlobalFunctionsProvider,
    public global_api: GlobalApiProvider,
    private toastCtrl: ToastController
  ) {
    this.gFn.hideMenuIcon();
    gFn.hideFormAccessoryBar();
    platform.registerBackButtonAction(() => {
      this.close();
    });
  }

  ionViewDidLoad() {
    this.statusBar.hide();
    this.storage.get("FunctionAccess").then((val) => {
      this.FunctionAccess = val;
    });

    if (
      this.navParams.get("injured_person_id") &&
      this.navParams.get("event_id")
    ) {
      this.injured_person_id = this.navParams.get("injured_person_id");
      this.eventId = this.navParams.get("event_id");
      this.incident_id = this.navParams.get("incident_id");
      this.seasonId = this.navParams.get("season_id");
      this.injurySaveButton = false;
      this.storage.get("loggedInUserData").then((val) => {
        this.PersonData = val;
        let loader = this.loadingCtrl.create({});
        loader.present();
        this.getIncidentReport().then((z) => {
          if (z) {
            this.occuredAtClub().then((x) => {
              // if (x) {
              //   this.causedByCollision().then((y) => {
              //     if (y) {
              //       this.recurrentInjury();
              //       loader.dismiss();
              //     }
              //   });
              // }
              loader.dismiss();
            });
          }
        });
      });
    } else {
      this.injured_person_id = this.navParams.get("injured_person_id");
      this.incident_id = this.navParams.get("incident_id");
      this.seasonId = this.navParams.get("season_id");
      this.injurySaveButton = true;
      this.storage.get("UpcomingSingleEvent").then((val) => {
        this.UpcomingSingleEvent = JSON.parse(val);
        this.eventId = this.UpcomingSingleEvent.event_id;
        this.storage.get("loggedInUserData").then((val) => {
          this.PersonData = val;
          let loader = this.loadingCtrl.create({});
          loader.present();
          this.getIncidentReport().then((z) => {
            if (z) {
              this.occuredAtClub().then((x) => {
                // if (x) {
                //   this.causedByCollision().then((y) => {
                //     if (y) {
                //       this.recurrentInjury();
                //       loader.dismiss();
                //     }
                //   });
                // }
                loader.dismiss();
              });
            }
          });
        });
      });
    }
    console.log("incidentiddd",this.incident_id)

  }

  ionViewDidLeave() {
    if (this.FunctionAccess.event_Injury == "self") {
      this.gFn.showMenuIcon();
    }
  }

  close() {
    this.navCtrl.pop();
  }
  parentsCalled(relativeInformed) {
    if (this.FunctionAccess.user_adminLevel != 4) {
      if (relativeInformed == 0) {
        this.relativeInformed = 1;
      } else if (relativeInformed == 1) {
        this.relativeInformed = 0;
      }
    }
  }


  gotoSelectDropView(Data, resultarray, group_id, index) {


    this.navCtrl.push("InjuryCausePage", {
      Data: Data,
      group_id: group_id,
      SELECTEDTEAM: this.PersonData.SELECTEDTEAM,
      incident_id: this.incident_id,
      injured_person_id: this.injured_person_id,
      incident_area_ids: JSON.stringify(resultarray.area_id),
      incident_area_datas: JSON.stringify(resultarray.area_data),
      dropdownValues: JSON.stringify(resultarray.status),
      resultarray: JSON.stringify(resultarray),
      msgstatus:JSON.stringify(resultarray.msg_status),
      selectedValues: JSON.stringify(this.InjuryCauseArray),
      index,
      callback: this.myCallbackFunction,
    });
     
    setTimeout(() => {
     console.log("resultarray",resultarray)
     console.log("msggg",resultarray.msg_status)
    }, 2000);
  }
  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      var data = _params;
      // this.incident_area_ids = [];
      // this.incident_area_datas = [];
      this.InjuryArray[data.index].status = [...data.updatedStatus]
      console.log('updated Injury Array', this.InjuryArray)
      var selectedobj = JSON.parse(data.injuryselectedValues);
      this.showAndhideIncident(selectedobj);

     var area_ids = selectedobj.area_id;
      var area_datas = selectedobj.area_data;
      // var other_area_ids = selectedobj.other_area_id;
      // var other_area_text = selectedobj.other_area_text;
      this.incident_area_ids = []

      const areaId = this.InjuryArray.map(element => {
        return element.status.filter(data => !data.specify && data.status)
    });


    areaId.forEach((data) => {
      data.forEach(element => {
        this.incident_area_ids.push(element.id);
        //this.incident_otherarea_text.push(element.specifyValue);
      });
    })

      this.incident_area_datas = []
      const incident_area_dataObj = this.InjuryArray.map(element => {
        return element.status.filter(data => !data.specify && data.status)
    });

    incident_area_dataObj.forEach((data) => {
      data.forEach(element => {
        this.incident_area_datas.push(true);
        
      });
    })




      this.incident_otherarea_ids = [];
      this.incident_otherarea_text = [];
      const otherarea = this.InjuryArray.map(element => {
          return element.status.filter(data => data.specify && data.status)
      });

      otherarea.forEach((data) => {
        data.forEach(element => {
          this.incident_otherarea_ids.push(element.id);
          this.incident_otherarea_text.push(element.specifyValue);
        });
      })

      console.log('otherareaaa', otherarea)
      console.log('otherareaaaid', this.incident_otherarea_ids)
      
     
      this.dropdownValues = JSON.parse(data.dropdownValues);

    
      // if (selectedobj.value.length > 0) {
        const updatedData = this.replaceIfExists(
          this.InjuryCauseArray,
          selectedobj
        );
        this.InjuryCauseArray = updatedData;

        this.compareSelectedValues(this.InjuryCauseArray, this.InjuryArray);
      //}

      this.refreshSelectedItems()
      resolve(true);
    });
  };

  refreshSelectedItems(){
    this.InjuryArray = this.updateSelectedStatus(this.InjuryArray);
  }

  getIncidentReport() {
    return new Promise((resolve) => {
      let data = new HttpParams()
        .set("clientTimeZone", this.PersonData.CLIENTTIMEZONE)
        .set("selectedTeam", this.PersonData.SELECTEDTEAM)
         .set('person_id', this.injured_person_id)
        //.set("person_id", "175584")
        .set("event_id", this.UpcomingSingleEvent.event_id)
        .set("client_id", this.PersonData.CLIENT_ID)
        .set("club_id", this.PersonData.CLUB_ID)
        .set("incident_id", this.incident_id)
        .set("incident_group_ids", "25,26,27,28,29,30,31,32,33");
      this.http
        .post<any>(this.global.APIURL + "incidents/getIncidentReport", data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (response) => {
            var groupId6 = { groupId: 6, count: response[6] + response[7] };
            var groupId8 = { groupId: 8, count: response[8] };
            var groupId11 = { groupId: 11, count: response[11] };
            var groupId14 = { groupId: 14, count: response[14] };
            var groupId15 = { groupId: 15, count: response[15] };
            var groupId16 = { groupId: 16, count: response[16] };

            this.dropdownValues.push(groupId6);
            this.dropdownValues.push(groupId8);
            this.dropdownValues.push(groupId11);
            this.dropdownValues.push(groupId14);
            this.dropdownValues.push(groupId15);
            this.dropdownValues.push(groupId16);

            this.GETPERSONDETAILS = response.GETPERSONDETAILS;
            this.GETINCIDENT.push(response.GETINCIDENT);
            this.followuptreatment = this.GETINCIDENT[0].followuptreatment;
            this.incidentactivity = this.GETINCIDENT[0].incidentactivity;
            this.incidentwitnesses = this.GETINCIDENT[0].incidentwitnesses;
            this.incident = this.GETINCIDENT[0].injury_status;
            this.relativeInformed = this.GETINCIDENT[0].relativeInformed;
            this.incident_time = this.GETINCIDENT[0].incident_time;

            resolve(true);
          },
          (error) => {
            resolve(false);
            alert("Data not found or Connection issue.");
          }
        );
    });
  }

  RecordInjury() {
   

    // if (this.CollisionReason != "") {
    //   for (var key in this.CausedbyCollision) {
    //     if (
    //       this.CausedbyCollision[key]["INCIDENT_AREA_ID"] !=
    //       this.CausedbyCollision[this.CollisionReason]["INCIDENT_AREA_ID"]
    //     ) {
    //       var collision_Areaid =
    //         this.CausedbyCollision[key]["INCIDENT_AREA_ID"];
    //       var collision_AreaData: any = 1;
    //       this.AddIncidentId(collision_Areaid, collision_AreaData);
    //     }
    //   }
    //   var collision_Areaid =
    //     this.CausedbyCollision[this.CollisionReason]["INCIDENT_AREA_ID"];
    //   var collision_AreaData =
    //     this.CausedbyCollision[this.CollisionReason]["AREA_DATA"];
    //   this.AddIncidentId(collision_Areaid, collision_AreaData);
    // }
    // if (this.RecurrentOption != "") {
    //   for (var key in this.RecurrentInjury) {
    //     if (
    //       this.RecurrentInjury[key]["INCIDENT_AREA_ID"] !=
    //       this.RecurrentInjury[this.RecurrentOption]["INCIDENT_AREA_ID"]
    //     ) {
    //       var Recurrent_Areaid = this.RecurrentInjury[key]["INCIDENT_AREA_ID"];
    //       var Recurrent_AreaData: any = 1;
    //       this.AddIncidentId(Recurrent_Areaid, Recurrent_AreaData);
    //     }
    //   }
    //   var Recurrent_Areaid =
    //     this.RecurrentInjury[this.RecurrentOption]["INCIDENT_AREA_ID"];
    //   var Recurrent_AreaData =
    //     this.RecurrentInjury[this.RecurrentOption]["AREA_DATA"];
    //   this.AddIncidentId(Recurrent_Areaid, Recurrent_AreaData);
    // }

    let selectedTeam = this.PersonData.SELECTEDTEAM;
    if (
      this.UpcomingSingleEvent.event_type_id == 2 &&
      this.UpcomingSingleEvent.teamid
    ) {
      selectedTeam = this.UpcomingSingleEvent.teamid;
    } else if (this.UpcomingSingleEvent.event_type_id == 1) {
      if (this.UpcomingSingleEvent.homeclubid == this.PersonData.CLUB_ID) {
        selectedTeam = this.UpcomingSingleEvent.hometeam;
      } else {
        selectedTeam = this.UpcomingSingleEvent.awayteam;
      }
    }

    let data = new HttpParams()
      .set("person_id", this.injured_person_id)
      .set("event_id", this.eventId)
      .set("incident_id", this.incident_id)
      .set("incidentactivity", this.incidentactivity)
      .set("incident_time", this.incident_time)
      .set("incidentlocation", this.GETINCIDENT[0].incidentlocation)
      .set("relativeInformed", this.relativeInformed)
      .set("incidentwitnesses", this.incidentwitnesses)
      .set("incidentdescription", this.GETINCIDENT[0].incidentdescription)
      .set("followuptreatment", this.followuptreatment)
      .set("incident_area_ids", JSON.stringify(this.incident_area_ids))
      .set("incident_area_datas", JSON.stringify(this.incident_area_datas))
      .set("incident_other_area_ids", JSON.stringify(this.incident_otherarea_ids))
      // .set("incident_other_texts", JSON.stringify(this.incident_otherarea_text))
      .set("incident_other_texts", JSON.stringify(this.incident_otherarea_text))
      .set("client_id", this.UpcomingSingleEvent.client_id)
      .set("selectedTeam", selectedTeam)
      .set("season_id", this.seasonId)
      .set("injury_status", this.incident);
    console.log('api param', data);
    this.http
      .post<any>(this.global.APIURL + "incidents/saveIncidentData", data, {
        headers: this.global_api.getHeader(),
      })
      .subscribe(
        (response) => {
          if (response.SUCCESS == true) {
            //this.navCtrl.push('EventDashboardPage')
            let toast = this.toastCtrl.create({
              message: "Saved Successfully",
              duration: 3000,
              position: "top",
              cssClass: "toast-success",
            });
            toast.present();
            this.gFn.gotoHome();
          } else {
            alert("Record cannot be update");
          }
        },
        (error) => {}
      );
  }
  occuredAtClub() {
    return new Promise((resolve) => {
      let data = new HttpParams()
        // .set("incident_group_id", "13")
        // .set("incident_id", this.incident_id)
        // .set("selectedTeam", this.PersonData.SELECTEDTEAM);
        .set("incident_group_id", "0")
        .set("incident_id", this.incident_id)
        .set("selectedTeam", this.PersonData.SELECTEDTEAM)
        .set("club_id", this.PersonData.CLUB_ID);

      this.http
        .post<any>(this.global.APIURL + "incidents/getIncidentAreas", data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (response) => {
            var Data = this.events.publish(
              "json:query",
              response.GETINCIDENTAREAS
            )[0][0];
            this.filterDatas(response.GETINCIDENTAREAS.DATA);
            this.OccuredatClub.push(Data);

            resolve(true);
          },
          (error) => {}
        );
    });
  }
  filterDatas(DATA: any) {
    const dataArray = DATA;
    dataArray.forEach((item) => {
      const key = item[1];
      const value = item[2];
      const area_id = item[3];
      const area_data = item[4];
      const area_specify =item[7];
      const area_msg = item[11];
      const status =this.mergeValues(item[2], item[4],area_id,area_specify, item[11]);
      const indextrue = this.InjuryArray.findIndex(
        (obj) =>
          obj.key ===
          "Concussion - Have you followed the GPS Sport Specific Concussion Protocol?"
      );

      if (indextrue !== -1) {
        this.InjuryArray[indextrue].show = false;
      }

      const index = this.InjuryArray.findIndex((obj) => obj.key === key);
      if (index === -1) {
        this.InjuryArray.push({
          key: key,
          value: [value],
          selected: false,
          area_id: [area_id],
          area_data: [area_data],
          show: true,
          status: [status],
          area_specify:[area_specify],
          msg_status:area_msg
        });
      } else {
        this.InjuryArray[index].value.push(value);
        this.InjuryArray[index].area_id.push(area_id);
        this.InjuryArray[index].area_data.push(area_data);
        this.InjuryArray[index].status.push(status);
        this.InjuryArray[index].area_specify.push(area_specify);

      }
    });
    this.InjuryArray = this.updateSelectedStatus(this.InjuryArray);

   
  }

  causedByCollision() {
    return new Promise((resolve) => {
      let data = new HttpParams()
        // .set("incident_group_id", "12")
        // .set("incident_id", this.incident_id)
        // .set("selectedTeam", this.PersonData.SELECTEDTEAM);
        .set("incident_group_id", "0")
        .set("incident_id", this.incident_id)
        .set("selectedTeam", this.PersonData.SELECTEDTEAM)
        .set("club_id", this.PersonData.CLUB_ID);
      this.http
        .post<any>(this.global.APIURL + "incidents/getIncidentAreas", data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (response) => {
            var Data = this.events.publish(
              "json:query",
              response.GETINCIDENTAREAS
            )[0];
            for (var key in Data) {
              if (Data[key]["AREA_DATA"] == 1) {
                this.CollisionReason = key;
              }
              this.CausedbyCollision.push(Data[key]);
            }
            resolve(true);
          },
          (error) => {}
        );
    });
  }
  recurrentInjury() {
    return new Promise((resolve) => {
      let data = new HttpParams()
        // .set("incident_group_id", "9")
        // .set("incident_id", this.incident_id)
        // .set("selectedTeam", this.PersonData.SELECTEDTEAM);
        .set("incident_group_id", "0")
        .set("incident_id", this.incident_id)
        .set("selectedTeam", this.PersonData.SELECTEDTEAM)
        .set("club_id", this.PersonData.CLUB_ID);
      this.http
        .post<any>(this.global.APIURL + "incidents/getIncidentAreas", data, {
          headers: this.global_api.getHeader(),
        })
        .subscribe(
          (response) => {
            var Data = this.events.publish(
              "json:query",
              response.GETINCIDENTAREAS
            )[0];
            for (var key in Data) {
              if (Data[key]["AREA_DATA"] == 1) {
                this.RecurrentOption = key;
              }
              this.RecurrentInjury.push(Data[key]);
            }

            resolve(true);
          },
          (error) => {}
        );
    });
  }
  AddIncidentId(AreaId, AreaData) {
    if (this.incident_area_ids.includes(AreaId) == false) {
      if (AreaData == 0 || AreaData == null) {
        AreaData = 1;
      } else {
        AreaData = 0;
      }
      this.incident_area_ids.push(AreaId);
      this.incident_area_datas.push(AreaData);
    } else if (this.incident_area_ids.includes(AreaId) == true) {
      var getDataindex = this.incident_area_ids.indexOf(AreaId);
      this.incident_area_ids.splice(getDataindex, 1);
      this.incident_area_datas.splice(getDataindex, 1);
    }
  }
  readAddedIncidentId(AreaId) {
    if (this.incident_area_ids.includes(AreaId)) {
      return true;
    } else {
      return false;
    }
  }

  compareSelectedValues(
    InjuryCauseArray: any,
    InjuryArray: { key: string; value: string[]; selected: any }[]
  ) {



    InjuryArray.forEach((injuryObj) => {
      const matchingCause = InjuryCauseArray.find(
        (causeObj) => causeObj.key === injuryObj.key
      );
      if (matchingCause && matchingCause.value.length > 0) {
        injuryObj.selected = true;
      } else {
        injuryObj.selected = false;
      }
    });
  }

  replaceIfExists(dataArray, newObj) {
    const index = dataArray.findIndex((obj) => obj["key"] === newObj["key"]);
    if (index !== -1) {
      dataArray[index] = newObj;
    } else {
      const keyExists = dataArray.some((obj) => obj["key"] === newObj["key"]);

      if (!keyExists) {     
        dataArray.push(newObj);
        // dataArray = dataArray.filter(item => !newObj.includes(item));
      }
    }

    return dataArray;
  }

  showAndhideIncident(selectedobj: any) {
    if (selectedobj.key == "Suspected Nature of Injury") {
      const isConcussionPresent = selectedobj.value.includes(
        "Concussion / Loss of Consciousness"
      );
      const indextrue = this.InjuryArray.findIndex(
        (obj) =>
          obj.key ===
          "Concussion - Have you followed the GPS Sport Specific Concussion Protocol?"
      );
      if (isConcussionPresent) {
        if (indextrue !== -1) {
          this.InjuryArray[indextrue].show = true;
        }
      } else {
        if (indextrue !== -1) {
          this.InjuryArray[indextrue].show = false;
        }
      }
    }
  }
  // mergeArrays(valueArray: string[], areaDataArray: boolean[]): any[] {
  //   const mergedArray: any[] = [];
  
  //   for (let i = 0; i < Math.min(valueArray.length, areaDataArray.length); i++) {
  //     mergedArray.push({
  //       value: valueArray[i],
  //       status: areaDataArray[i]
  //     });
  //   }
  
  //   return mergedArray;
  // }

  mergeValues(value: string, areaData: any,id:string,specify:any, specifyValue) {

    
    let mergevalue ={
      value :value,
      status :areaData === '0' ? false : areaData,
      id :id,
      specify:specify,
      specifyValue,
    }
  
    return mergevalue;
  }

   updateSelectedStatus(data) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const statuses = item.status;
  
      // Check if any status has 'true' value
      const hasTrueStatus = statuses.some((status) => status.status === true);
  
      // Update the 'selected' property accordingly
      item.selected = hasTrueStatus;
    }
    console.log("injuryarryyyy",data)
    return data;
  }
  
}
