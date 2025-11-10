import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { ImportPossibleFields } from 'src/models/interfaces/importPossibleFields';
import { Matchy } from 'src/libs/matchy/src/main';
import { MatchyUploadEntry } from 'src/models/classes/matchyUploadEntry';
import { BaseOut } from 'src/models/interfaces/baseOut';
import { UploadEntry } from 'src/libs/matchy/src/models/classes/uploadEntry';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImportResponse } from 'src/models/interfaces/importResponse';
import { MatchyWrongCell } from 'src/models/interfaces/matchyWrongCell';


@Component({
  selector: 'app-import-employees',
  templateUrl: './import-employees.component.html',
  styleUrls: ['./import-employees.component.css']
})
export class ImportEmployeesComponent implements OnInit {
  warning?: string;
  errors?: string;
  wrongCells: MatchyWrongCell[] = [];

  constructor(private employeeService: EmployeeService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
  ) {}

  ngOnInit() {
    this.loadMatchyLib();
  }

  loadMatchyLib() {
    this.employeeService.getOptions().subscribe((data: ImportPossibleFields) => {
      const matchy = new Matchy(data.possible_fields);
      document.getElementById("matchy")?.appendChild(matchy);

      matchy.submit = async(data: UploadEntry) => {
        const entry = new MatchyUploadEntry(data.lines, false);
        this.employeeService.upload(entry).subscribe((data: ImportResponse) => {
          const success = data.status_code === 201;
          const severity = success ? 'success' : 'error';
          this.messageService.add({ severity, summary: severity, detail: data.detail });
  
          if (success) {
            this.ref.close();
          } else {
            this.warning = data.warnings;
            this.errors = data.errors;
            this.wrongCells = data.wrong_cells ? data.wrong_cells : [];
            
            const patterns = [];
            const message_per_cell = new Map<string, string>();
            for (const cell of this.wrongCells) {
              const rowIndex = cell.rowIndex;
              const colIndex = cell.colIndex;

              patterns.push(`td[col="${colIndex}"][row="${rowIndex}"]`);
              message_per_cell.set(`${colIndex}, ${rowIndex}`, cell.message);
            }

            matchy.matchyQuerySelectorAll(patterns.join(', ')).forEach((htmlCell) => {
              const rowIndex = htmlCell.getAttribute("row");
              const colIndex = htmlCell.getAttribute("col");
              matchy.markInvalidCell(htmlCell, [message_per_cell.get(`${colIndex}, ${rowIndex}`)]);
            })
          }
        })
      };
    })
  }
}
