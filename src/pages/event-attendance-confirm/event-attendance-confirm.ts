import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams, LoadingController, ActionSheetController, Platform, ToastController,ViewController,
  AlertController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';
import { GlobalProvider } from '../../providers/global/global';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { Vibration } from '@ionic-native/vibration/ngx';
import { GlobalApiProvider } from '../../providers/global-api/global-api';

declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-event-attendance-confirm',
  templateUrl: 'event-attendance-confirm.html',
})
export class EventAttendanceConfirmPage {
  private certificateImage: string = '';
  public randomNumber: string = '';
  UpcomingSingleEvent:any;
  PersonData:any;
  PersonDetails:any;
  AttendanceApproveOption:any;
  SelectReason:any='';
  comment:any='';
  reasonList:any=[];
  Data:any={};
  MedicalCertificate:any='';
  MedicalCertificatePrev:any='';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,
    public storage: Storage,private base64: Base64,private loadingCtrl: LoadingController,
    public global: GlobalProvider,public actionSheetCtrl: ActionSheetController,
    public camera: Camera,public platform: Platform,private file: File,public gFn: GlobalFunctionsProvider,
    private filePath: FilePath,public toastCtrl: ToastController,private alert: AlertController,
    public viewCtrl:ViewController, private vibration: Vibration,public global_api:GlobalApiProvider) {
      this.gFn.hideMenuIcon();
      this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
  }

  ionViewDidLoad() {
    this.PersonDetails=JSON.parse(this.navParams.get('personDetails'))
    console.log(this.PersonDetails)
    this.storage.get('UpcomingSingleEvent').then((val) => {
      this.UpcomingSingleEvent = JSON.parse(val)
      // console.log(val)
      this.storage.get('loggedInUserData').then((val1) => {
        // this.PersonData = val1;
        this.getAttendanceApproveOption()

      })
    })
    console.log('ionViewDidLoad EventConfirmAbsencePage');
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
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      let base64 = "data:image/jpeg;base64," + imagePath;
      this.MedicalCertificate = base64;
      this.certificateImage = encodeURIComponent(base64);
      // Special handling for Android library
      /* if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
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
        
      } */
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
    this.file.readAsDataURL(namePath, currentName).then(res=>{console.log(res)
    this.MedicalCertificate=res}  );
    
    
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      
      this.certificateImage = newFileName;
      this.uploadImage();
    }, error => {
      this.presentToast(error);
    });
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  uploadImage() {
    let targetPath = this.pathForImage(this.certificateImage);
    this.base64.encodeFile(targetPath).then((base64File: string) => {
     
      this.uploadPhoto(encodeURIComponent(base64File));
    }, (err) => {
      this.presentAlert('Error','Sorry, image upload error.');
    });
  }

  uploadPhoto(certificateImage) {
    this.certificateImage = '';
    this.randomNumber = Math.floor((Math.random() * 1000) + 1).toString();
    
        this.certificateImage = (certificateImage);
      
  }
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
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
  close(){
    this.navCtrl.pop()
    this.gFn.showMenuIcon()
  }
  getAttendanceApproveOption(){
    let attendanceReason = this.PersonDetails.attendInfo.attendanceReason;
    let Data = new HttpParams()
        .set('event_id', this.PersonDetails.event_id)
        .set('person_id', this.PersonDetails.attendInfo.person_id)
        .set('attendanceReason', attendanceReason);
      this.http.post(this.global.APIURL + "players/getAttendanceApproveOption", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS && data.GETATTENDANCEAPPROVEOPTION.length){
            this.AttendanceApproveOption=data.GETATTENDANCEAPPROVEOPTION[0]
            this.comment = data.GETATTENDANCEAPPROVEOPTION[0].parentComment;
            this.MedicalCertificatePrev = data.GETATTENDANCEAPPROVEOPTION[0].medicalCertificate;
            for(var key in data.GETATTENDANCEAPPROVEOPTION[0].reasons){
              if(data.GETATTENDANCEAPPROVEOPTION[0].reasons[key].reason_display==this.AttendanceApproveOption.selected){
                this.reasonList.unshift(data.GETATTENDANCEAPPROVEOPTION[0].reasons[key])
                this.Data=data.GETATTENDANCEAPPROVEOPTION[0].reasons[key]
                this.SelectReason=data.GETATTENDANCEAPPROVEOPTION[0].reasons[key].reason
              }
              else{
                this.reasonList.push(data.GETATTENDANCEAPPROVEOPTION[0].reasons[key])
              }
            }
          }
        })
  }
  saveAttendanceWorkflow(){  
    let selectedReason = $('.attendence:checked').val().toString();  
    let Data = new HttpParams()
        .set('person_id', this.PersonDetails.attendInfo.parent_id)
        .set('attendanceID', this.AttendanceApproveOption.attendanceID)
        .set('attendanceWorkflowID', this.AttendanceApproveOption.attendanceWorkflowID)
        .set('parent_comment', this.comment)
        .set('medical_certificate', this.certificateImage )
        .set('reason', selectedReason.trim())
        .set('alert_status', this.AttendanceApproveOption.alert_status)
        
      this.http.post(this.global.APIURL + "players/saveAttendanceWorkflow", Data,{headers:this.global_api.getHeader()})
        .subscribe((data: any) => {
          if(data.SUCCESS){
            this.vibration.vibrate(500);
            this.navCtrl.push('EventHomeNewPage');
            this.presentToast('Status Updated')
            //this.navCtrl.pop()
            this.viewCtrl.dismiss(this.PersonDetails.attendInfo.attendanceReason);
            this.gFn.showMenuIcon();
          }
          else{
            this.presentToast('Data could not be saved')
            this.navCtrl.pop()
            //this.viewCtrl.dismiss()
            this.gFn.showMenuIcon();
          }
        })
  }

}