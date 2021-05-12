import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent implements OnInit {
  users!: any;
  parentdata: any;
  constructor(private empServoce: EmployeeService) { }

  ngOnInit(): void {
    this.empServoce.getAll()
      .subscribe(users => this.users = users);
  }
  deleteUser(id: string) {
    const user = this.users.find((x: { id: string; }) => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.empServoce.delete(id)
      .subscribe(() => this.users = this.users.filter((x: { id: string; }) => x.id !== id));
  }
  viewUser(id: string) {
    this.empServoce.getById(id)
      .subscribe(() => this.users = this.users.filter((x: { id: string; }) => x.id !== id));
    console.log(this.users);
    this.parentdata = this.users;
  }

}
