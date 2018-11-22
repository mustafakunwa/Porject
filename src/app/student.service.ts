import {
  Injectable
} from '@angular/core';
import {
  Info
} from './StudentInfo';
import {
  Students
} from './Mock-student';
import {
  Observable,
  of
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() {}

  GetStudents(): Observable < Info[] > {
    return of(Students);
  }

  InsertStudent(student: Info): Observable < number > {
    if (Students.length > 0) {
      student.id = Students[Students.length - 1].id + 1;
    } else {
      student.id = 1;
    }
    Students.push(student);
    return of(student.id);
  }

  UpdateStudent(student: Info): Observable < number > {
    for(var i=0;i<Students.length;i++){
      if(Students[i].id==student.id){
        Students[i].FirstName=student.FirstName;
        Students[i].LastName=student.LastName;
        Students[i].Email=student.Email;
        Students[i].Mobile=student.Mobile
        Students[i].DOB=student.DOB;
        Students[i].Gender=student.Gender;
        Students[i].Address=student.Address;
        return of(Students[i].id);
      }
    }
   
  }

  DeleteStudent(Id: number): Observable < number > {
    for (var i = 0; i < Students.length; i++) {
      if (Students[i].id == Id) {
        Students.splice(i, 1);
      }
    }
    return of(Id)
  }

  EditStudent(Id: number): Observable < Info > {
    return of(Students.find(student => student.id === Id));
  }
}
