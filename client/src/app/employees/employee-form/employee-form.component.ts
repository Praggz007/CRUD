import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent {
  submitted: boolean = false;

  constructor(public service: EmployeeService, private toastr: ToastrService) { }

  get isEditMode(): boolean {
    return !!this.service.employeeForm.get('_id')?.value;
  }

  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      if (!this.isEditMode) {
        this.service.postEmployee().subscribe({
          next: () => {
            this.service.fetchEmployeeList();
            this.toastr.success('Created successfully', 'Employee Register');
            this.resetForm();
          },
          error: () => {
            this.toastr.error('Failed to create employee', 'Employee Register');
          }
        });
      } else {
        this.service.putEmployee().subscribe({
          next: () => {
            this.service.fetchEmployeeList();
            this.toastr.info('Updated successfully', 'Employee Register');
            this.resetForm();
          },
          error: () => {
            this.toastr.error('Failed to update employee', 'Employee Register');
          }
        });
      }
    }
  }

  resetForm() {
    this.service.employeeForm.reset(new Employee());
    this.submitted = false;
  }
}
