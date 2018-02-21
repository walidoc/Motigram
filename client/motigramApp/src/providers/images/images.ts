import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { Storage } from '@ionic/storage';

@Injectable()
export class ImagesProvider {
    apiURL = 'http://localhost:8080/api/images/';
    public token: any;

    constructor(public http: HttpClient, private transfer : FileTransfer, public storage: Storage) {}

    getImages() {
        return new Promise((resolve, reject) => {
            //Load token if exists
            this.storage.get('token').then((value) => {
                this.token = value;
                const httpOptions = {
                    headers: new HttpHeaders({
                    'Authorization':  this.token
                    })
                }
                this.http.get(this.apiURL, httpOptions)
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                });
            }); 

        })
    }
     
    deleteImage(img) {
        return new Promise((resolve, reject) => {
            //Load token if exists
            this.storage.get('token').then((value) => {
                this.token = value;
                const httpOptions = {
                    headers: new HttpHeaders({
                    'Authorization':  this.token
                    })
                }
                this.http.delete(this.apiURL + img._id, httpOptions)
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                });
            }); 

        })
    }
     
    async uploadImage(img, desc, owner) {
        
        await this.storage.get('token').then((value) => {
            this.token = value;
        })

        const httpOptions = {
            headers: new HttpHeaders({
            'Authorization':  this.token
            })
        }

        var options: FileUploadOptions = {
            fileKey: 'image',
            chunkedMode: false,
            mimeType: 'multipart/form-data',
            params: { desc, owner },
            headers: httpOptions
        };
        
        const fileTransfer: FileTransferObject = this.transfer.create();  
        // Use the FileTransfer to upload the image
        return fileTransfer.upload(img, this.apiURL, options);
    }
     
}
