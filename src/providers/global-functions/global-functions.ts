import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App ,ToastController,AlertController,ModalController} from 'ionic-angular';
import { EventHomePage } from '../../pages/event-home/event-home';
import { ChooseTeamProfilePage } from '../../pages/choose-team-profile/choose-team-profile';
import { SurveyPage } from '../../pages/survey/survey';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomePage } from '../../pages/home/home';

@Injectable()
export class GlobalFunctionsProvider {
	checkPageRedirect: any;
	constructor(public http: HttpClient, public app: App,public toastCtrl:ToastController,private alert: AlertController,public modalCtrl:ModalController, public statusBar: StatusBar) {
		//this.hideFormAccessoryBar();
	}
	hideMenuIcon() {
		let elements = document.querySelectorAll(".tabbar");

		if (elements != null) {
			Object.keys(elements).map((key) => {
				elements[key].style.display = 'none';
			});
		}

	}
	showMenuIcon() {
		let elements = document.querySelectorAll(".tabbar");

		if (elements != null) {
			Object.keys(elements).map((key) => {
				elements[key].style.display = '';
			});
		}
	}

	gotoAttandance() {
		// 	this.navCtrl.push(EventDashboardPage)
		this.app.getActiveNav().push('EventDashboardPage');
	}
	gotoResults(){
		this.app.getActiveNav().push('EventsResultsPage');
	}
	gotoWelfare(){
		this.app.getActiveNav().push('EventWelfarePage');
	}
  	gotoDisplayEvents() {    
		//   this.navCtrl.push('DisplayEventsPage')
		this.app.getActiveNav().push('DisplayEventsPage');
	}

	gotoHome() {
		this.checkPageRedirect = false;
		this.app.getRootNav().getActiveChildNav().select(0);
		// this.app.getRootNavs()[0].setRoot(HomePage);


	}
	
		// this.app.getActiveNav().push(EventHomePage);
		//   this.navCtrl.push(EventHomePage)
	goToPlayersDashboard() {
			//   this.navCtrl.push(PlayersDashboardPage);
			this.app.getActiveNav().push('PlayersDashboardPage');
		}

	goToChatDashboard() {
		//   this.navCtrl.push('ChatDashboardPage');
		this.app.getActiveNav().push('ChatDashboardPage');
	}

	goToMenuPage() {
		//  this.navCtrl.push(SettingsPage, this.navParams.data);
		this.app.getActiveNav().push('SettingsPage');
	}

	goToPlayerGrading() {
		//   this.navCtrl.push('PlayerGradingPage');
		this.app.getActiveNav().push('PlayerGradingPage');
	}

	goToPlayerAddForGrading() {
		//   this.navCtrl.push('PlayerAddForGradingPage');
		this.app.getActiveNav().push('PlayerAddForGradingPage');
	}

	goToPlayerGroupMessage() {
		//   this.navCtrl.push('PlayerGroupMessagePage');
		this.app.getActiveNav().push('PlayerGroupMessagePage');
	}

	goToChooseTeamsPage() {
		console.log("goToChooseTeamsPage function");
		this.checkPageRedirect = false;
		//   this.navCtrl.push('ChooseTeamProfilePage');
		this.app.getActiveNav().setRoot(ChooseTeamProfilePage);
	}
	goToSurvey(surveyId, eventId, clientId, clubDivisionId, personId){
		this.checkPageRedirect = false;
		this.app.getActiveNav().push('SurveyPage', {surveyId:surveyId, eventId: eventId, clientId: clientId, clubDivisionId: clubDivisionId, personId: personId});
	}
	presentToast(msg, cssClass= "") {
		let toast = this.toastCtrl.create({
		  message: msg,
		  duration: 3000,
		  position: 'top',
		  cssClass: cssClass
		});
		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		  });
		
		toast.present();
	}
	hideFormAccessoryBar(hide = false){
        let keyboard = new Keyboard();
        keyboard.hideFormAccessoryBar(hide);
	}
	presentAlert(Title,SubTitle, cssClass= '') {
		let alert = this.alert.create({
		  title: Title,
		  subTitle: SubTitle,
		  cssClass: cssClass,
		  buttons: ['Dismiss']
		});
		alert.present(alert);
	  }
	MedicineInformation(data){
		let MedicineInfo = this.modalCtrl.create('MedicineInfoPage', {values:data});
		MedicineInfo.present();
	}
	statusbarWhite(){
		/* this.statusBar.backgroundColorByHexString('#fff');
		this.statusBar.styleDefault(); */
	}
	statusbarBlack(){
		/* this.statusBar.backgroundColorByHexString('#000');
		this.statusBar.styleLightContent(); */
	}
}
