import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {
    public token: any;
    public username: String;
    apiUrl = 'http://localhost:8080/api/auth/';

    constructor(public http: HttpClient, public storage: Storage ) {}
 
  checkAuthentication(){
    return new Promise((resolve, reject) => {
        
        this.storage.get('username').then((username) => {
            this.username = username;
        });
        
        //Load token if exists
        this.storage.get('token').then((value) => {
            this.token = value;
            const httpOptions = {
                headers: new HttpHeaders({
                  'Authorization':  this.token
                })
            }
    
            this.http.get(this.apiUrl + 'protected', httpOptions)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });        
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        }

        this.http.post(this.apiUrl + 'register', JSON.stringify(details), httpOptions)
          .subscribe(res => {
 
            let data = res;
            this.username = res['user'].username;
            this.token = data['token'];
            this.storage.set('token', this.token);
            this.storage.set('username', this.username);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        }
 
        this.http.post(this.apiUrl + 'login', JSON.stringify(credentials), httpOptions)
          .subscribe(res => {
            let data = res;
            this.username = res['user'].username;
            this.token = data['token'];
            this.storage.set('token', this.token);
            this.storage.set('username', this.username);
            resolve(data);
            
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
  }
 
}