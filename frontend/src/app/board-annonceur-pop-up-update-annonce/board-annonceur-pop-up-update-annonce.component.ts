import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AnnoncesService} from "../_services/annonces.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-board-annonceur-pop-up-update-annonce',
  templateUrl: './board-annonceur-pop-up-update-annonce.component.html',
  styleUrls: ['./board-annonceur-pop-up-update-annonce.component.scss']
})
export class BoardAnnonceurPopUpUpdateAnnonceComponent implements OnInit {
  errorMessage = '';
  newfile: any;
  selectedFile : any = null;
  errorInCreation = false;
  image!:SafeUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private annoncesService: AnnoncesService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.annoncesService.getImageAnnonce(this.data.form.file.split("/")[2]).subscribe(i => {
      this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(i));
    });
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList.item(0);
    }
  }

  onSubmit() {
    this.annoncesService.updateAnnonce(
      this.data.form.idAnnonce,
      this.data.form.name,
      this.selectedFile,
      this.data.form.coutParClic
    ).subscribe({
      next: res => {
        this.reloadPage();
      },
      error: err => {
        this.errorInCreation = true;
        console.log(err.error.message);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
