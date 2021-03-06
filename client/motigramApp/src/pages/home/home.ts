import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImagesProvider } from "../../providers/images/images";
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from '../login/login';
import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    images: any = [];
 
    constructor(public navCtrl: NavController, private authProvider: AuthProvider, private imagesProvider: ImagesProvider, private camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
      this.reloadImages();
    }
   
    reloadImages() {
      this.imagesProvider.getImages().then(data => {
        this.images = data;
      });
    }
   
    deleteImage(img) {
      this.imagesProvider.deleteImage(img).then(data => {
        this.reloadImages();
      });
    }
   
    openImage(img) {
      let modal = this.modalCtrl.create('PreviewModalPage', { img: img });
      modal.present();
    }
   
    presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text: 'Cancel',
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
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
   
      // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
        let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath });
        modal.present();
        modal.onDidDismiss(data => {
          if (data && data.reload) {
            this.reloadImages();
          }
        });
      }, (err) => {
        console.log('Error: ', err);
      });
    }

    logoutClicked() {
        this.authProvider.logout();
        this.navCtrl.setRoot(LoginPage)
    }

    goToProfile(user) {
        this.navCtrl.push(ProfilePage, {user})
    }
  }
