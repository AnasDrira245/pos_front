import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Gender, genders } from 'src/models/interfaces/enums/gender';
import { contract_types, ContractType } from 'src/models/interfaces/enums/contractType';
import { roles } from 'src/models/interfaces/enums/role';
import { Validators } from '@angular/forms';
import { EmployeeCreate } from 'src/models/interfaces/employeeCreate';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm = this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    number: [null, [Validators.required, Validators.min(0)]],
    birth_date: [null],
    address: [null],
    cnss_number: [null, Validators.pattern("/^\d{8}-\d{2}$/")],
    contract_type: [null, Validators.required],
    gender: [Gender.male],
    roles: [null, Validators.required],
    phone_number: [null],
    password: [null, Validators.required],
    confirm_password: [null, Validators.required],
  }, {
    validator: [this.passwordMatch(), this.requiredCnssNumber()]
  });

  contratTypes: Object[];
  genders: Object[];
  roles: Object[];

  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
  ) { 
    this.contratTypes = contract_types;
    this.genders = genders;
    this.roles = roles;
  }

  passwordMatch() {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls['password'];
      const confirm_password = formGroup.controls['confirm_password'];
      
      if (confirm_password.errors && !confirm_password.errors['passwordMatch']) {
        return;
      }
      if (password.value !== confirm_password.value) {
        password.setErrors({ passwordMatch: true});
      } else {
        password.setErrors(null);
      }
    };
  }

  isEmptyString(str: string | null | undefined) {
    return str === '' || str == null;
  }

  requiredCnssNumber() {
    return (formGroup: FormGroup) => {
      const contract_type = formGroup.controls['contract_type'];
      const cnss_number = formGroup.controls['cnss_number'];
      
      if (cnss_number.errors && !cnss_number.errors['requiredCnssNumber']) {
        return;
      }
      if ([ContractType.cdd, ContractType.cdi].includes(contract_type.value) && this.isEmptyString(cnss_number.value)) {
        cnss_number.setErrors({ requiredCnssNumber: true});
      } else {
        cnss_number.setErrors(null);
      }
    };
  }

  deepCopy(obj: Object) {
    return JSON.parse(JSON.stringify(obj));
  }

  onSubmit() {
    const form = this.deepCopy(this.employeeForm.value);
    for (const field in form) {
      if (this.isEmptyString(form[field])) {
        form[field] = null;
      }
    }

    const employee: EmployeeCreate = form;
    // we don't care about tz for now, as it's only Date
    employee.birth_date = employee.birth_date?.split('T')[0];
    this.employeeService.add(employee).subscribe((data: any) => {
      const success = data.status_code === 201;
      const severity = success ? 'success' : 'error';
      this.messageService.add({ severity, summary: severity, detail: data.detail });
      if (success) {
        this.ref.close();
      }
    });
  }
}
