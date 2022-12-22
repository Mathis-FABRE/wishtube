import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AnnoncesService } from '../_services/annonces.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { BoardAnnonceurPopUpCreateAnnonceComponent } from '../board-annonceur-pop-up-create-annonce/board-annonceur-pop-up-create-annonce.component';
import {
  BoardAnnonceurPopUpUpdateAnnonceComponent
} from "../board-annonceur-pop-up-update-annonce/board-annonceur-pop-up-update-annonce.component";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-board-annonceur',
  templateUrl: './board-annonceur.component.html',
  styleUrls: ['./board-annonceur.component.scss']
})
export class BoardAnnonceurComponent {
  content?: string;
  annonces : any = [];

  constructor(private userService: UserService,
              private annoncesService: AnnoncesService,
              private matdialog: MatDialog,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getAnnonceurBoard().subscribe({
      next: data => {

        this.annoncesService.getAnnoncesAuthor().subscribe({
          next: data => {
            this.annonces = JSON.parse(data).message;
          },
          error: err => {
            this.content = JSON.parse(err.error).message;
          }
        });
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  OpenCreatePopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const popup= this.matdialog.open(BoardAnnonceurPopUpCreateAnnonceComponent,dialogConfig);
    popup.afterClosed().subscribe(item=>{
      console.log(item);
    });
  }

  ChangeAnnonceStatus(annonce: any) {
    this.annoncesService.changeStatusAnnonce(annonce.idAnnonce).subscribe({
      next: res => {
        this.reloadPage();
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  OpenUpdatePopup(annonce: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      form: {
        idAnnonce: annonce.idAnnonce,
        name: annonce.name,
        file: annonce.file,
        coutParClic: annonce.coutParClic
      }
    };

    const popup= this.matdialog.open(BoardAnnonceurPopUpUpdateAnnonceComponent,dialogConfig);
    popup.afterClosed().subscribe(item=>{
      console.log(item);
    });
  }

  DeleteAnnonce(annonce: any) {
    this.annoncesService.deleteAnnonce(annonce.idAnnonce, annonce.file).subscribe({
      next: res => {
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
