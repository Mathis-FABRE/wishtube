import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAnnonceurComponent } from './register-annonceur.component';

describe('RegisterAnnonceurComponent', () => {
  let component: RegisterAnnonceurComponent;
  let fixture: ComponentFixture<RegisterAnnonceurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAnnonceurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAnnonceurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
