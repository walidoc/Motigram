import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  username: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
 
  }
 
  register(){
 
    this.showLoader();
 
    let details = {
        username: this.username,
        password: this.password
    };
 
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
}