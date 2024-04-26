import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, ActionSheetController, Platform, ToastController,
  AlertController
} from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';
import { GlobalProvider } from '../../providers/global/global';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}*/
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  public firstName: string;
  private personID: string;
  private profileImage: string = '';
  private loggedInUserData: any;
  public bgThemeColor: string = '';
  public randomNumber: string = '';
  public image : string = '';
  public defaultImage : string = '';
  refresh: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public storage: Storage,
    private base64: Base64,
    private loadingCtrl: LoadingController,
    public global: GlobalProvider,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public platform: Platform,
    private file: File,
    private filePath: FilePath,
    public toastCtrl: ToastController,
    private alert: AlertController,
    public global_api:GlobalApiProvider) {
    storage.get('loggedInUserData').then((val) => {
       console.log(val);
      this.firstName = val.FIRST_NAME.toString().toLocaleUpperCase();
      this.personID = val.PERSON_ID.toString();
      this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
      this.profileImage = val.PHOTOPATH.toString();
      this.image = "http://api-dev.gojaro.com/profileimage/this.profileImage?r=this.randomNumber";
      this.loggedInUserData = val;
      /* set default to hide image selection */
      this.loggedInUserData.HOMESCREEN_BG = 'img-1.jpg';
      this.storage.set('loggedInUserData', this.loggedInUserData);
      this.storage.set('Refresh',this.refresh)
      this.backgroundThemeColor();
    }); 
  }

  backgroundThemeColor() {
    switch (this.loggedInUserData.THEME_BG) {
      case "green":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "grey":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "orange":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      case "pink":
        this.bgThemeColor = this.loggedInUserData.THEME_BG;
        break;
      default:
        this.bgThemeColor = "grey";
        break;
    }
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'From Gallery',
          icon: 'cloud-upload',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'From Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      console.log("Image Path : ",imagePath);
      
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast(err);
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log("resolver URL : ",namePath, currentName);
    this.file.readAsDataURL(namePath, currentName).then(res=>{
      console.log("resolver URL : ",res);
      
        this.uploadPhoto(encodeURIComponent(res));
    },error => {
      console.log("Error in readAsDataURL :",error);
      
    });
  
    /* this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.profileImage = newFileName;
      this.uploadImage();
    }, error => {
      this.presentToast(error);
    }); */
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  uploadImage() {
    let targetPath = this.pathForImage(this.profileImage);
    this.base64.encodeFile(targetPath).then((base64File: string) => {
      this.uploadPhoto(encodeURIComponent(base64File));
    }, (err) => {
      this.presentAlert('Error','Sorry, image upload error.');
    });
  }

  uploadPhoto(profileImage) {
    this.profileImage = '';
    this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = new HttpParams()
      .set('person_id', this.loggedInUserData.PERSON_ID)
      .set('profileImage', profileImage);
    this.http.post<any>(this.global.APIURL + 'users/uploadProfileImage', data,{headers:this.global_api.getHeader()})
      .subscribe(response => {
        loading.dismiss();
        console.log("Image : ",response);
        
        this.profileImage = this.personID + '.jpg';
        console.log("profileImage : ",this.profileImage);
        
        if (response.SUCCESS) {
          this.loggedInUserData['PHOTOPATH'] = this.profileImage;
          this.storage.set('loggedInUserData', this.loggedInUserData);
        } else {
          this.presentAlert('Error','Sorry, image upload error.');
        }
      }, error => {
        loading.dismiss();
        this.profileImage = this.personID + '.jpg';
        this.presentAlert('Error','Sorry, image upload error.');
      });
  }

  goToChooseTheme() {
    var isLogout = true;
    this.storage.set('isLogout',isLogout)
    if(this.loggedInUserData.THEME_BG != ""){
      //this.navCtrl.push('ChooseTeamPage', {}, {animation: 'ios-transition'});
      if(this.loggedInUserData.HOMESCREEN_BG != ""){
        this.navCtrl.push('SetToGoPage', {}, {animation: 'ios-transition'});
      }else{
        this.navCtrl.push('ChooseHomeImagePage', {}, {animation: 'ios-transition'});
      }
    }else{
      this.navCtrl.push('ChooseThemePage', {}, {animation: 'ios-transition'});
    }
  }

  presentAlert(Title,SubTitle) {
    let alert = this.alert.create({
      title: Title,
      subTitle: SubTitle,
      buttons: ['Dismiss']
    });
    alert.present(alert);
  }

}
