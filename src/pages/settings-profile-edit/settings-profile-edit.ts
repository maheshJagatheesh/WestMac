import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';


/**
 * Generated class for the SettingsProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings-profile-edit',
  templateUrl: 'settings-profile-edit.html',
})
export class SettingsProfileEditPage {
  private profileEditForm: FormGroup;
  private showEmergencyContact: boolean = false;
  private loggedInUserData: any;
  public bgThemeColor: string = '';
  public setRelationship: string = '';
  public profileDetails: any;
  private emailRegex: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private phoneRegex: any = /^[\d]{10}$/;
  public errorMsg: string = '';
  public randomNumber: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HttpClient, public storage: Storage, private loadingCtrl: LoadingController, public global: GlobalProvider, private imagePicker: ImagePicker, private base64: Base64,public global_api:GlobalApiProvider) {
    storage.get('loggedInUserData').then((val) => {
      this.loggedInUserData = val;

      this.backgroundThemeColor();

      let loading = loadingCtrl.create();
      loading.present();
      let data = new HttpParams()
        .set('person_id', this.loggedInUserData.PERSON_ID);

      this.http.post<any>(this.global.APIURL + 'players/getPersonDetails', data,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          loading.dismiss();

          if (response.SUCCESS) {
            this.profileDetails = response.GETPERSONDETAILS;
            this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();

            if (this.profileDetails[0].emergency_contact != "") {
              if (this.profileDetails[0].emergency_contact.relationship == 1) {
                this.setRelationship = '(Parent)';
              } else if (this.profileDetails[0].emergency_contact.relationship == 2) {
                this.setRelationship = '(Guardian)';
              } else {
                this.setRelationship = 'add emergency contact…';
              }
            } else {
              this.setRelationship = 'add emergency contact…';
            }

            this.profileEditForm = this.formBuilder.group({
              //default: new FormControl(),
              first_name: new FormControl(this.profileDetails[0].first_name, Validators.required),
              last_name: new FormControl(this.profileDetails[0].last_name, Validators.required),
              email: new FormControl(this.profileDetails[0].email_address, Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
              phone_mobile: new FormControl(this.profileDetails[0].phone_mobile, Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
              addFirstName: new FormControl(this.profileDetails[0].emergency_contact.first_name),
              addLastName: new FormControl(this.profileDetails[0].emergency_contact.last_name),
              addEmail: new FormControl(this.profileDetails[0].emergency_contact.email_address),
              addPhone: new FormControl(this.profileDetails[0].emergency_contact.phone_mobile),
              addRelationship: new FormControl(this.profileDetails[0].emergency_contact.relationship),
              addEmergencies: new FormControl(this.profileDetails[0].emergency_contact.notifications),
              addNotify: new FormControl(this.profileDetails[0].emergency_contact.notifications),
              person_id: new FormControl(this.loggedInUserData.PERSON_ID),
              client_id: new FormControl(this.loggedInUserData.CLIENT_ID),
              selectedTeam: new FormControl(this.loggedInUserData.SELECTEDTEAM),
              photoPath: new FormControl("")
            });
          } else {
            alert('Sorry no matching result found');
          }

        }, error => {
          loading.dismiss();
          //alert(JSON.stringify(error));
        });

    });

    this.profileEditForm = this.formBuilder.group({
      default: new FormControl(),
      photoPath: new FormControl("")
    });

  }

  toggleEmergencyContact() {
    this.showEmergencyContact = !this.showEmergencyContact;
    if (this.showEmergencyContact) {
      this.profileEditForm = this.formBuilder.group({
        //default: new FormControl(),
        first_name: new FormControl(this.profileEditForm.value.first_name, Validators.required),
        last_name: new FormControl(this.profileEditForm.value.last_name, Validators.required),
        email: new FormControl(this.profileEditForm.value.email, Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
        phone_mobile: new FormControl(this.profileEditForm.value.phone_mobile, Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
        addFirstName: new FormControl(this.profileEditForm.value.addFirstName),
        addLastName: new FormControl(this.profileEditForm.value.addLastName),
        addEmail: new FormControl(this.profileEditForm.value.addEmail, Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
        addPhone: new FormControl(this.profileEditForm.value.addPhone, Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
        addRelationship: new FormControl(this.profileEditForm.value.addRelationship),
        addEmergencies: new FormControl(this.profileEditForm.value.addEmergencies),
        addNotify: new FormControl(this.profileEditForm.value.addNotify),
        person_id: new FormControl(this.profileEditForm.value.person_id),
        client_id: new FormControl(this.profileEditForm.value.client_id),
        selectedTeam: new FormControl(this.profileEditForm.value.selectedTeam),
        photoPath: new FormControl(this.profileEditForm.value.photoPath)
      });
    } else {
      this.profileEditForm = this.formBuilder.group({
        //default: new FormControl(),
        first_name: new FormControl(this.profileEditForm.value.first_name, Validators.required),
        last_name: new FormControl(this.profileEditForm.value.last_name, Validators.required),
        email: new FormControl(this.profileEditForm.value.email, Validators.compose([Validators.maxLength(50), Validators.pattern(this.emailRegex), Validators.required])),
        phone_mobile: new FormControl(this.profileEditForm.value.phone_mobile, Validators.compose([Validators.maxLength(10), Validators.pattern(this.phoneRegex), Validators.required])),
        addFirstName: new FormControl(this.profileEditForm.value.addFirstName),
        addLastName: new FormControl(this.profileEditForm.value.addLastName),
        addEmail: new FormControl(this.profileEditForm.value.addEmail),
        addPhone: new FormControl(this.profileEditForm.value.addPhone),
        addRelationship: new FormControl(this.profileEditForm.value.addRelationship),
        addEmergencies: new FormControl(this.profileEditForm.value.addEmergencies),
        addNotify: new FormControl(this.profileEditForm.value.addNotify),
        person_id: new FormControl(this.profileEditForm.value.person_id),
        client_id: new FormControl(this.profileEditForm.value.client_id),
        selectedTeam: new FormControl(this.profileEditForm.value.selectedTeam),
        photoPath: new FormControl(this.profileEditForm.value.photoPath)
      });
    }
  }


  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      case "green":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "blue":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "orange":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "pink":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      default:
        this.bgThemeColor = "blue";
        break;
    }
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.profileEditForm.controls["photoPath"].setValue(encodeURIComponent(base64File));
        }, (err) => {
          alert(err);
        });
      }
    }, (err) => { });
  }



  updateProfileDetails() {
    if (this.profileEditForm.valid) {
      this.errorMsg = '';
      let loading = this.loadingCtrl.create();
      loading.present();
      let data = new HttpParams({ fromObject: this.profileEditForm.value });
      this.http.post<any>(this.global.APIURL + 'users/saveSessUserProfile', data,{headers:this.global_api.getHeader()})
        .subscribe(response => {
          loading.dismiss();
          if (response.SUCCESS) {
            this.errorMsg = 'Profile update successfully.';
            setTimeout(() => { this.navCtrl.push('SettingsProfileStatisticsPage'); }, 500);
          } else {
            this.errorMsg = 'Sorry, error in profile update.';
          }
        }, error => {
          loading.dismiss();
          //alert(JSON.stringify(error));
        });
    } else {
      this.errorMsg = '';
      if (!this.profileEditForm.controls.first_name.valid) {
        this.errorMsg = 'Provide a firstname';
      } else if (!this.profileEditForm.controls.last_name.valid) {
        this.errorMsg = 'Provide a lastname';
      } else if (!this.profileEditForm.controls.email.valid) {
        this.errorMsg = 'Provide a valid email';
      } else if (!this.profileEditForm.controls.phone_mobile.valid) {
        this.errorMsg = 'Provide a valid phone';
      } else if (this.showEmergencyContact) {
        if (!this.profileEditForm.controls.addFirstName.valid) {
          this.errorMsg = 'Provide an emergency firstname';
        } else if (!this.profileEditForm.controls.addLastName.valid) {
          this.errorMsg = 'Provide an emergency lastname';
        } else if (!this.profileEditForm.controls.addEmail.valid) {
          this.errorMsg = 'Provide a valid emergency email';
        } else if (!this.profileEditForm.controls.addPhone.valid) {
          this.errorMsg = 'Provide a valid emergency phone';
        }
      }
    }
  }

  goBack() {
    this.navCtrl.pop();
  }
}
