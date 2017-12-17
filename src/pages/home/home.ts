import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import {Diagnostic} from '@ionic-native/diagnostic';
import { MapsPage } from '../maps/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

markers : [{}];

  constructor(private diagnostic: Diagnostic,
              public alertCtrl: AlertController, 
              public navCtrl: NavController, 
              public http:Http) {
    this.getmarkers();
  }

  ionViewDidLoad(){
    this.diagnostic.isGpsLocationEnabled().then((Available) => {
      console.log("Location is Available");
    }).catch((err) => {
      this.TurnOnGpsAlert();
    });
  }

  TurnOnGpsAlert(){
    let turnOnGpsAlert = this.alertCtrl.create({
      title: 'GPS is Turned Off!!',
      message: "For best results, let your device turn on location, which uses Google's location service.",
      buttons:[
        {
          text:'Cancel',
          handler: () => {
            console.log('GPS not Enabled');
          }
        },
        {
          text:'Turn On GPS',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]

    });
    turnOnGpsAlert.present();
  }

  getmarkers(){
        this.http.get('assets/data/markers.json')
                 .map(res => res.json())
                 .subscribe(data => {
                    this.markers = data;
                 });
  }

  gomaps(lat,lng,title){
    let location = {lat: lat,lng: lng};
    this.navCtrl.push(MapsPage,{location,title});
    console.log(lat,lng);
  }

  GotoMaps(){
    console.log('Go to Maps Run!!');
  }
}
