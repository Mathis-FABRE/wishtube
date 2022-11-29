import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private Ref: MatDialogRef<BoardAnnonceurPopUpCreateAnnonceComponent>,
              private annoncesService: AnnoncesService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { name, file, coutParClic } = this.form;

    this.annoncesService.createAnnonce( name, file, coutParClic).subscribe({
      next: res => {
        console.log(res);
        this.reloadPage();
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
