import { Component } from '@angular/core';

import { NavController, AlertController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { AndroidPermissions } from '@ionic-native/android-permissions';

import { ItemDetailsPage } from '../item-details/item-details';

declare var SMS: any;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  loading: boolean = false;
  messages: any[] = [];

  constructor(public androidPermissions: AndroidPermissions,
    public platform: Platform,
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.getSMSs();
    });
  }

  getSMSs() {
    this.loading = true;
    if(SMS) SMS.listSMS({
      box : 'inbox',
      indexFrom : 0,
      maxCount : 50,
    }, (SMSs) => {
      this.loading = false;
      this.messages = SMSs;
    }, (err: any) => {
      this.checkPermission();
    });  
  }

  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
      .then((success: any) => {
          this.getSMSs();
        }, (err: any) => {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
            .then((success: any) => {
              this.getSMSs();
            }, (err: any) => {
              this.alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Cancelled!',
                  buttons: ['Dismiss']
                }).present();
              this.loading = false;
            });
        });
          
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  openMessage(item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
