import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Inception';
  search;
  
  toggleSidebar= false;
  toggleAppSettings = false;
  meditations = [
    {
      title:'Realxing Rain', 
      desc:'Rain sound for sleep or ralaxing',
      img:'assets/img/relaxing-rain', 
      audio:'assets/sounds/relaxing-rain.mp3'
    },
    {
      title:'Calm Relaxing', 
      desc:'Realaxing body and mind',
      img:'assets/img/calm', 
      audio:'assets/sounds/calm.mp3'
    },
    {
      title:'Epic Motivational', 
      desc:'Epic Upliftic Motivational Music',
      img:'assets/img/epicmotivational', 
      audio:'assets/sounds/epicmotivational.mp3'
    },
    {
      title:'Theta Wave - 4Hz', 
      desc:'Binaural meditation for memory & learning, mindset',
      img:'assets/img/theta4hzbinaural', 
      audio:'assets/sounds/theta4hzbinaural.mp3'
    },
    {
      title:'Spiritual Energy', 
      desc:'Positive Energy, Healing &  deep sleep',
      img:'assets/img/spiritualenergy', 
      audio:'assets/sounds/spiritualenergy.mp3'
    },
  ];

  appBg = [
    {img:'assets/img/relaxing-rain.jpg', thumb:'assets/img/relaxing-rain-thumb.jpg'},
    {img:'assets/img/calm.jpg', thumb:'assets/img/calm-thumb.jpg' },
    {img:'assets/img/epicmotivational.jpg', thumb:'assets/img/epicmotivational-thumb.jpg'},
    {img:'assets/img/evening.jpg', thumb:'assets/img/evening-thumb.jpg'},
  ]
  appSettings = {timer:800, currentSong:this.meditations[0], appBgImage:'assets/img/evening.jpg'}
  appData = localStorage.getItem("inceptionData")?JSON.parse(localStorage.getItem("inceptionData")):{settings:this.appSettings};
  currentSong = this.appData.settings.currentSong;
  appBgImage = this.appData.settings.appBgImage;

  updateDataSettings(){
    localStorage.setItem("inceptionData", JSON.stringify(this.appData));
  }

  setMeditation(m){
    this.currentSong = m;
    this.appBgImage = m.img+'.jpg';
    this.appData.settings.currentSong = m;
    this.appData.settings.appBgImage = m.img+'.jpg';
    this.updateDataSettings();
    this.toggleSidebar = false;
  }

  setBgImage(bg){
    this.appBgImage = bg;
    this.appData.settings.appBgImage = bg;
    this.toggleSidebar = false;
    this.updateDataSettings();
  }




}
