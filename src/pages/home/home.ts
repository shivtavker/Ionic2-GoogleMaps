import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { MapsPage } from '../maps/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

markers : [{}];

  constructor(public navCtrl: NavController, public http:Http) {
    this.getmarkers();
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
