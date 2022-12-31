import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit{
  @Input() video: any;
  trustedUrl: SafeUrl = "";

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.Url)
  }

  showModal(content: any){
    this.modalService.open(content, { size:"xl", centered: true })
  }
}
