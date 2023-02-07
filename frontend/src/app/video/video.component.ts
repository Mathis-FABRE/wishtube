import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {VideoService} from "../_services/video.service";
import {TokenStorageService} from "../_services/token-storage.service";
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit{
  @Input() video: any;
  trustedUrl: SafeUrl = "";
  isLoggedIn: boolean = false;
  videoTitle: string = "";

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.Url);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  showModal(content: any){
    this.videoTitle = this.video.Title;
    this.modalService.open(content, { size:"xl", centered: true })
  }

  readVideo(data: any){
    this.videoTitle = data.title;
    this.trustedUrl = data.url;
  }
}
