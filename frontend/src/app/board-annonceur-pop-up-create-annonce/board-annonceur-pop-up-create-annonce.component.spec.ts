import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAnnonceurPopUpCreateAnnonceComponent } from './board-annonceur-pop-up-create-annonce.component';

describe('BoardAnnonceurPopUpCreateAnnonceComponent', () => {
  let component: BoardAnnonceurPopUpCreateAnnonceComponent;
  let fixture: ComponentFixture<BoardAnnonceurPopUpCreateAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAnnonceurPopUpCreateAnnonceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAnnonceurPopUpCreateAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
