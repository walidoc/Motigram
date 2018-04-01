import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
})
export class LoginPage {
 
    username: string;
    password: string;
    loading: any;
 
    constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
 
    }
 
    ionViewDidLoad() {
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not authorized");
            this.loading.dismiss();
        });
 
    }
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            username: this.username,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log('result :', result);
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log('err: ', JSON.stringify(err));
        });
 
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}
