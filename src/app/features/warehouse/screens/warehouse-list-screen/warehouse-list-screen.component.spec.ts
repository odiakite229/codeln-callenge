import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseListScreenComponent } from './warehouse-list-screen.component';

describe('WarehouseListScreenComponent', () => {
  let component: WarehouseListScreenComponent;
  let fixture: ComponentFixture<WarehouseListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseListScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
