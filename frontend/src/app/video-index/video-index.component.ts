import {Component, OnInit} from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {AnnoncesService} from "../_services/annonces.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-video-index',
  templateUrl: './video-index.component.html',
  styleUrls: ['./video-index.component.scss'],
  providers: [NgbNavModule]
})
export class VideoIndexComponent implements OnInit {
  videosYoutube: Array<any> = [];
  videosDailymotion: Array<any> = [];
  videosAll: Array<any> = [];

  pubs: Array<any> = [
    {image: null, nameFilePub: null, namePub: null},
    {image: null, nameFilePub: null, namePub: null},
    {image: null, nameFilePub: null, namePub: null},
  ];

  active: number = 1;

  constructor(private annoncesService: AnnoncesService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.displayPub();
    }
  }


  displayPub() {

    let nameFilePub;
    let namePub;
    let image;

    this.annoncesService.getAnnonces().subscribe(files => {

      let annonceExtract: any = null;

      while (annonceExtract == null || annonceExtract.name == ".gitkeep") {
        annonceExtract = this.extractRandom(files);
      }

      this.annoncesService.getImageAnnonce(annonceExtract.name).subscribe(i => {
        this.annoncesService.getAnnonceByFile(annonceExtract.name).subscribe(message => {
          let annonceDB = message.message;

          nameFilePub = (annonceDB.file).split("/")[2];
          namePub = annonceDB.name;

          this.annoncesService.updateAnnonceCountView(annonceDB.idAnnonce, annonceDB.nbreVues).subscribe({});

          image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(i));

          let pub = {nameFilePub: nameFilePub, namePub: namePub, image: image};
          this.pubs.shift();
          this.pubs.push(pub);
        });

      });

    });
  }

  displayVideos(data: any){
    this.displayYoutube(data);
    this.displayDailymotion(data);

    let youtube = [...this.videosYoutube];
    let dailymotion = [...this.videosDailymotion];
    this.videosAll = this.mergeTwoRandom(youtube, dailymotion);
  }

  displayYoutube(data: any) {
    console.log('displaying Youtube');
    this.videosYoutube = data.youtube;
  }

  displayDailymotion(data: any) {
    console.log('displaying Dailymotion');
    this.videosDailymotion = data.dailymotion;
  }

  extractRandom(arr: Array<any>) {
    let index = Math.floor(Math.random() * arr.length);
    let result = arr[index];
    // remove item from the array
    arr.splice(index, 1);
    return(result);
  }

  mergeTwoRandom(arr1: Array<any>, arr2: Array<any>) {
    var result = [];
    while (arr1.length || arr2.length) {
      if (arr1.length) {
        result.push(this.extractRandom(arr1));
      }
      if (arr2.length){
        result.push(this.extractRandom(arr2));
      }
    }
    return(result);
  }

  newClickOnPub(event: any) {

    let nameFile = event.target.attributes.name.nodeValue;

    console.log(nameFile);

    this.annoncesService.getAnnonceByFile(nameFile).subscribe(message => {
      let annonceDB = message.message;

      this.annoncesService.updateAnnonceCountClick(annonceDB.idAnnonce, annonceDB.nbreClics).subscribe({});

    });
  }
}
