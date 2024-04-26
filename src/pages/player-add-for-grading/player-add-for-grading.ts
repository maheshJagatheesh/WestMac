import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { GlobalProvider } from '../../providers/global/global';

import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the PlayerAddForGradingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-add-for-grading',
  templateUrl: 'player-add-for-grading.html',
})
export class PlayerAddForGradingPage{
  public loggedInUserData: any;
  private playerAddForm: FormGroup;
  private showEmergencyContact: boolean = false;
  private emailRegex: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private phoneRegex: any = /^[\d]{10}$/;
  public errorMsg: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private formBuilder: FormBuilder, public storage: Storage, private imagePicker: ImagePicker, private base64: Base64, public events: Events, private loadingCtrl: LoadingController, public global: GlobalProvider, public gFn:GlobalFunctionsProvider,public global_api:GlobalApiProvider) {
    
    this.storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;
    });
    this.playerAddForm = this.formBuilder.group({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
      phone: new FormControl("", Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
      addFirstName: new FormControl(""),
      addLastName: new FormControl(""),
      addEmail: new FormControl(""),
      addPhone: new FormControl(""),
      addRelationship: new FormControl(""),
      addEmergencies: new FormControl(""),
      addNotify: new FormControl(""),
      profileImage: new FormControl("")
    });
  }

  toggleEmergencyContact() {
    this.showEmergencyContact = !this.showEmergencyContact;
    if (this.showEmergencyContact) {
      this.playerAddForm = this.formBuilder.group({
        firstName: new FormControl(this.playerAddForm.value.firstName, Validators.required),
        lastName: new FormControl(this.playerAddForm.value.lastName, Validators.required),
        email: new FormControl(this.playerAddForm.value.email, Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
        phone: new FormControl(this.playerAddForm.value.phone, Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
        addFirstName: new FormControl("", Validators.required),
        addLastName: new FormControl("", Validators.required),
        addEmail: new FormControl("", Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
        addPhone: new FormControl("", Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
        addRelationship: new FormControl(""),
        addEmergencies: new FormControl(""),
        addNotify: new FormControl(""),
        profileImage: new FormControl(this.playerAddForm.value.profileImage)
      });
    } else {
      this.playerAddForm = this.formBuilder.group({
        firstName: new FormControl(this.playerAddForm.value.firstName, Validators.required),
        lastName: new FormControl(this.playerAddForm.value.lastName, Validators.required),
        email: new FormControl(this.playerAddForm.value.email, Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
        phone: new FormControl(this.playerAddForm.value.phone, Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
        addFirstName: new FormControl(""),
        addLastName: new FormControl(""),
        addEmail: new FormControl(""),
        addPhone: new FormControl(""),
        addRelationship: new FormControl(""),
        addEmergencies: new FormControl(""),
        addNotify: new FormControl(""),
        profileImage: new FormControl(this.playerAddForm.value.profileImage)
      });
    }
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.playerAddForm.controls["profileImage"].setValue(encodeURIComponent(base64File));
        }, (err) => {
          alert(err);
        });
      }
    }, (err) => { });
  }

  playerAddForGrading() {
    if (this.playerAddForm.valid) {
      this.errorMsg = '';
      let loading = this.loadingCtrl.create();
      loading.present();
      let formData = {
        'selectedTeam': this.loggedInUserData.SELECTEDTEAM,
        'client_id': this.loggedInUserData.CLIENT_ID
      };
      formData = Object.assign(formData, this.playerAddForm.value);
      let data = new HttpParams({ fromObject: formData });
      this.http.post<any>(this.global.APIURL + 'players/addPlayerForGrading', data,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          loading.dismiss();
          if (response.SUCCESS) {
            this.errorMsg = response.MESSAGE;
            setTimeout(() => { this.navCtrl.setRoot('PlayersDashboardPage'); }, 500);
          } else {
            this.errorMsg = response.MESSAGE;
          }
        }, error => {
          loading.dismiss();
        });
    } else {
      this.errorMsg = '';
      if (!this.playerAddForm.controls.firstName.valid) {
        this.errorMsg = 'Provide a firstname';
      } else if (!this.playerAddForm.controls.lastName.valid) {
        this.errorMsg = 'Provide a lastname';
      } else if (!this.playerAddForm.controls.email.valid) {
        this.errorMsg = 'Provide a valid email';
      } else if (!this.playerAddForm.controls.phone.valid) {
        this.errorMsg = 'Provide a valid phone';
      } else if (this.showEmergencyContact) {
        if (!this.playerAddForm.controls.addFirstName.valid) {
          this.errorMsg = 'Provide an emergency firstname';
        } else if (!this.playerAddForm.controls.addLastName.valid) {
          this.errorMsg = 'Provide an emergency lastname';
        } else if (!this.playerAddForm.controls.addEmail.valid) {
          this.errorMsg = 'Provide a valid emergency email';
        } else if (!this.playerAddForm.controls.addPhone.valid) {
          this.errorMsg = 'Provide a valid emergency phone';
        }
      }
    }
  }

 /* goBack() {
    this.navCtrl.pop();
  }*/

}
