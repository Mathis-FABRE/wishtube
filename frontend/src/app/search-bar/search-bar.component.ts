import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  search: FormControl

  constructor(private authService: AuthService) {
    this.search = new FormControl<any>('');
  }

  ngOnInit() {
  }

  research() {
    this.authService.searchYoutube(this.search.value, 50).subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }
}
