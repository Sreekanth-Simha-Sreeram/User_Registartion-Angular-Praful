import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from "@angular/router";

export interface UserElement {
  username: string;
  profilepic:any,
  slno: number;
  password: any;
  email: string;
}

const ELEMENT_DATA: UserElement[] = [
  {slno: 1,profilepic:'img', username: 'Hydrogen', password: '1234', email: 'test@abc.com'},
  {slno: 2,profilepic:'img', username: 'Helium', password: '1234', email: 'test@abc.com'},
  {slno: 3,profilepic:'img', username: 'Lithium',  password: '1234', email: 'test@abc.com'},
  {slno: 4,profilepic:'img', username: 'Beryllium',  password: '1234', email: 'test@abc.com'},
  {slno: 5,profilepic:'img', username: 'Boron',  password: '1234', email: 'test@abc.com'},
  {slno: 6,profilepic:'img', username: 'Carbon',  password: '1234', email: 'test@abc.com'},
  {slno: 7,profilepic:'img', username: 'Nitrogen',  password: '1234', email: 'test@abc.com'},
  {slno: 8,profilepic:'img', username: 'Oxygen',  password: '1234', email: 'test@abc.com'},
  {slno: 9,profilepic:'img', username: 'Fluorine',  password: '1234', email: 'test@abc.com'},
  {slno: 10,profilepic:'img', username: 'Neon',  password: '1234', email: 'test@abc.com'},
];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  editdata :boolean = false;
  displayedColumns: string[] = ['select','slno', 'profilepic', 'username', 'password','email','action'];
  dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  selection = new SelectionModel<UserElement>(true, []);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.slno + 1}`;
  }
  signinpage() {
    this.router.navigateByUrl("signin");
  }
  registerpage() {
    this.router.navigateByUrl("register");
  }
  adminpage() {
    this.router.navigateByUrl("admin");
  }
}
