import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEmployeesComponent } from './import-employees.component';

describe('ImportEmployeesComponent', () => {
  let component: ImportEmployeesComponent;
  let fixture: ComponentFixture<ImportEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportEmployeesComponent]
    });
    fixture = TestBed.createComponent(ImportEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
