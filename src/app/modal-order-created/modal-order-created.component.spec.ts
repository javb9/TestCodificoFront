import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderCreatedComponent } from './modal-order-created.component';

describe('ModalOrderCreatedComponent', () => {
  let component: ModalOrderCreatedComponent;
  let fixture: ComponentFixture<ModalOrderCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrderCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrderCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
