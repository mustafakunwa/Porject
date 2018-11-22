import { Component, OnInit } from '@angular/core';
import {Info} from '../StudentInfo';
import {StudentService} from '../student.service';
import{Observable} from 'rxjs';
@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent implements OnInit {

  Students:Info[];
  displayedColumns: string[] = ['id', 'FirstName', 'LastName' ,'Email','DOB','Gender','Address','Action'];
  constructor(private StudentService:StudentService) { }

  ngOnInit() {
    this.GetStudents();
  }
  GetStudents(): void {
    this.StudentService.GetStudents().subscribe(
      Students=>this.Students=Students
    )
    //this.Students = this.StudentService.GetStudents();   
  }

  Delete(Id:number):void{
    this.StudentService.DeleteStudent(Id).subscribe(
      Id=>{
        
        alert('Delete Successfull');
      }
    )
  }

}
