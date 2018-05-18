import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sms: SMS) {
    this.selectedItem = navParams.get('item');
  }

  sendMessage() {
	this.sms.send(this.selectedItem.service_center, this.selectedItem.body, {android: {intent: "INTENT"}});
  }
}
