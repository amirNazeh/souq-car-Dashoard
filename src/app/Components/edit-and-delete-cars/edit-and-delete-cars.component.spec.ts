import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndDeleteCarsComponent } from './edit-and-delete-cars.component';

describe('EditAndDeleteCarsComponent', () => {
  let component: EditAndDeleteCarsComponent;
  let fixture: ComponentFixture<EditAndDeleteCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAndDeleteCarsComponent]
    });
    fixture = TestBed.createComponent(EditAndDeleteCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
