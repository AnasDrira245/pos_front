import { EmployeeBase } from "./employeeBase";

export interface EmployeeCreate extends EmployeeBase {
    password: string;
    confirm_password: string;
}