import { Injectable } from '@angular/core';
import {Info} from'./StudentInfo';
import {Students} from './Mock-student';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  GetStudents():Observable<Info[]>{
    return of(Students);
  }
  
  InsertStudent(student:Info):Observable<number>{
    student.id=Students[Students.length-1].id+1;
    Students.push(student);
    return of(student.id);
  }
}
