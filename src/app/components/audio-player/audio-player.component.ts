import { Component, OnInit, Input, Inject, 
  OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})


export class AudioPlayerComponent implements OnChanges, OnInit {
  constructor(@Inject(DOCUMENT) private document: any) { 
  }

  private _currentSong;
  @Input()
  set currentSong(currentSong) {
    this._currentSong = currentSong;
  }
  get currentSong(){
    return this._currentSong;
  }

  appSettings = {timer:900}
  appData = localStorage.getItem("inceptionData")?JSON.parse(localStorage.getItem("inceptionData")):{settings:this.appSettings};


  timer = this.appData.settings.timer;
  timerRange = [5, 10, 15, 30, 60];

  updateDataSettings(){
    localStorage.setItem("inceptionData", JSON.stringify(this.appData));
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentSong: SimpleChange = changes.currentSong;
    this._currentSong = currentSong.currentValue;
    this.isPlaying = false;
    this.audioPlayer = document.querySelector(".song");
    this.audioPlayer.src = this._currentSong.audio;
  }

  audioPlayer;
  outline;
  outlineLength;
  timeDisplay:any;
  isPlaying:boolean= false;

  playAudio(){
    if (this.audioPlayer.paused) {
      this.audioPlayer.play();
      this.isPlaying = true;
    } else {
      this.audioPlayer.pause();
      this.isPlaying = false;
    }
  }

  replayAudio(){
    this.isPlaying = true;
    this.audioPlayer.currentTime = 0;
    this.audioPlayer.play();
  }

  setTimer(timer){
    this.timer = timer * 60;
    this.timeDisplay = `${( Math.floor(this.timer / 60)<10?'0'+Math.floor(this.timer / 60):Math.floor(this.timer / 60) )}:${( Math.floor(this.timer % 60)<10?'0'+Math.floor(this.timer % 60):Math.floor(this.timer % 60) )}`
    this.appData.settings.timer = timer * 60;
    this.updateDataSettings();
  }

  ngOnInit() {
    console.log(this.timer);
    this.audioPlayer = document.querySelector(".song");
    this.audioPlayer.src = this._currentSong.audio;
    this.outline = document.querySelector(".moving-outline circle");
    this.outlineLength = this.outline.getTotalLength();
    this.outline.style.strokeDashoffset = this.outlineLength;
    this.outline.style.strokeDasharray = this.outlineLength;
    this.audioPlayer.ontimeupdate = ()=>{
      let elapsed = this.timer - this.audioPlayer.currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);
      let s = (seconds<10)?'0'+seconds:seconds;
      let m = (minutes<10)?'0'+minutes:minutes;
      this.timeDisplay = `${m}:${s}`;
      let progress = this.outlineLength - (this.audioPlayer.currentTime / this.timer) * this.outlineLength;
      this.outline.style.strokeDashoffset = progress;
        
      if (this.audioPlayer.currentTime >= this.timer) {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.isPlaying = false;
      }
      if(this.timer - this.audioPlayer.currentTime<=2){
        this.audioPlayer.volume -= .1199;
      }else{
        this.audioPlayer.volume = 1;
      }
    }

  }






}
