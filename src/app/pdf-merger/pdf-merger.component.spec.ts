import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfMergerComponent } from './pdf-merger.component';

describe('PdfMergerComponent', () => {
  let component: PdfMergerComponent;
  let fixture: ComponentFixture<PdfMergerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfMergerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfMergerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
