import { Component, OnInit } from '@angular/core';
import { EmployeeBase } from 'src/models/interfaces/employeeBase';
import { debounceTime, Observable } from 'rxjs';
import { EmployeeService } from '../services/employee/employee.service';
import { PagedResponse } from 'src/models/interfaces/pagedResponse';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { FormBuilder } from '@angular/forms';
import { EmployeeFilter } from 'src/models/classes/employeeFilter';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ImportEmployeesComponent } from '../import-employees/import-employees.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees!: EmployeeBase[];
  loading: boolean = true;
  employeeFilter: EmployeeFilter;
  totalRecords: number = 0;
  employeeFilterForm = this.fb.group({
    name_substr: [''],
  });

  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.employeeFilter = new EmployeeFilter();
    this.employeeFilterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data: any) => {
        this.onValueChanged(data);
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  onValueChanged(data ?: any) {
    this.employeeFilter = new EmployeeFilter(data.name_substr);
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees(this.employeeFilter).subscribe({
      next: (res: PagedResponse<EmployeeBase>) => { 
        this.employees = res.list;
        this.totalRecords = res.total_records;
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.statusText, detail: err.error.detail });
        this.router.navigate(['/login']);
      },
    });
  }

  onPageChanged(event: any) {
    this.employeeFilter.page_number = event.first / event.rows + 1;
    this.employeeFilter.page_size = event.rows;
    this.loadEmployees(); 
  }

  ref: DynamicDialogRef | undefined;

  openAddEmployeeDialog() {
    this.ref = this.dialogService.open(AddEmployeeComponent, {
      width: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe(() => {
      this.loadEmployees();
    });
  }

  openImportEmployeesDialog() {
    this.ref = this.dialogService.open(ImportEmployeesComponent, {
      width: '70%',
      height: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
    this.ref.onClose.subscribe(() => {
      this.loadEmployees();
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}