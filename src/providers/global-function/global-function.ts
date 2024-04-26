import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {App, ToastController} from "ionic-angular";
@Injectable()
export class GlobalFunctionProvider {
  checkPageRedirect: any;
  
  constructor(public http: HttpClient,public app: App,public toastCtrl:ToastController) {
    
    console.log('Hello GlobalFunctionProvider Provider');
  }
  doSomething(){
    console.log(';Hello;ionic serve')
  }
  hideMenuIcon(){
		let elements = document.querySelectorAll(".tabbar");

		if (elements != null) {
			Object.keys(elements).map((key) => {
				elements[key].style.display = 'none';
			});
		}

	}
	showMenuIcon(){
		let elements = document.querySelectorAll(".tabbar");

		if (elements != null) {
			Object.keys(elements).map((key) => {
				elements[key].style.display = '';
			});
		}

	}
  goToChooseTeamsPage() {
      this.checkPageRedirect = false;
      this.app.getActiveNav().push('ChooseTeamProfilePage');
	}
	

}
