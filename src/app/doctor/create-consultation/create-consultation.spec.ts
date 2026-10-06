import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsultation } from './create-consultation';

describe('CreateConsultation', () => {
  let component: CreateConsultation;
  let fixture: ComponentFixture<CreateConsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConsultation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsultation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
