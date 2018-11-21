import { Component, OnInit } from '@angular/core';
import {Info} from '../StudentInfo';
import {StudentService} from '../student.service'
@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent implements OnInit {

  Students:Info[];
  displayedColumns: string[] = ['id', 'FirstName', 'LastName' ,'Email'];
  constructor(private StudentService:StudentService) { }

  ngOnInit() {
    this.GetStudents();
  }
  GetStudents(): void {
    this.StudentService.GetStudents().subscribe(
      Students=>this.Students=Students
    )
  }
}
