import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AnnoncesService} from "../_services/annonces.service";

@Component({
  selector: 'app-board-annonceur-pop-up-create-annonce',
  templateUrl: './board-annonceur-pop-up-create-annonce.component.html',
  styleUrls: ['./board-annonceur-pop-up-create-annonce.component.scss']
})
export class BoardAnnonceurPopUpCreateAnnonceComponent implements OnInit {
  form: any = {
    name: null,
    file: null,
    coutParClic: null
  };
  errorMessage = '';

  selectedFile : any;
  errorInCreation = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private annoncesService: AnnoncesService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList.item(0);
    }
  }

  onSubmit() {
    const { name, file, coutParClic } = this.form;

    this.annoncesService.createAnnonce( name, this.selectedFile, coutParClic).subscribe({
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