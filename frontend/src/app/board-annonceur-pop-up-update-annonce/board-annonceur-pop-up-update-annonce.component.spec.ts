import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAnnonceurPopUpUpdateAnnonceComponent } from './board-annonceur-pop-up-update-annonce.component';

describe('BoardAnnonceurPopUpUpdateAnnonceComponent', () => {
  let component: BoardAnnonceurPopUpUpdateAnnonceComponent;
  let fixture: ComponentFixture<BoardAnnonceurPopUpUpdateAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAnnonceurPopUpUpdateAnnonceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAnnonceurPopUpUpdateAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
