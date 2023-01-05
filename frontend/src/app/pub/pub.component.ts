import { Component } from '@angular/core';
import {AnnoncesService} from "../_services/annonces.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.scss']
})
export class PubComponent {
  image: SafeUrl = "https://autocollant.shop/as/77-home_default/pas-de-pub-chat.jpg";
  nameFilePub?: string;
  namePub?: string;

  constructor(private annoncesService: AnnoncesService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.displayPub();
  }

  extractRandom(arr: Array<any>) {
    let index = Math.floor(Math.random() * arr.length);
    let result = arr[index];
    // remove item from the array
    arr.splice(index, 1);
    return(result);
  }

  displayPub() {
    this.annoncesService.getAnnonces().subscribe(files => {

      let annonceExtract: any = null;

      do {
        annonceExtract = this.extractRandom(files);
      } while (annonceExtract && annonceExtract.name == ".gitkeep")

      if (annonceExtract) {
        this.annoncesService.getImageAnnonce(annonceExtract.name).subscribe(i => {
          this.annoncesService.getAnnonceByFile(annonceExtract.name).subscribe(message => {
            let annonceDB = message.message;

            this.nameFilePub = (annonceDB.file).split("/")[2];
            this.namePub = annonceDB.name;

            this.annoncesService.updateAnnonceCountView(annonceDB.idAnnonce, annonceDB.nbreVues).subscribe({});

            this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(i));
          });
        });
      }
    });
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
