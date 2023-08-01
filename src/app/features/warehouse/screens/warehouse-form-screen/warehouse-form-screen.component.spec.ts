import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFormScreenComponent } from './warehouse-form-screen.component';

describe('WarehouseFormScreenComponent', () => {
  let component: WarehouseFormScreenComponent;
  let fixture: ComponentFixture<WarehouseFormScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseFormScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseFormScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
