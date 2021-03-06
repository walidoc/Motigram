import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { ImagesProvider } from '../../providers/images/images';

@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
    imageData: any;
    desc: string;
    
    constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private authProvider: AuthProvider, private imagesProvider: ImagesProvider) {
        this.imageData = this.navParams.get('data');
    }

    saveImage() {
        this.imagesProvider.uploadImage(this.imageData, this.desc, this.authProvider.username).then(res => {
            this.viewCtrl.dismiss({reload: true});
        }, err => {
            this.dismiss();
        });
    }
     
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
