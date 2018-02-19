import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";

@Injectable()
export class ImagesProvider {
    apiURL = 'http://localhost:8080/api/images/';

    constructor(public http: HttpClient, private transfer : FileTransfer) {}

    getImages() {
        return this.http.get(this.apiURL);
    }
     
    deleteImage(img) {
        return this.http.delete(this.apiURL + img._id);
    }
     
    uploadImage(img, desc, owner) {
        var options: FileUploadOptions = {
            fileKey: 'image',
            chunkedMode: false,
            mimeType: 'multipart/form-data',
            params: { desc, owner }
        };
        
        const fileTransfer: FileTransferObject = this.transfer.create();  
        // Use the FileTransfer to upload the image
        return fileTransfer.upload(img, this.apiURL, options);
    }
     
}
