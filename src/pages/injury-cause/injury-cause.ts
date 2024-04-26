import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  ModalController,
  LoadingController,
  ViewController,
  
} from "ionic-angular";


import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalProvider } from "../../providers/global/global";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { GlobalFunctionsProvider } from "../../providers/global-functions/global-functions";
import { GlobalApiProvider } from "../../providers/global-api/global-api";

@IonicPage()
@Component({
  selector: "page-injury-cause",
  templateUrl: "injury-cause.html",
})
export class InjuryCausePage {
  header: any;
  Selectors: any = [];
  incident_area_ids: any = [];
  incident_area_datas: any = [];
  callback: any;
  groupId: any = 0;
  dropdownValues: any = [];
  selectedValues: any = [];
  CountValues: any = 0;
  SELECTEDTEAM: any = 0;
  incident_id: any = 0;
  injuryValues: any = [];
  injurySelectedVlaues: any = [];
  injurySelectedAreaid: any = [];
  injurySelectedAreadata: any = [];
  checkboxValue: boolean = true;
  specifiedValues: {text: string }[] = [];
  index: any;
  msgstatus:any;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public global: GlobalProvider,
    private events: Events,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public statusBar: StatusBar,
    public gFn: GlobalFunctionsProvider,
    public global_api: GlobalApiProvider
  ) {
    this.gFn.hideMenuIcon();
    this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    this.statusBar.hide();
    this.groupId = parseInt(this.navParams.get("group_id"));
    this.header = this.navParams.get("Data");
    this.SELECTEDTEAM = this.navParams.get("SELECTEDTEAM");
    this.incident_id = this.navParams.get("incident_id");
    this.incident_area_ids = JSON.parse(
      this.navParams.get("incident_area_ids")
    );
    this.incident_area_datas = JSON.parse(
      this.navParams.get("incident_area_datas")
    );
    
    this.injuryValues = JSON.parse(this.navParams.get("dropdownValues"));
    this.dropdownValues = JSON.parse(this.navParams.get("dropdownValues"));

    
    this.selectedValues = JSON.parse(this.navParams.get("selectedValues"));
    let values = JSON.parse(this.navParams.get("selectedValues"));
    
    this.injurySelectedVlaues = this.gettingInjuryValues(values, this.header,this.dropdownValues);
    // debugger;
    //this.injuryValues = this.updateStatusBasedOnSelected(this.injuryValues,this.selectedValues)
    this.index = this.navParams.get("index");
    this.msgstatus =JSON.parse(this.navParams.get("msgstatus"));

    setTimeout(() => {
      console.log("msgsttusss", this.msgstatus)
    }, 2000);


 
    let loader = this.loadingCtrl.create({});
    loader.present();
    if (this.groupId != 6) {
      this.getIncidentAreas(
        this.groupId,
        this.SELECTEDTEAM,
        this.incident_id
      ).then((x) => {
        loader.dismiss();
        if (!x) {
          alert("Data not found or Connection issue.");
        }
      });
    } else if (this.groupId == 6) {
      this.getIncidentAreasGrouped(this.SELECTEDTEAM, this.incident_id).then(
        (x) => {
          loader.dismiss();
          if (!x) {
            alert("Data not found or Connection issue.");
          }
        }
      );
    }
  }
  gettingInjuryValues(values: any, header: any ,dropdownValues): any {
    if (values.length > 0) {
      let index = values.findIndex((item) => item.key === header);

      if (index !== -1) {
        return values[index].value
      } else {
        return []
      }
    } else {
      return this.getValuesWithTrueStatus(this.dropdownValues)
    }

  }

  
  ionViewDidLeave() {
    this.statusBar.show();
    let other_area_id = this.injuryValues
    .filter(data => data.specify && data.status)
    .map(data => (data.id));

    let other_area_text = this.injuryValues.filter(data => data.specify && data.status)
    .map(data => (data.specify));

    


    let selectedValue = {
      key: this.header,
      value: this.injurySelectedVlaues,
      // area_id: this.injurySelectedAreaid,
      area_id: this.getSelectedIds(this.injurySelectedVlaues, this.injuryValues),
      area_data: this.getSelectedAreaData(this.injurySelectedAreadata, this.injuryValues),
      other_area_id,
      other_area_text,
    };
    for (var key in this.dropdownValues) {
      if (this.groupId == this.dropdownValues[key].groupId) {
        this.dropdownValues[key].count =
          this.dropdownValues[key].count + this.CountValues;
      }
    }
    var data: any = {
      injured_person_id: this.navParams.get("injured_person_id"),
      incident_area_ids: JSON.stringify(this.incident_area_ids),
      incident_area_datas: JSON.stringify(this.incident_area_datas),
      group_id: this.groupId,
      dropdownValues: JSON.stringify(this.dropdownValues),
      injuryselectedValues: JSON.stringify(selectedValue),
      index: this.index,
      updatedStatus: this.injuryValues

    };
    this.callback(data);
  }
  getIncidentAreas(incident_group_id, SELECTEDTEAM, incident_id) {
    return new Promise((resolve) => {
      let data = new HttpParams()
        .set("incident_group_id", incident_group_id)
        .set("selectedTeam", SELECTEDTEAM)
        //  .set('incident_id',incident_id)
        .set("incident_id", "2007");

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
              this.Selectors.push(Data[key]);
            }
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
    });
  }
  getIncidentAreasGrouped(SELECTEDTEAM, incident_id) {
    return new Promise((resolve) => {
      let data = new HttpParams()
        .set("selectedTeam", SELECTEDTEAM)
        .set("incident_id", incident_id);
      this.http
        .post<any>(
          this.global.APIURL + "incidents/getAllIncidentAreasGrouped",
          data,
          { headers: this.global_api.getHeader() }
        )
        .subscribe(
          (response) => {
            var Data = this.events.publish(
              "json:query",
              response.GETALLINCIDENTAREASGROUPED[0]
            )[0];
            var Data1 = this.events.publish(
              "json:query",
              response.GETALLINCIDENTAREASGROUPED[1]
            )[0];
            if (this.header != "BODY PARTS") {
              for (var key in Data) {
                this.Selectors.push(Data[key]);
              }
            } else if (this.header == "BODY PARTS") {
              var temp = [];
              var temp1 = [];
              for (var key in Data) {
                temp.push(Data[key]);
              }

              for (var key in Data1) {
                temp1.push(Data1[key]);
              }
              this.Selectors.push(temp);
              this.Selectors.push(temp1);
            }
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
    });
  }
  // getIncidentDetails(AreaId,AreaData,event){

  //   if(this.incident_area_ids.includes(AreaId)==false){
  //     if(AreaData==0 || AreaData==null){
  //       AreaData=1
  //       this.CountValues=this.CountValues+1;
  //     }
  //     else{
  //       AreaData=0
  //       this.CountValues=this.CountValues-1;
  //     }
  //     this.incident_area_ids.push(AreaId)
  //     this.incident_area_datas.push(AreaData)

  //   }
  //   else if(this.incident_area_ids.includes(AreaId)==true){
  //     var getDataindex=this.incident_area_ids.indexOf(AreaId)
  //     this.incident_area_ids.splice(getDataindex,1)
  //     var area_data=this.incident_area_datas.splice(getDataindex,1)
  //     if(area_data==0){
  //       this.CountValues=this.CountValues+1;
  //     }
  //     else{
  //       this.CountValues=this.CountValues-1;
  //     }
  //   }
  // }

  getIncidentDetails(key, i,list) {
    //  this.injurySelectedVlaues.push(key)
    //  this.injurySelectedAreadata.push(this.incident_area_datas[i])
    //  this.injurySelectedAreaid.push(this.incident_area_ids[i])

    const index = this.injurySelectedVlaues.indexOf(key.value);
    let object = {...key}
    if (index !== -1) {
      // If the checkbox is unchecked, remove data from arrays
      this.injurySelectedVlaues.splice(index, 1);
      object.status = false;
      // this.injurySelectedAreadata.splice(index, 1);
      // this.injurySelectedAreaid.splice(index, 1);
    } else {
      // If the checkbox is checked, add data to arrays
      this.injurySelectedVlaues.push(key.value);
      object.status = true;
      // this.injurySelectedAreadata.push(this.incident_area_datas[i]);
      // this.injurySelectedAreaid.push(this.incident_area_ids[i]);
    }
   
    this.injuryValues[i] = {...object};
        
  }


  close() {
    this.navCtrl.pop();
  }

  removeInjuryValues(selected: string[], injuryValues: any[]): string[] {
    // Filter out values that exist in the injuryValues array
    const filteredSelected = selected.filter(value => !injuryValues.some(injury => injury.value === value));

    return filteredSelected;
  }

  readAddedIncidentId(AreaData, AreaId) {
    if (this.incident_area_ids.includes(AreaId) == true) {
      var getDataindex = this.incident_area_ids.indexOf(AreaId);
      if (this.incident_area_datas[getDataindex] == 1) {
        return true;
      } else {
        return false;
      }
    } else if (AreaData == 1) {
      return true;
    } else {
      return false;
    }
  }
  checkedStatus(value) {
    // return this.selectedValues.some((item) => item.value.includes(value));
    if(value){
      return true;
    } else {
      return false;
    }    
  }
  checkboxClick(event) {
    var statement = true;

    if (statement) {
      // Modify the checkbox state using ngModel
      this.checkboxValue = true;
    }

    console.log("testtt", event);
  }

  getValuesWithTrueStatus(full: any[]): string[] {
    // Use the filter function to get values where status is true
    const trueStatusValues = full
      .filter(item => item.status)
      .map(item => item.value);

    return trueStatusValues;
  }

  updateStatusBasedOnSelected(fullarray: any[], selected: any[]): any[] {
    if(selected.length>0)
    {
      fullarray.forEach(item => {
        // Check if the value exists in the selected array
        const valueExistsInSelected = selected.some(selectedItem => selectedItem.value.includes(item.value));
  
        // Update the status based on the check
        item.status = valueExistsInSelected;
      });
    }
    // Iterate over each item in fullarray
   

    return fullarray;
  }

  getSelectedIds(injurySelectedValues: string[], fullarray: any[]): string[] {
    // Filter out items from fullarray where value exists in injurySelectedValues
    const selectedItems = fullarray
      .filter(item => injurySelectedValues.includes(item.value))
      .map(item => item.id.toString());

    return selectedItems;
  }

  getSelectedAreaData(injurySelectedValues: string[], fullarray: any[]): string[] {
    // Filter out items from fullarray where value exists in injurySelectedValues
    const selectedItems = fullarray
      .filter(item => injurySelectedValues.includes(item.value))
      .map(item => item.status);

    return selectedItems;
  }
}
