import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    profileName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.profileName = this.navParams.get('user');
  }

  ionViewDidLoad() {

  }

}
