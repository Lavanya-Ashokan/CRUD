import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Crud Application';
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dob', 'gendre', 'education', 'company', 'exprience', 'package', 'id', 'action' ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _dialog: MatDialog,
     private _empService: EmployeeService
     ) {}
     ngOnInit(): void {
       this.getEmployeeList();
     }

  openAddEditEmform() {
    this._dialog.open(EmpAddEditComponent);
  }
   
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.sort= this.sort ;
        this.dataSource.paginator= this.paginator;

         
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe(
      {
      next: (res) => {
        alert('Employee Deleted!');
      },
      error:console.log,
    });
  }
}
